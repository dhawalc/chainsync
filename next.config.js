/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimizes for containerized environments
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Add support for path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
  // Enable image optimization from external sources if needed
  images: {
    domains: ['randomuser.me'],
  },
  // Make sure client-side code can access these environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  // Increase serverless function timeout for Snowflake queries
  serverRuntimeConfig: {
    // Will only be available on the server side
    timeoutSeconds: 60,
  },
}

module.exports = nextConfig 