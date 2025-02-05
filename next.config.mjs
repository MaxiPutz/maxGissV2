/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    transpilePackages: ['@reduxjs/toolkit'],
};

export default nextConfig;
  