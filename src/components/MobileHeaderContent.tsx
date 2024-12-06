import { Menu, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const MobileHeaderContent = () => {
  return (
      <div className="block md:hidden w-full bg-white">
        <div className="container px-4">
          <div className="h-14 px-4 grid grid-cols-[auto_1fr_auto] items-center">
            <button className="p-2 -ml-2">
              <Menu className="w-6 h-6 text-gray-700"/>
            </button>

            <div className="flex justify-center">
              <Link href="/">
                <img
                    src="/pincoin_www_98x30.png"
                    alt="핀코인 대표몰"
                    title="핀코인 대표몰"
                    className="h-8 object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2">
                <Search className="w-6 h-6 text-gray-700"/>
              </button>
              <button className="p-2">
                <ShoppingBag className="w-6 h-6 text-gray-700"/>
              </button>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
      </div>
  );
};
