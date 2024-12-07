'use client';

import { TitledSection, TopSpace } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLogoutMutation } from '@/store/auth/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({});

const LogoutPage = () => {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();

  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      await logout().unwrap();
      console.log('로그아웃되었습니다');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const styles = {
    button: {
      base: 'w-full h-11 transition-colors',
      primary: 'bg-teal-800 text-white hover:bg-teal-700',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      loading: 'cursor-not-allowed opacity-70',
    },
  };

  return (
    <TopSpace>
      <TitledSection
        title="로그아웃"
        showBorder
        spacing="space-y-4"
        className="w-full max-w-xl mx-auto"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-center text-gray-600">
            정말 로그아웃 하시겠습니까?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className={cn(
                styles.button.base,
                styles.button.secondary,
                isLoading && styles.button.loading,
              )}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                styles.button.base,
                styles.button.primary,
                isLoading && styles.button.loading,
              )}
            >
              {isLoading ? '로그아웃 중...' : '로그아웃'}
            </Button>
          </div>
        </form>
      </TitledSection>
    </TopSpace>
  );
};

export default LogoutPage;
