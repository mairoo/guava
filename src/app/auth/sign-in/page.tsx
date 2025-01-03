'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage, LoadingMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLoadingTimer } from '@/hooks/useLoadingTimer';
import { useLogin } from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { Auth } from '@/types/auth';
import { ApiErrorResponse, ApiFieldError } from '@/types/response';
import { yupResolver } from '@hookform/resolvers/yup';
import { Key, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // 폼 유효성 검사 스키마 정의

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
  // URL 파라미터 접근을 위한 훅
  const searchParams = useSearchParams();
  const router = useRouter();

  // 리다이렉션 경로 결정
  const redirectPath = searchParams?.get('from') || '/';

  // 1. 기본 훅 및 상태 관리
  const { login, isLoading: isLoginLoading } = useLogin();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // 2. 로딩 타이머 설정
  const isTimerActive = useLoadingTimer({
    isLoading: isLoginLoading,
    minLoadingTime: 700,
  });

  // 3. 폼 설정
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Auth.SignInRequest>({
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
  const isProcessing = isSubmitting || isTimerActive || isLoginLoading;

  /**
   * 5. 로그인 폼 제출 핸들러
   * @param data 사용자가 입력한 로그인 정보 (이메일, 비밀번호, 자동로그인 여부)
   */
  const onSubmit = async (data: Auth.SignInRequest) => {
    try {
      await login(data);
      // 검증된 경로로 리다이렉션
      const safePath = validateRedirectPath(redirectPath);
      router.replace(safePath);
    } catch (error: any) {
      if ('data' in error) {
        const errorData = error.data as ApiErrorResponse;

        // 필드별 에러 처리
        if (errorData.errors?.length) {
          const newFieldErrors: Record<string, string> = {};
          errorData.errors.forEach((err: ApiFieldError) => {
            newFieldErrors[err.field] = err.message;
          });
          setFieldErrors(newFieldErrors);
          return;
        }

        // 일반 에러 메시지 처리
        if (errorData.message) {
          setGeneralError(errorData.message);
          return;
        }
      }

      setGeneralError(
        '로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const validateRedirectPath = (path: string): string => {
    // 외부 URL 차단
    if (!path || path.startsWith('http')) {
      return '/';
    }

    // 이미 로그인한 사용자가 접근하면 안 되는 인증 페이지들
    const restrictedAuthPaths = [
      '/auth/sign-in',
      '/auth/sign-up',
      '/auth/find-password',
    ];

    if (restrictedAuthPaths.includes(path)) {
      return '/';
    }

    return path;
  };

  // 7. 스타일 정의
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

  // 8. 렌더링
  return (
    <TopSpace>
      <div className="w-full max-w-xl mx-auto space-y-4">
        {generalError && (
          <ErrorMessage message="로그인 실패" description={generalError} />
        )}
        {isProcessing && (
          <LoadingMessage
            message="로그인 처리 중"
            description="잠시만 기다려주세요."
          />
        )}
        {!isProcessing && (
          <TitledSection
            title="로그인"
            showBorder
            spacing="space-y-4"
            className="w-full max-w-xl mx-auto"
          >
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
                      (errors.email || fieldErrors['email']) &&
                        styles.input.error,
                    )}
                  />
                </div>
                {(errors.email || fieldErrors['email']) && (
                  <p className="text-sm text-red-500">
                    {fieldErrors['email'] || errors.email?.message}
                  </p>
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
                      (errors.password || fieldErrors['password']) &&
                        styles.input.error,
                    )}
                  />
                </div>
                {(errors.password || fieldErrors['password']) && (
                  <p className="text-sm text-red-500">
                    {fieldErrors['password'] || errors.password?.message}
                  </p>
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
        )}
      </div>
    </TopSpace>
  );
};

export default SignInPage;
