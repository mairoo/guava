import { store } from '@/store';
import { useLoginMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { cartApi } from '@/store/cart/api';
import { useAppDispatch } from '@/store/hooks';
import { Auth } from '@/types/auth';
import { CartItem } from '@/types/cart';
import { isEqual } from 'lodash';
import { useState } from 'react';

interface UseLoginReturn {
  login: (data: Auth.SignInRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useLogin = (): UseLoginReturn => {
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
    } catch (error: any) {
      setError(
        error.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      );
      setIsProcessing(false); // 에러 시에만 isProcessing = false
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
