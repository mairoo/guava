export interface CartItemBase {
  productId: number;
  name: string;
  subtitle: string;
  code: string;
  listPrice: number;
  sellingPrice: number;
}

export interface CartItem extends CartItemBase {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export interface CartSyncRequest {
  cartData: string;
}

export interface CartResponse {
  cartData: string;
}

export interface CartAgreements {
  termsOfService: boolean;
  privacyPolicy: boolean;
  paymentAgreement: boolean;
}

export interface CartAgreementErrors {
  termsOfService?: { message?: string };
  privacyPolicy?: { message?: string };
  paymentAgreement?: { message?: string };
}
