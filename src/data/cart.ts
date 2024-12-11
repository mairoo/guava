import { PaymentMethod } from '@/types/cart';

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'bank-transfer', name: '계좌이체/무통장입금' },
  { id: 'escrow', name: '에스크로' },
  { id: 'paypal', name: '페이팔' },
  { id: 'mobile', name: '휴대폰결제' },
  { id: 'card', name: '카드결제' },
];
