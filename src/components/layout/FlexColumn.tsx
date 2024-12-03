import { Separator } from '@/components/ui/separator';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface FlexColumnProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  padding?: number;
  spacing?: number;
  marginY?: number;
  showDivider?: boolean;
  className?: string;
}

export const FlexColumn = ({
  children,
  padding = 0,
  spacing = 0,
  marginY = 0,
  showDivider = false,
  className,
  ...rest
}: FlexColumnProps) => {
  return (
    <div
      className={classNames('flex flex-col mx-0', `my-${marginY}`, className)}
      {...rest}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div key={index}>
            <div className={`p-${padding}`}>{child}</div>
            {showDivider && index < children.length - 1 && (
              <Separator className="my-2 bg-gray-200" />
            )}
            {index < children.length - 1 && <div className={`h-${spacing}`} />}
          </div>
        ))
      ) : (
        <div className={`p-${padding}`}>{children}</div>
      )}
    </div>
  );
};
