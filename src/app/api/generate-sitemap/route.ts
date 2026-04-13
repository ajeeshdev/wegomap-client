import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Static routes with priorities and change frequencies
const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/packages', priority: 0.9, changefreq: 'daily' },
  { path: '/hotels', priority: 0.8, changefreq: 'weekly' },
  { path: '/blogs', priority: 0.8, changefreq: 'daily' },
  { path: '/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/services', priority: 0.7, changefreq: 'weekly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: 0.3, changefreq: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changefreq: 'yearly' },
];

function formatDate(dateStr?: string) {
  const d = dateStr ? new Date(dateStr) : new Date();
  return d.toISOString().split('T')[0];
}

function buildUrl(path: string, siteUrl: string) {
  return `${siteUrl.replace(/\/$/, '')}${path}`;
}

function buildXml(urls: { loc: string; lastmod: string; changefreq: string; priority: number }[]) {
  const entries = urls.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export async function POST(req: NextRequest) {
  try {
    const { siteUrl } = await req.json();
    if (!siteUrl) {
      return NextResponse.json({ success: false, error: 'Site URL is required' }, { status: 400 });
    }

    const today = formatDate();
    const urls: { loc: string; lastmod: string; changefreq: string; priority: number }[] = [];

    // Add static routes
    for (const route of STATIC_ROUTES) {
      urls.push({
        loc: buildUrl(route.path, siteUrl),
        lastmod: today,
        changefreq: route.changefreq,
        priority: route.priority,
      });
    }

    // Fetch dynamic packages
    try {
      const pkgRes = await fetch(`${API_URL}/packages?limit=1000`);
      const pkgData = await pkgRes.json();
      if (pkgData.success && pkgData.data) {
        for (const pkg of pkgData.data) {
          if (pkg.slug) {
            urls.push({
              loc: buildUrl(`/packages/${pkg.slug}`, siteUrl),
              lastmod: formatDate(pkg.updatedAt),
              changefreq: 'weekly',
              priority: 0.8,
            });
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch packages for sitemap', e);
    }

    // Fetch dynamic blogs
    try {
      const blogRes = await fetch(`${API_URL}/blogs?limit=1000`);
      const blogData = await blogRes.json();
      if (blogData.success && blogData.data) {
        for (const blog of blogData.data) {
          if (blog.slug) {
            urls.push({
              loc: buildUrl(`/blogs/${blog.slug}`, siteUrl),
              lastmod: formatDate(blog.updatedAt || blog.publishDate),
              changefreq: 'monthly',
              priority: 0.7,
            });
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch blogs for sitemap', e);
    }

    // Fetch dynamic hotels
    try {
      const hotelRes = await fetch(`${API_URL}/houseboats?limit=1000`);
      const hotelData = await hotelRes.json();
      if (hotelData.success && hotelData.data) {
        for (const hotel of hotelData.data) {
          if (hotel.slug) {
            urls.push({
              loc: buildUrl(`/hotels/${hotel.slug}`, siteUrl),
              lastmod: formatDate(hotel.updatedAt),
              changefreq: 'weekly',
              priority: 0.75,
            });
          }
        }
      }
    } catch (e) {
      console.error('Failed to fetch hotels for sitemap', e);
    }

    // Deduplicate by loc (same URL can appear from both static data and API)
    const seen = new Set<string>();
    const uniqueUrls = urls.filter(u => {
      if (seen.has(u.loc)) return false;
      seen.add(u.loc);
      return true;
    });

    const xml = buildXml(uniqueUrls);

    // Write to public/sitemap.xml (served as /sitemap.xml)
    const publicPath = join(process.cwd(), 'public', 'sitemap.xml');
    writeFileSync(publicPath, xml, 'utf-8');

    return NextResponse.json({
      success: true,
      message: `Sitemap generated with ${uniqueUrls.length} URLs (${urls.length - uniqueUrls.length} duplicates removed)`,
      urlCount: uniqueUrls.length,
      duplicatesRemoved: urls.length - uniqueUrls.length,
      path: '/sitemap.xml',
      xml,
    });
  } catch (err: any) {
    console.error('Sitemap generation error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
  }
}
