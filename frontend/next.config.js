/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GRAPHQL_URL: process.env.GRAPHQL_URL
  }
}

module.exports = nextConfig
