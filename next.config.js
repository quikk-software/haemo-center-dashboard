/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.PATH_PREFIX || "",
    output: 'standalone'
}

module.exports = nextConfig
