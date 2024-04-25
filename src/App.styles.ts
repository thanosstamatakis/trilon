import styled from "styled-components";

export const Navbar = styled.nav`
  background-color: #333;
  min-height: 60px;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const CartButton = styled.button`
  background-color: #fff;
  width: 40px;
  height: 40px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`;

export const CartDropdownWrapper = styled.div`
  position: relative;
`;
