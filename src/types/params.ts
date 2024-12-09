export interface PageParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface ProductDetailParams {
  params: Promise<{
    id: string;
    code: string;
  }>;
}

export interface CategoryDetailParams {
  params: Promise<{ slug: string }>;
}

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
