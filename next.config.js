/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.PATH_PREFIX || "",
    assetPrefix: process.env.PATH_PREFIX  || undefined,
    output: 'standalone'
}

module.exports = nextConfig
