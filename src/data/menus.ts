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
  { href: '/cart', label: '장바구니', icon: ShoppingBag },
  { href: '/support', label: '고객센터', icon: HelpCircle },
];
