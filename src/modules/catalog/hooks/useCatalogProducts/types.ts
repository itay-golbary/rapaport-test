import { Stones } from "../../../stones/types";
import { Filters } from "../../types";

// type Callback = () => void;

export type HandleChangeCatalog = (
  state: CatalogState,
  filters: Filters
  // callback: Callback
) => CatalogState;

export interface CatalogState {
  initial: Stones;
  filtered: Stones;
  searched: Stones;
  sorted: Stones;
  paginated: Stones;
}

export type CatalogReducerAction = {
  type: "filter" | "search" | "sort" | "paginate";
  payload: {
    filters: Filters;
    // callback: Callback;
  };
};
