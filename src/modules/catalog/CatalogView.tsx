import React, { FC } from "react";

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
    sortBy,
  } = filters;

  const {
    onChangePage,
    onChangePageSize,
    onChangeSelectedType,
    onChangeSelectedShape,
    onChangeSelectedClarity,
    onChangeSelectedColor,
    onChangeSortBy,
  } = handlers;

  return (
    <StyledCatalog>
      <div className="Catalog__innerContainer">
        <CatalogFilters
          filters={{
            selectedType,
            selectedShape,
            selectedClarity,
            selectedColor,
            sortBy,
          }}
          handlers={{
            onChangeSelectedType,
            onChangeSelectedShape,
            onChangeSelectedClarity,
            onChangeSelectedColor,
            onChangeSortBy,
          }}
        />

        <ProductsGrid
          products={catalogState.paginated}
          count={catalogState.sorted.length}
          page={page}
          pageSize={pageSize}
          onChangePage={onChangePage}
          onChangePageSize={onChangePageSize}
        />
      </div>
    </StyledCatalog>
  );
};

export { CatalogView };
