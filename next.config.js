/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/site/:path*/',
      },
    ]
  },
}

module.exports = nextConfig
