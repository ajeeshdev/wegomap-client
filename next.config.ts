import type { NextConfig } from "next";

// eslint and typescript flags reduce server memory usage during production builds
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.wegomap.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.demo.wegomap.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api-demo.wegomap.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001',
        pathname: '/uploads/**',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['import', 'legacy-js-api', 'if-function', 'global-builtin', 'color-functions']
  },
  // Required by Hostinger's server bridge
  output: 'standalone',
  // Fix workspace root detection so standalone is created at standalone/frontend/server.js
  turbopack: {
    root: '..',
  },
  typescript: { ignoreBuildErrors: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
};

export default nextConfig as NextConfig;
