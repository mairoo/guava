'use client';

import { Container, NavList } from '@/components/layout';
import { commonMenuItems, guestMenuItems, memberMenuItems } from '@/data/menus';
import { useAuth } from '@/providers/auth/AuthProvider';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const DesktopHeaderContent = ({}) => {
  const { isAuthenticated } = useAuth();

  const currentMenuItems = [
    ...commonMenuItems,
    ...(isAuthenticated ? memberMenuItems : guestMenuItems),
  ];

  return (
    <div className="hidden md:block">
      <div className="bg-green-50 text-gray-800">
        <Container className="py-1 flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/pincoin_logo.svg"
                alt="핀코인"
                title="핀코인"
                className="h-8 object-contain"
              />
              <span className="text-xl font-semibold text-orange-500">
                핀코인
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Field */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:border-gray-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Top Navigation */}
            <nav>
              <NavList>
                {currentMenuItems.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-gray-600 flex items-center gap-1"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  </li>
                ))}
              </NavList>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
};
