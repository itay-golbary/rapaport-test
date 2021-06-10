import { useEffect, useReducer } from "react";

import { useFlag } from "../../../../hooks/useFlag";

import { Filters } from "../types";
import { initialCatalogState, stonesReducer } from "./helpers";

interface Props {
  filters: Filters;
}

const useCatalogProducts = ({ filters }: Props) => {
  const { page, pageSize, searchQuery, sortBy, groupBy, ...businessFilters } =
    filters;

  const [isLoading, setLoadingTrue, setLoadingFalse] = useFlag();

  const [catalogState, dispatch] = useReducer(
    stonesReducer,
    initialCatalogState
  );


  useEffect(() => {
    // setLoadingTrue();

    dispatch({ type: "filter", payload: { filters, callback: () => {
          setLoadingFalse()
        } }});
  }, [businessFilters]);

  useEffect(() => {
    dispatch({ type: "search", payload: { filters } });
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    dispatch({ type: "sort", payload: { filters } });
  }, [sortBy]);

  useEffect(() => {
    dispatch({ type: "group", payload: { filters } });
  }, [groupBy]);

  return { isLoading, catalogState };
};

export { useCatalogProducts };
