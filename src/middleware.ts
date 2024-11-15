import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // 미들웨어는 redux 상태 변수에 접근할 수 없고 쿠키 접근만 가능
  const isAuthenticated = request.cookies.has('isAuthenticated');

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  // Guest Route (auth/login, auth/register 등)
  if (isAuthPage) {
    if (isAuthenticated) {
      const from = request.nextUrl.searchParams.get('from') || '/';
      return NextResponse.redirect(new URL(from, request.url));
    }
    return NextResponse.next();
  }

  // Private Route
  if (!isAuthenticated) {
    const from = request.nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/auth/sign-in?from=${encodeURIComponent(from)}`, request.url),
    );
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [],
};
