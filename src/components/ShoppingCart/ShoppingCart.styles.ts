import { motion } from "framer-motion";
import styled from "styled-components";

export const ShoppingCartWrapper = styled(motion.div)`
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  background-color: #fff;
  width: 100%;
  width: 340px;
  padding: 20px 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export const CartTitle = styled.div`
  font-size: 20px;
  letter-spacing: -1px;
  font-weight: bold;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LoaderWrapper = styled.div`
  min-height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductWrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  box-sizing: border-box;
  align-items: center;
  background-color: #f9f9f9;
`;

export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 4px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
  font-size: 12px;
`;
