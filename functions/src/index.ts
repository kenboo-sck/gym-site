/**
 * メール送信機能は Next.js 側 (src/app/api/send-email/route.ts) に移行しました。
 * 重複送信を防ぐため、Firebase Functions 側の処理は無効化しています。
 */

/*
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { Resend } from "resend";

admin.initializeApp();

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

export const v1mailFinal = functions
  .runWith({ secrets: ["RESEND_API_KEY"] })
  .region("asia-northeast1")
  .firestore.document("inquiries/{inquiryId}")
  .onCreate(async (snapshot: functions.firestore.QueryDocumentSnapshot, context: functions.EventContext) => {
    // ...略...
  });
*/
