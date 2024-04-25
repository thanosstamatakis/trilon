export const API = {
  Products: {
    Category: {
      GET: (productType: string) => `https://dummyjson.com/products/category/${productType}`,
    },
  },
} as const;
