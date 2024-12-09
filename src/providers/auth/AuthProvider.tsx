'use client';

import { RootState } from '@/store';
import { useRefreshMutation } from '@/store/auth/api';
import { setAuth, setCredentials, setLoading } from '@/store/auth/slice';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return { isAuthenticated, isLoading, accessToken };
};

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

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const isMounted = useMounted();
  const { isLoading, accessToken } = useAuth();

  const handleLogout = () => {
    dispatch(setAuth(false));
    storage.clearRememberMe();
    auth.removeCookie('isAuthenticated');
    storage.clearLastRefreshTime();
    router.push('/login');
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuthenticatedCookie = auth.isAuthenticated();
        if (!isAuthenticatedCookie) {
          router.push('/login');
          return;
        }

        const rememberMe = storage.getRememberMe();
        if (!rememberMe) {
          handleLogout();
          return;
        }

        // 토큰이 있고 만료되지 않았다면 리프레시하지 않음
        if (
          accessToken &&
          !storage.isTokenExpiring(3600) // expiresIn 값을 적절히 설정
        ) {
          return;
        }

        dispatch(setLoading(true));

        // 리프레시 토큰으로 재로그인 시도
        const refreshResult = await refresh().unwrap();
        if (refreshResult) {
          dispatch(setCredentials(refreshResult));
          auth.setAuthCookie(refreshResult.data.expiresIn);
          storage.setLastRefreshTime(Date.now());
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        handleLogout();
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (isMounted) {
      initAuth();
    }
  }, [dispatch, isMounted, refresh, router, accessToken]);

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
