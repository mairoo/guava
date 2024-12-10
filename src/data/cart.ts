import { CartItem, PaymentMethod } from '@/types/cart';

export const CART_ITEMS: CartItem[] = [
  {
    productId: 1,
    name: '넥슨카드',
    subtitle: '5만원',
    price: 47500,
    quantity: 2,
  },
  {
    productId: 2,
    name: '구글기프트카드',
    subtitle: '10만원',
    price: 47500,
    quantity: 2,
  },
  {
    productId: 3,
    name: '컬쳐랜드상품권',
    subtitle: '1만원',
    price: 47500,
    quantity: 2,
  },
  {
    productId: 4,
    name: '도서문화상품권',
    subtitle: '5만원',
    price: 47500,
    quantity: 2,
  },
  {
    productId: 5,
    name: '문화상품권',
    subtitle: '3만원',
    price: 47500,
    quantity: 2,
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bank-transfer', name: '계좌이체/무통장입금' },
  { id: 'escrow', name: '에스크로' },
  { id: 'paypal', name: '페이팔' },
  { id: 'mobile', name: '휴대폰결제' },
  { id: 'card', name: '카드결제' },
];
