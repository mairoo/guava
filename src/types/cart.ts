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

export interface PaymentMethod {
  id: string;
  name: string;
}

export interface CartSyncRequest {
  cartData: string;
}

export interface CartResponse {
  cartData: string;
}
