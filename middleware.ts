import { NextRequest, NextResponse } from 'next/server';

// Middleware runs at the edge — we can't use `fs` here.
// Instead, we proxy to the API route to get redirections, or we use a cached approach.
// For a cleaner edge-compatible approach, we store redirections in a public JSON file.

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

  // Fetch redirections from our API
  try {
    const baseUrl = request.nextUrl.origin;
    const res = await fetch(`${baseUrl}/api/redirections`, { cache: 'no-store' });
    if (!res.ok) return NextResponse.next();

    const json = await res.json();
    const redirections: Array<{ from: string; to: string; type: string; active: boolean }> = json.data || [];

    const match = redirections.find(
      (r) => r.active && r.from && r.from === pathname
    );

    if (match) {
      const redirectUrl = new URL(match.to.startsWith('http') ? match.to : match.to, request.nextUrl.origin);
      const statusCode = match.type === '302' ? 302 : 301;
      return NextResponse.redirect(redirectUrl, { status: statusCode });
    }
  } catch {
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
