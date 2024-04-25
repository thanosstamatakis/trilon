import { TabBar, Loader } from "@trilon/components";
import { Animations } from "@trilon/constants";
import { useShoppingCart } from "./hooks/useShoppingCart";
import * as S from "./ShoppingCart.styles";

export const ShoppingCart = () => {
  const { products, tabItems, onChangeTab, loading } = useShoppingCart();
  return (
    <S.ShoppingCartWrapper {...Animations.FadeDown}>
      <S.CartTitle>My cart</S.CartTitle>
      <TabBar items={tabItems} onTabChange={onChangeTab} />
      <S.ContentWrapper>
        {loading && (
          <S.LoaderWrapper data-testid="loader">
            <Loader size={20} />
          </S.LoaderWrapper>
        )}
        {!loading &&
          products.map((product) => (
            <S.ProductWrapper key={product.id}>
              <S.ProductImage src={product.thumbnail} />
              <S.Column>
                <span style={{ fontSize: 14 }}>{product.title}</span>
                <span>${product.price}</span>
              </S.Column>
            </S.ProductWrapper>
          ))}
      </S.ContentWrapper>
    </S.ShoppingCartWrapper>
  );
};
