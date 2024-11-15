'use client';

import { useLogoutMutation } from '@/store/apis/authApi';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      alert('로그아웃되었습니다');
      router.push('/'); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      alert('로그아웃 중 오류가 발생했습니다');
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
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
    </div>
  );
}
