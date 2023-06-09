import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function TablePaginationDemo({
  pageChangeHandler,
  rowsPerPageChangeHandler,
  counter,
}) {
  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);
  const [count, setCount] = React.useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChangeHandler(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    rowsPerPageChangeHandler(parseInt(event.target.value));
    pageChangeHandler(0);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[2, 5, 10]}
      component="div"
      count={counter}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
