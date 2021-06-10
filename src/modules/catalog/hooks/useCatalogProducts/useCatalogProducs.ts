import { useEffect, useReducer } from "react";

import { Filters } from "../types";
import { initialCatalogState, stonesReducer } from "./helpers";

import { useFlag } from "../../../../hooks/useFlag";

interface Props {
  filters: Filters;
}

const useCatalogProducts = ({ filters }: Props) => {
  const {
    page,
    pageSize,
    searchQuery,
    sortBy,
    selectedType,
    selectedShape,
    selectedClarity,
    selectedColor,
  } = filters;

  const [isLoading, setLoadingTrue, setLoadingFalse] = useFlag();

  const [catalogState, dispatch] = useReducer(
    stonesReducer,
    initialCatalogState
  );

  useEffect(() => {
    setLoadingTrue();

    dispatch({
      type: "filter",
      payload: {
        filters,
        // callback: setLoadingFalse
      },
    });

    setLoadingFalse();
  }, [selectedType, selectedShape, selectedClarity, selectedColor]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoadingTrue();

    dispatch({
      type: "search",
      payload: {
        filters,
        // callback: setLoadingFalse
      },
    });

    setLoadingFalse();
  }, [page, pageSize, searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoadingTrue();

    dispatch({
      type: "sort",
      payload: {
        filters,
        // callback: setLoadingFalse
      },
    });

    setLoadingFalse();
  }, [sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  return { isLoading, catalogState };
};

export { useCatalogProducts };
