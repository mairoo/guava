import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MainProps extends ComponentPropsWithoutRef<'main'> {
  children?: ReactNode;
  className?: string;

  [key: string]: any;
}

export const Main = ({ children, ...rest }: MainProps) => (
  <main className={cn(rest.className)} {...rest}>
    {children}
  </main>
);
