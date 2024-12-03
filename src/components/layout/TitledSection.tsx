import { Card, CardContent, CardHeader } from '@/components/ui/card';
import classNames from 'classnames';
import React from 'react';

interface TitledSectionProps {
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
  spacing?: string;
  verticalMargin?: string;
  padding?: string;
  className?: string;
}

const TitledSection = ({
  title,
  children,
  fontSize = 'text-xl',
  titleColor = 'text-foreground',
  isBold = true,
  spacing = 'space-y-4',
  verticalMargin = 'my-4',
  padding = 'p-6',
  className,
}: TitledSectionProps) => {
  return (
    <Card className={classNames('mx-0', verticalMargin, padding, className)}>
      <CardHeader className="px-0 pt-0">
        <h2
          className={classNames('text-left', fontSize, titleColor, {
            'font-bold': isBold,
          })}
        >
          {title}
        </h2>
      </CardHeader>
      <CardContent className={classNames('px-0 pb-0', spacing)}>
        {children}
      </CardContent>
    </Card>
  );
};

export default TitledSection;
