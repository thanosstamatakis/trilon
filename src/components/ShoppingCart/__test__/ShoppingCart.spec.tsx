import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PRODUCT_MOCK_SUCCESS } from "@trilon/api/products/handlers";
import { ShoppingCart } from "@trilon/components/ShoppingCart";
import { useShoppingCart } from "@trilon/components/ShoppingCart/hooks/useShoppingCart";

jest.mock("@trilon/components/ShoppingCart/hooks/useShoppingCart", () => ({
  useShoppingCart: jest.fn(),
}));

type UseShoppingCartMock = jest.MockedFunction<typeof useShoppingCart>;

const MOCKED_CART = {
  loading: false,
  selectedTab: undefined,
  tabItems: [
    { label: "Smartphones", id: "smartphones" },
    { label: "Laptops", id: "laptops" },
  ],
  onChangeTab: jest.fn(),
  products: [],
};

describe("ShoppingCart", () => {
  beforeEach(() => {
    (useShoppingCart as UseShoppingCartMock).mockReturnValue(MOCKED_CART);
  });

  it("should render correctly", () => {
    render(<ShoppingCart />);
    expect(screen.getByText(/My cart/)).toBeInTheDocument();
    expect(screen.getByText(/Smartphones/)).toBeInTheDocument();
    expect(screen.getByText(/Laptops/)).toBeInTheDocument();
  });

  it("should display the loader when loading is true", () => {
    (useShoppingCart as UseShoppingCartMock).mockReturnValueOnce({
      ...MOCKED_CART,
      loading: true,
    });

    const { getByTestId } = render(<ShoppingCart />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });

  it("should display the products when loading is false", () => {
    const { products } = PRODUCT_MOCK_SUCCESS(MOCKED_CART.tabItems[0].id);
    (useShoppingCart as UseShoppingCartMock).mockReturnValueOnce({
      ...MOCKED_CART,
      loading: false,
      products,
    });
    render(<ShoppingCart />);
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    products.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
    });
  });

  it("should call onChangeTab when a tab is clicked", async () => {
    const onChangeTab = jest.fn();
    (useShoppingCart as UseShoppingCartMock).mockReturnValueOnce({
      ...MOCKED_CART,
      onChangeTab,
      selectedTab: MOCKED_CART.tabItems[0].id,
    });

    render(<ShoppingCart />);
    act(() => {
      userEvent.click(screen.getByText(MOCKED_CART.tabItems[1].label));
    });
    await waitFor(() => {
      expect(onChangeTab).toHaveBeenCalledWith(MOCKED_CART.tabItems[1].id);
    });
  });
});
