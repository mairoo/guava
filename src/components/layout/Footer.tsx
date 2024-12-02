import classNames from 'classnames';
import { ReactNode } from 'react';

interface FooterProps {
  children?: ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => (
  <footer className={classNames('w-full text-sm', className)}>
    {children}
  </footer>
);
