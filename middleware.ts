import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const url = new URL(request.url)
    url.href = `https://calculate-traffic-percentage-xg6vtevnga-uc.a.run.app${url.pathname.replace(/^\/api/, '')}`
    
    return NextResponse.rewrite(url)
  }
}