import {useEffect, useState} from 'react';

/**
 * 컴포넌트가 마운트되었는지 확인하는 커스텀 훅
 * Next.js의 SSR과 관련된 hydration 이슈를 방지하기 위해 사용
 * @returns {boolean} 컴포넌트가 마운트되었는지 여부
 */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
