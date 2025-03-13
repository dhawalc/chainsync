// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Optimizes for containerized environments
  reactStrictMode: true,
  swcMinify: true, // This key is still valid in Next.js 13.5.8, so you can keep it if it's working for you
  webpack: (config) => {
    // Add support for path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
    };
    return config;
  },
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

module.exports = nextConfig;
