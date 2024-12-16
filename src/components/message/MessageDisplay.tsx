import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info, Loader2 } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

type MessageType = 'error' | 'warning' | 'info' | 'loading';

interface MessageDisplayProps extends ComponentPropsWithoutRef<'div'> {
  type: MessageType;
  message: string;
  description?: string;
  className?: string;
}

const icons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
};

const colors = {
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
  loading: 'text-gray-500',
};

const backgrounds = {
  error: 'bg-red-50',
  warning: 'bg-amber-50',
  info: 'bg-blue-50',
  loading: 'bg-gray-50',
};

const borders = {
  error: 'border-red-200',
  warning: 'border-amber-200',
  info: 'border-blue-200',
  loading: 'border-gray-200',
};

export const MessageDisplay = ({
  type,
  message,
  description,
  className,
  ...rest
}: MessageDisplayProps) => {
  const Icon = icons[type];

  return (
    <div className={cn('w-full flex justify-center mt-2', className)} {...rest}>
      <Card
        className={cn('max-w-xl w-full p-6', backgrounds[type], borders[type])}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <Icon
            className={cn('w-12 h-12', colors[type], {
              'animate-spin': type === 'loading',
            })}
          />
          <div className="space-y-2">
            <h3 className={cn('text-lg font-semibold', colors[type])}>
              {message}
            </h3>
            {description && (
              <p className="text-gray-600 text-sm">{description}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// 편의를 위한 래퍼 컴포넌트들
export const ErrorMessage = (props: Omit<MessageDisplayProps, 'type'>) => (
  <MessageDisplay type="error" {...props} />
);

export const WarningMessage = (props: Omit<MessageDisplayProps, 'type'>) => (
  <MessageDisplay type="warning" {...props} />
);

export const InfoMessage = (props: Omit<MessageDisplayProps, 'type'>) => (
  <MessageDisplay type="info" {...props} />
);

export const LoadingMessage = (props: Omit<MessageDisplayProps, 'type'>) => (
  <MessageDisplay type="loading" {...props} />
);
