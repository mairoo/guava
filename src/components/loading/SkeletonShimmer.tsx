import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

interface SkeletonShimmerProps extends ComponentPropsWithoutRef<'div'> {
  height?: number;
  count?: number;
  className?: string;
}

export const SkeletonShimmer = ({
  height = 20,
  count = 1,
  className,
  ...rest
}: SkeletonShimmerProps) => {
  return (
    <div className={cn('w-full space-y-4', className)} {...rest}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
            'animate-shimmer bg-[length:200%_100%]',
            'rounded-md',
          )}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};
