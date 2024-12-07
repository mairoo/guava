import { InfoAlert, TableHeader } from '@/components/common';
import { Login } from '@/types/login';

export const LoginHistory = ({ logins }: { logins: Login[] }) => {
  const DesktopView = (
    <div className="hidden lg:block">
      <TableHeader columns={['접속일자', '접속시간', '접속기기', '접속위치']} />
      <div className="divide-y">
        {logins.map((login) => (
          <div
            key={login.id}
            className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-slate-50 transition-colors"
          >
            <div className="text-sm">{login.date}</div>
            <div className="text-sm">{login.time}</div>
            <div className="text-sm">{login.device}</div>
            <div className="text-sm">{login.location}</div>
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
              <span className="text-sm">{login.date}</span>
              <span className="text-sm">{login.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">{login.device}</span>
              <span className="text-sm text-slate-600">{login.location}</span>
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
