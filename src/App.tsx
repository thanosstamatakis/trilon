import { AnimatePresence } from "framer-motion";
import * as S from "./App.styles";
import { ShoppingCart } from "./components";
import { useDropdown } from "@trilon/hooks";

function App() {
  const { isOpen, ref: dropdownRef, toggle } = useDropdown<HTMLDivElement>();
  return (
    <S.Navbar>
      <S.CartDropdownWrapper ref={dropdownRef}>
        <S.CartButton onClick={toggle}>🛒</S.CartButton>
        <AnimatePresence>{isOpen && <ShoppingCart />}</AnimatePresence>
      </S.CartDropdownWrapper>
    </S.Navbar>
  );
}

export default App;
