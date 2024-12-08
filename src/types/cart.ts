export interface CartItem {
  productId: number;
  name: string;
  subtitle: string;
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
