import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/invitations')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/invitations', req.url));
}

export const config = {
  matcher: ['/(.*)']
};
