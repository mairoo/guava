import React from 'react';

export const FooterContent = () => {
  return (
    <>
      <div className="bg-green-50 text-gray-600">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Top Section: Navigation Links */}
          <div className="pt-4">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <a href="/guide" className="hover:text-gray-900">
                이용안내
              </a>
              <a href="/faq" className="hover:text-gray-900">
                자주 묻는 질문
              </a>
              <a href="/contact" className="hover:text-gray-900">
                문의하기
              </a>
              <a href="/terms" className="hover:text-gray-900">
                이용약관
              </a>
              <a href="/privacy" className="hover:text-gray-900">
                개인정보 처리방침
              </a>
              <a href="/blog" className="hover:text-gray-900">
                블로그
              </a>
              <a href="/docs" className="hover:text-gray-900">
                기술문서
              </a>
            </div>
          </div>

          {/* Space between sections */}
          <div className="h-4" />

          {/* Company Info */}
          <div className="pb-4">
            <p className="text-xl font-bold mb-4">주식회사 핀코인</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <p>대표: 서종화</p>
              <p>주소: 서초구 서초대로29길 22 보미빌딩 303호</p>
              <p>사업자등록번호: 163-81-01158</p>
              <p>통신판매업신고: 2019-서울서초-0835</p>
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
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-teal-900 text-gray-200">
        <div className="container mx-auto px-4">
          <div className="py-2 text-center">
            <span>Copyright © 2012-2024 www.pincoin.co.kr</span>
            <br className="sm:hidden" />
            <span className="sm:inline"> All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </>
  );
};
