import { Card, CardContent } from '@/components/ui/card';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

interface MessageTitleDate {
  category?: string;
  title: string;
  date: string;
  url: string;
}

interface MessageTitleDateListProps {
  messages: MessageTitleDate[];
  spacing?: 1 | 2 | 3 | 4 | 5;
  cardBorder?: boolean;
}

export const MessageTitleDateList: React.FC<MessageTitleDateListProps> = ({
  messages,
  spacing = 1,
  cardBorder = false,
}) => {
  return (
    <Card
      className={classNames('w-full max-w-2xl shadow-none', {
        'border-0': !cardBorder,
      })}
    >
      <CardContent className="p-0">
        <div
          className={classNames('flex flex-col', {
            'gap-1': spacing === 1,
            'gap-2': spacing === 2,
            'gap-3': spacing === 3,
            'gap-4': spacing === 4,
            'gap-5': spacing === 5,
          })}
        >
          {messages.map((notice, index) => (
            <Link
              key={index}
              href={notice.url}
              className="flex justify-between items-center hover:bg-gray-50 px-2 py-1 rounded-sm cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                {notice.category && (
                  <span className="font-bold">[{notice.category}]</span>
                )}
                <span>{notice.title}</span>
              </div>
              <span className="text-gray-600 text-sm">{notice.date}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
