import React, { FC, useEffect } from "react";

import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { useCatalogProducts } from "./hooks/useCatalogProducts";
import { ProductsGrid } from "./components/ProductsGrid";

const CatalogView: FC = () => {
  const { filters } = useCatalogFilters();
  const { catalogState } = useCatalogProducts({ filters });

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  useEffect(() => {
    console.log("catalogState", catalogState);
  }, [catalogState]);

  return (
    <div>
      <ProductsGrid products={catalogState.paginated} />
    </div>
  );
};

export { CatalogView };
