export type OrderStatus =
  | 'PAYMENT_PENDING' // 입금확인중
  | 'PAYMENT_COMPLETED' // 입금완료
  | 'UNDER_REVIEW' // 인증심사중
  | 'PAYMENT_VERIFIED' // 입금인증완료
  | 'SHIPPED' // 발송완료
  | 'REFUND_REQUESTED' // 환불요청
  | 'REFUND_PENDING' // 환불대기
  | 'REFUNDED1' // 환불완료
  | 'REFUNDED2' // 환불완료
  | 'VOIDED'; // 주문무효

export type PaymentMethod =
  | 'BANK_TRANSFER' // 계좌이체 / 무통장입금
  | 'ESCROW' // 에스크로 (KB)
  | 'PAYPAL' // 페이팔 (PayPal)
  | 'CREDIT_CARD' // 신용카드
  | 'BANK_TRANSFER_PG' // 계좌이체 (PG)
  | 'VIRTUAL_ACCOUNT' // 가상계좌
  | 'PHONE_BILL'; // 휴대폰소액결제

export const ORDER_STATUS = {
  PAYMENT_PENDING: '입금확인중',
  PAYMENT_COMPLETED: '입금완료',
  UNDER_REVIEW: '인증심사중',
  PAYMENT_VERIFIED: '입금인증완료',
  SHIPPED: '발송완료',
  REFUND_REQUESTED: '환불요청',
  REFUND_PENDING: '환불대기',
  REFUNDED1: '환불완료',
  REFUNDED2: '환불완료',
  VOIDED: '주문무효',
} as const;

export const PAYMENT_METHODS = [
  { id: 'BANK_TRANSFER' as PaymentMethod, name: '계좌이체 / 무통장입금' },
  { id: 'ESCROW' as PaymentMethod, name: '에스크로 (KB)' },
  { id: 'PAYPAL' as PaymentMethod, name: '페이팔 (PayPal)' },
  { id: 'CREDIT_CARD' as PaymentMethod, name: '신용카드' },
  { id: 'BANK_TRANSFER_PG' as PaymentMethod, name: '계좌이체 (PG)' },
  { id: 'VIRTUAL_ACCOUNT' as PaymentMethod, name: '가상계좌' },
  { id: 'PHONE_BILL' as PaymentMethod, name: '휴대폰소액결제' },
] as const;

export namespace Orders {
  export interface OrderItem {
    productId: number;
    name: string;
    subtitle: string;
    code: string;
    listPrice: number;
    sellingPrice: number;
    quantity: number;
  }

  export interface CreateOrderRequest {
    items: OrderItem[];
    paymentMethod: PaymentMethod;
  }

  export interface Order {
    id: number;
    orderNo: string;
    fullname: string;
    totalListPrice: number;
    totalSellingPrice: number;
    currency: 'KRW' | 'USD';
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    created: string;
    modified: string;
    suspicious: boolean;
    removed: boolean;
    items: OrderItem[];
  }

  export interface OrderSearchCondition {
    startDate?: string;
    endDate?: string;
    status?: string;
  }

  export interface OrdersResponse {
    content: Order[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  }
}
