'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import classNames from 'classnames';
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
    <header className={classNames(rest.className)} {...rest}>
      {children}
    </header>
  );
};
