'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Header = ({ children, ...rest }: HeaderProps) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 초기 렌더링 시에는 아무것도 보여주지 않음
  if (!isClient) {
    return null;
  }

  if (!isDesktop) {
    return <div>mobile</div>;
  }

  return (
    <header className={cn(rest.className)} {...rest}>
      {children}
    </header>
  );
};
