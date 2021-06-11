import { useCallback, useMemo } from "react";
import { useQueryParams, NumberParam, StringParam } from "use-query-params";

import { FilterHandlers, Filters } from "../types";

const useCatalogFilters = () => {
  const [
    {
      page,
      pageSize,
      query: searchQuery,
      type: selectedType,
      shape: selectedShape,
      clarity: selectedClarity,
      color: selectedColor,
      sortBy,
    },
    onChangeState,
  ] = useQueryParams({
    page: NumberParam,
    pageSize: NumberParam,
    query: StringParam,
    type: StringParam,
    shape: StringParam,
    clarity: StringParam,
    color: StringParam,
    sortBy: StringParam,
  });

  const handleChangePage: FilterHandlers["onChangePage"] = useCallback(
    (newValue) => {
      onChangeState({ page: newValue });
    },
    [onChangeState]
  );

  const handleChangePageSize: FilterHandlers["onChangePageSize"] = useCallback(
    (newValue) => {
      const offset = (page ?? 0) * (pageSize ?? 0);

      if (offset) {
        const newPage = Math.floor(offset / newValue);

        onChangeState({ page: newPage, pageSize: newValue });
      } else {
        onChangeState({ page: 0, pageSize: newValue });
      }
    },
    [page, pageSize, onChangeState]
  );

  const handleChangeSearchQuery: FilterHandlers["onChangeSearchQuery"] =
    useCallback(
      (newValue) => {
        setTimeout(() => {
          onChangeState({ page: 0, query: newValue });
        }, 0);
      },
      [onChangeState]
    );

  const handleChangeSelectedType: FilterHandlers["onChangeSelectedType"] =
    useCallback(
      (newValue) => {
        if (newValue !== "Diamond" && selectedColor) {
          onChangeState({ page: 0, type: newValue, color: undefined });
        } else {
          onChangeState({ page: 0, type: newValue });
        }
      },
      [selectedColor, onChangeState]
    );

  const handleChangeSelectedShape: FilterHandlers["onChangeSelectedShape"] =
    useCallback(
      (newValue) => {
        onChangeState({ page: 0, shape: newValue });
      },
      [onChangeState]
    );

  const handleChangeSelectedClarity: FilterHandlers["onChangeSelectedClarity"] =
    useCallback(
      (newValue) => {
        onChangeState({ page: 0, clarity: newValue });
      },
      [onChangeState]
    );

  const handleChangeSelectedColor: FilterHandlers["onChangeSelectedColor"] =
    useCallback(
      (newValue) => {
        onChangeState({ page: 0, color: newValue });
      },
      [onChangeState]
    );

  const handleChangeSortBy: FilterHandlers["onChangeSortBy"] = useCallback(
    (newValue) => {
      onChangeState({ page: 0, sortBy: newValue });
    },
    [onChangeState]
  );

  const filters: Filters = useMemo(
    () => ({
      page,
      pageSize,

      searchQuery,

      selectedType,
      selectedShape,
      selectedClarity,
      selectedColor,

      sortBy,
    }),
    [
      page,
      pageSize,

      searchQuery,

      selectedType,
      selectedShape,
      selectedClarity,
      selectedColor,

      sortBy,
    ]
  );

  return {
    filters,
    handlers: {
      onChangePage: handleChangePage,
      onChangePageSize: handleChangePageSize,

      onChangeSearchQuery: handleChangeSearchQuery,

      onChangeSelectedType: handleChangeSelectedType,
      onChangeSelectedShape: handleChangeSelectedShape,
      onChangeSelectedClarity: handleChangeSelectedClarity,
      onChangeSelectedColor: handleChangeSelectedColor,

      onChangeSortBy: handleChangeSortBy,
    } as FilterHandlers,
  };
};

export { useCatalogFilters };
