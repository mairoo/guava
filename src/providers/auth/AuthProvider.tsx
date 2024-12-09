'use client';

import {RootState} from '@/store';
import {useRefreshMutation} from '@/store/auth/api';
import {setAuth, setCredentials, setLoading} from '@/store/auth/slice';
import {storage} from '@/utils';
import {auth} from '@/utils/auth';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

/**
 * 사용자의 인증 상태를 관리하는 커스텀 훅
 * @returns {object} 인증 관련 상태값들을 포함한 객체
 * - isAuthenticated: 사용자가 로그인되어 있는지 여부
 * - isLoading: 인증 처리 중인지 여부
 * - accessToken: 현재 저장된 액세스 토큰
 */
export const useAuth = () => {
  // Redux store에서 인증 관련 상태들을 가져옴
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return { isAuthenticated, isLoading, accessToken };
};

/**
 * 컴포넌트가 마운트되었는지 확인하는 커스텀 훅
 * Next.js의 SSR과 관련된 hydration 이슈를 방지하기 위해 사용
 * @returns {boolean} 컴포넌트가 마운트되었는지 여부
 */
const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * 전체 애플리케이션의 인증 상태를 관리하는 provider 컴포넌트
 * 자동 로그인, 토큰 갱신, 인증 상태 확인 등을 처리
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [refresh] = useRefreshMutation(); // 토큰 갱신을 위한 API 훅
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();
  const { isLoading, accessToken } = useAuth();

  /**
   * 로그아웃 처리를 위한 함수
   * - 인증 상태 초기화
   * - 저장된 인증 정보 삭제
   * - 로그인 페이지로 리다이렉트
   */
  const handleLogout = () => {
    dispatch(setAuth(false));
    storage.clearRememberMe();
    auth.removeCookie('isAuthenticated');
    storage.clearLastRefreshTime();
    router.push('/login');
  };

  useEffect(() => {
    /**
     * 초기 인증 상태를 확인하고 필요한 처리를 수행하는 함수
     */
    const initAuth = async () => {
      try {
        // 쿠키에서 인증 상태 확인
        const isAuthenticatedCookie = auth.isAuthenticated();
        if (!isAuthenticatedCookie) {
          router.push('/login'); // 인증되지 않은 경우 로그인 페이지로 이동
          return;
        }

        // "자동 로그인" 설정 확인
        const rememberMe = storage.getRememberMe();
        if (!rememberMe) {
          handleLogout(); // 자동 로그인이 비활성화된 경우 로그아웃 처리
          return;
        }

        // 현재 토큰이 유효한지 확인
        if (
          accessToken &&
          !storage.isTokenExpiring(3600) // 토큰 만료 1시간 전부터 갱신 시도
        ) {
          return;
        }

        dispatch(setLoading(true));

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
        const refreshResult = await refresh().unwrap();
        if (refreshResult) {
          dispatch(setCredentials(refreshResult));
          auth.setAuthCookie(refreshResult.data.expiresIn);
          storage.setLastRefreshTime(Date.now());
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        handleLogout(); // 오류 발생 시 로그아웃 처리
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
