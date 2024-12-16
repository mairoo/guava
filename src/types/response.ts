export interface ApiResponse<T> {
  timestamp: number;
  status: number;
  message: string;
  data: T;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  timestamp: number;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: ApiFieldError[];
}
