import React, { FC } from "react";

import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { useCatalogProducts } from "./hooks/useCatalogProducts";
import { CatalogProductsGrid } from "./components/CatalogProductsGrid";
import { CatalogFilters } from "./components/CatalogFilters";
import { StyledCatalog } from "./styles";
import { CatalogSearchInput } from "./components/CatalogSearchInput";

const CatalogView: FC = () => {
  const { filters, handlers } = useCatalogFilters();
  const { catalogState } = useCatalogProducts({ filters });

  const {
    page,
    pageSize,
    searchQuery,
    selectedType,
    selectedShape,
    selectedClarity,
    selectedColor,
    sortBy,
  } = filters;

  const {
    onChangePage,
    onChangePageSize,
    onChangeSearchQuery,
    onChangeSelectedType,
    onChangeSelectedShape,
    onChangeSelectedClarity,
    onChangeSelectedColor,
    onChangeSortBy,
  } = handlers;

  return (
    <StyledCatalog>
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

      <div className="Catalog__innerContainer">
        <CatalogSearchInput
          value={searchQuery}
          onChange={onChangeSearchQuery}
        />

        <CatalogProductsGrid
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
