'use client';

import { Container, NavList } from '@/components/layout';
import {
  HelpCircle,
  LogIn,
  LogOut,
  PackageCheck,
  Search,
  ShoppingCart,
  User,
  UserPlus,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// 메뉴 타입 정의에 icon 추가
interface MenuItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

// 재사용 가능한 메뉴 아이템 정의
const memberMenuItems: MenuItem[] = [
  { href: '/me', label: '마이페이지', icon: User },
  { href: '/auth/sign-out', label: '로그아웃', icon: LogOut },
];

const guestMenuItems: MenuItem[] = [
  { href: '/auth/sign-in', label: '로그인', icon: LogIn },
  { href: '/auth/sign-up', label: '회원가입', icon: UserPlus },
];

const commonMenuItems: MenuItem[] = [
  { href: '/orders', label: '주문/발송', icon: PackageCheck },
  { href: '/shop/cart', label: '장바구니', icon: ShoppingCart },
  { href: '/support', label: '고객센터', icon: HelpCircle },
];

interface DesktopHeaderContentProps {
  isLoggedIn?: boolean;
}

export const DesktopHeaderContent: React.FC<DesktopHeaderContentProps> = ({
  isLoggedIn = false,
}) => {
  const currentMenuItems = [
    ...commonMenuItems,
    ...(isLoggedIn ? memberMenuItems : guestMenuItems),
  ];

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
              {currentMenuItems.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-gray-600 flex items-center gap-1"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                </li>
              ))}
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
