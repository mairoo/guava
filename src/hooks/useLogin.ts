import { store } from '@/store';
import { useLoginMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { cartApi } from '@/store/cart/api';
import { useAppDispatch } from '@/store/hooks';
import { Auth } from '@/types/auth';
import { CartItem } from '@/types/cart';
import { isEqual } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseLoginOptions {
  redirectTo?: string;
}

interface UseLoginReturn {
  login: (data: Auth.SignInRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useLogin = ({
  redirectTo = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('from') || '/'
    : '/',
}: UseLoginOptions = {}): UseLoginReturn => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // API Hooks
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [trigger, { isLoading: isFetchCartLoading }] =
    cartApi.endpoints.fetchCart.useLazyQuery();
  const [syncCart, { isLoading: isSyncCartLoading }] =
    cartApi.endpoints.syncCart.useMutation();

  // Local States
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const clearError = () => setError(null);

  // 리다이렉션 경로 검증 함수 추가
  const validateRedirectPath = (path: string): string => {
    // 외부 URL로의 리다이렉션 방지
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return '/';
    }

    // 인증 페이지로의 리다이렉션 방지
    if (path.startsWith('/auth')) {
      return '/';
    }

    // 빈 경로나 잘못된 경로 처리
    if (!path || path === '/auth/sign-in') {
      return '/';
    }

    return path;
  };

  /**
   * 장바구니 데이터를 비교하여 백엔드 동기화 필요 여부를 판단
   */
  const needsSync = (
    serverCart: CartItem[],
    mergedCart: CartItem[],
  ): boolean => {
    // 수량이 다르면 동기화 필요
    if (serverCart.length !== mergedCart.length) return true;

    // 내용이 다르면 동기화 필요 (lodash.isEqual 깊은 비교 수행)
    return !isEqual(
      [...serverCart].sort((a, b) => a.productId - b.productId),
      [...mergedCart].sort((a, b) => a.productId - b.productId),
    );
  };

  const handleLogin = async (data: Auth.SignInRequest) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      clearError();

      // 1. 로그인 처리
      await loginMutation(data).unwrap();
      dispatch(setAuth(true));

      // 2. 장바구니 데이터 가져오기
      const fetchResult = await trigger().unwrap();

      // 3. Redux 스토어의 최신 상태 가져오기 (병합된 상태)
      const mergedCart = store.getState().cart.items;

      // 4. 서버 데이터와 병합된 데이터 비교 후 필요시 동기화
      if (needsSync(fetchResult, mergedCart)) {
        await syncCart(mergedCart).unwrap();
      }

      // 검증된 경로로 리다이렉션
      const safePath = validateRedirectPath(redirectTo);
      router.replace(safePath);
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
    isLoading:
      isProcessing || isLoginLoading || isFetchCartLoading || isSyncCartLoading,
    error,
    clearError,
  };
};
