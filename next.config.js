/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    optimizeCss: true
  },
  images: {
    domains: ['i.ytimg.com'],
  },
}

module.exports = nextConfig
