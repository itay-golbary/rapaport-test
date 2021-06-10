import {
  CatalogReducerAction,
  CatalogState,
  HandleChangeCatalog,
} from "./types";

const initialCatalogState: CatalogState = {
  initial: [],
  filtered: [],
  searched: [],
  sorted: [],
  grouped: [],
};

const handleFilterCatalog: HandleChangeCatalog = (
  { initial },
  filters,
  callback
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

  return handleSearchCatalog(newState, filters, callback);
};

const handleSearchCatalog: HandleChangeCatalog = (
  { initial, filtered },
  filters,
  callback
) => {
  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched: initial, // TODO: search
  };

  return handleSortCatalog(newState, filters, callback);
};

const handleSortCatalog: HandleChangeCatalog = (
  { initial, filtered, searched, ...state },
  filters,
  callback
) => {
  const newState = {
    ...initialCatalogState,
    initial,
    filtered,
    searched,
    sorted: searched, // TODO: sort
  };

  // return handleGroupCatalog(newState, filters, callback);

  callback();

  return newState;
};

const handleGroupCatalog: HandleChangeCatalog = (
  { sorted, ...state },
  filters,
  callback
) => {
  const newState = {
    ...state,
    sorted,
    grouped: [sorted], // TODO: group
  };

  callback();

  return newState;
};

const stonesReducer = (
  state: CatalogState,
  { type, payload: { filters, callback } }: CatalogReducerAction
) => {
  switch (type) {
    case "filter": {
      return handleFilterCatalog(state, filters, callback);
    }
    case "search": {
      return handleSearchCatalog(state, filters, callback);
    }
    case "sort": {
      return handleSortCatalog(state, filters, callback);
    }
    case "group": {
      return handleGroupCatalog(state, filters, callback);
    }
    default: {
      return state;
    }
  }
};

export { stonesReducer, initialCatalogState };
