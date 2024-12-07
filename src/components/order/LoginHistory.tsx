import { InfoAlert, TableHeader } from '@/components/common';
import { Login } from '@/types/login';

const formatDatetime = (datetime: string) => {
  return new Date(datetime)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/\./g, '-')
    .replace(',', '');
};

const truncateUserAgent = (userAgent: string, isMobile = false) => {
  const maxLength = isMobile ? 40 : 19; // 모바일에서는 더 긴 길이 허용
  return userAgent.length > maxLength
    ? `${userAgent.substring(0, maxLength - 1)}…`
    : userAgent;
};

export const LoginHistory = ({ logins }: { logins: Login[] }) => {
  const DesktopView = (
    <div className="hidden lg:block">
      <TableHeader columns={['접속일시', 'User-Agent', 'IP 주소']} />
      <div className="divide-y">
        {logins.map((login) => (
          <div
            key={login.id}
            className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
          >
            <div className="text-sm font-mono">
              {formatDatetime(login.datetime)}
            </div>
            <div className="text-sm font-mono">
              {truncateUserAgent(login.userAgent)}
            </div>
            <div className="text-sm font-mono">{login.ip}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const MobileView = (
    <div className="lg:hidden space-y-4">
      {logins.map((login) => (
        <div
          key={login.id}
          className="p-4 border rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{formatDatetime(login.datetime)}</span>
              <span className="text-sm font-mono">{login.ip}</span>
            </div>
            <div className="text-sm font-mono text-slate-600">
              {truncateUserAgent(login.userAgent, true)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <InfoAlert>
        수상한 접속이 있는 경우 즉시 비밀번호를 변경하시고 고객센터에
        알려주세요.
      </InfoAlert>
      {DesktopView}
      {MobileView}
    </div>
  );
};
