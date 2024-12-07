'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useScrollLock } from '@/hooks/useScrollLock';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const MobileHeaderContent = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { lockScroll, unlockScroll } = useScrollLock();

  const toggleSearch = useCallback(() => {
    const newIsSearching = !isSearching;
    setIsSearching(newIsSearching);

    if (newIsSearching) {
      lockScroll();
    } else {
      unlockScroll();
    }

    if (isMenuOpen) setIsMenuOpen(false);
    if (isCartOpen) setIsCartOpen(false);
  }, [isSearching, isMenuOpen, isCartOpen, lockScroll, unlockScroll]);

  const toggleMenu = useCallback(
    (open: boolean) => {
      setIsMenuOpen(open);
      if (isSearching) setIsSearching(false);
      if (isCartOpen) setIsCartOpen(false);

      if (open) {
        lockScroll();
      } else {
        unlockScroll();
      }
    },
    [isSearching, isCartOpen, lockScroll, unlockScroll],
  );

  const toggleCart = useCallback(
    (open: boolean) => {
      setIsCartOpen(open);
      if (isSearching) setIsSearching(false);
      if (isMenuOpen) setIsMenuOpen(false);

      if (open) {
        lockScroll();
      } else {
        unlockScroll();
      }
    },
    [isSearching, isMenuOpen, lockScroll, unlockScroll],
  );

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, [unlockScroll]);

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

  const commonIconClasses = 'w-6 h-6 text-gray-700';
  const menuItemClasses =
    'flex items-center px-4 py-3 hover:bg-gray-100 transition-colors';
  const iconButtonClasses = 'p-2';

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const cartItems = [
    {
      id: 1,
      name: '구글플레이 기프트카드 1만원',
      price: 10000,
      quantity: 2,
    },
    {
      id: 2,
      name: '구글플레이 기프트카드 3만원',
      price: 30000,
      quantity: 1,
    },
    {
      id: 3,
      name: '구글플레이 기프트카드 5만원',
      price: 50000,
      quantity: 1,
    },
    {
      id: 4,
      name: '넷플릭스 기프트카드 3개월',
      price: 45000,
      quantity: 2,
    },
    {
      id: 5,
      name: '플레이스테이션 기프트카드 5만원',
      price: 50000,
      quantity: 1,
    },
    {
      id: 6,
      name: '닌텐도 기프트카드 3만원',
      price: 30000,
      quantity: 3,
    },
    {
      id: 7,
      name: '아이튠즈 기프트카드 3만원',
      price: 30000,
      quantity: 2,
    },
    {
      id: 8,
      name: '로블록스 기프트카드 1만원',
      price: 10000,
      quantity: 4,
    },
  ];

  return (
    <>
      <div className="block md:hidden bg-white relative z-30">
        <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
          {/* 왼쪽 메뉴 서랍 */}
          <Sheet open={isMenuOpen} onOpenChange={toggleMenu} modal={false}>
            <SheetTrigger asChild disabled={isSearching}>
              <button
                className={`${iconButtonClasses} -ml-2 ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Menu className={commonIconClasses} />
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
                        className={menuItemClasses}
                        onClick={() => toggleMenu(false)}
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
            {/* 장바구니 서랍 */}
            <Sheet open={isCartOpen} onOpenChange={toggleCart} modal={false}>
              <SheetTrigger asChild>
                <button className={iconButtonClasses}>
                  <ShoppingBag className={commonIconClasses} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] p-0 border-l shadow-lg !pl-0 overflow-hidden [&>button]:hidden"
              >
                <div className="flex flex-col h-full bg-white">
                  <div className="p-2 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-semibold">장바구니</h2>
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

                  <div
                    className="flex-1 overflow-y-auto overscroll-contain"
                    onScroll={handleScroll}
                    style={{
                      WebkitOverflowScrolling: 'touch',
                      isolation: 'isolate',
                    }}
                  >
                    {cartItems.length > 0 ? (
                      <div className="py-2">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
                          >
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                {item.price.toLocaleString()}원 x{' '}
                                {item.quantity}개
                              </div>
                            </div>
                            <div className="font-medium ml-4 text-right">
                              {(item.price * item.quantity).toLocaleString()}원
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        장바구니가 비어있습니다
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t p-4 sticky bottom-0 bg-white">
                      <div className="flex justify-between mb-4">
                        <span className="font-medium">총 상품금액</span>
                        <span className="font-medium">
                          {cartItems
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0,
                            )
                            .toLocaleString()}
                          원
                        </span>
                      </div>
                      <Button className="w-full">주문하기</Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="border-b border-gray-300" />
      </div>

      {/* 검색용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-100 z-20 ${
          isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'none' }}
        onClick={toggleSearch}
      />

      {/* 서랍메뉴용 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-100 z-40 ${
          isMenuOpen || isCartOpen
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ touchAction: 'none' }}
        onClick={() => {
          if (isMenuOpen) toggleMenu(false);
          if (isCartOpen) toggleCart(false);
        }}
      />
    </>
  );
};
