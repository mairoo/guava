import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

interface SpinnerProps extends ComponentPropsWithoutRef<'div'> {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner = ({ size = 'md', className, ...rest }: SpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      className={cn(
        'w-full h-full flex items-center justify-center',
        className,
      )}
      {...rest}
    >
      <Loader2 className={cn('animate-spin text-gray-500', sizes[size])} />
    </div>
  );
};
