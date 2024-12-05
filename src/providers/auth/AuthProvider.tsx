'use client';

import React, { useEffect, useState } from 'react';

// 마운트 상태를 체크하는 간단한 훅
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
        // 예: 토큰 검증, 사용자 정보 가져오기 등
        // await checkAuthStatus()
      } catch (error) {
        console.error('Auth initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      initAuth();
    }
  }, [isMounted]);

  // 마운트되기 전에는 children을 바로 렌더링
  if (!isMounted) {
    return <>{children}</>;
  }

  // 마운트된 후 로딩 중일 때만 로딩 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
