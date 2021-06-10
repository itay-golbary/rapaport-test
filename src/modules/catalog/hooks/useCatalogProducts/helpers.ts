import Fuse from "fuse.js";

import {
  CatalogReducerAction,
  CatalogState,
  HandleChangeCatalog,
} from "./types";
import stones from "../../../stones";
import { Stone, Stones } from "../../../stones/types";

const initialCatalogState: CatalogState = {
  initial: stones,
  filtered: [],
  searched: [],
  sorted: [],
};

const handleFilterCatalog: HandleChangeCatalog = (
  { initial },
  filters
  // callback
) => {
  const newState = {
    ...initialCatalogState,
    initial: initial,
    filtered: initial.filter(
      ({ type, shape, clarity, color }) =>
        (!filters.selectedType || type === filters.selectedType) &&
        (!filters.selectedShape || shape === filters.selectedShape) &&
        (!filters.selectedClarity || clarity === filters.selectedClarity) &&
        (!filters.selectedType ||
          filters.selectedType !== "Diamond" ||
          color === filters.selectedColor)
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
  const fuse = new Fuse(filtered, {
    findAllMatches: true,
    keys: ["type", "shape", "clarity", "color"],
  });

  const searched: Stones = filters.searchQuery
    ? fuse.search(filters.searchQuery).map(({ item }) => item)
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
  { initial, filtered, searched, ...state },
  filters
  // callback
) => {
  const sorted = handleSortStones(searched, filters.sortBy);

  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
    sorted,
  };

  // return handleGroupCatalog(newState, filters);
  // return handleGroupCatalog(newState, filters, callback);

  // callback();

  return newState;
};

// const handleGroupCatalog: HandleChangeCatalog = (
//   { sorted, ...state },
//   filters
//   // callback
// ) => {
//   const newState = {
//     ...state,
//     sorted,
//     grouped: [sorted], // TODO: group
//   };
//
//   // callback();
//
//   return newState;
// };

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
    // case "group": {
    //   return handleGroupCatalog(
    //     state,
    //     filters
    //     // callback
    //   );
    // }
    default: {
      return state;
    }
  }
};

export { stonesReducer, initialCatalogState };
