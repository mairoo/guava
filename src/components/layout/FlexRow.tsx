import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FlexRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  padding?: number;
  spacing?: number;
  marginX?: number;
  showDivider?: boolean;
  className?: string;
}

export const FlexRow = ({
  children,
  padding = 0,
  spacing = 0,
  marginX = 0,
  showDivider = false,
  className,
  ...rest
}: FlexRowProps) => {
  return (
    <div
      className={cn('flex flex-row my-0', `mx-${marginX}`, className)}
      {...rest}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={index}>
            <div className={`p-${padding}`}>{child}</div>
            {showDivider && index < children.length - 1 && (
              <Separator orientation="vertical" className="mx-2 bg-gray-200" />
            )}
            {index < children.length - 1 && <div className={`w-${spacing}`} />}
          </div>
        ))
      ) : (
        <div className={`p-${padding}`}>{children}</div>
      )}
    </div>
  );
};
