import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => (
  <div className={cn('container max-w-7xl mx-auto px-2', className)} {...props}>
    {children}
  </div>
);
