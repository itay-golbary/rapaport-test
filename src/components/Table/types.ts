import { Stone } from "../../modules/stones/types";

export interface Cell {
  key: Exclude<keyof Stone, "id">;
  text?: string;
}

export interface Row {
  key: string;
  cells: Cell[];
}
