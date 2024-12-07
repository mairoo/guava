'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  isSearching: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  isSearching,
  onOpenChangeAction,
}) => {
  const menuItems = [
    { href: '/', label: '홈' },
    { href: '/shop/category/구글기프트카드', label: '카테고리' },
    { href: '/me', label: '마이페이지' },
    { href: '/orders', label: '주문내역' },
    { href: '/menu/1', label: '기프트카드 구매방법' },
    { href: '/menu/2', label: '자주 묻는 질문' },
    { href: '/menu/3', label: '이벤트' },
    { href: '/menu/4', label: '공지사항' },
    { href: '/menu/5', label: '고객센터' },
    { href: '/menu/6', label: '이용약관' },
    { href: '/menu/7', label: '개인정보처리방침' },
    { href: '/menu/8', label: '제휴문의' },
    { href: '/menu/9', label: '회사소개' },
    { href: '/menu/10', label: '채용정보' },
  ];

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

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
          <div className="p-2 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">메뉴</h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="scale-150 transform origin-center rounded-full"
              >
                <X className="w-6 h-6 text-gray-700" />
              </Button>
            </SheetClose>
          </div>

          <nav
            className="flex-1 overflow-y-auto overscroll-contain"
            onScroll={handleScroll}
            style={{
              WebkitOverflowScrolling: 'touch',
              isolation: 'isolate',
            }}
          >
            <div className="py-2">
              {menuItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => onOpenChangeAction(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t p-4">
            <div className="text-sm text-gray-500">고객센터: 1234-5678</div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
