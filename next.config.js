/** @type {import('next').NextConfig} */
const withImages = require("next-images");

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_PATH_PREFIX || "",
  assetPrefix: process.env.NEXT_PUBLIC_PATH_PREFIX || undefined,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/todos",
        permanent: true,
      },
    ];
  },
};

module.exports = withImages(nextConfig);
