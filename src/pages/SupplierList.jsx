import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import NavBar from "./NavBar.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import * as XLSX from "xlsx";
import "./supplier.css";

export default function SupplierList() {
  const [data, setData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [page, setPage] = useState(1);
  const maxColumns = 5; // Maximum number of columns to display
  const columnsPerPage = maxColumns; // Number of columns to display per page

  const fetchData = async () => {
    // Fetch data from API or other data source
    // Replace this with your own data fetching logic
    // const response = await fetchSL();
    // setData(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const columnNames = excelData.shift(); // Remove and store the first row as column names
      setData(excelData);
      setColumnNames(columnNames);
    };

    reader.onerror = (event) => {
      console.error("Error reading file:", event.target.error);
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(columnNames.length / columnsPerPage);
  const paginatedColumns = columnNames.slice(
    (page - 1) * columnsPerPage,
    page * columnsPerPage
  );
  const paginatedRows = data.map((row) =>
    row.filter((_, index) => paginatedColumns.includes(columnNames[index]))
  );

  const noRowsAvailable = data.length === 0;

  return (
    <>
      <NavBar />
      <div className="inB" style={{ margin: "45px" }}>
        <h1>SUPPLIER PRICE LIST</h1>
        <input type="file" onChange={handleFileUpload} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {paginatedColumns.map((columnName, index) => (
                  <TableCell
                    key={index}
                    className="table-cell"
                    style={{
                      backgroundColor: "blue",
                      color: "#fff",
                    }}
                  >
                    {columnName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {noRowsAvailable ? (
                <TableRow>
                  <TableCell colSpan={paginatedColumns.length}>
                    No rows available
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                  <TableRow key={index}>
                    {paginatedColumns.map((column, cellIndex) => {
                      const cellValue = row[cellIndex] || "";
                      return (
                        <TableCell key={cellIndex} className="table-cell">
                          {cellValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </>
  );
}
