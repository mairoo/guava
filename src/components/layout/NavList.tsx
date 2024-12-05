import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface NavListProps extends ComponentPropsWithoutRef<'ul'> {
  children: ReactNode;
}

export const NavList = ({ children, className, ...props }: NavListProps) => (
  <ul className={cn('flex gap-6', className)} {...props}>
    {children}
  </ul>
);
