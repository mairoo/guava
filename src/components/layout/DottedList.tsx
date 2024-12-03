import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef } from 'react';

interface DotListProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  dotColor?: string;
  indent?: number;
  border?: string;
  rounded?: boolean;
  backgroundColor?: string;
}

export const DottedList = ({
  children,
  dotColor = 'bg-gray-800',
  indent = 1,
  border = '',
  rounded = false,
  backgroundColor = 'bg-white',
}: DotListProps) => {
  const items = React.Children.toArray(children);

  return (
    <ul
      className={cn(
        'space-y-2',
        backgroundColor,
        border,
        rounded && 'rounded-lg',
        border && 'p-4',
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="flex items-start list-none">
          <div style={{ width: `${indent}rem` }} className="shrink-0 relative">
            <span
              className={cn(
                'w-2 h-2 rounded-full absolute top-2 right-3',
                dotColor,
              )}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">{item}</div>
        </li>
      ))}
    </ul>
  );
};
