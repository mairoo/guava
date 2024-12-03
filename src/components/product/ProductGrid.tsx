import React, { ComponentPropsWithoutRef } from 'react';

interface ProductGridProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
  my?: number;
  gap?: number;
  px?: number;
  py?: number;
}

export const ProductGrid = ({
  children,
  className = '',
  my = 0,
  gap = 1,
  px = 0,
  py = 0,
}: ProductGridProps) => {
  const marginY = my ? `my-${my}` : '';
  const gapSize = `gap-${gap}`;
  const paddingX = px ? `px-${px}` : '';
  const paddingY = py ? `py-${py}` : '';

  return (
    <div
      className={`
        grid grid-cols-2 md:grid-cols-6
        mx-0 ${marginY}
        ${gapSize}
        ${paddingX} ${paddingY}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};
