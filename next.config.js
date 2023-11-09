/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_URL: process.env.APP_URL,
    APP_STRIPE_PUB_KEY: process.env.APP_STRIPE_PUB_KEY
  }
}

module.exports = nextConfig
