'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/useLogin';
import { cn } from '@/lib/utils';
import { Auth } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Key, Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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

  // 리다이렉션 경로 결정
  const redirectPath = searchParams?.get('from') || '/';

  // 1. 기본 훅 및 상태 관리
  const { login, isLoading, error } = useLogin({ redirectTo: redirectPath });

  // 2. 폼 설정
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

  // 3. 전체 처리 상태 계산
  const isProcessing = isSubmitting || isLoading;

  /**
   * 4. 로그인 폼 제출 핸들러
   * @param data 사용자가 입력한 로그인 정보 (이메일, 비밀번호, 자동로그인 여부)
   */
  const onSubmit = async (data: Auth.SignInRequest) => {
    // 이미 처리 중이면 중복 제출 방지
    if (isProcessing) return;
    await login(data);
  };

  // 5. 스타일 정의
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

  // 6. 렌더링
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
