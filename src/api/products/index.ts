import { API } from "@trilon/constants";
import { ProductResponse } from "./types";

export const getProducts = async (productType: string): Promise<ProductResponse> => {
  const response = await fetch(API.Products.Category.GET(productType));
  const products = await response.json();
  return products;
};
