import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

interface GridRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  padding?: SpacingValue;
  gapX?: SpacingValue;
  gapY?: SpacingValue;
  marginX?: SpacingValue;
  showDivider?: boolean;
  className?: string;
}

const spacingClasses = {
  gapX: {
    0: 'gap-x-0',
    1: 'gap-x-1',
    2: 'gap-x-2',
    3: 'gap-x-3',
    4: 'gap-x-4',
    5: 'gap-x-5',
    6: 'gap-x-6',
    8: 'gap-x-8',
    10: 'gap-x-10',
    12: 'gap-x-12',
    16: 'gap-x-16',
  },
  gapY: {
    0: 'gap-y-0',
    1: 'gap-y-1',
    2: 'gap-y-2',
    3: 'gap-y-3',
    4: 'gap-y-4',
    5: 'gap-y-5',
    6: 'gap-y-6',
    8: 'gap-y-8',
    10: 'gap-y-10',
    12: 'gap-y-12',
    16: 'gap-y-16',
  },
  margin: {
    0: 'mx-0',
    1: 'mx-1',
    2: 'mx-2',
    3: 'mx-3',
    4: 'mx-4',
    5: 'mx-5',
    6: 'mx-6',
    8: 'mx-8',
    10: 'mx-10',
    12: 'mx-12',
    16: 'mx-16',
  },
  padding: {
    0: 'p-0',
    1: 'p-1',
    2: 'p-2',
    3: 'p-3',
    4: 'p-4',
    5: 'p-5',
    6: 'p-6',
    8: 'p-8',
    10: 'p-10',
    12: 'p-12',
    16: 'p-16',
  },
} as const;

export const GridRow = ({
  children,
  cols = 2,
  padding = 0,
  gapX = 4,
  gapY = 4,
  marginX = 0,
  showDivider = false,
  className,
  ...rest
}: GridRowProps) => {
  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };

  return (
    <div
      className={cn(
        'grid',
        getGridCols(cols),
        spacingClasses.gapX[gapX],
        spacingClasses.gapY[gapY],
        spacingClasses.margin[marginX],
        className,
      )}
      {...rest}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={index} className={spacingClasses.padding[padding]}>
            {child}
            {showDivider && index < children.length - 1 && (
              <Separator className="mt-4 bg-gray-200 md:hidden" />
            )}
          </div>
        ))
      ) : (
        <div className={spacingClasses.padding[padding]}>{children}</div>
      )}
    </div>
  );
};
