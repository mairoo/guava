export interface Product {
  id: number;
  name: string;
  discountRate: number;
  url: string;
  imageUrl: string;
}

export const getGiftCardItems = (products: Product[]) => {
  return products.map((product) => ({
    href: product.url,
    label: product.name,
  }));
};
