import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  children?: ReactNode;
  className?: string;
  desktopContent?: ReactNode;

  [key: string]: any;
}

export const Header = ({
  children,
  className,
  desktopContent,
  ...rest
}: HeaderProps) => {
  return (
    <header className={cn('w-full', className)} {...rest}>
      <div className="block">{children}</div>
      <div className="hidden md:block">{desktopContent}</div>
    </header>
  );
};
