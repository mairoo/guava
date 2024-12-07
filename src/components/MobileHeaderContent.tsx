// components/header/MobileHeaderContent.tsx
'use client';

import { useScrollLock } from '@/hooks/useScrollLock';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CartDrawer } from './CartDrawer';
import { MenuDrawer } from './MenuDrawer';

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

  return (
    <>
      <div className="block md:hidden bg-white relative z-30">
        <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
          {/* 메뉴 서랍 */}
          <MenuDrawer
            isOpen={isMenuOpen}
            isSearching={isSearching}
            isLoggedIn={false}
            onOpenChangeAction={toggleMenu}
          />

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
            <button className="p-2" onClick={toggleSearch}>
              {isSearching ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Search className="w-6 h-6 text-gray-700" />
              )}
            </button>
            {/* 장바구니 서랍 */}
            <CartDrawer isOpen={isCartOpen} onOpenChangeAction={toggleCart} />
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
