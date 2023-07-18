import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import "./supplier.css";
import Pagination from "@mui/material/Pagination";
import DashboardDrawer from "./drawer.jsx";
import Snackbar from "@mui/material/Snackbar";

// import FlagIcon from "react-icons/FlagIcon";

export default function Supplier() {
  const [files, setFiles] = useState([]);
  const [states, setStates] = useState(1);
  const [currentFile, setCurrentFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [fileData1, setFileData1] = useState([]);
  const [fileDataHead, setFileDataHead] = useState();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [maxColumns] = useState(5); // Maximum number of columns to display
  const [uploadDate, setUploadDate] = useState(null); // Upload date state
  const [selectedRows, setSelectedRows] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchDocs = async () => {
    await fetch("http://localhost:3000/supplier_documents")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.data);
      });
    console.log(fileData);
  };

  const fetchDoc = async (id) => {
    await fetch(`http://localhost:3000/supplier_documents/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFileData(data.data);
      });
    console.log(fileData);
  };

  const SaveDocument = async (file) => {
    const supplier_res = await fetch("http://localhost:3000/suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payload: {
          name: "Main Supplier 1",
        },
      }),
    });
    const sup = await supplier_res.json();

    if (sup.success) {
      const randomNum = Math.floor(Math.random() * 10000);
      const sup_doc_res = await fetch(
        "http://localhost:3000/supplier_documents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: {
              reference_no: `REF-${randomNum}`,
              effective_date: new Date().toISOString().split("T")[0],
              supplier_id: sup.data.id,
            },
          }),
        }
      );

      const sup_doc = await sup_doc_res.json();

      if (sup_doc.success) {
        setStates(states + 1);
        await handleFileClick2(file, sup_doc);
      }
    }
  };

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

  const handleFileClick = async (file) => {
    if (file.name) {
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
        const columnsToDisplay = [1, 3, 6, 12, 10, 11, 12, 13]; // Example: Displaying columns 0, 3, 6, and 7
        const limitedData = data.map((row) =>
          columnsToDisplay.map((colIndex) => row[colIndex])
        );

        // Set the file data
        setFileDataHead(limitedData[0]);
        setFileData(limitedData.splice(1));
      };
      reader.onerror = (event) => {
        console.error("Error reading file:", event.target.error);
      };
      reader.readAsBinaryString(file);
    } else {
      await setCurrentFile(file);
      await fetchDoc(file.id);
      setStates(states + 1);
    }
  };

  const handleFileClick2 = async (file, sup_doc) => {
    // setCurrentFile(file);
    var dataFile = [];
    // Read the file data
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Specify the desired columns to display
      const columnsToDisplay = [1, 3, 6, 12, 10, 11, 13]; // Example: Displaying columns 0, 3, 6, and 7
      const limitedData = data.map((row) =>
        columnsToDisplay.map((colIndex) => row[colIndex])
      );
      dataFile = limitedData.splice(1);
      await setFileData1(limitedData.splice(1));
      await setStates(states + 1);
    };

    setTimeout(async () => {
      for (const data of dataFile) {
        try {
          const response = await fetch(
            "http://localhost:3000/supplier_item_requests",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payload: {
                  item_code: data[0],
                  item_description: data[1],
                  dimensions: data[2],
                  price_per_pc: data[3],
                  base_unit: data[4],
                  target_unit: data[5],
                  currency: data[6].toString(),
                  supplier_document_id: sup_doc.data.id,
                },
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to create supplier document");
          }

          const result = await response.json();

          // Process the result if needed

          console.log("Supplier document created:", result);
        } catch (error) {
          console.error("Error creating supplier document:", error);
          // Handle the error
        }
      }
    }, 300);
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

  const handleRejectedStatus = () => {
    const updatedData = fileData.filter(
      (_, index) => index === 0 || !selectedRows.includes(index)
    );
    setFileData(updatedData);
    setSelectedRows([]);
  };
  const handleApprovedStatus = async () => {
    const response = await fetch(
      `http://localhost:3000/supplier_documents/${currentFile.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: {
            status: "approved",
          },
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      openSnackbar("Document approved successfully"); // Open the Snackbar with the success message // Open the Snackbar with the error message
    } else {
      openSnackbar(res.data);
    }
  };
  const handleNegotiatedStatus = async () => {
    const updatedData = fileData.map((row, index) => {
      if (selectedRows.includes(index)) {
        return { ...row, status: "Negotiated" };
      }
      return row;
    });
    setFileData(updatedData);
  };

  const handleHeaderCheckboxChange = (event) => {
    if (event.target.checked) {
      const allRows = Array.from(
        { length: paginatedFileData.length },
        (_, index) => index
      );
      setSelectedRows(allRows);
    } else {
      setSelectedRows([]);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const renderTablePage = () => (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />

      <DashboardDrawer />

      <div className="inB">
        <div className="header-container">
          <h1>SUPPLIER PRICE LIST</h1>
          <div className="upload-date-container">
            <p className="upload-date">
              Upload Date:{" "}
              {uploadDate && uploadDate.toDateString()
                ? uploadDate && uploadDate.toDateString()
                : currentFile.created_at}
            </p>
          </div>
        </div>
        <div className="table-container">
          {currentFile &&
            fileData &&
            fileData.length > 0 &&
            (currentFile.name ? (
              <TableContainer component={Paper} sx={{ marginTop: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="excel table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        className="table-cell"
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                          width: "40px",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedRows.length === paginatedFileData.length
                          }
                          onChange={handleHeaderCheckboxChange}
                        />
                      </TableCell>
                      {fileDataHead.map((header, index) => (
                        <TableCell
                          key={index}
                          className="table-cell"
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "#04184B",
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
                              className={`table-cell ${
                                rowIndex === 0 ? "first-row" : ""
                              }`}
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
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Item Code
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Item Description
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Dimensions
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Price per PC
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Base Unit
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Target Unit
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#04184B",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Currency
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.item_code}</TableCell>
                        <TableCell>{item.item_description}</TableCell>
                        <TableCell>{item.dimensions}</TableCell>
                        <TableCell>{item.price_per_pc}</TableCell>
                        <TableCell>{item.base_unit}</TableCell>
                        <TableCell>{item.target_unit}</TableCell>
                        <TableCell>{item.currency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          {fileData.length > rowsPerPage && (
            <Pagination
              count={Math.ceil(fileData.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "center",
              }}
            />
          )}
          <div className="button-container">
            <Button
              sx={{ backgroundColor: "green", margin: "5px" }}
              variant="contained"
              onClick={handleApprovedStatus}
            >
              Approve
            </Button>
            <Button
              sx={{ backgroundColor: "#8B0000", margin: "5px" }}
              variant="contained"
              onClick={handleRejectedStatus}
            >
              Reject
            </Button>
            <Button
              sx={{ backgroundColor: "gray", margin: "5px" }}
              variant="contained"
              onClick={handleNegotiatedStatus}
            >
              Negotiate
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  const renderHomePage = () => (
    <>
      <DashboardDrawer />
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
                <TableCell
                  sx={{
                    backgroundColor: "#04184B",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Reference No.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#04184B",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Upload Date
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "#04184B",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Status
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "#04184B",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Effective Date
                </TableCell>

                <TableCell
                  sx={{
                    backgroundColor: "#04184B",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    padding: "8px",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file, index) => (
                <TableRow
                  key={index}
                  // onClick={() => handleFileClick(file)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>
                    {file.reference_no ? file.reference_no : file.name}
                  </TableCell>
                  <TableCell>
                    {file.created_at
                      ? file.created_at
                      : uploadDate && uploadDate.toDateString()}
                  </TableCell>
                  <TableCell>
                    {file.status ? file.status : "Pending Save"}
                  </TableCell>
                  <TableCell>
                    {file.effective_date
                      ? file.effective_date
                      : new Date().toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    {file.name ? (
                      <Button
                        onClick={() => SaveDocument(file)}
                        variant="contained"
                        color="primary"
                      >
                        SAVE
                      </Button>
                    ) : (
                      ""
                    )}
                    <div className="space" style={{ width: "10px" }}></div>
                    {file.reference_no ? (
                      <Button
                        onClick={() => handleFileClick(file)}
                        variant="contained"
                        color="secondary"
                      >
                        VIEW
                      </Button>
                    ) : (
                      ""
                    )}
                  </TableCell>
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
