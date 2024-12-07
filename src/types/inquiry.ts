export interface Inquiry {
  id: string;
  status: string;
  category: string;
  orderId: string | null;
  date: string;
  time: string;
  title: string;
}
