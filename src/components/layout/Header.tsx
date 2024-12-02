'use client';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <div>mobile</div>;
  }

  return (
    <header className={`w-full shadow-sm ${className}`}>{children}</header>
  );
};
