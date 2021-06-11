import React, { FC, useMemo } from "react";
import { Paper } from "@material-ui/core";

import { Table } from "../../../components/Table";
import { Cell, Row } from "../../../components/Table/types";
import { Stones } from "../../stones/types";
import { Pagination } from "../../../components/Pagination";
import { StyledProductsGrid } from "./types";

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

const CatalogProductsGrid: FC<Props> = ({
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
    <StyledProductsGrid>
      <Table columns={columns} rows={rows} />

      <Paper className="ProductsGrid__paginationContainer">
        <Pagination
          count={count}
          page={page ?? 0}
          rowsPerPage={pageSize ?? 10}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangePageSize}
        />
      </Paper>
    </StyledProductsGrid>
  );
};

export { CatalogProductsGrid };
