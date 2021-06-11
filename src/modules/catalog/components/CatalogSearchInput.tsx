import React, { FC } from "react";
import styled from "styled-components";

import {
  TextInput,
  Props as TextInputProps,
} from "../../../components/TextInput";

const SerachHeight = 50;

const StyledCatalogSearch = styled.div`
  //height: 50px;
`;

interface Props
  extends Pick<TextInputProps, Exclude<keyof TextInputProps, "type">> {}

const CatalogSearchInput: FC<Props> = ({ value, onChange }) => {
  return (
    <StyledCatalogSearch>
      <TextInput type={"search"} value={value ?? ""} onChange={onChange} />
    </StyledCatalogSearch>
  );
};

export { CatalogSearchInput, SerachHeight };
