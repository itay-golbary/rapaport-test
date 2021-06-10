import {
  CatalogReducerAction,
  CatalogState,
  HandleChangeCatalog,
} from "./types";
import stones from "../../../stones";
import Fuse from "fuse.js";
import { Stones } from "../../../stones/types";

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
  const sortKey = filters.sortBy ?? "type";

  const fuse = new Fuse(filtered, {
    // shouldSort: true,
    findAllMatches: true,
    sortFn: (a, b) => (a.item[sortKey] ? 1 : -1),
    keys: ["type", "shape", "clarity", "color"],
  });

  const searched: Stones = filters.searchQuery
    ? fuse.search(filters.searchQuery).map(({ item }) => item) // type issue with library
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
  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
    sorted: searched, // TODO: sort
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
