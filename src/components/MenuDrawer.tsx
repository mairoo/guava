'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  HelpCircle,
  LogIn,
  LogOut,
  Menu,
  ShoppingBag,
  User,
  UserPlus,
  X,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  isSearching: boolean;
  isLoggedIn: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  isSearching,
  isLoggedIn,
  onOpenChangeAction,
}) => {
  // 로그인한 사용자용 메뉴
  const memberMenuItems = [
    { href: '/me', label: '마이페이지', icon: User },
    { href: '/logout', label: '로그아웃', icon: LogOut },
  ];

  // 비로그인 사용자용 메뉴
  const guestMenuItems = [
    { href: '/login', label: '로그인', icon: LogIn },
    { href: '/register', label: '회원가입', icon: UserPlus },
  ];

  // 공통 메뉴 아이템
  const commonMenuItems = [
    { href: '/orders', label: '주문/발송', icon: ShoppingBag },
    { href: '/customer-service', label: '고객센터', icon: HelpCircle },
  ];

  const giftCardItems = [
    { href: '/shop/category/구글기프트카드', label: '구글기프트카드' },
    { href: '/shop/category/넥슨카드', label: '넥슨카드' },
    { href: '/shop/category/퍼니카드', label: '퍼니카드' },
    { href: '/shop/category/컬쳐랜드상품권', label: '컬쳐랜드상품권' },
    { href: '/shop/category/문화상품권', label: '문화상품권' },
    { href: '/shop/category/도서문화상품권', label: '도서문화상품권' },
    { href: '/shop/category/스마트문화상품권', label: '스마트문화상품권' },
    { href: '/shop/category/해피머니', label: '해피머니' },
    { href: '/shop/category/에그머니', label: '에그머니' },
    { href: '/shop/category/틴캐시', label: '틴캐시' },
  ];

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  // 현재 로그인 상태에 따라 적절한 메뉴 아이템을 결합
  const currentMenuItems = [
    ...(isLoggedIn ? memberMenuItems : guestMenuItems),
    ...commonMenuItems,
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChangeAction} modal={false}>
      <SheetTrigger asChild disabled={isSearching}>
        <button
          className={`p-2 -ml-2 ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] p-0 border-r shadow-lg !pr-0 overflow-hidden [&>button]:hidden"
      >
        <div className="flex flex-col h-full bg-white">
          {/* 상단 고정 영역 */}
          <div className="relative border-b">
            <h2 className="h-14 flex items-center px-4 text-lg font-semibold bg-[#f8faf3] text-[#7daf3b]">
              핀코인 대표몰
            </h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              >
                <X className="w-6 h-6 text-gray-700" />
              </Button>
            </SheetClose>
          </div>

          <nav className="py-2">
            {currentMenuItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                onClick={() => onOpenChangeAction(false)}
              >
                <Icon className="w-5 h-5 mr-3 text-gray-600" />
                {label}
              </Link>
            ))}
          </nav>

          {/* 상품권 목록 (스크롤 가능) */}
          <div className="flex-1 flex flex-col min-h-0">
            <h2 className="h-14 flex items-center px-4 text-lg font-semibold bg-[#f8faf3] text-[#7daf3b] border-y sticky top-0 z-10">
              상품권
            </h2>
            <div
              className="flex-1 overflow-y-auto overscroll-contain"
              onScroll={handleScroll}
              style={{
                WebkitOverflowScrolling: 'touch',
                isolation: 'isolate',
              }}
            >
              <nav className="py-2">
                {giftCardItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => onOpenChangeAction(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* 하단 고정 영역 */}
          <div className="border-t">
            <h2 className="h-14 flex items-center px-4 text-[#29ABE2] font-medium">
              카드몰로 이동
            </h2>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
