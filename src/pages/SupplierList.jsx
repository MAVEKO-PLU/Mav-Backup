import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import NavBar from "./NavBar.jsx";
import * as XLSX from "xlsx";
import "./supplier.css";
import Pagination from "@mui/material/Pagination";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PackageIcon from "@mui/icons-material/LocalShipping";
import TextField from "@mui/material/TextField";
import UpdateIcon from "@mui/icons-material/Update";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DashboardDrawer from "./drawer"
import CheckIcon from "@mui/icons-material/Check";
import RejectIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";

const mockData = [
  {
    item: {
      id: 1,
      reference_No: "REF001",
      Supplier_Name: "Supplier 1",
      Received_date: "2023-07-01",
      status: "pending",
    },
    pricing: {
      effective_as_of: "2023-08-01",
    },
  },
  {
    item: {
      id: 2,
      reference_No: "REF002",
      Supplier_Name: "Supplier 2",
      Received_date: "2023-07-02",
      status: "pending",
    },
    pricing: {
      effective_as_of: "2023-08-01",
    },
  },
  // Add more items as needed
];


export default function SupplierList() {
  const [data, setData] = useState(mockData);
  const [state, setState] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileData, setFileData] = useState([]);



  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [maxColumns] = useState(5); // Maximum number of columns to display
  const [uploadDate, setUploadDate] = useState(null); // Upload date state
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];


    // Update the file list
    setFiles((prevFiles) => [...prevFiles, file]);

    // Read the file data
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });


      // Perform any desired logic with the file data
      console.log("Uploaded File:", file.name);
      console.log("File Data:", data);


  
  const handleTick = (row) => {
    if (row.item.status === 'pending'|| row.item.status === 'Rejected') {
      const updatedRow = { ...row, item: { ...row.item, status: 'Approved' } };
  
      axios
        .put('/api/items/' + row.item.id, { status: 'Approved' })
        .then(response => {
          // Handle success response if needed
        })
        .catch(error => {
          // Handle error if needed
        });
  
      setData(prevData => {
        const updatedData = prevData.map(prevRow => {
          if (prevRow.item.id === row.item.id) {
            return updatedRow;
          }
          return prevRow;
        });
        return updatedData;
      });
    }
  };
  const handleReject = (row) => {
    if (row.item.status === 'pending' || row.item.status === 'Approved') {
      const updatedRow = { ...row, item: { ...row.item, status: 'Rejected' } };
  
      axios
        .put('/api/items/' + row.item.id, { status: 'Rejected' })
        .then(response => {
          // Handle success response if needed
        })
        .catch(error => {
          // Handle error if needed
        });
  
      setData(prevData => {
        const updatedData = prevData.map(prevRow => {
          if (prevRow.item.id === row.item.id) {
            return updatedRow;
          }
          return prevRow;
        });
        return updatedData;
      });
    }
  };
  const handleIconClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);

      // Set the upload date
      setUploadDate(new Date());
    };
    reader.onerror = (event) => {
      console.error("Error reading file:", event.target.error);
    };
    reader.readAsBinaryString(file);

  };

  const handleFileClick = (file) => {
    setCurrentFile(file);

    // Read the file data
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Specify the desired columns to display
      const columnsToDisplay = [0, 3, 6, 7]; // Example: Displaying columns 0, 3, 6, and 7
      const limitedData = data.map((row) =>
        columnsToDisplay.map((colIndex) => row[colIndex])
      );

      // Set the file data
      setFileData(limitedData);
    };
    reader.onerror = (event) => {
      console.error("Error reading file:", event.target.error);
    };
    reader.readAsBinaryString(file);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedFileData = fileData.slice(startIndex, endIndex);

  const handleRowSelect = (rowIndex) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  const handleRejectClick = () => {
    const updatedData = fileData.filter((_, index) => index === 0 || !selectedRows.includes(index));
    setFileData(updatedData);
    setSelectedRows([]);
  };

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const allRows = Array.from({ length: paginatedFileData.length }, (_, index) => index);
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  const renderTablePage = () => (
    <>
      <NavBar />
      <div className="inB">
        <h1>SUPPLIER PRICE LIST</h1>
        <div className="upload-date-container">
          <p className="upload-date">Upload Date: {uploadDate && uploadDate.toDateString()}</p>
        </div>
        {currentFile && fileData && fileData.length > 0 && (
          <TableContainer component={Paper} sx={{ marginTop: 16 }}>
            <Table sx={{ minWidth: 650 }} aria-label="excel table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className="table-cell"
                    style={{
                      backgroundColor: "#063970",
                      color: "#fff",
                      fontWeight: "bold",
                      width: "40px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRows.length === paginatedFileData.length}
                      onChange={handleHeaderCheckboxChange}
                    />
                  </TableCell>
                  {fileData[0].map((header, index) => (
                    <TableCell
                      key={index}
                      className="table-cell"
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#063970",
                        color: "#fff",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(rowsPerPage)
                  .fill()
                  .map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell className="table-cell">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(rowIndex)}
                          onChange={() => handleRowSelect(rowIndex)}
                        />
                      </TableCell>
                      {fileData[0].map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className={`table-cell ${rowIndex === 0 ? "first-row" : ""}`}
                          style={{
                            border: "1px solid #000",
                            padding: "8px",
                          }}
                        >
                          {paginatedFileData[rowIndex]?.[colIndex]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {fileData.length > rowsPerPage && (
          <Pagination
            count={Math.ceil(fileData.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
          />
        )}
        <div className="button-container">
          <button className="approve-button">Approve</button>
          <button className="reject-button" onClick={handleRejectClick}>
            Reject
          </button>
          <button className="negotiate-button">Negotiate</button>
        </div>
      </div>
    </>
  );

  const renderHomePage = () => (
    <>
      <NavBar />
      <div className="inB">
        <h1>SUPPLIER PRICE LIST</h1>
        <div className="upload-container">
          <input
            id="upload-input"
            className="upload-input"
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="upload-input">
            <Button component="span" className="upload-button">
              Choose File
            </Button>
          </label>
        </div>
        <TableContainer component={Paper} sx={{ maxWidth: 1100 }}>
          <Table sx={{ minWidth: 650 }} aria-label="file table">
            <TableHead>
              <TableRow>

                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                  <PackageIcon sx={{ color: "#fff", paddingTop: "8px", paddingLeft: "8px", }} />
                </TableCell>
             
               <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                Reference No
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                 Supplier Name
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
               Received Date
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                  Effective as Of
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                Status
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>
                 Actions

                <TableCell
                  sx={{
                    backgroundColor: "#063970",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  File Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#063970",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Upload Date

                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {files.map((file, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleFileClick(file)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{uploadDate && uploadDate.toDateString()}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );

  return currentFile ? renderTablePage() : renderHomePage();
}
