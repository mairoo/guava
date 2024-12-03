import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const HeaderContent = () => {
  return (
    <>
      <div className="bg-white text-gray-800">
        <div className="container max-w-7xl mx-auto p-2">
          {/* Top Row */}
          <div className="py-1 flex justify-between items-center">
            {/* Logo */}
            <div>
              <Link href="/">
                <img
                  src="https://pincoin-s3.s3.amazonaws.com/static/images/shop/default/pincoin_www_260x50.png"
                  alt="핀코인 대표몰"
                  title="핀코인 대표몰"
                />
              </Link>
            </div>

            {/* Top Navigation */}
            <nav>
              <ul className="flex gap-6">
                <li>
                  <a href="/orders" className="hover:text-gray-600">
                    주문/발송
                  </a>
                </li>
                <li>
                  <a href="/cart" className="hover:text-gray-600">
                    장바구니
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-gray-600">
                    고객센터
                  </a>
                </li>
                <li>
                  <a href="/mypage" className="hover:text-gray-600">
                    마이페이지
                  </a>
                </li>
                <li>
                  <a href="/logout" className="hover:text-gray-600">
                    로그아웃
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Second Row with green background */}
      <div className="bg-green-50 text-gray-800">
        <div className="container max-w-7xl mx-auto px-2">
          {/* Bottom Row */}
          <div className="py-1 flex justify-between items-center">
            {/* Category Dropdown */}
            <nav>
              <ul className="flex gap-6">
                <li className="relative group">
                  <button className="hover:text-gray-600">
                    구글/넥슨/퍼니카드
                  </button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-gray-600">
                    스마트/도서문화/컬쳐랜드
                  </button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-gray-600">에그/해피머니</button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-gray-600">온/틴캐시</button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-gray-600">선불쿠폰</button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
                <li className="relative group">
                  <button className="hover:text-gray-600">게임소식</button>
                  <div className="hidden group-hover:block absolute top-full left-0 bg-white shadow-lg rounded-lg p-2 w-48">
                    {/* Dropdown items here */}
                  </div>
                </li>
              </ul>
            </nav>

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
          </div>
        </div>
      </div>
    </>
  );
};
