import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import NavBar from "./NavBar.jsx";
import * as XLSX from "xlsx";
import "./supplier.css";
import Pagination from "@mui/material/Pagination";

function FileTable({ files, handleFileClick, uploadDate }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1100 }}>
      <Table sx={{ minWidth: 650 }} aria-label="file table">
        <TableHead>
          <TableRow>
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
  );
}

export default function Supplier() {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [maxColumns] = useState(5); // Maximum number of columns to display
  const [uploadDate, setUploadDate] = useState(null); // Upload date state

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
                  {fileData[0].map((header, index) => (
                    <TableCell
                      key={index}
                      className="table-cell"
                      sx={{
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
                      {fileData[0].map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          className="table-cell"
                          sx={{
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
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          />
        )}
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
        <FileTable files={files} handleFileClick={handleFileClick} uploadDate={uploadDate} />
      </div>
    </>
  );

  return currentFile ? renderTablePage() : renderHomePage();
}
