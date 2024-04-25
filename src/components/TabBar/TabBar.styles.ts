import { motion } from "framer-motion";
import styled from "styled-components";

export const TabBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #e0e0e0;
`;

export const TabItem = styled.button<{ selected: boolean }>`
  all: unset;
  border: none !important;
  outline: none !important;
  font-weight: bold;
  font-size: 12px;
  flex: 1;
  text-align: center;
  padding: 10px 0px;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
  position: relative;
  cursor: pointer;
`;

export const Line = styled(motion.div)`
  width: 100%;
  height: 2px;
  border-radius: 1px;
  background-color: #747bff;
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
`;
