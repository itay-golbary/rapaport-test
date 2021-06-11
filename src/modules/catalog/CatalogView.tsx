import React, { FC, useEffect } from "react";

import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { useCatalogProducts } from "./hooks/useCatalogProducts";
import { ProductsGrid } from "./components/ProductsGrid";
import { CatalogFilters } from "./components/CatalogFilters";
import { StyledCatalog } from "./styles";

const CatalogView: FC = () => {
  const { filters, handlers } = useCatalogFilters();
  const { catalogState } = useCatalogProducts({ filters });

  const {
    page,
    pageSize,
    selectedType,
    selectedShape,
    selectedClarity,
    selectedColor,
  } = filters;

  return (
    <StyledCatalog>
      <CatalogFilters
        filters={{
          selectedType,
          selectedShape,
          selectedClarity,
          selectedColor,
        }}
      />

      <ProductsGrid
        products={catalogState.paginated}
        count={catalogState.sorted.length}
        page={page}
        pageSize={pageSize}
        onChangePage={handlers.onChangePage}
        onChangePageSize={handlers.onChangePageSize}
      />
    </StyledCatalog>
  );
};

export { CatalogView };
