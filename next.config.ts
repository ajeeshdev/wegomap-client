import type { NextConfig } from "next";

// eslint and typescript flags reduce server memory usage during production builds
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
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
        pathname: '/**',
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

  async redirects() {
    return [
      {
        source: '/tours',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/:slug/tours/:id',
        destination: '/:slug/packages/:id',
        permanent: true,
      },

    ];
  },
};

export default nextConfig as NextConfig;
