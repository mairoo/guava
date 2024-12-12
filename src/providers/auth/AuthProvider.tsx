'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
import { useMounted } from '@/hooks/useMounted';
import { useRefreshMutation } from '@/store/auth/api';
import { setCredentials, setLoading } from '@/store/auth/slice';
import { cartApi } from '@/store/cart/api';
import { hydrateCart } from '@/store/cart/slice';
import { useAppDispatch } from '@/store/hooks';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import React, { useEffect } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 전체 애플리케이션의 인증 상태를 관리하는 provider 컴포넌트
 * - 자동 로그인 처리
 * - 토큰 갱신
 * - 백엔드 장바구니와 로컬 장바구니 병합
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  // RTK Query Hooks
  const [refresh] = useRefreshMutation();
  const [trigger] = cartApi.endpoints.fetchCart.useLazyQuery();

  // Custom Hooks
  const { isLoading, accessToken } = useAuth();
  const { logout } = useLogout({
    skipApi: true,
    redirect: true,
  });
  const isMounted = useMounted();

  // Redux
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * 초기 인증 상태를 확인하고 필요한 처리를 수행
     * - 인증 쿠키와 자동 로그인 설정 확인
     * - 토큰 유효성 검사
     * - 필요시 토큰 갱신
     * - 백엔드 장바구니 병합
     */
    const initAuth = async () => {
      try {
        // 인증 상태 확인
        const isAuthenticatedCookie = auth.isAuthenticated();
        const rememberMe = storage.getRememberMe();

        // 비로그인 상태 처리
        if (!isAuthenticatedCookie && !rememberMe) {
          dispatch(setLoading(false));
          dispatch(hydrateCart()); // 로컬 장바구니만 복원
          return;
        }

        // 인증 상태 불일치 처리
        if (!isAuthenticatedCookie || !rememberMe) {
          await logout();
          return;
        }

        // 유효한 토큰이 있는 경우
        if (accessToken && !storage.isTokenExpiring(3600)) {
          dispatch(setLoading(false));
          // extraReducers에서 장바구니 병합 처리
          await trigger();
          return;
        }

        // 토큰 갱신 처리
        dispatch(setLoading(true));
        const refreshResult = await refresh().unwrap();

        if (refreshResult) {
          dispatch(setCredentials(refreshResult));
          auth.setAuthCookie(refreshResult.data.expiresIn);
          storage.setLastRefreshTime(Date.now());
          // 토큰 갱신 후 장바구니 병합
          await trigger();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        await logout();
      } finally {
        dispatch(setLoading(false));
      }
    };

    // 컴포넌트가 마운트된 후에만 초기화 실행
    if (isMounted) {
      initAuth();
    }
  }, [dispatch, isMounted, refresh, accessToken, trigger]);

  // 로딩 중이거나 마운트되지 않은 경우 로딩 상태 표시
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen" aria-hidden="true">
        {children}
      </div>
    );
  }

  return children;
};

export default AuthProvider;
