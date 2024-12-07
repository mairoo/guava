import { CartItem, PaymentMethod } from '@/types/cart';

export const CART_ITEMS: CartItem[] = [
  { id: 1, name: '넥슨카드 5만원', price: 47500, quantity: 2 },
  { id: 2, name: '구글 5만원', price: 47500, quantity: 2 },
  { id: 3, name: '구글 5만원', price: 47500, quantity: 2 },
  { id: 4, name: '구글 5만원', price: 47500, quantity: 2 },
  { id: 5, name: '구글 5만원', price: 47500, quantity: 2 },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bank-transfer', name: '계좌이체/무통장입금' },
  { id: 'escrow', name: '에스크로' },
  { id: 'paypal', name: '페이팔' },
  { id: 'mobile', name: '휴대폰결제' },
  { id: 'card', name: '카드결제' },
];
