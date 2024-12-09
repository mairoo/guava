'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage, LoadingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLogoutMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { storage } from '@/utils';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setAuth(false));

      // 로컬 스토리지 클리어
      storage.clearRememberMe();
      storage.clearLastRefreshTime();

      // 인증 쿠키 제거
      auth.removeCookie('isAuthenticated');

      // 홈으로 리다이렉트
      router.push('/auth/sign-in');
    } catch (error: any) {
      const errorMessage =
        error.data?.message || '로그아웃 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Logout error:', error);
    } finally {
      auth.removeCookie('isAuthenticated');
    }
  };

  const styles = {
    button: {
      base: 'w-full h-11 transition-colors',
      primary: 'bg-teal-800 text-white hover:bg-teal-700',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      loading: 'cursor-not-allowed opacity-70',
    },
  };

  if (isLoading) {
    return (
      <LoadingMessage
        message="로그아웃 처리 중"
        description="잠시만 기다려주세요..."
      />
    );
  }

  return (
    <TopSpace>
      <TitledSection
        title="로그아웃"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-4">
          {error ? (
            <ErrorMessage
              message={error}
              description="잠시 후 다시 시도해주세요. 문제가 지속되면 고객센터로 문의해주세요."
            />
          ) : (
            <p className="text-center text-gray-600">
              정말 로그아웃 하시겠습니까?
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className={cn(
                styles.button.base,
                styles.button.secondary,
                isLoading && styles.button.loading,
              )}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              disabled={isLoading}
              className={cn(
                styles.button.base,
                styles.button.primary,
                isLoading && styles.button.loading,
              )}
            >
              {isLoading ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </div>
        </div>
      </TitledSection>
    </TopSpace>
  );
};

export default LogoutPage;
