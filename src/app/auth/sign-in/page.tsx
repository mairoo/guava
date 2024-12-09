'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { ErrorMessage } from '@/components/message';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLoginMutation } from '@/store/auth/api';
import { setAuth } from '@/store/auth/slice';
import { Auth } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Key, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

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
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth.LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: Auth.LoginRequest) => {
    try {
      await login(data).unwrap();
      dispatch(setAuth(true));
      router.push('/');
      console.log('logged in');
    } catch (error: any) {
      setError(
        error.data?.message ||
          '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
      );
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
        title="로그인"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        {error && (
          <ErrorMessage
            message={error}
            description="입력하신 정보를 다시 확인하시거나, 비밀번호 찾기를 이용해주세요."
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" {...register('rememberMe')} />
            <Label htmlFor="rememberMe" className="cursor-pointer">
              로그인 상태 유지
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              styles.button.base,
              isLoading && styles.button.loading,
            )}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>

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
