import { NextRequest, NextResponse } from 'next/server';

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'reCAPTCHAトークンがありません',
      }, { status: 400 });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured');
      return NextResponse.json({
        success: false,
        error: 'サーバー設定エラー',
      }, { status: 500 });
    }

    // Google reCAPTCHA APIで検証
    const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const response = await fetch(verificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      console.log('reCAPTCHA verification failed:', data['error-codes']);
      return NextResponse.json({
        success: false,
        error: 'reCAPTCHA検証に失敗しました',
        errorCodes: data['error-codes'],
      }, { status: 400 });
    }

    // スコアが0.5未満の場合はスパムとして拒否
    const score = data.score ?? 0;
    if (score < 0.5) {
      console.log('Low reCAPTCHA score detected:', score);
      return NextResponse.json({
        success: false,
        error: 'スパムとして検出されました',
        score: score,
      }, { status: 403 });
    }

    // 検証成功
    return NextResponse.json({
      success: true,
      score: score,
      action: data.action,
      hostname: data.hostname,
    });

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json({
      success: false,
      error: 'reCAPTCHA検証中にエラーが発生しました',
    }, { status: 500 });
  }
}