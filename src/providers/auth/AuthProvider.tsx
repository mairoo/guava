'use client';

import React, { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 인증 상태 초기화 로직
        // 예: 토큰 검증, 사용자 정보 가져오기 등
        // await checkAuthStatus()
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initAuth();
  }, []);

  if (!isInitialized) {
    return <div>초기화 중</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
