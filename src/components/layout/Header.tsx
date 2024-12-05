import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Header = ({ children, ...rest }: HeaderProps) => {
  return (
    <>
      {/* 모바일 헤더 */}
      <header className={cn('md:hidden', rest.className)}>
        <div>mobile</div>
      </header>

      {/* 데스크톱 헤더 */}
      <header className={cn('hidden md:block', rest.className)} {...rest}>
        {children}
      </header>
    </>
  );
};
