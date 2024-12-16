import { useLogoutMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { clearCart } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { orderApi } from '@/store/order/api';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import { useState } from 'react';

interface UseLogoutOptions {
  /**
   * 백엔드 API 호출 스킵 여부
   * - false: 사용자가 명시적으로 로그아웃할 때 (로그아웃 페이지)
   * - true: 세션 만료로 인한 자동 로그아웃 시 (AuthProvider)
   */
  skipApi?: boolean;
}

interface UseLogoutReturn {
  logout: () => Promise<void>; // 로그아웃 처리 함수
  isLoading: boolean; // 로그아웃 처리 중 여부
}

/**
 * 로그아웃 처리를 위한 커스텀 훅
 */
export const useLogout = ({
  skipApi = false,
}: UseLogoutOptions = {}): UseLogoutReturn => {
  // 1. 기본 훅 초기화
  const dispatch = useAppDispatch();

  // 2. API 관련 상태
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  const logout = async () => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      // Redux 상태 초기화
      dispatch(setAuth(false));
      dispatch(clearCart());
      dispatch(orderApi.util.resetApiState());

      // 로컬 데이터 정리
      storage.clearRememberMe();
      storage.clearLastRefreshTime();
      auth.removeCookie('isAuthenticated');

      // 백엔드 로그아웃 API 호출
      if (!skipApi) {
        await logoutMutation().unwrap();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    logout,
    isLoading: isProcessing || isLogoutLoading,
  };
};
