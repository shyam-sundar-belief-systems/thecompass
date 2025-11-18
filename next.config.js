/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export so NextAuth and cookies won't break
  output: 'standalone',

  experimental: {
    serverActions: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
