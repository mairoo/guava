'use client';

import { useRefreshMutation } from '@/store/apis/authApi';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
  const [refresh, { isLoading }] = useRefreshMutation();

  const handleRefresh = async () => {
    try {
      await refresh().unwrap();
      alert('리프레시 완료');
      router.push('/'); //
    } catch (error) {
      alert('리프레시 중 오류가 발생했습니다');
      console.error('Refresh error:', error);
    }
  };

  return (
    <div>
      dashboard
      <Link href="/auth/sign-out">로그아웃</Link>
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? '리프레시 중...' : '리프레시'}
      </button>
    </div>
  );
};

export default DashboardPage;
