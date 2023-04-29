/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images-na.ssl-images-amazon.com",
      "cnet1.cbsistatic.com",
      "i.dell.com",
      "cdn.vox-cdn.com",
      "cdn.mos.cms.futurecdn.net",
      "http2.mlstatic.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/account123/**",
      },
    ],
  },
};

module.exports = nextConfig;
