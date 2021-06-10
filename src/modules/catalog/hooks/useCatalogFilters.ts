import { useQueryParam, NumberParam, StringParam } from "use-query-params";
import { useCallback, useEffect, useMemo } from "react";
import { StoneType } from "../../stones/types";
import { Filters } from "./types";

const useCatalogFilters = () => {
  const [page, onChangePage] = useQueryParam("page", NumberParam);
  const [pageSize, onChangePageSize] = useQueryParam("pageSize", NumberParam);

  const [searchQuery, onChangeSearchQuery] = useQueryParam(
    "query",
    StringParam
  );

  const [selectedType, onChangeSelectedType] = useQueryParam(
    "type",
    StringParam
  );
  const [selectedShape, onChangeSelectedShape] = useQueryParam(
    "shape",
    StringParam
  );
  const [selectedClarity, onChangeSelectedClarity] = useQueryParam(
    "clarity",
    StringParam
  );
  const [selectedColor, onChangeSelectedColor] = useQueryParam(
    "color",
    StringParam
  );

  useEffect(() => {
    console.log("searchQuery", searchQuery);
  }, [searchQuery]);

  const handleChangeSelectedType = useCallback((newValue: StoneType) => {
    if (newValue !== "Diamond" && selectedColor) {
      onChangeSelectedColor(undefined);
    }

    onChangeSelectedType(newValue);
  }, []);

  const filters: Filters = useMemo(
    () => ({
      page,
      pageSize,

      searchQuery,

      selectedType,
      selectedShape,
      selectedClarity,
      selectedColor,
    }),
    [
      page,
      pageSize,

      searchQuery,

      selectedType,
      selectedShape,
      selectedClarity,
      selectedColor,
    ]
  );

  return {
    filters,
    handlers: {
      onChangePage,
      onChangePageSize,

      onChangeSearchQuery,

      onChangeSelectedType: handleChangeSelectedType,
      onChangeSelectedShape,
      onChangeSelectedClarity,
      onChangeSelectedColor,
    },
  };
};

export { useCatalogFilters };
