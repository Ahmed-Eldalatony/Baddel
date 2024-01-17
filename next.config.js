/** @type {import('next').NextConfig} */
// const nextConfig = {}
const nextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    // formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        // pathname: '/image/upload/**',
      },
    ],
  },
}
const withNextIntl = require('next-intl/plugin')(
  './i8n.js'
  )
module.exports = withNextIntl(nextConfig) 
