import { InfoAlert, TableHeader } from '@/components/common';

import { Inquiry } from '@/types/inquiry';
import { formatDatetime } from '@/utils';

export const InquiryList = ({ inquiries }: { inquiries: Inquiry[] }) => {
  const DesktopView = (
    <div className="hidden lg:block">
      <TableHeader columns={['답변상태', '문의유형', '문의일시']} />
      <div className="divide-y">
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className="hover:bg-slate-50 transition-colors">
            <div className="grid grid-cols-3 gap-4 p-4 pb-2 items-center">
              <div className="text-sm">
                <span
                  className={
                    inquiry.status === '답변완료'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }
                >
                  {inquiry.status}
                </span>
              </div>
              <div className="text-sm">{inquiry.category}</div>
              <div className="text-sm">{formatDatetime(inquiry.datetime)}</div>
            </div>
            <div className="px-4 pb-4">
              <div className="text-sm font-medium">{inquiry.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileView = (
    <div className="lg:hidden space-y-2">
      {inquiries.map((inquiry) => (
        <div
          key={inquiry.id}
          className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${
                    inquiry.status === '답변완료'
                      ? 'text-green-600'
                      : 'text-rose-600'
                  }`}
                >
                  {inquiry.status}
                </span>
                <span className="text-sm text-slate-600">
                  {inquiry.category}
                </span>
              </div>
              <span className="text-sm text-slate-600">
                {formatDatetime(inquiry.datetime)}
              </span>
            </div>
            <div className="text-sm font-medium">{inquiry.title}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-2">
      <InfoAlert>고객센터 운영 시간: 매일 오전 10시~밤 11시</InfoAlert>
      {DesktopView}
      {MobileView}
    </div>
  );
};
