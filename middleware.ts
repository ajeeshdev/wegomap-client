import { NextRequest, NextResponse } from 'next/server';

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
  // e.g. /Hotels → /hotels, /Special-Events/Fest → /special-events/fest
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
    /*
     * Match all request paths EXCEPT:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - static files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|crm|old-web|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf|mp4|webm)).*)',
  ],
};
