import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@trenchaant/pkg-ui-component-library/build/Components/Paper";
import Table from "@trenchaant/pkg-ui-component-library/build/Components/Table";
import TableBody from "@trenchaant/pkg-ui-component-library/build/Components/TableBody";
import TableCell from "@trenchaant/pkg-ui-component-library/build/Components/TableCell";
import TableContainer from "@trenchaant/pkg-ui-component-library/build/Components/TableContainer";
import TableHead from "@trenchaant/pkg-ui-component-library/build/Components/TableHead";
import TableRow from "@trenchaant/pkg-ui-component-library/build/Components/TableRow";
import { DeleteForever } from "@material-ui/icons";
import ModelUpdate from "./ModelUpdate";
import TablePagination from "@trenchaant/pkg-ui-component-library/build/Components/TablePagination";

const columns = [
  {
    id: "firstname",
    label: "Firstname",
    minWidth: 10,
    maxWidth: 20,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastname",
    label: "Lastname",
    minWidth: 10,
    maxHeight: 10,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 20,
    maxHeight: 10,
    align: "left",
  },
  {
    id: "age",
    label: "Age",
    minWidth: 1,
    maxHeight: 2,
    align: "left",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 10,
    maxHeight: 10,
    align: "left",
  },
];

const useStyles = makeStyles({
  root: {
    width: "60%",
    border: "1px solid",
  },
  container: {
    maxHeight: 400,
    border: "1px solid",
  },
  row: {
    border: "1px solid",
    maxWidth: 10,
    fontSize: 20,
  },
});

export default function StickyHeadTable({
  arr,
  deleteUser,
  updateUser,
  renderHandler,
  setLimitAndPageHandler,
  count,
}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [row, setRow] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setLimitAndPageHandler(rowsPerPage, newPage);
    renderHandler();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setLimitAndPageHandler(event.target.value, 0);
    renderHandler();
    
  };

  useEffect(() => {
    setRow(arr);
  }, [arr]);
  const deletehan = async (_id) => {
    await deleteUser(_id);
    renderHandler();
  };
  const updatehan = async (user) => {
    await updateUser(user);
    renderHandler();
  };

  return (
    <div>
      <Paper className={classes.root} style={{ backgroundColor: "#FFC0CB" }}>
        <TableContainer
          className={classes.container}
          style={{ backgroundColor: "#FFC0CB" }}
        >
          <center>
            <div>
              <Table
                stickyHeader={true}
                hidePagination={true}
                hideTotal={false}
                size={"small"}
                totalRecords={count}
                totalLabel="Records"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{ backgroundColor: "#FFC0CB" }}
                      className={classes.row}
                    >
                      Profile
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#FFC0CB",
                        }}
                        className={classes.row}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{ align: "right", backgroundColor: "#FFC0CB" }}
                      className={classes.row}
                    >
                    
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell
                          style={{ backgroundColor: "#ADD8E6" }}
                          className={classes.row}
                        >
                          <img
                            src={row.profile}
                            style={{
                              height: "70px",
                              width: "70px",
                              borderRadius: "20px ",
                              border: "2px solid",
                            }}
                          ></img>
                        </TableCell>
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <>
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  color: "black",
                                  backgroundColor: "#ADD8E6",
                                  fontSize: 15,
                                }}
                                className={classes.row}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            </>
                          );
                        })}
                        <TableCell
                          style={{ backgroundColor: "#ADD8E6" }}
                          className={classes.row}
                        >
                          <div>
                            <div>
                              <button>
                                <DeleteForever
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    deletehan(row._id);
                                  }}
                                >
                                  delete
                                </DeleteForever>
                              </button>
                              <span>
                                <ModelUpdate
                                  row={row}
                                  updatehan={updatehan}
                                ></ModelUpdate>
                              </span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </center>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
