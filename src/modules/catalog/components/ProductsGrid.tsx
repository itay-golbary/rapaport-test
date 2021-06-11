import React, { FC, useMemo } from "react";

import { Table } from "../../../components/Table";
import { Cell, Row } from "../../../components/Table/types";
import { Stones } from "../../stones/types";
import { Pagination } from "../../../components/Pagination";

interface Props {
  products: Stones;
  count: number;
  page?: number | null;
  pageSize?: number | null;
  onChangePage: (value: number) => void;
  onChangePageSize: (value: number) => void;
}

const columns: Cell[] = [
  { key: "type", text: "Type" },
  { key: "shape", text: "Shape" },
  { key: "clarity", text: "Clarity" },
  { key: "color", text: "Color" },
];

const ProductsGrid: FC<Props> = ({
  products,
  count,
  page,
  pageSize,
  onChangePage,
  onChangePageSize,
}) => {
  const rows: Row[] = useMemo(() => {
    const state: Row[] = [];

    products.forEach((product) => {
      const cells: Cell[] = [];

      columns.forEach(({ key }) => {
        cells.push({ key, text: product[key] });
      });

      state.push({ key: product.id.toString(), cells });
    });

    return state;
  }, [products]);

  return (
    <div>
      <Table columns={columns} rows={rows} />
      <Pagination
        count={count}
        page={page ?? 0}
        rowsPerPage={pageSize ?? 10}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangePageSize}
      />
    </div>
  );
};

export { ProductsGrid };
