/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  ← コメントアウト
  images: {
    unoptimized: true,
  },
  // trailingSlash: true,  ← コメントアウト
}

module.exports = nextConfig