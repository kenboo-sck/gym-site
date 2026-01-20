import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { Resend } from "resend";

admin.initializeApp();

/**
 * Firebase Functions Secrets（RESEND_API_KEY）を使います
 * 例: firebase functions:secrets:set RESEND_API_KEY
 */
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is missing. Set it with: firebase functions:secrets:set RESEND_API_KEY"
    );
  }
  return new Resend(key);
}

function esc(v: unknown): string {
  const s = String(v ?? "");
  // replaceAll を使わず、古いlibでもOKな書き方にします
  return s
    .split("&").join("&amp;")
    .split("<").join("&lt;")
    .split(">").join("&gt;")
    .split('"').join("&quot;")
    .split("'").join("&#39;");
}

function formatCreatedAt(data: Record<string, any>): string {
  try {
    const createdAt = data.createdAt;
    // Firestore Timestamp っぽい場合
    if (createdAt?.toDate) {
      const d = createdAt.toDate() as Date;
      return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
        d.getDate()
      ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
        2,
        "0"
      )}`;
    }
  } catch (_) {}
  return "（不明）";
}

/**
 * ✅ 既存の 1st Gen 関数名を維持：v1mailFinal
 * ✅ region は v1 方式でOK
 * ✅ secrets を使う（キー直書きしない）
 */
export const v1mailFinal = functions
  .runWith({ secrets: ["RESEND_API_KEY"] })
  .region("asia-northeast1")
  .firestore.document("inquiries/{inquiryId}")
  .onCreate(async (snapshot: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
    const data = snapshot.data() as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      createdAt?: any;
      [key: string]: any;
    };

    const name = (data.name ?? "").trim() || "（未入力）";
    const email = (data.email ?? "").trim();
    const phone = (data.phone ?? "").trim();
    const message = (data.message ?? "").trim() || "（未入力）";
    const created = formatCreatedAt(data);

    const resend = getResend();

    // ---------- 管理者向け（問い合わせ全文） ----------
    const adminTo = "kenzo_y@sputnikworks.co.jp"; // ここは管理者メール
    const adminSubject = `【ALMA FIGHT GYM 大阪本町】新規お問い合わせ：${name} 様`;

    const adminHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; line-height: 1.6;">
        <h2 style="margin: 0 0 12px;">新規お問い合わせが届きました</h2>
        <p style="margin: 0 0 16px;">以下の内容で受け付けています。</p>

        <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px;">
          <tr>
            <th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f7f7f7; width: 160px;">受付日時</th>
            <td style="border: 1px solid #ddd; padding: 10px;">${esc(created)}</td>
          </tr>
          <tr>
            <th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f7f7f7;">お名前</th>
            <td style="border: 1px solid #ddd; padding: 10px;">${esc(name)}</td>
          </tr>
          <tr>
            <th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f7f7f7;">メール</th>
            <td style="border: 1px solid #ddd; padding: 10px;">${esc(email || "（未入力）")}</td>
          </tr>
          <tr>
            <th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f7f7f7;">電話番号</th>
            <td style="border: 1px solid #ddd; padding: 10px;">${esc(phone || "（未入力）")}</td>
          </tr>
          <tr>
            <th align="left" style="border: 1px solid #ddd; padding: 10px; background:#f7f7f7;">お問い合わせ内容</th>
            <td style="border: 1px solid #ddd; padding: 10px; white-space: pre-wrap;">${esc(message)}</td>
          </tr>
        </table>

        <p style="margin-top: 16px; color:#666; font-size: 12px;">
          docId: ${esc(context.params.inquiryId)} / collection: inquiries
        </p>
      </div>
    `;

    // ---------- ユーザー向け（自動返信） ----------
    // ※ ここは「ドメイン未取得」でも、とりあえず Resend の from を使って送れる形にします
    //    ただし Resend の制限で「任意の宛先に送れない」場合があります（後述）
    const userSubject = "【ALMA GYM】お問い合わせありがとうございます（自動返信）";

    const userHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; line-height: 1.7;">
        <p>${esc(name)} 様</p>

        <p>
          この度はALMA GYMへお問い合わせいただき、誠にありがとうございます。<br />
          以下の内容でお問い合わせを受け付けました。
        </p>

        <div style="border:1px solid #e5e5e5; padding:12px; border-radius:8px; background:#fafafa; max-width:720px;">
          <p style="margin:0 0 8px;"><strong>受付日時：</strong>${esc(created)}</p>
          <p style="margin:0 0 8px;"><strong>お名前：</strong>${esc(name)}</p>
          <p style="margin:0 0 8px;"><strong>メール：</strong>${esc(email || "（未入力）")}</p>
          <p style="margin:0 0 8px;"><strong>電話番号：</strong>${esc(phone || "（未入力）")}</p>
          <p style="margin:0;"><strong>お問い合わせ内容：</strong><br />
            <span style="white-space: pre-wrap;">${esc(message)}</span>
          </p>
        </div>

        <p style="margin-top:16px;">
          担当者より、通常1〜2営業日以内にご連絡いたします。<br />
          しばらくお待ちくださいませ。
        </p>

        <p style="margin-top:16px; color:#666; font-size: 12px;">
          ※本メールは送信専用です。こちらのメールに返信いただいても確認できない場合があります。
        </p>

        <p style="margin-top:18px;">
          ALMA GYM
        </p>
      </div>
    `;

    // 送信結果を分けてログに出す（片方失敗でも片方は成功させる）
    let adminResult: any = null;
    let userResult: any = null;

    // 1) 管理者
    try {
      adminResult = await resend.emails.send({
        from: "ALMA GYM <onboarding@resend.dev>",
        to: adminTo,
        subject: adminSubject,
        html: adminHtml,
        // ユーザーからの返信を受けたいなら replyTo
        replyTo: email ? email : undefined,
      });
      console.log("✅ Admin mail sent:", adminResult);
    } catch (e) {
      console.error("❌ Admin mail failed:", e);
    }

    // 2) ユーザー（email があるときだけ）
    if (!email) {
      console.log("⚠️ User email is empty. Skipped user auto-reply.");
      return;
    }

    try {
      userResult = await resend.emails.send({
        from: "ALMA GYM <onboarding@resend.dev>",
        to: email,
        subject: userSubject,
        html: userHtml,
      });
      console.log("✅ User mail sent:", userResult);
    } catch (e) {
      console.error("❌ User mail failed:", e);
    }
  });
