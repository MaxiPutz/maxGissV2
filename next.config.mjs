/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@reduxjs/toolkit"],

  ...(basePath ? { basePath } : {}),
  ...(assetPrefix ? { assetPrefix } : {}),
};

export default nextConfig;
