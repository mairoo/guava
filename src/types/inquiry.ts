export interface Inquiry {
  id: string;
  status: string;
  category: string;
  orderId: string | null;
  datetime: string; // ISO 8601 format: YYYY-MM-DD HH:mm:ss
  title: string;
}
