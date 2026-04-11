/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/robots.txt',
          destination: '/api/robots.txt',
        },
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap.xml',
        },
      ],
    };
  },
};

export default nextConfig;
