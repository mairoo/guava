import { ReactNode } from 'react';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => (
  <header className={`w-full shadow-sm ${className}`}>
    {children}
  </header>
);
