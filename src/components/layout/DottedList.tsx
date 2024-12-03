import classNames from 'classnames';
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

  const containerClasses = classNames('space-y-2', backgroundColor, border, {
    'rounded-lg': rounded,
    'p-4': border,
  });

  return (
    <ul className={containerClasses}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start list-none">
          <div style={{ width: `${indent}rem` }} className="shrink-0 relative">
            <span
              className={`${dotColor} w-2 h-2 rounded-full absolute top-2 right-3`}
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">{item}</div>
        </li>
      ))}
    </ul>
  );
};
