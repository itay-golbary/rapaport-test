import React, { FC } from "react";
import { StyledMenuContainer } from "./styles";

const MenuContainer: FC = ({ children }) => {
  return <StyledMenuContainer>{children}</StyledMenuContainer>;
};

export { MenuContainer };
