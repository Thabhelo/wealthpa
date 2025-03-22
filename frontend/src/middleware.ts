import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check for token in both cookie and Authorization header
  const token = request.cookies.get('token')?.value || 
                request.headers.get('Authorization')?.split(' ')[1];
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isPublicPage = request.nextUrl.pathname === '/';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow API routes to handle their own authentication
  if (isApiRoute) {
    return NextResponse.next();
  }

  // If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access protected pages while logged out, redirect to login
  if (!isAuthPage && !isPublicPage && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    // Add the current URL as a redirect parameter
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 