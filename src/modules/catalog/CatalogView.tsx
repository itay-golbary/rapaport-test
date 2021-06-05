import React, { FC, useEffect } from "react";
import { useCatalogFilters } from "./hooks/useCatalogFilters";

const CatalogView: FC = () => {
  const { filters, handlers } = useCatalogFilters();

  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);

  useEffect(() => {
    console.log("handlers", handlers);
  }, [handlers]);

  return <div>Catalog</div>;
};

export { CatalogView };
