import { MenuItem } from '@/types/menu';
import {
  HelpCircle,
  LogIn,
  LogOut,
  PackageCheck,
  ShoppingBag,
  User,
  UserPlus,
} from 'lucide-react';

export const memberMenuItems: MenuItem[] = [
  { href: '/me', label: '마이페이지', icon: User },
  { href: '/auth/sign-out', label: '로그아웃', icon: LogOut },
];

export const guestMenuItems: MenuItem[] = [
  { href: '/auth/sign-in', label: '로그인', icon: LogIn },
  { href: '/auth/sign-up', label: '회원가입', icon: UserPlus },
];

export const commonMenuItems: MenuItem[] = [
  { href: '/orders', label: '주문/발송', icon: PackageCheck },
  { href: '/shop/cart', label: '장바구니', icon: ShoppingBag },
  { href: '/support', label: '고객센터', icon: HelpCircle },
];

export const giftCardItems = [
  { href: '/shop/category/구글기프트카드', label: '구글기프트카드' },
  { href: '/shop/category/넥슨카드', label: '넥슨카드' },
  { href: '/shop/category/퍼니카드', label: '퍼니카드' },
  { href: '/shop/category/컬쳐랜드상품권', label: '컬쳐랜드상품권' },
  { href: '/shop/category/문화상품권', label: '문화상품권' },
  { href: '/shop/category/도서문화상품권', label: '도서문화상품권' },
  { href: '/shop/category/스마트문화상품권', label: '스마트문화상품권' },
  { href: '/shop/category/해피머니', label: '해피머니' },
  { href: '/shop/category/에그머니', label: '에그머니' },
  { href: '/shop/category/틴캐시', label: '틴캐시' },
];
