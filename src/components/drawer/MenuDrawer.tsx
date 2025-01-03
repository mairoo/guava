'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { categories } from '@/data/categories';
import { commonMenuItems, guestMenuItems, memberMenuItems } from '@/data/menus';
import { useAuth } from '@/hooks/useAuth';
import { getGiftCardItems } from '@/types/category';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface MenuDrawerProps {
  isOpen: boolean;
  isSearching: boolean;
  onOpenChangeAction: (open: boolean) => void;
}

export const MenuDrawer = ({
  isOpen,
  isSearching,
  onOpenChangeAction,
}: MenuDrawerProps) => {
  const { isAuthenticated } = useAuth();

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const currentMenuItems = [
    ...(isAuthenticated ? memberMenuItems : guestMenuItems),
    ...commonMenuItems,
  ];

  const giftCardItems = getGiftCardItems(categories);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChangeAction} modal={false}>
      <SheetTrigger asChild disabled={isSearching}>
        <button
          className={`p-2 -ml-2 ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </SheetTrigger>

      <SheetPortal>
        {/* 그림자 오버레이 */}
        <SheetOverlay className="backdrop-blur-sm bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <SheetContent
          side="left"
          className="fixed top-0 w-[300px] p-0 border-r !pr-0 overflow-hidden [&>button]:hidden 
            shadow-[5px_0_25px_0_rgba(0,0,0,0.1)] data-[state=open]:animate-in data-[state=closed]:animate-out
            data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left duration-150
            after:absolute after:top-0 after:right-[-25px] after:w-[25px] after:h-full after:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        >
          <div className="flex flex-col h-full bg-white">
            {/* 상단 고정 영역 */}
            <div className="relative border-b">
              <SheetTitle className="sr-only">메뉴</SheetTitle>
              <SheetDescription className="sr-only">
                사이트의 주요 메뉴와 상품권 목록을 탐색할 수 있습니다.
              </SheetDescription>
              <h2 className="h-14 flex items-center px-4 text-lg font-semibold bg-green-50 text-lime-600">
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

            <nav className="py-1">
              {currentMenuItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => onOpenChangeAction(false)}
                >
                  <Icon className="w-5 h-5 mr-3 text-gray-600" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* 상품권 목록 (스크롤 가능) */}
            <div className="flex-1 flex flex-col min-h-0">
              <h2 className="h-14 flex items-center px-4 text-lg font-semibold bg-green-50 text-lime-600 border-y sticky top-0 z-10">
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
                <nav className="py-1">
                  {giftCardItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 transition-colors"
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
      </SheetPortal>
    </Sheet>
  );
};
