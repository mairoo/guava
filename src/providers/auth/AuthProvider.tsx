'use client';

import React, { useEffect, useState } from 'react';

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
  const isMounted = useMounted();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 인증 상태 초기화 로직
      } catch (error) {
        console.error('Auth initialization failed:', error);
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

  return <>{children}</>;
};

export default AuthProvider;