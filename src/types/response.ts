export interface ApiResponse<T> {
  timestamp: number;
  status: number;
  message: string;
  data: T;
}
