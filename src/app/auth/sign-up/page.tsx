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
import { Key, Mail, User } from 'lucide-react';
import React from 'react';

const styles = {
  input: {
    base: 'focus-visible:ring-0 focus-visible:ring-offset-0 border border-gray-400',
  },
  inputWrapper: 'space-y-2',
  button: {
    base: 'w-full h-11 bg-teal-800 text-white hover:bg-teal-700 transition-colors',
    loading: 'cursor-not-allowed opacity-70',
  },
};

const SignUpPage = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 로직 구현
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="termsAccept" />
                <Label htmlFor="termsAccept" className="text-sm cursor-pointer">
                  이용약관에 동의합니다
                </Label>
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
              <div className="flex items-center space-x-2">
                <Checkbox id="privacyAccept" />
                <Label
                  htmlFor="privacyAccept"
                  className="text-sm cursor-pointer"
                >
                  개인정보 처리방침에 동의합니다
                </Label>
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
                    className={cn(styles.input.base, 'pl-10')}
                  />
                </div>
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
                    className={cn(styles.input.base, 'pl-10')}
                  />
                </div>
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
                    className={cn(styles.input.base, 'pl-10')}
                  />
                </div>
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
                    className={cn(styles.input.base, 'pl-10')}
                  />
                </div>
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
                    className={cn(styles.input.base, 'w-full')}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="firstName">이름</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="이름을 입력하세요"
                    className={cn(styles.input.base, 'w-full')}
                  />
                </div>
              </GridRow>
            </div>
          </GridRow>

          <div className="mt-4">
            <Button type="submit" className={cn(styles.button.base)}>
              회원가입
            </Button>
          </div>
        </TitledSection>
      </FlexColumn>
    </form>
  );
};

export default SignUpPage;
