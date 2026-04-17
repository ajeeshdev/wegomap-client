import { NextRequest, NextResponse } from 'next/server';

// Middleware runs at the edge — we can't use `fs` here.
// Instead, we proxy to the API route to get redirections, or we use a cached approach.
// For a cleaner edge-compatible approach, we store redirections in a public JSON file.

// Simple in-memory cache for redirections to avoid hitting the API on every request
let cachedRedirections: any[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip admin, API, CRM, and static file paths
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/crm') ||
    pathname.startsWith('/old-web') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ── Enforce lowercase URLs ──────────────────────────────────────────────────
  // If the path has any uppercase letter, 301 redirect to lowercase version
  const lowercasePath = pathname.toLowerCase();
  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, { status: 301 });
  }

  // Fetch redirections from our API with caching
  try {
    const now = Date.now();
    if (!cachedRedirections || (now - lastFetchTime > CACHE_TTL)) {
      const baseUrl = request.nextUrl.origin;
      const res = await fetch(`${baseUrl}/api/redirections`, { 
        headers: { 'Cache-Control': 'no-cache' } 
      });
      
      if (res.ok) {
        const json = await res.json();
        cachedRedirections = json.data || [];
        lastFetchTime = now;
      }
    }

    if (cachedRedirections) {
      const match = cachedRedirections.find(
        (r) => r.active && r.from && r.from === pathname
      );

      if (match) {
        const redirectUrl = new URL(match.to.startsWith('http') ? match.to : match.to, request.nextUrl.origin);
        const statusCode = match.type === '302' ? 302 : 301;
        return NextResponse.redirect(redirectUrl, { status: statusCode });
      }
    }
  } catch (err) {
    console.error('Middleware redirection fetch error:', err);
    // If middleware fetch fails, just continue normally
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - static files
     */
    '/((?!_next/static|_next/image|favicon.ico|crm|old-web|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf|mp4|webm)).*)',
  ],
};
