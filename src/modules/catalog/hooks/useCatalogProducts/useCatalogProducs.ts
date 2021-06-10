import { useEffect, useReducer } from "react";

import { useFlag } from "../../../../hooks/useFlag";

import { Filters } from "../types";
import { initialCatalogState, stonesReducer } from "./helpers";

interface Props {
  filters: Filters;
}

const useCatalogProducts = ({ filters }: Props) => {
  const {
    page,
    pageSize,
    searchQuery,
    sortBy,
    // groupBy,
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
  }, [selectedType, selectedShape, selectedClarity, selectedColor]);

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
  }, [page, pageSize, searchQuery]);

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
  }, [sortBy]);

  // useEffect(() => {
  //   console.log("groupBy", groupBy);
  //
  //   setLoadingTrue();
  //
  //   dispatch({
  //     type: "group",
  //     payload: {
  //       filters,
  //       // callback: setLoadingFalse
  //     },
  //   });
  //
  //   setLoadingFalse();
  // }, [groupBy]);

  return { isLoading, catalogState };
};

export { useCatalogProducts };
