'use client';

import { FlexColumn, GridRow, TitledSection } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { privacyContent } from '@/data/privacy';
import { termsContent } from '@/data/terms';
import { cn } from '@/lib/utils';
import type { Auth } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Key, Mail, User } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일을 입력해주세요')
    .email('올바른 이메일 형식이 아닙니다'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다',
    ),
  passwordConfirm: yup
    .string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  nickname: yup
    .string()
    .required('닉네임을 입력해주세요')
    .min(2, '닉네임은 최소 2자 이상이어야 합니다')
    .max(20, '닉네임은 최대 20자까지 가능합니다')
    .matches(
      /^[a-zA-Z0-9가-힣]+$/,
      '닉네임은 영문, 숫자, 한글만 사용 가능합니다',
    ),
  lastName: yup
    .string()
    .required('성을 입력해주세요')
    .matches(/^[가-힣]{1,10}$/, '올바른 성을 입력해주세요'),
  firstName: yup
    .string()
    .required('이름을 입력해주세요')
    .matches(/^[가-힣]{1,20}$/, '올바른 이름을 입력해주세요'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], '이용약관에 동의해주세요')
    .required('이용약관에 동의해주세요'),
  privacyAccepted: yup
    .boolean()
    .oneOf([true], '개인정보 처리방침에 동의해주세요')
    .required('개인정보 처리방침에 동의해주세요'),
});

type FormInputs = Auth.SignUpRequest & {
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

const styles = {
  input: {
    base: 'focus-visible:ring-0 focus-visible:ring-offset-0 border border-gray-400',
    error: 'border-red-500',
  },
  inputWrapper: 'space-y-2',
  button: {
    base: 'w-full h-11 bg-teal-800 text-white hover:bg-teal-700 transition-colors',
    loading: 'cursor-not-allowed opacity-70',
  },
  errorMessage: 'text-sm text-red-500 mt-1',
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: yupResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      // API 요청시에는 약관 동의 필드를 제외하고 전송
      const { termsAccepted, privacyAccepted, ...signUpData } = data;
      // TODO: API 요청 구현
      console.log('Sign up data:', signUpData);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FlexColumn spacing={2}>
        {/* 약관 동의 섹션 */}
        <TitledSection
          title="약관 동의"
          showBorder
          spacing="space-y-4"
          className="w-full"
        >
          <GridRow gapX={8} gapY={2}>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms">이용약관</Label>
                <Textarea
                  id="terms"
                  readOnly
                  value={termsContent}
                  className="h-48 resize-none bg-gray-50"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="termsAccepted"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="termsAccept"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="termsAccept"
                    className="text-sm cursor-pointer"
                  >
                    이용약관에 동의합니다
                  </Label>
                </div>
                {errors.termsAccepted && (
                  <p className={styles.errorMessage}>
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacy">개인정보 처리방침</Label>
                <Textarea
                  id="privacy"
                  readOnly
                  value={privacyContent}
                  className="h-48 resize-none bg-gray-50"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="privacyAccepted"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="privacyAccept"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label
                    htmlFor="privacyAccept"
                    className="text-sm cursor-pointer"
                  >
                    개인정보 처리방침에 동의합니다
                  </Label>
                </div>
                {errors.privacyAccepted && (
                  <p className={styles.errorMessage}>
                    {errors.privacyAccepted.message}
                  </p>
                )}
              </div>
            </div>
          </GridRow>
        </TitledSection>

        {/* 계정 정보 & 개인 정보 입력 섹션 */}
        <TitledSection
          title="계정 정보"
          showBorder
          spacing="space-y-4"
          className="w-full"
        >
          <GridRow gapX={8} gapY={4}>
            {/* 로그인 계정 정보 */}
            <div className="space-y-6">
              <div className={styles.inputWrapper}>
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className={cn(
                      styles.input.base,
                      'pl-10',
                      errors.email && styles.input.error,
                    )}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className={styles.errorMessage}>{errors.email.message}</p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Key className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className={cn(
                      styles.input.base,
                      'pl-10',
                      errors.password && styles.input.error,
                    )}
                    {...register('password')}
                  />
                </div>
                {errors.password && (
                  <p className={styles.errorMessage}>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Key className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    className={cn(
                      styles.input.base,
                      'pl-10',
                      errors.passwordConfirm && styles.input.error,
                    )}
                    {...register('passwordConfirm')}
                  />
                </div>
                {errors.passwordConfirm && (
                  <p className={styles.errorMessage}>
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <Label htmlFor="nickname">닉네임</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    className={cn(
                      styles.input.base,
                      'pl-10',
                      errors.nickname && styles.input.error,
                    )}
                    {...register('nickname')}
                  />
                </div>
                {errors.nickname && (
                  <p className={styles.errorMessage}>
                    {errors.nickname.message}
                  </p>
                )}
              </div>
            </div>

            {/* 회원 개인정보 */}
            <div className="space-y-6">
              <GridRow gapX={4} gapY={2}>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="lastName">성</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="성을 입력하세요"
                    className={cn(
                      styles.input.base,
                      'w-full',
                      errors.lastName && styles.input.error,
                    )}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className={styles.errorMessage}>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="firstName">이름</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="이름을 입력하세요"
                    className={cn(
                      styles.input.base,
                      'w-full',
                      errors.firstName && styles.input.error,
                    )}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className={styles.errorMessage}>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </GridRow>
            </div>
          </GridRow>

          <div className="mt-4">
            <Button
              type="submit"
              className={cn(
                styles.button.base,
                isSubmitting && styles.button.loading,
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? '처리중...' : '회원가입'}
            </Button>
          </div>
        </TitledSection>
      </FlexColumn>
    </form>
  );
};

export default SignUpPage;
