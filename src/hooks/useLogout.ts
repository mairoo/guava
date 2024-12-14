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
/**
 * 로그아웃 처리를 위한 커스텀 훅
 */
export const useLogout = ({
  skipApi = false,
  redirect = true,
}: UseLogoutOptions = {}): UseLogoutReturn => {
  // 1. 기본 훅 초기화
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 2. API 관련 상태
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const clearError = () => setError(null);

  const logout = async () => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      clearError();

      // 백엔드 로그아웃 API 호출
      if (!skipApi) {
        await logoutMutation().unwrap();
      }

      // Redux 상태 초기화
      dispatch(setAuth(false));
      dispatch(clearCart());

      // 로컬 데이터 정리
      storage.clearRememberMe();
      storage.clearLastRefreshTime();
      auth.removeCookie('isAuthenticated');

      // 리다이렉트 처리
      if (redirect) {
        router.push('/auth/sign-in');
      }
    } catch (error: any) {
      console.error('로그아웃 중 오류 발생:', error);
      setError(error.data?.message || '로그아웃 중 오류가 발생했습니다.');
      auth.removeCookie('isAuthenticated'); // 실패해도 쿠키 제거
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    logout,
    isLoading: isProcessing || isLogoutLoading, // 통합된 로딩 상태
    error,
    clearError,
  };
};
