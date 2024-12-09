/**
 * 인증 관련 쿠키를 관리하는 유틸리티 객체
 */
export const auth = {
  /**
   * 특정 이름의 쿠키 값을 가져오는 함수
   * @param name 가져올 쿠키의 이름
   * @returns 쿠키 값 또는 null (쿠키가 없는 경우)
   * @example
   * const authCookie = auth.getCookie('isAuthenticated');
   */
  getCookie: (name: string): string | null => {
    const value = `; ${document.cookie}`; // 현재 페이지의 모든 쿠키 문자열
    const parts = value.split(`; ${name}=`); // 찾고자 하는 쿠키를 기준으로 분리
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null; // 쿠키 값만 추출
    return null;
  },

  /**
   * 새로운 쿠키를 설정하는 함수
   * @param name 쿠키 이름
   * @param value 쿠키 값
   * @param maxAge 쿠키 유효 기간 (초 단위, 선택적)
   * @example
   * auth.setCookie('isAuthenticated', 'true', 3600); // 1시간 동안 유효한 쿠키 설정
   */
  setCookie: (name: string, value: string, maxAge?: number) => {
    let cookie = `${name}=${value}; path=/`; // 기본 쿠키 문자열
    if (maxAge) {
      cookie += `; max-age=${maxAge}`; // 유효 기간이 지정된 경우 추가
    }
    document.cookie = cookie;
  },

  /**
   * 특정 쿠키를 삭제하는 함수
   * 만료일을 과거로 설정하여 브라우저가 자동으로 삭제하게 함
   * @param name 삭제할 쿠키의 이름
   * @example
   * auth.removeCookie('isAuthenticated');
   */
  removeCookie: (name: string) => {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  },

  /**
   * 사용자가 현재 인증되어 있는지 확인하는 함수
   * @returns true: 인증됨, false: 인증되지 않음
   * @example
   * if (auth.isAuthenticated()) {
   *   // 인증된 사용자 처리
   * }
   */
  isAuthenticated: (): boolean => {
    return auth.getCookie('isAuthenticated') === 'true';
  },

  /**
   * 인증 쿠키를 설정하는 함수
   * @param expiresIn 쿠키 만료 시간 (초 단위)
   * @example
   * auth.setAuthCookie(3600); // 1시간 동안 유효한 인증 쿠키 설정
   */
  setAuthCookie: (expiresIn: number) => {
    auth.setCookie('isAuthenticated', 'true', expiresIn);
  },

  /**
   * 로그아웃 처리를 위한 함수
   * - 서버에 로그아웃 요청을 보내고
   * - 로컬의 인증 쿠키를 삭제
   * @param logoutMutation 서버 로그아웃 요청 함수
   * @example
   * await auth.handleLogout(logoutMutation);
   */
  handleLogout: async (logoutMutation: () => Promise<any>) => {
    try {
      await logoutMutation(); // 서버에 로그아웃 요청
      auth.removeCookie('isAuthenticated'); // 로컬 인증 쿠키 삭제
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },
};
