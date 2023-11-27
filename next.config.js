/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_PATH_PREFIX || "",
    assetPrefix: process.env.NEXT_PUBLIC_PATH_PREFIX  || undefined
}

module.exports = nextConfig
