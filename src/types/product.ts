export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  description1: string;
  discountRate: number;
  pg: boolean;
  pgDiscountRate: number;
  naverSearchTag: string;
  naverBrandName: string;
  naverMakerName: string;
  url: string;
  imageUrl: string;
}

export const getGiftCardItems = (products: Product[]) => {
  return products.map((product) => ({
    href: product.url,
    label: product.title,
  }));
};
