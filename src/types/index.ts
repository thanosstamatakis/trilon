export type PaginatedRequest<T> = {
  products: T[];
  total: number;
  skip: number;
  limit: number;
};
