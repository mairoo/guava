export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
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
