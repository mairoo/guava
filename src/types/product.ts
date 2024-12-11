import { ApiResponse } from '@/types/response';

export namespace Products {
  // 일반 사용자용 상품 정보
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
    stock: ProductStock;
    categoryId: number;
  }

  // 관리자용 상품 정보 (일반 상품 정보 확장)
  export interface AdminProduct extends Product {
    stockQuantity: number;
    minimumStockLevel: number;
    maximumStockLevel: number;
    reviewCount: number;
    reviewCountPg: number;
    naverPartner: boolean;
    naverPartnerTitle: string;
    naverPartnerTitlePg: string;
    naverAttribute: string;
    storeId: number;
    created: string;
    modified: string;
  }

  export enum ProductStatus {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
  }

  export enum ProductStock {
    IN_STOCK = 'IN_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
  }

  // 요청 타입
  export interface ProductsRequest {
    categorySlug?: string;
  }

  export interface SearchProductsRequest extends ProductsRequest {
    keyword: string;
  }

  // API 응답 타입
  export type ProductsResponse = ApiResponse<Product[]>;
  export type ProductResponse = ApiResponse<Product>;

  export type AdminProductsResponse = ApiResponse<AdminProduct[]>;
  export type AdminProductResponse = ApiResponse<AdminProduct>;
}
