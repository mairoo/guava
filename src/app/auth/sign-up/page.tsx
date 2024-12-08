'use client';

import { FlexColumn, GridRow } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { privacyContent } from '@/data/privacy';
import { termsContent } from '@/data/terms';
import { cn } from '@/lib/utils';
import React from 'react';

const styles = {
  input: {
    base: 'focus-visible:ring-0 focus-visible:ring-offset-0 border border-gray-400',
  },
  inputWrapper: 'space-y-2',
  sectionTitle: 'text-lg font-semibold mb-4',
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
      <FlexColumn spacing={2} marginY={2}>
        {/* 약관 동의 섹션 */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              회원가입
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                  <Label
                    htmlFor="termsAccept"
                    className="text-sm cursor-pointer"
                  >
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
          </CardContent>
        </Card>

        {/* 계정 정보 & 개인 정보 입력 섹션 */}
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 로그인 계정 정보 */}
              <div className="space-y-6">
                <h3 className={styles.sectionTitle}>로그인 계정정보</h3>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className={styles.input.base}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className={styles.input.base}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    className={styles.input.base}
                  />
                </div>
              </div>

              {/* 회원 개인정보 */}
              <div className="space-y-6">
                <h3 className={styles.sectionTitle}>회원 개인정보</h3>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="name">성명</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="성명을 입력하세요"
                    className={styles.input.base}
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Label htmlFor="nickname">닉네임</Label>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    className={styles.input.base}
                  />
                </div>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <div className="mt-8">
              <Button type="submit" className={cn(styles.button.base)}>
                회원가입
              </Button>
            </div>
          </CardContent>
        </Card>
      </FlexColumn>
    </form>
  );
};

export default SignUpPage;
