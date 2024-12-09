'use client';

import { RootState } from '@/store';
import { setAuth, setLoading } from '@/store/auth/slice';
import { auth } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Custom hook for auth state
export const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.accessToken !== null,
  );
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  return { isAuthenticated, isLoading };
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
  const dispatch = useDispatch();
  const isMounted = useMounted();
  const { isLoading } = useAuth();

  useEffect(() => {
    const initAuth = async () => {
      try {
        dispatch(setLoading(true));
        const authenticated = auth.isAuthenticated();
        dispatch(setAuth(authenticated));
      } catch (error) {
        console.error('Auth initialization failed:', error);
        dispatch(setAuth(false));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (isMounted) {
      initAuth();
    }
  }, [dispatch, isMounted]);

  if (!isMounted && isLoading) {
    return (
      <div className="min-h-screen" aria-hidden="true">
        {children}
      </div>
    );
  }

  return children;
};

export default AuthProvider;
