import React, { FC, useMemo } from "react";

import { Table } from "../../../components/Table";
import { Cell } from "../../../components/Table/types";
import { Stones } from "../../stones/types";

interface Props {
  products: Stones;
}

const columns: Cell[] = [
  { key: "type", text: "Type" },
  { key: "shape", text: "Shape" },
  { key: "clarity", text: "Clarity" },
  { key: "color", text: "Color" },
];

const ProductsGrid: FC<Props> = ({ products }) => {
  const rows: Cell[][] = useMemo(() => {
    const state: Cell[][] = [];

    products.forEach((product) => {
      const row: Cell[] = [];

      columns.forEach(({ key }) => {
        row.push({ key, text: product[key] });
      });

      state.push(row);
    });

    return state;
  }, [products]);

  return <Table columns={columns} rows={rows} />;
};

export { ProductsGrid };
