'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export const MobileHeaderContent = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="block md:hidden w-full bg-white">
      <div className="container px-4 py-2">
        <div className="flex items-center justify-between">
          {isSearchVisible ? (
            <div className="flex-1 flex items-center space-x-2">
              <Input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="shrink-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Link href="/" className="flex-1">
                <img
                  src="/pincoin_www_98x30.png"
                  alt="핀코인 대표몰"
                  title="핀코인 대표몰"
                  className="h-8 object-contain"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSearch}
                className="ml-2"
              >
                <Search className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
