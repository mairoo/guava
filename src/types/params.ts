export interface PageParams {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface DetailPageParams {
  params: Promise<{ slug: string }>;
}

export interface SearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
