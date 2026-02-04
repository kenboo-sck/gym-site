/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  ← コメントアウト
  images: {
    // Vercel等のサーバー環境では最適化を有効に
    unoptimized: false,
    // デバイスサイズに応じた画像サイズを生成
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // WebP形式を優先
    formats: ['image/webp'],
  },
  // trailingSlash: true,  ← コメントアウト
}

module.exports = nextConfig