import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef, ReactNode } from 'react';

interface GridRowTwoThirdsProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  padding?: number;
  gap?: number;
  marginX?: number;
  showDivider?: boolean;
  className?: string;
}

export const GridRowTwoThirds = ({
  children,
  padding = 0,
  gap = 4,
  marginX = 0,
  showDivider = false,
  className,
  ...rest
}: GridRowTwoThirdsProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-3',
        `gap-${gap}`,
        `mx-${marginX}`,
        className,
      )}
      {...rest}
    >
      <div className={cn(`p-${padding}`, 'md:col-span-2')}>
        {childrenArray[0]}
        {showDivider && <Separator className="mt-4 bg-gray-200 md:hidden" />}
      </div>
      <div className={`p-${padding}`}>{childrenArray[1]}</div>
    </div>
  );
};
