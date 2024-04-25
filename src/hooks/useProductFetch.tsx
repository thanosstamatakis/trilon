import { getProducts } from "@trilon/api/products";
import { Product } from "@trilon/api/products/types";
import { useCallback, useEffect, useState } from "react";

export type UseProductFetchProps = {
  productType?: string;
  onSuccess?: (data: Product[]) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
};

export const useProductFetch = ({
  productType = "",
  onSuccess = undefined,
  onError = undefined,
  enabled = true,
}: UseProductFetchProps = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!productType) return;
    setLoading(true);
    try {
      const productsResponse = await getProducts(productType);
      if (onSuccess) onSuccess(productsResponse.products);
      setProducts(productsResponse.products);
    } catch (error) {
      if (onError) onError(new Error("Failed to fetch products"));
    } finally {
      setLoading(false);
    }
  }, [productType, onSuccess, onError, loading]);

  useEffect(() => {
    if (!productType || !enabled) return;
    fetchProducts();
  }, [productType, enabled]);

  return { products, loading };
};
