import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface TopSpaceProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  center?: boolean;
  className?: string;
}

export const TopSpace = ({
  children,
  size = 'sm',
  center = true,
  className,
  ...rest
}: TopSpaceProps) => {
  const marginClasses = {
    sm: 'mt-2 md:mt-20',
    md: 'mt-4 md:mt-24',
    lg: 'mt-8 md:mt-32',
    xl: 'mt-12 md:mt-40',
    '2xl': 'mt-16 md:mt-48',
  };

  return (
    <div
      className={cn(
        'w-full',
        marginClasses[size],
        center && 'flex justify-center',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
