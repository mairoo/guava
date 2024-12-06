'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export const MobileHeaderContent = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isOpen) setIsOpen(false);
  };

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
    if (isSearching) setIsSearching(false);
  };

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <>
      <div className="block md:hidden w-full bg-white relative z-30">
        <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
          <Sheet open={isOpen} onOpenChange={toggleDrawer} modal={false}>
            <SheetTrigger asChild>
              <button className="p-2 -ml-2">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] p-0 border-r shadow-lg z-50 custom-sheet"
            >
              <div className="flex flex-col h-full bg-white">
                {/* 헤더 영역 */}
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">메뉴</h2>
                </div>

                {/* 메뉴 항목들 */}
                <nav className="flex-1 overflow-y-auto bg-white">
                  <div className="py-2">
                    <Link
                      href="/"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleDrawer(false)}
                    >
                      홈
                    </Link>
                    <Link
                      href="/shop/cateogry/구글기프트카드"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleDrawer(false)}
                    >
                      카테고리
                    </Link>
                    <Link
                      href="/me"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleDrawer(false)}
                    >
                      마이페이지
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleDrawer(false)}
                    >
                      주문내역
                    </Link>
                  </div>
                </nav>

                {/* 푸터 영역 */}
                <div className="border-t p-4 bg-white">
                  <div className="text-sm text-gray-500">
                    고객센터: 1234-5678
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex justify-center">
            {isSearching ? (
              <input
                type="text"
                placeholder="상품권 검색"
                className="w-full h-10 px-2 text-base bg-transparent border-none focus:outline-none"
                ref={searchInputRef}
                autoFocus
              />
            ) : (
              <Link href="/">
                <img
                  src="/pincoin_www_98x30.png"
                  alt="핀코인 대표몰"
                  title="핀코인 대표몰"
                  className="h-8 object-contain"
                />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2" onClick={toggleSearch}>
              {isSearching ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Search className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <button className="p-2">
              <ShoppingBag className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
      </div>
      {/* 검색용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-20 ${
          isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSearch}
      />
      {/* 서랍메뉴용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleDrawer(false)}
      />
    </>
  );
};
