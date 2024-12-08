'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface ResetPasswordRequest {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일을 입력해주세요')
    .required('이메일을 입력해주세요'),
});

const FindPasswordPage = () => {
  const isLoading = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async () => {
    try {
      // 성공 메시지 표시 로직 추가
    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  };

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

  return (
    <TopSpace>
      <TitledSection
        title="비밀번호 찾기"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        <div className="mb-6 text-center text-gray-600">
          <p>
            가입하신 이메일 주소로 비밀번호 초기화를 위한 이메일을 발송합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="이메일을 입력하세요"
              className={cn(
                styles.input.base,
                errors.email && styles.input.error,
              )}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              styles.button.base,
              isLoading && styles.button.loading,
            )}
          >
            {isLoading ? '처리 중...' : '비밀번호 재설정 이메일 받기'}
          </Button>

          <div className="flex justify-center pt-4 text-sm">
            <Link href="/auth/sign-in" className={styles.link}>
              로그인으로 돌아가기
            </Link>
          </div>
        </form>
      </TitledSection>
    </TopSpace>
  );
};

export default FindPasswordPage;
