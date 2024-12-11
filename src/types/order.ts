export namespace Orders {
  export interface Order {
    id: number;
    orderNo: string;
    fullname: string;
    totalListPrice: number;
    totalSellingPrice: number;
    currency: 'KRW' | 'USD';
    status: 'SHIPPED' | string;
    paymentMethod: 'BANK_TRANSFER' | string;
    created: string;
    modified: string;
    suspicious: boolean;
    removed: boolean;
  }

  export interface OrderSearchCondition {
    startDate?: string;
    endDate?: string;
    status?: string;
  }

  export interface OrdersResponse {
    content: Order[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  }
}
