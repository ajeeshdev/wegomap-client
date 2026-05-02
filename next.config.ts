import type { NextConfig } from "next";
import { readFileSync } from "fs";
import { join } from "path";

function loadRedirections() {
  try {
    const data = readFileSync(join(process.cwd(), 'src', 'data', 'redirections.json'), 'utf-8');
    const rules = JSON.parse(data) as Array<{ from: string; to: string; type: string; active: boolean }>;
    return rules
      .filter(r => r.active && r.from && r.to)
      .map(r => {
        // Strip domain prefix if entered as full URL (e.g. https://wegomap.com/about → /about)
        const source = r.from.replace(/^https?:\/\/[^/]+/, '') || '/';
        const destination = r.to.replace(/^https?:\/\/[^/]+/, '') || '/';
        return {
          source,
          destination,
          permanent: r.type === '301',
        };
      });
  } catch {
    return [];
  }
}

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
        hostname: 'wegomap.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.wegomap.com',
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
  async redirects() {
    const cmsRedirects = loadRedirections();
    return [
      // Static hardcoded redirects
      {
        source: '/tours/:path*',
        destination: '/packages/:path*',
        permanent: true,
      },
      // Dynamic CMS-driven redirects (from Admin > URL Redirections)
      ...cmsRedirects,
    ];
  },
};

export default nextConfig as NextConfig;
