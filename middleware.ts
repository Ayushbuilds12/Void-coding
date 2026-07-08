import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Paths to protect
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('sb-access-token')?.value ?? null
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Prevent logged-in users from seeing login/signup
  if (pathname === '/login' || pathname === '/signup') {
    const token = req.cookies.get('sb-access-token')?.value ?? null
    if (token) {
      const url = req.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
