/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: false,
  },
  async headers() {
    return [
      {
        source: '/roadmap/:id',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,HEAD,PUT,PATCH,POST,DELETE'
          },
          {
            key: "Access-Control-Allow-Headers",
            value: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          }
        ]
      }
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
