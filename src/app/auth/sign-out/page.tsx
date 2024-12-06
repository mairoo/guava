'use client';

import { TopSpace } from '@/components/layout';
import { useLogoutMutation } from '@/store/auth/api';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log('로그아웃되었습니다');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <TopSpace>
      <div>
        <h1>로그아웃</h1>
        <p>정말 로그아웃 하시겠습니까?</p>
        <div>
          <button onClick={() => router.back()} disabled={isLoading}>
            취소
          </button>
          <button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? '로그아웃 중...' : '로그아웃'}
          </button>
        </div>
      </div>
    </TopSpace>
  );
}
