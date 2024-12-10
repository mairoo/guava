import { useLogoutMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { clearCart } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseLogoutOptions {
  /**
   * 백엔드 API 호출 스킵 여부
   * - false: 사용자가 명시적으로 로그아웃할 때 (로그아웃 페이지)
   * - true: 세션 만료로 인한 자동 로그아웃 시 (AuthProvider)
   */
  skipApi?: boolean;

  /**
   * 로그아웃 후 로그인 페이지로 리다이렉트 여부
   */
  redirect?: boolean;
}

interface UseLogoutReturn {
  /**
   * 로그아웃 처리 함수
   */
  logout: () => Promise<void>;

  /**
   * 로그아웃 처리 중 여부
   */
  isLoading: boolean;

  /**
   * 로그아웃 중 발생한 에러 메시지
   */
  error: string | null;

  /**
   * 에러 상태 초기화
   */
  clearError: () => void;
}

/**
 * 로그아웃 처리를 위한 커스텀 훅
 */
export const useLogout = ({
  skipApi = false,
  redirect = true,
}: UseLogoutOptions = {}): UseLogoutReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const logout = async () => {
    try {
      clearError(); // 새 요청 시작할 때 이전 에러 초기화

      // 백엔드 로그아웃 API 호출 (skipApi가 false인 경우에만)
      if (!skipApi) {
        await logoutMutation().unwrap();
      }

      // Redux 상태 초기화
      dispatch(setAuth(false));
      dispatch(clearCart());

      // 로컬 스토리지 데이터 삭제
      storage.clearRememberMe();
      storage.clearLastRefreshTime();

      // 인증 쿠키 제거
      auth.removeCookie('isAuthenticated');

      // 로그인 페이지로 리다이렉트 (옵션)
      if (redirect) {
        router.push('/auth/sign-in');
      }
    } catch (error: any) {
      console.error('로그아웃 중 오류 발생:', error);

      // 에러 메시지 설정
      const errorMessage =
        error.data?.message || '로그아웃 중 오류가 발생했습니다.';
      setError(errorMessage);

      // API 호출 실패하더라도 항상 인증 쿠키는 제거
      auth.removeCookie('isAuthenticated');
    }
  };

  return {
    logout,
    isLoading,
    error,
    clearError,
  };
};
