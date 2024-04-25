import { renderHook, waitFor } from "@testing-library/react";
import { mswServer } from "@trilon/api";
import { PRODUCT_MOCK_SUCCESS } from "@trilon/api/products/handlers";
import { API } from "@trilon/constants";
import { useProductFetch } from "@trilon/hooks/useProductFetch";
import { http, HttpResponse } from "msw";

beforeAll(() => {
  mswServer.listen();
});
afterEach(() => {
  mswServer.resetHandlers();
});
afterAll(() => {
  mswServer.close();
});

describe("useProductFetch", () => {
  it("should initialize with default state", async () => {
    const { result } = renderHook(() => useProductFetch());
    expect(result.current.products).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it("should fetch products when enabled and productType is specified", async () => {
    const mockProductType = "smartphones";
    const { result } = renderHook(() => useProductFetch({ productType: mockProductType }));
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.products).toEqual(PRODUCT_MOCK_SUCCESS(mockProductType).products);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should not fetch products when enabled is false", async () => {
    const errorCbMock = jest.fn();
    const successCbMock = jest.fn();
    const mockProductType = "smartphones";
    const { result } = renderHook(() =>
      useProductFetch({ productType: mockProductType, enabled: false, onError: errorCbMock, onSuccess: successCbMock })
    );
    await waitFor(() => {
      expect(result.current.products).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(errorCbMock).not.toHaveBeenCalled();
      expect(successCbMock).not.toHaveBeenCalled();
    });
  });

  it("should handle API failure", async () => {
    // Overwrite the default handler to return a 500 status code
    mswServer.use(
      http.get(API.Products.Category.GET(":productType"), () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const mockProductTypeFail = "failtype";
    const errorCbMock = jest.fn();
    const successCbMock = jest.fn();
    const { result } = renderHook(() =>
      useProductFetch({ productType: mockProductTypeFail, onError: errorCbMock, onSuccess: successCbMock })
    );
    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });
    await waitFor(() => {
      expect(result.current.products).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(errorCbMock).toHaveBeenCalledTimes(1);
      expect(successCbMock).not.toHaveBeenCalled();
    });
  });

  it("should not fetch products if product type is not defined", async () => {
    const errorCbMock = jest.fn();
    const successCbMock = jest.fn();
    const { result } = renderHook(() =>
      useProductFetch({ enabled: true, onError: errorCbMock, onSuccess: successCbMock })
    );
    await waitFor(() => {
      expect(result.current.products).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(errorCbMock).not.toHaveBeenCalled();
      expect(successCbMock).not.toHaveBeenCalled();
    });
  });
});
