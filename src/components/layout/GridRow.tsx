import { Separator } from '@/components/ui/separator';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface GridRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  padding?: number;
  gap?: number;
  marginX?: number;
  showDivider?: boolean;
  className?: string;
}

export const GridRow = ({
  children,
  cols = 2,
  padding = 0,
  gap = 4,
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
      className={classNames(
        'grid',
        getGridCols(cols),
        `gap-${gap}`,
        `mx-${marginX}`,
        className,
      )}
      {...rest}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={index} className={`p-${padding}`}>
            {child}
            {showDivider && index < children.length - 1 && (
              <Separator className="mt-4 bg-gray-200 md:hidden" />
            )}
          </div>
        ))
      ) : (
        <div className={`p-${padding}`}>{children}</div>
      )}
    </div>
  );
};
