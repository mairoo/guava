import React from 'react';
import { Container } from '../layout/Container';

export const FooterContent = () => {
  const links = [
    { href: '/guide', text: '이용안내' },
    { href: '/faq', text: '자주 묻는 질문' },
    { href: '/contact', text: '문의하기' },
    { href: '/terms', text: '이용약관' },
    { href: '/privacy', text: '개인정보 처리방침' },
  ];

  const companyInfo = [
    '대표: 서종화',
    '주소: 서초구 서초대로29길 22 보미빌딩 303호',
    '사업자등록번호: 163-81-01158',
    '통신판매업신고: 2019-서울서초-0835',
  ];

  return (
    <>
      <div className="bg-green-50 text-gray-600">
        <Container>
          <div className="pt-4">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {links.map(({ href, text }) => (
                <a key={href} href={href} className="hover:text-gray-900">
                  {text}
                </a>
              ))}
            </div>
          </div>

          <div className="h-4" />

          <div className="pb-4">
            <p className="text-xl font-bold mb-4 text-orange-500">주식회사 핀코인</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {companyInfo.map((info) => (
                <p key={info}>{info}</p>
              ))}
              <p>
                <a
                  href="mailto:help@pincoin.co.kr"
                  className="hover:text-gray-900"
                >
                  help@pincoin.co.kr
                </a>
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-teal-900 text-gray-200">
        <Container>
          <div className="py-2 text-center">
            <span>Copyright © 2012-2024 www.pincoin.co.kr</span>
            <br className="sm:hidden" />
            <span className="sm:inline"> All Rights Reserved.</span>
          </div>
        </Container>
      </div>
    </>
  );
};
