import { useQueryState } from "./useQueryState";
import { Clarity, DiamondColor, Shape, StoneType } from "../../stones/types";

const useCatalogFilters = () => {
  const [page, onChangePage] = useQueryState("page", 0);
  const [pageSize, onChangePageSize] = useQueryState("pageSize", 10);

  const [searchQuery, onChangeSearchQuery] = useQueryState("query", "");

  const [selectedType, onChangeSelectedType] = useQueryState(
    "type",
    "" as StoneType
  );
  const [selectedShape, onChangeSelectedShape] = useQueryState(
    "shape",
    "" as Shape
  );
  const [selectedClarity, onChangeSelectedClarity] = useQueryState(
    "clarity",
    "" as Clarity
  );
  const [selectedColor, onChangeSelectedColor] = useQueryState(
    "color",
    "" as DiamondColor
  );

  return {
    filters: {
      page,
      pageSize,

      searchQuery,

      selectedType,
      selectedShape,
      selectedClarity,
      selectedColor,
    },
    handlers: {
      onChangePage,
      onChangePageSize,

      onChangeSearchQuery,

      onChangeSelectedType,
      onChangeSelectedShape,
      onChangeSelectedClarity,
      onChangeSelectedColor,
    },
  };
};

export { useCatalogFilters };
