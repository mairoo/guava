import { useCartSync } from '@/hooks/useCartSync';
import { useLoginMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { useAppDispatch } from '@/store/hooks';
import { Auth } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseLoginOptions {
  /**
   * 로그인 후 리다이렉트할 경로
   * @default '/'
   */
  redirectTo?: string;
}

interface UseLoginReturn {
  /**
   * 로그인 처리 함수
   */
  login: (data: Auth.LoginRequest) => Promise<void>;

  /**
   * 로그인 처리 중 여부
   */
  isLoading: boolean;

  /**
   * 로그인 중 발생한 에러 메시지
   */
  error: string | null;

  /**
   * 에러 상태 초기화
   */
  clearError: () => void;
}

export const useLogin = ({
  redirectTo = '/',
}: UseLoginOptions = {}): UseLoginReturn => {
  // 1. 기본 훅 초기화
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 2. API 관련 상태
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { syncCart, isLoading: isSyncCartLoading } = useCartSync();

  const clearError = () => setError(null);

  const handleLogin = async (data: Auth.LoginRequest) => {
    // 이미 처리 중이면 중복 실행 방지
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      clearError();

      // 로그인 처리
      await loginMutation(data).unwrap();
      dispatch(setAuth(true));

      // 장바구니 동기화
      await syncCart();

      // 리다이렉트
      router.push(redirectTo);
    } catch (error: any) {
      setError(
        error.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    login: handleLogin,
    isLoading: isProcessing || isLoginLoading || isSyncCartLoading,
    error,
    clearError,
  };
};
