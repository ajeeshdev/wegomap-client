import { NextRequest, NextResponse } from 'next/server';

type RedirectRule = { _id?: string; from: string; to: string; type: string; active: boolean };

// In-memory cache: refreshed every 60 seconds without needing a server restart
let cachedRules: RedirectRule[] = [];
let cacheExpiry = 0;

async function getRedirectRules(backendApiUrl: string): Promise<RedirectRule[]> {
  const now = Date.now();
  if (now < cacheExpiry && cachedRules.length >= 0) return cachedRules;

  try {
    const res = await fetch(`${backendApiUrl}/redirections`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(3000), // 3s timeout so middleware doesn't hang
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        cachedRules = json.data;
        cacheExpiry = now + 60_000; // cache for 60 seconds
      }
    }
  } catch {
    // On failure, keep existing cache (if any) and retry on next request after expiry
    cacheExpiry = now + 10_000; // retry after 10s on failure
  }
  return cachedRules;
}

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

  // ── Dynamic Redirections (from MongoDB via backend API) ─────────────────────
  // Use the backend API URL directly to avoid self-referential calls
  const backendApi = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'http://localhost:5001/api';
  const rules = await getRedirectRules(backendApi);
  const origin = request.nextUrl.origin;

  for (const rule of rules) {
    if (!rule.active) continue;

    // Normalise: strip trailing slash and leading domain if a full URL was entered
    const fromPath = rule.from.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/';
    const currentPath = pathname.replace(/\/$/, '') || '/';

    if (currentPath === fromPath) {
      const destination = rule.to.startsWith('http') ? rule.to : `${origin}${rule.to}`;
      const url = new URL(destination);
      // Preserve query string from original request
      request.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
      return NextResponse.redirect(url, { status: Number(rule.type) || 301 });
    }
  }

  // ── Enforce lowercase URLs ──────────────────────────────────────────────────
  const lowercasePath = pathname.toLowerCase();
  if (pathname !== lowercasePath) {
    const url = request.nextUrl.clone();
    url.pathname = lowercasePath;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|crm|old-web|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf|mp4|webm)).*)',
  ],
};
