import React, { FC } from "react";
import {
  Table as MaterialTable,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

import { Cell, Row } from "./types";

const TableHeight = window.innerHeight - 49;

interface Props {
  columns: Cell[];
  rows: Row[];
}

const Table: FC<Props> = ({ columns, rows }) => {
  return (
    <Paper style={{ width: "100%" }}>
      <TableContainer style={{ height: TableHeight }}>
        <MaterialTable stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(({ key, text }) => (
                <TableCell key={key}>{text}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map(({ key, cells }) => (
              <TableRow hover key={key}>
                {cells.map(({ key, text }) => (
                  <TableCell key={key}>{text}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Paper>
  );
};

export { Table };
