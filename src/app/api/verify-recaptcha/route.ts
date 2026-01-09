import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'トークンがありません' },
        { status: 400 }
      );
    }

    // Google reCAPTCHA APIで検証
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: 'サーバー設定エラー' },
        { status: 500 }
      );
    }

    const response = await fetch(verifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    // レスポンス
    return NextResponse.json({
      success: data.success,
      score: data.score, // 0.0 - 1.0 (1.0 = 人間の可能性が高い)
      action: data.action,
      challenge_ts: data.challenge_ts,
      hostname: data.hostname,
    });
  } catch (error) {
    console.error('reCAPTCHA検証エラー:', error);
    return NextResponse.json(
      { success: false, error: '検証に失敗しました' },
      { status: 500 }
    );
  }
}