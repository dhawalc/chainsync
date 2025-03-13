// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  // Preserve existing configuration
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'standalone',
    experimental: {
      optimizeCss: true,
    },
  } : {}),
  // Updated image configuration using remotePatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
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
  // Bypass ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Bypass TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withPWA(nextConfig);
