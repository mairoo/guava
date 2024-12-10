'use client';

import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
import { useMounted } from '@/hooks/useMounted';
import { store } from '@/store';
import { useRefreshMutation } from '@/store/auth/api';
import { setCredentials, setLoading } from '@/store/auth/slice';
import { cartApi, useSyncCartMutation } from '@/store/cart/api';
import { mergeCart } from '@/store/cart/slice';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 전체 애플리케이션의 인증 상태를 관리하는 provider 컴포넌트
 * 자동 로그인, 토큰 갱신, 인증 상태 확인 등을 처리
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [refresh] = useRefreshMutation(); // 토큰 갱신을 위한 API 훅
  const [getCart] = cartApi.endpoints.getCart.useLazyQuery();
  const [syncCart] = useSyncCartMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();
  const { isLoading, accessToken } = useAuth();
  const { logout } = useLogout({
    skipApi: true,
    redirect: true,
  });

  /**
   * 장바구니 동기화 처리 함수
   */
  const syncCartItems = async () => {
    try {
      const { data: serverCart = [] } = await getCart();

      // 로컬 장바구니와 서버 장바구니를 병합
      dispatch(mergeCart(serverCart));

      // 병합된 최신 상태를 서버에 동기화
      const currentCart = store.getState().cart.items;
      await syncCart(currentCart).unwrap();
    } catch (error) {
      console.error('장바구니 동기화 실패:', error);
    }
  };

  useEffect(() => {
    /**
     * 초기 인증 상태를 확인하고 필요한 처리를 수행하는 함수
     */
    const initAuth = async () => {
      try {
        // 인증 쿠키와 자동 로그인 설정 먼저 확인
        const isAuthenticatedCookie = auth.isAuthenticated();
        const rememberMe = storage.getRememberMe();

        // 둘 다 없으면 인증 체크 자체를 건너뜀 (비로그인 상태로 간주)
        if (!isAuthenticatedCookie && !rememberMe) {
          dispatch(setLoading(false));
          return;
        }

        // 둘 중 하나만 있는 경우 - 불일치 상태이므로 로그아웃 처리
        if (!isAuthenticatedCookie || !rememberMe) {
          logout();
          return;
        }

        // 현재 토큰이 유효한지 확인 - 토큰 만료 1시간 전부터 갱신 시도
        if (accessToken && !storage.isTokenExpiring(3600)) {
          // 토큰이 유효한 경우에도 장바구니 동기화 실행
          await syncCartItems();
          return;
        }

        dispatch(setLoading(true));

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
        const refreshResult = await refresh().unwrap();
        if (refreshResult) {
          dispatch(setCredentials(refreshResult));
          auth.setAuthCookie(refreshResult.data.expiresIn);
          storage.setLastRefreshTime(Date.now());

          // 토큰 갱신 후 장바구니 동기화 실행
          await syncCartItems();
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        logout(); // 오류 발생 시 로그아웃 처리
      } finally {
        dispatch(setLoading(false));
      }
    };

    // 컴포넌트가 마운트된 후에만 인증 초기화 실행
    if (isMounted) {
      initAuth();
    }
  }, [dispatch, isMounted, refresh, router, accessToken]);

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
