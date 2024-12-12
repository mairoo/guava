import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

/**
 * Next.js 미들웨어 - 인증이 필요한 경로에 대한 접근 제어
 *
 * @param request - Next.js 요청 객체
 * @returns NextResponse 객체
 *
 * 주요 기능:
 * 1. 인증이 필요한 경로 보호
 * 2. 인증된 사용자의 인증 페이지 접근 제한
 * 3. 비인증 사용자 리다이렉션
 */
export function middleware(request: NextRequest) {
  // 쿠키를 통한 인증 상태 확인
  // Redux store는 미들웨어에서 접근 불가능하므로 쿠키로 판단
  const isAuthenticated = request.cookies.has('isAuthenticated');

  // 현재 요청 경로가 인증 관련 페이지인지 확인 (/auth/*)
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  // 인증 페이지 접근 처리 (로그인, 회원가입 등)
  if (isAuthPage) {
    // 이미 인증된 사용자가 인증 페이지 접근 시도시
    if (isAuthenticated) {
      // 이전 페이지가 있으면 해당 페이지로, 없으면 홈으로 리다이렉트
      const from = request.nextUrl.searchParams.get('from') || '/';
      return NextResponse.redirect(new URL(from, request.url));
    }
    // 비인증 사용자는 인증 페이지 접근 허용
    return NextResponse.next();
  }

  // 보호된 경로에 대한 접근 제어
  if (!isAuthenticated) {
    // 현재 접근하려던 경로를 저장
    const from = request.nextUrl.pathname;
    // 로그인 페이지로 리다이렉트하면서 원래 가려던 경로를 쿼리 파라미터로 전달
    return NextResponse.redirect(
      new URL(`/auth/sign-in?from=${encodeURIComponent(from)}`, request.url),
    );
  }

  // 인증된 사용자는 정상적으로 요청 진행
  return NextResponse.next();
}

/**
 * 미들웨어를 적용할 경로 설정
 *
 * matcher 배열에 지정된 패턴과 일치하는 경로에만 미들웨어가 실행됨
 * - 정규식을 사용하여 여러 경로 패턴 매칭 가능
 */
export const config = {
  matcher: [
    '/dashboard/:path*', // dashboard 하위 모든 경로
    '/orders/:path*', // orders 하위 모든 경로
  ],
};
