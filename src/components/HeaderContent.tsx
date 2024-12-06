import { Container, NavList } from '@/components/layout';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const HeaderContent = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-white text-gray-800">
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
              {/* 동적으로 처리하면 리액트가 마운트되면서 발생하는 hydration 과정에서 나타나는 작은 깜빡임 발생 */}
              {/* 헤더 깜빡임은 푸터 깜박임과 달리 사용자 경험에 별로 안 좋음 */}
              <li>
                <Link href="/orders" className="hover:text-gray-600">
                  주문/발송
                </Link>
              </li>
              <li>
                <Link href="/shop/cart" className="hover:text-gray-600">
                  장바구니
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-gray-600">
                  고객센터
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:text-gray-600">
                  회원가입
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-in" className="hover:text-gray-600">
                  로그인
                </Link>
              </li>
              <li>
                <Link href="/me" className="hover:text-gray-600">
                  마이페이지
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-out" className="hover:text-gray-600">
                  로그아웃
                </Link>
              </li>
            </NavList>
          </nav>
        </Container>
      </div>

      {/* Second Row with green background */}
      <div className="bg-green-50 text-gray-800">
        <Container>
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
  );
};
