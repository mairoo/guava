import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FlexColumnProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  paddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  paddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  marginY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
  showDivider?: boolean;
  className?: string;
}

export const FlexColumn = ({
  children,
  paddingX = 0,
  paddingY = 0,
  spacing = 0,
  marginY = 0,
  showDivider = false,
  className,
  ...rest
}: FlexColumnProps) => {
  const marginYClasses = {
    0: 'my-0',
    1: 'my-1',
    2: 'my-2',
    3: 'my-3',
    4: 'my-4',
    5: 'my-5',
    6: 'my-6',
    8: 'my-8',
    10: 'my-10',
    12: 'my-12',
    16: 'my-16',
  };

  const paddingXClasses = {
    0: 'px-0',
    1: 'px-1',
    2: 'px-2',
    3: 'px-3',
    4: 'px-4',
    5: 'px-5',
    6: 'px-6',
    8: 'px-8',
    10: 'px-10',
    12: 'px-12',
    16: 'px-16',
  };

  const paddingYClasses = {
    0: 'py-0',
    1: 'py-1',
    2: 'py-2',
    3: 'py-3',
    4: 'py-4',
    5: 'py-5',
    6: 'py-6',
    8: 'py-8',
    10: 'py-10',
    12: 'py-12',
    16: 'py-16',
  };

  const spacingClasses = {
    0: 'h-0',
    1: 'h-1',
    2: 'h-2',
    3: 'h-3',
    4: 'h-4',
    5: 'h-5',
    6: 'h-6',
    8: 'h-8',
    10: 'h-10',
    12: 'h-12',
    16: 'h-16',
  };

  return (
    <div
      className={cn('flex flex-col mx-0', marginYClasses[marginY], className)}
      {...rest}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={index}>
            <div
              className={cn(
                paddingXClasses[paddingX],
                paddingYClasses[paddingY],
              )}
            >
              {child}
            </div>
            {showDivider && index < children.length - 1 && (
              <Separator className="my-2 bg-gray-200" />
            )}
            {index < children.length - 1 && (
              <div className={spacingClasses[spacing]} />
            )}
          </div>
        ))
      ) : (
        <div
          className={cn(paddingXClasses[paddingX], paddingYClasses[paddingY])}
        >
          {children}
        </div>
      )}
    </div>
  );
};
