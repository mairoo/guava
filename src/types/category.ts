export interface Category {
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

export const getGiftCardItems = (categories: Category[]) => {
  return categories.map((category) => ({
    href: category.url,
    label: category.title,
  }));
};
