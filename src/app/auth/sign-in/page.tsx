'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { store } from '@/store';
import { useLoginMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { cartApi, useSyncCartMutation } from '@/store/cart/api';
import { mergeCart } from '@/store/cart/slice';
import { Auth } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Key, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

// 폼 유효성 검사 스키마 정의
const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요')
    .required('이메일을 입력해주세요'),
  password: yup
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .required('비밀번호를 입력해주세요'),
  rememberMe: yup.boolean().required(),
});

const SignInPage = () => {
  // 1. 기본 훅 및 상태 관리
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  // 2. API 관련 훅
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [getCart] = cartApi.endpoints.getCart.useLazyQuery();
  const [syncCart, { isLoading: isSyncCartLoading }] = useSyncCartMutation();

  // 3. 폼 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Auth.LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  // 4. 전체 처리 상태 계산
  const isProcessing = isSubmitting || isLoginLoading || isSyncCartLoading;

  // 5. 핸들러 함수들
  /**
   * 장바구니 동기화 함수
   * - 서버의 장바구니 데이터를 가져와 로컬 장바구니와 병합
   * - 병합된 데이터를 다시 서버에 동기화
   */
  const syncCartData = async () => {
    try {
      // 서버의 장바구니 데이터 조회
      const { data: serverCart = [] } = await getCart();

      // 서버 장바구니와 로컬 장바구니 병합
      dispatch(mergeCart(serverCart));

      // 병합된 최신 상태를 서버에 동기화
      const currentCart = store.getState().cart.items;
      await syncCart(currentCart).unwrap();
    } catch (error) {
      console.error('장바구니 동기화 실패:', error);
      // 필요시 사용자에게 장바구니 동기화 실패 알림 추가 가능
    }
  };

  /**
   * 로그인 폼 제출 핸들러
   * @param data 사용자가 입력한 로그인 정보 (이메일, 비밀번호, 자동로그인 여부)
   */
  const onSubmit = async (data: Auth.LoginRequest) => {
    // 이미 처리 중이면 중복 제출 방지
    if (isProcessing) return;

    try {
      // 이전 에러 메시지 초기화
      setError(null);

      // 로그인 시도
      await login(data).unwrap();
      dispatch(setAuth(true));

      // 장바구니 동기화
      await syncCartData();

      // 메인 페이지로 이동
      router.push('/');
    } catch (error: any) {
      // 로그인 실패 시 에러 메시지 설정
      setError(
        error.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      );
    }
  };

  // 6. 스타일 정의
  const styles = {
    input: {
      base: 'focus-visible:ring-0 focus-visible:ring-offset-0 border border-gray-400',
      error: 'border-red-500',
    },
    button: {
      base: 'w-full h-11 bg-teal-800 text-white hover:bg-teal-700 transition-colors',
      loading: 'cursor-not-allowed opacity-70',
    },
    link: 'text-blue-600 hover:text-blue-800 transition-colors duration-200',
  };

  // 7. 렌더링
  return (
    <TopSpace>
      <TitledSection
        title="로그인"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        {/* 에러 메시지 */}
        {error && (
          <ErrorMessage
            message={error}
            description="입력하신 정보를 다시 확인하시거나, 비밀번호 찾기를 이용해주세요."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 이메일 입력 필드 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="이메일을 입력하세요"
                className={cn(
                  styles.input.base,
                  'pl-10',
                  errors.email && styles.input.error,
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Key className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="비밀번호를 입력하세요"
                className={cn(
                  styles.input.base,
                  'pl-10',
                  errors.password && styles.input.error,
                )}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 자동 로그인 체크박스 */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={watch('rememberMe')}
              onCheckedChange={(checked) => {
                setValue('rememberMe', checked as boolean);
              }}
            />
            <Label htmlFor="rememberMe" className="cursor-pointer">
              로그인 상태 유지
            </Label>
          </div>

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            disabled={isProcessing}
            className={cn(
              styles.button.base,
              isProcessing && styles.button.loading,
            )}
          >
            {isProcessing ? '로그인 중...' : '로그인'}
          </Button>

          {/* 링크 영역 */}
          <div className="flex justify-between pt-4 text-sm">
            <Link href="/auth/find-password" className={styles.link}>
              비밀번호 찾기
            </Link>
            <Link href="/auth/sign-up" className={styles.link}>
              회원가입
            </Link>
          </div>
        </form>
      </TitledSection>
    </TopSpace>
  );
};

export default SignInPage;
