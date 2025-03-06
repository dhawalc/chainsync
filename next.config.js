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
}

module.exports = nextConfig 