import { useQueryParams, NumberParam, StringParam } from "use-query-params";
import { useCallback, useMemo } from "react";
import {
  Clarity,
  DiamondColor,
  Shape,
  Stone,
  StoneType,
} from "../../stones/types";
import { Filters } from "../types";

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

  const handleChangePage = useCallback(
    (newValue: number) => {
      onChangeState({ page: newValue });
    },
    [onChangeState]
  );

  const handleChangePageSize = useCallback(
    (newValue: number) => {
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

  const handleChangeSearchQuery = useCallback(
    (newValue?: string | null) => {
      onChangeState({ page: 0, query: newValue });
    },
    [onChangeState]
  );

  const handleChangeSelectedType = useCallback(
    (newValue?: StoneType | null) => {
      if (newValue !== "Diamond" && selectedColor) {
        onChangeState({ page: 0, type: newValue, color: undefined });
      } else {
        onChangeState({ page: 0, type: newValue });
      }
    },
    [selectedColor, onChangeState]
  );

  const handleChangeSelectedShape = useCallback(
    (newValue?: Shape | null) => {
      onChangeState({ page: 0, shape: newValue });
    },
    [onChangeState]
  );

  const handleChangeSelectedClarity = useCallback(
    (newValue?: Clarity | null) => {
      onChangeState({ page: 0, clarity: newValue });
    },
    [onChangeState]
  );

  const handleChangeSelectedColor = useCallback(
    (newValue?: DiamondColor | null) => {
      onChangeState({ page: 0, color: newValue });
    },
    [onChangeState]
  );

  const handleChangeSortBy = useCallback(
    (newValue?: Exclude<keyof Stone, "id"> | null) => {
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
    },
  };
};

export { useCatalogFilters };
