import { useEffect, useState } from 'react';

// useMediaQuery 사용을 최소화
// - hydration 불일치 가능성
// - layout shift 발생 가능성
// - 추가 js 의존성
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return { matches, mounted };
}
