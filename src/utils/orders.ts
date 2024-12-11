export const translateOrderStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
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
  };

  return statusMap[status] || status;
};

export const translatePaymentMethod = (method: string): string => {
  const methodMap: { [key: string]: string } = {
    BANK_TRANSFER: '계좌이체 / 무통장입금',
    ESCROW: '에스크로',
    PAYPAL: '페이팔',
    CREDIT_CARD: '신용카드',
    BANK_TRANSFER_PG: '계좌이체 (PG)',
    VIRTUAL_ACCOUNT: '가상계좌',
    PHONE_BILL: '휴대폰결제',
  };

  return methodMap[method] || method;
};
