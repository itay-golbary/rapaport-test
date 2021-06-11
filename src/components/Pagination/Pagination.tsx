import React, { FC, useCallback } from "react";
import { TablePagination } from "@material-ui/core";

interface Props {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (value: number) => void;
  onChangeRowsPerPage: (value: number) => void;
}

const Pagination: FC<Props> = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
      onChangePage(page);
    },
    [onChangePage]
  );

  const handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = useCallback(
    (event) => {
      const { value } = event.target;

      if (value) {
        onChangeRowsPerPage(Number(value));
      }
    },
    [onChangeRowsPerPage]
  );

  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      rowsPerPageOptions={[10, 25, 50, 100]}
    />
  );
};

export { Pagination };
