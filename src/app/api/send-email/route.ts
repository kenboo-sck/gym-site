import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
    subject: string;
    experience: string;
    contactMethod: string;
    gender: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const formData: ContactFormData = await request.json();
        // カンマ区切りで取得し、空白除去・重複排除・空文字除去を行う
        const rawEmails = process.env.ADMIN_EMAIL?.split(',') || [];
        const adminEmails = Array.from(new Set(
            rawEmails.map(e => e.trim()).filter(e => e !== '')
        ));

        if (adminEmails.length === 0) {
            throw new Error('ADMIN_EMAIL is not configured');
        }

        // 管理者への通知メール
        await resend.emails.send({
            from: 'AFG 大阪本町 お問い合わせ <noreply@resend.dev>',
            to: adminEmails,
            subject: `【ALMA FIGHT GYM 大阪本町】お問い合わせ - ${formData.name}様`,
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: #f97316; padding: 20px; text-align: center;">
                        <h1 style="color: #fff; margin: 0; font-size: 22px;">新しいお問い合わせがありました</h1>
                    </div>
                    
                    <div style="padding: 30px; background: #fff; border: 1px solid #eee;">
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; width: 140px; font-weight: bold;">項目</td>
                                <td style="padding: 12px;">${formData.subject}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">柔術経験</td>
                                <td style="padding: 12px;">${formData.experience}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">連絡方法</td>
                                <td style="padding: 12px;">${formData.contactMethod}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">性別</td>
                                <td style="padding: 12px;">${formData.gender}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">お名前</td>
                                <td style="padding: 12px; font-weight: bold; color: #f97316;">${formData.name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">メールアドレス</td>
                                <td style="padding: 12px;"><a href="mailto:${formData.email}" style="color: #0066cc;">${formData.email}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">電話番号</td>
                                <td style="padding: 12px;">${formData.phone || '未入力'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #eee;">
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold;">住所</td>
                                <td style="padding: 12px;">${formData.address || '未入力'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; background: #f8f8f8; font-weight: bold; vertical-align: top;">お問い合わせ内容</td>
                                <td style="padding: 12px; white-space: pre-wrap;">${formData.message || '未入力'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="padding: 15px; background: #f8f8f8; text-align: center; margin-top: 10px;">
                        <p style="color: #666; font-size: 12px; margin: 0;">
                            このメールはウェブサイトのお問い合わせフォームから自動送信されました
                        </p>
                    </div>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('メール送信エラー:', error);
        return NextResponse.json(
            { success: false, error: 'メール送信に失敗しました' },
            { status: 500 }
        );
    }
}
