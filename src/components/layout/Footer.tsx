import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FooterProps extends ComponentPropsWithoutRef<'footer'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Footer = ({ children, ...rest }: FooterProps) => (
  <footer className={cn(rest.className)} {...rest}>
    {children}
  </footer>
);
