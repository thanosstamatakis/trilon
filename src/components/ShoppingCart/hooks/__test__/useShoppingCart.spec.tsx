import { renderHook, act } from "@testing-library/react";
import { useProductFetch } from "@trilon/hooks";
import { useShoppingCart } from "@trilon/components/ShoppingCart/hooks/useShoppingCart";

jest.mock("@trilon/hooks", () => ({
  useProductFetch: jest.fn(),
}));

describe("useShoppingCart", () => {
  it("should initialize with no selected tab", async () => {
    const { result } = renderHook(() => useShoppingCart());
    expect(result.current.selectedTab).toBeUndefined();
  });

  it("should correctly handle tab changes", () => {
    const tabs = ["smartphones", "laptops", undefined];

    const { result } = renderHook(() => useShoppingCart());

    tabs.forEach((tab) => {
      act(() => {
        result.current.onChangeTab(tab);
      });
      expect(useProductFetch).toHaveBeenCalledWith({
        productType: tab,
        enabled: !!tab,
      });
      expect(result.current.selectedTab).toBe(tab);
    });
  });
});
