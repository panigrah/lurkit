/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withPWA(nextConfig)
