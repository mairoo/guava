'use client';

import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export const MobileHeaderContent = () => {
  const [isSearching, setIsSearching] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setIsSearching(!isSearching);
  };

  useEffect(() => {
    if (isSearching && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearching]);

  return (
    <>
      <div className="block md:hidden w-full bg-white relative z-20">
        <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
          <button className="p-2 -ml-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          <div className="flex justify-center">
            {isSearching ? (
              <input
                type="text"
                placeholder="상품권 검색"
                className="w-full h-10 px-2 text-base bg-transparent border-none focus:outline-none"
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
      <div
        ref={backdropRef}
        className={`fixed inset-0 bg-black/20 transition-opacity duration-100 z-10 ${
          isSearching ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSearch}
      />
    </>
  );
};
