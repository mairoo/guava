'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage, LoadingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { useLoadingTimer } from '@/hooks/useLoadingTimer';
import { useLogout } from '@/hooks/useLogout';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignOutPage = () => {
  // 1. 기본 훅 및 상태 관리
  const router = useRouter();
  const { logout, isLoading: isLogoutLoading } = useLogout({
    skipApi: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. 로딩 타이머 설정
  const isTimerActive = useLoadingTimer({
    isLoading: isLogoutLoading,
    minLoadingTime: 700,
    onTimerComplete: () => {
      router.push('/auth/sign-in');
    },
  });

  /**
   * 3. 로그아웃 처리 핸들러
   * 로그아웃 버튼 클릭 시 실행되며 로그아웃 처리를 수행
   */
  const handleLogout = async () => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    try {
      setError(null);
      setIsProcessing(true);
      await logout();
    } catch (err: any) {
      setError(err.data?.message || '로그아웃 처리 중 문제가 발생했습니다.');
      setIsProcessing(false);
    }
  };

  // 4. 에러 상태 UI
  if (error) {
    return (
      <TopSpace>
        <ErrorMessage message="로그아웃 실패" description={error} />
      </TopSpace>
    );
  }

  // 5. 로딩 상태일 때 표시할 UI
  if (isProcessing || isTimerActive) {
    return (
      <TopSpace>
        <LoadingMessage
          message="로그아웃 처리 중"
          description="잠시만 기다려주세요."
        />
      </TopSpace>
    );
  }

  // 6. 스타일 정의
  const styles = {
    button: {
      base: 'w-full h-11 transition-colors',
      primary: 'bg-teal-800 text-white hover:bg-teal-700',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      loading: 'cursor-not-allowed opacity-70',
    },
  };

  // 7. 렌더링
  return (
    <TopSpace>
      <TitledSection
        title="로그아웃"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        <div className="space-y-4">
          {/* 안내 메시지 */}
          <p className="text-center text-gray-600">
            정말 로그아웃 하시겠습니까?
          </p>

          {/* 버튼 영역 */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isProcessing || isTimerActive}
              className={cn(
                styles.button.base,
                styles.button.secondary,
                (isProcessing || isTimerActive) && styles.button.loading,
              )}
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              disabled={isProcessing || isTimerActive}
              className={cn(
                styles.button.base,
                styles.button.primary,
                (isProcessing || isTimerActive) && styles.button.loading,
              )}
            >
              {isProcessing || isTimerActive ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </div>
        </div>
      </TitledSection>
    </TopSpace>
  );
};

export default SignOutPage;
