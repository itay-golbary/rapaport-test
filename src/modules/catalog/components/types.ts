import styled from "styled-components";

const PAGINATION_HEIGHT = 48;

const StyledProductsGrid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100px;

  .ProductsGrid__tableContainer {
  }

  .ProductsGrid__paginationContainer {
    //position: absolute;
    //bottom: 0;
    //
    //width: 100%;

    display: flex;
    height: ${PAGINATION_HEIGHT}px;

    justify-content: flex-end;
    align-items: center;
  }
`;

export { StyledProductsGrid };
