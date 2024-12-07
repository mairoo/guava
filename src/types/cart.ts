export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
}
