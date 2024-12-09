'use client';

import { auth } from '@/utils/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
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
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMounted = useMounted();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // auth.isAuthenticated()를 통해 인증 상태 확인
        const authenticated = auth.isAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // 마운트 된 상태에서만 인증 체크
    if (isMounted) {
      initAuth();
    }
  }, [isMounted]);

  // 마운트 되기 전이면서 로딩 중일 때는 placeholder 반환
  if (!isMounted && isLoading) {
    return (
      <div className="min-h-screen" aria-hidden="true">
        {children}
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
