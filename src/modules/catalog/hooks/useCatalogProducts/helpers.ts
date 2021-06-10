import Fuse from "fuse.js";

import {
  CatalogReducerAction,
  CatalogState,
  HandleChangeCatalog,
} from "./types";
import stones from "../../../stones";
import { Stone, Stones } from "../../../stones/types";

const DEFAULT_PAGE_SIZE = 20;

const initialCatalogState: CatalogState = {
  initial: stones,
  filtered: stones,
  searched: stones,
  sorted: stones,
  paginated: stones,
};

const handleFilterCatalog: HandleChangeCatalog = (
  { initial },
  filters
  // callback
) => {
  const { selectedType, selectedShape, selectedClarity, selectedColor } =
    filters;

  const newState = {
    ...initialCatalogState,
    initial: initial,
    filtered: initial.filter(
      ({ type, shape, clarity, color }) =>
        (!selectedType || type === selectedType) &&
        (!selectedShape || shape === selectedShape) &&
        (!selectedClarity || clarity === selectedClarity) &&
        (!selectedColor ||
          selectedType !== "Diamond" ||
          color === selectedColor)
    ),
  };

  return handleSearchCatalog(
    newState,
    filters
    // callback
  );
};

const handleSearchCatalog: HandleChangeCatalog = (
  { initial, filtered },
  filters
  // callback
) => {
  const { searchQuery } = filters;

  const fuse = new Fuse(filtered, {
    findAllMatches: true,
    keys: ["type", "shape", "clarity", "color"],
  });

  const searched: Stones = searchQuery
    ? fuse.search(searchQuery).map(({ item }) => item)
    : filtered;

  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
  };

  return handleSortCatalog(
    newState,
    filters
    // callback
  );
};

const handleSortCatalog: HandleChangeCatalog = (
  { initial, filtered, searched },
  filters
  // callback
) => {
  const { sortBy } = filters;
  const sorted = handleSortStones(searched, sortBy);

  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
    sorted,
  };

  return handlePaginateCatalog(
    newState,
    filters
    // callback
  );
};

const handlePaginateCatalog: HandleChangeCatalog = (
  { initial, filtered, searched, sorted },
  filters
  // callback
) => {
  const { page, pageSize } = filters;
  const offset = (page ?? 0) * (pageSize ?? DEFAULT_PAGE_SIZE);

  const paginated = sorted.slice(
    offset,
    offset + (pageSize || DEFAULT_PAGE_SIZE)
  );

  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
    sorted,
    paginated,
  };

  // callback();

  return newState;
};

type HandleSortStones = (state: Stones, sortBy?: string | null) => Stones;

const handleSortStones: HandleSortStones = (state, sortBy) => {
  if (
    state.length &&
    sortBy &&
    sortBy !== "id" &&
    Object.keys(state[0]).includes(sortBy)
  ) {
    const sortByKey = sortBy as Exclude<keyof Stone, "id">;

    return state.sort((a, b) => {
      const { [sortByKey]: valueA } = a;
      const { [sortByKey]: valueB } = b;

      const fixA = valueA?.toUpperCase();
      const fixB = valueB?.toUpperCase();

      if (fixA) {
        if (fixB) {
          if (fixA < fixB) {
            return -1;
          } else if (fixA > fixB) {
            return 1;
          } else {
            return 0;
          }
        } else {
          return 1;
        }
      } else {
        if (fixB) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  } else {
    return state;
  }
};

const stonesReducer = (
  state: CatalogState,
  {
    type,
    payload: {
      filters,
      // callback
    },
  }: CatalogReducerAction
) => {
  switch (type) {
    case "filter": {
      return handleFilterCatalog(
        state,
        filters
        // callback
      );
    }
    case "search": {
      return handleSearchCatalog(
        state,
        filters
        // callback
      );
    }
    case "sort": {
      return handleSortCatalog(
        state,
        filters
        // callback
      );
    }
    case "paginate": {
      return handlePaginateCatalog(
        state,
        filters
        // callback
      );
    }
    default: {
      return state;
    }
  }
};

export { stonesReducer, initialCatalogState };
