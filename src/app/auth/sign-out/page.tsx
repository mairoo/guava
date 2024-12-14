'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage, LoadingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { useLoadingTimer } from '@/hooks/useLoadingTimer';
import { useLogout } from '@/hooks/useLogout';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SignOutPage = () => {
  const router = useRouter();
  const {
    logout,
    isLoading: isLogoutLoading,
    error,
  } = useLogout({
    skipApi: false,
  });

  const isLoading = useLoadingTimer({
    isLoading: isLogoutLoading,
    minLoadingTime: 700,
    onTimerComplete: () => {
      router.push('/auth/sign-in'); // 타이머가 완료된 후 리다이렉트
    },
  });

  const handleLogout = async () => {
    await logout();
    if (!error) {
      router.push('/auth/sign-in');
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
      <TopSpace>
        <LoadingMessage
          message="로그아웃 처리 중"
          description="잠시만 기다려주세요."
        />
      </TopSpace>
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

export default SignOutPage;
