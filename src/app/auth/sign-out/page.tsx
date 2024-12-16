'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { LoadingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { useLoadingTimer } from '@/hooks/useLoadingTimer';
import { useLogout } from '@/hooks/useLogout';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const SignOutPage = () => {
  const router = useRouter();
  const { logout, isLoading: isLogoutLoading } = useLogout({
    skipApi: false,
  });

  const isTimerActive = useLoadingTimer({
    isLoading: isLogoutLoading,
    minLoadingTime: 700,
    onTimerComplete: () => {
      router.push('/auth/sign-in');
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      // TODO: useLogout 에러 처리 안 하고 여기서 함
    }
  };

  if (isTimerActive) {
    return (
      <TopSpace>
        <LoadingMessage
          message="로그아웃 처리 중"
          description="잠시만 기다려주세요."
        />
      </TopSpace>
    );
  }

  const styles = {
    button: {
      base: 'w-full h-11 transition-colors',
      primary: 'bg-teal-800 text-white hover:bg-teal-700',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      loading: 'cursor-not-allowed opacity-70',
    },
  };

  return (
    <TopSpace>
      <TitledSection
        title="로그아웃"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-4">
          <p className="text-center text-gray-600">
            정말 로그아웃 하시겠습니까?
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isTimerActive}
              className={cn(
                styles.button.base,
                styles.button.secondary,
                isTimerActive && styles.button.loading,
              )}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              disabled={isTimerActive}
              className={cn(
                styles.button.base,
                styles.button.primary,
                isTimerActive && styles.button.loading,
              )}
            >
              {isTimerActive ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </div>
        </div>
      </TitledSection>
    </TopSpace>
  );
};

export default SignOutPage;
