/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables blocking on ESLint during builds
  },
};

module.exports = nextConfig;
