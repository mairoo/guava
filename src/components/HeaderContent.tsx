import { Container, NavList } from '@/components/layout';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const HeaderContent = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-white text-gray-800">
        <div className="container max-w-7xl mx-auto px-2">
          {/* Top Row */}
          <Container className="py-1 flex justify-between items-center">
            {/* Logo */}
            <div>
              <Link href="/">
                <img
                  src="/pincoin_www_260x50.png"
                  alt="핀코인 대표몰"
                  title="핀코인 대표몰"
                />
              </Link>
            </div>

            {/* Top Navigation */}
            <nav>
              <NavList>
                {[
                  { href: '/orders', text: '주문/발송' },
                  { href: '/shop/cart', text: '장바구니' },
                  { href: '/support', text: '고객센터' },
                  { href: '/auth/sign-up', text: '회원가입' },
                  { href: '/auth/sign-in', text: '로그인' },
                  { href: '/me', text: '마이페이지' },
                  { href: '/auth/sign-out', text: '로그아웃' },
                ].map(({ href, text }) => (
                  <li key={href}>
                    <a href={href} className="hover:text-gray-600">
                      {text}
                    </a>
                  </li>
                ))}
              </NavList>
            </nav>
          </Container>
        </div>
      </div>

      {/* Second Row with green background */}
      <div className="bg-green-50 text-gray-800">
        <div className="container max-w-7xl mx-auto px-2">
          <Container>
            {/* Bottom Row */}
            <div className="py-1 flex justify-between items-center">
              {/* Category Dropdown */}
              <nav>
                <NavList>
                  {[
                    '구글/넥슨/퍼니카드',
                    '스마트/도서문화/컬쳐랜드',
                    '에그/해피머니',
                    '온/틴캐시',
                    '선불쿠폰',
                    '게임소식',
                  ].map((text) => (
                    <li key={text} className="relative group">
                      <button className="hover:text-gray-600">{text}</button>
                      <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                        {/* Dropdown items here */}
                      </div>
                    </li>
                  ))}
                </NavList>
              </nav>

              {/* Search Field */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};
