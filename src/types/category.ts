export namespace Categories {
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
    thumbnail: string;
  }
}

export const getGiftCardItems = (categories: Categories.Category[]) => {
  return categories.map((category) => ({
    href: `/shop/category/${category.slug}`,
    label: category.title,
  }));
};
