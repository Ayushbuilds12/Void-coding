import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Paths to protect - redirect to login if no token
  if (pathname.startsWith('/dashboard')) {
    const token = req.cookies.get('sb-access-token')?.value ?? null
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // Allow users to access login/signup pages regardless of auth status
  // (removed the redirect for logged-in users)

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
