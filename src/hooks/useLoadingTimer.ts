import { useCallback, useEffect, useRef, useState } from 'react';

interface UseLoadingTimerOptions {
  /**
   * 현재 로딩 상태
   */
  isLoading: boolean;
  /**
   * 최소 로딩 시간 (밀리초)
   */
  minLoadingTime?: number;
  /**
   * 타이머 완료 후 실행될 콜백
   */
  onTimerComplete?: () => void;
}

/**
 * 최소 로딩 시간을 보장하는 커스텀 훅
 * @param isLoading 현재 로딩 상태
 * @param minLoadingTime 최소 로딩 시간 (밀리초, 기본값: 1500)
 * @param onTimerComplete 타이머 완료 후 실행될 콜백
 * @returns 타이머가 적용된 로딩 상태
 */
export const useLoadingTimer = ({
  isLoading,
  minLoadingTime = 1000,
  onTimerComplete,
}: UseLoadingTimerOptions) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const completeTimer = useCallback(() => {
    setIsTimerActive(false);
    startTimeRef.current = null;
    cleanup();
    onTimerComplete?.();
  }, [cleanup, onTimerComplete]);

  useEffect(() => {
    if (isLoading && !startTimeRef.current) {
      // 로딩 시작
      startTimeRef.current = Date.now();
      setIsTimerActive(true);
    } else if (!isLoading && startTimeRef.current) {
      // 로딩 종료
      const elapsedTime = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      cleanup();
      timerRef.current = setTimeout(completeTimer, remainingTime);
    }

    return cleanup;
  }, [isLoading, minLoadingTime, cleanup, completeTimer]);

  return isTimerActive;
};
