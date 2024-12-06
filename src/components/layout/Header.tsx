import { DesktopHeaderContent } from '@/components/DesktopHeaderContent';
import { MobileHeaderContent } from '@/components/MobileHeaderContent';

import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

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
      <MobileHeaderContent />
      <DesktopHeaderContent />
    </header>
  );
};
