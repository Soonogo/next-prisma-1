/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig && {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcdp.oss-cn-qingdao.aliyuncs.com',
        port: '',
        pathname: '/**/**',
      },
      {
        protocol: 'https',
        hostname: 'yxg-image.oss-cn-qingdao.aliyuncs.com',
        port: '',
        pathname: '/**/**',
      },
    ],
  },
}