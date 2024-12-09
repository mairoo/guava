export namespace Products {
  export interface Product {
    id: number;
    name: string;
    subtitle: string;
    code: string;
    listPrice: number;
    sellingPrice: number;
    pg: boolean;
    pgSellingPrice: number;
    description: string;
    position: number;
    status: ProductStatus;
    stockQuantity: number;
    stock: ProductStock;
    minimumStockLevel: number;
    maximumStockLevel: number;
    categoryId: number;
    categoryTitle: string;
    storeId: number;
    storeName: string;
    created: string;
    modified: string;
  }

  export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SOLD_OUT = 'SOLD_OUT',
  }

  export enum ProductStock {
    IN_STOCK = 'IN_STOCK',
    LOW_STOCK = 'LOW_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
  }

  export interface ProductsRequest {
    categorySlug?: string;
  }

  export interface SearchProductsRequest extends ProductsRequest {
    keyword: string;
  }

  export interface ApiResponse<T> {
    timestamp: number;
    status: number;
    message: string;
    data: T;
  }

  export interface ProductsData {
    products: Product[];
    totalCount: number;
  }

  export type ProductsResponse = ApiResponse<Product[]>;
  export type ProductResponse = ApiResponse<Product>;
}
