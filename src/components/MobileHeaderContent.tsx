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

  const menuItems = [
    { href: '/', label: '홈' },
    { href: '/shop/cateogry/구글기프트카드', label: '카테고리' },
    { href: '/me', label: '마이페이지' },
    { href: '/orders', label: '주문내역' },
  ];

  const commonIconClasses = 'w-6 h-6 text-gray-700';
  const menuItemClasses =
    'flex items-center px-4 py-3 hover:bg-gray-100 transition-colors';
  const iconButtonClasses = 'p-2';

  return (
    <>
      <style jsx global>{`
        .sheet-close-button svg {
          width: 24px !important;
          height: 24px !important;
        }
      `}</style>
      <div className="block md:hidden bg-white relative z-30">
        <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
          <Sheet open={isOpen} onOpenChange={toggleDrawer} modal={false}>
            <SheetTrigger asChild disabled={isSearching}>
              <button
                className={`${iconButtonClasses} -ml-2 ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Menu className={commonIconClasses} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] p-0 border-r shadow-lg !pr-0"
            >
              <div className="flex flex-col h-full bg-white">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">메뉴</h2>
                </div>

                <nav className="flex-1 overflow-y-auto">
                  <div className="py-2">
                    {menuItems.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        className={menuItemClasses}
                        onClick={() => toggleDrawer(false)}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="border-t p-4">
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
                className="w-full h-10 px-2 text-base focus:outline-none"
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
            <button className={iconButtonClasses} onClick={toggleSearch}>
              {isSearching ? (
                <X className={commonIconClasses} />
              ) : (
                <Search className={commonIconClasses} />
              )}
            </button>
            <button className={iconButtonClasses}>
              <ShoppingBag className={commonIconClasses} />
            </button>
          </div>
        </div>
        <div className="border-b border-gray-300" />
      </div>

      {/* 검색용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-20 ${
          isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'none' }}
        onClick={toggleSearch}
      />

      {/* 서랍메뉴용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'none' }}
        onClick={() => toggleDrawer(false)}
      />
    </>
  );
};
