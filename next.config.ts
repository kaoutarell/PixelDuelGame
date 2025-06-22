/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables blocking on ESLint during builds
  },
};

module.exports = nextConfig;
