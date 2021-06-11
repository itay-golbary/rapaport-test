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

interface Props {
  columns: Cell[];
  rows: Row[];
}

const Table: FC<Props> = ({ columns, rows }) => {
  return (
    <TableContainer component={Paper}>
      <MaterialTable aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ key, text }) => (
              <TableCell key={key}>{text}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(({ key, cells }, index) => (
            <TableRow key={key}>
              {cells.map(({ key, text }) => (
                <TableCell key={key}>{text}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MaterialTable>
    </TableContainer>
  );
};

export { Table };
