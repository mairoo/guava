import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef } from 'react';

interface TitledSectionProps extends ComponentPropsWithoutRef<'div'> {
  title: string;
  children: React.ReactNode;

  fontSize?:
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl';
  titleColor?: string;
  isBold?: boolean;
  spacing?: 'space-y-0' | 'space-y-2' | 'space-y-4' | 'space-y-6' | 'space-y-8';
  verticalMargin?: string;
  className?: string;
  showBorder?: boolean;
  showSeparator?: boolean;
}

export const TitledSection = ({
  title,
  children,
  fontSize = 'text-xl',
  titleColor = 'text-amber-600',
  isBold = true,
  spacing = 'space-y-2',
  verticalMargin = 'my-3',
  className,
  showBorder = false,
  showSeparator = false,
}: TitledSectionProps) => {
  return (
    <Card
      className={cn('mx-0 rounded-lg p-0', spacing, verticalMargin, className, {
        'border-0 shadow-none': !showBorder,
        'lg:border lg:shadow-sm lg:p-4 border-0 shadow-none': showBorder,
      })}
    >
      <CardHeader className="px-0 pt-0 pb-0">
        <h2
          className={cn('text-left', fontSize, titleColor, {
            'font-bold': isBold,
          })}
        >
          {title}
        </h2>
      </CardHeader>
      {showSeparator && (
        <div className="-mx-6">
          <Separator className="bg-gray-200" />
        </div>
      )}
      <CardContent className="px-0 py-0">{children}</CardContent>
    </Card>
  );
};
