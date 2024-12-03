'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Header = ({ children, ...rest }: HeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <div>mobile</div>;
  }

  return (
    <header className={cn(rest.className)} {...rest}>
      {children}
    </header>
  );
};
