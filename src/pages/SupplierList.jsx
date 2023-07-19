// import React, { useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import * as XLSX from "xlsx";
// import "./supplier.css";
// import Pagination from "@mui/material/Pagination";
// import DashboardDrawer from "./drawer.jsx";
// // import FlagIcon from "react-icons/FlagIcon";

// export default function Supplier() {
//   const [files, setFiles] = useState([]);
//   const [currentFile, setCurrentFile] = useState(null);
//   const [fileData, setFileData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage] = useState(10);
//   const [maxColumns] = useState(5); // Maximum number of columns to display
//   const [uploadDate, setUploadDate] = useState(null); // Upload date state
//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     // Update the file list
//     setFiles((prevFiles) => [...prevFiles, file]);

//     // Read the file data
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryString = event.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // Perform any desired logic with the file data
//       console.log("Uploaded File:", file.name);
//       console.log("File Data:", data);

//       // Set the upload date
//       setUploadDate(new Date());
//     };
//     reader.onerror = (event) => {
//       console.error("Error reading file:", event.target.error);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleFileClick = (file) => {
//     setCurrentFile(file);

//     // Read the file data
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryString = event.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // Specify the desired columns to display
//       const columnsToDisplay = [0, 3, 6, 7]; // Example: Displaying columns 0, 3, 6, and 7
//       const limitedData = data.map((row) =>
//         columnsToDisplay.map((colIndex) => row[colIndex])
//       );

//       // Set the file data
//       setFileData(limitedData);
//     };
//     reader.onerror = (event) => {
//       console.error("Error reading file:", event.target.error);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const startIndex = (page - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedFileData = fileData.slice(startIndex, endIndex);

//   const handleRowSelect = (rowIndex) => {
//     if (selectedRows.includes(rowIndex)) {
//       setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
//     } else {
//       setSelectedRows([...selectedRows, rowIndex]);
//     }
//   };

//   const handleRejectedStatus = () => {
//     const updatedData = fileData.filter((_, index) => index === 0 || !selectedRows.includes(index));
//     setFileData(updatedData);
//     setSelectedRows([]);
//   };
//   const handleApprovedStatus = async () => {
//     const updatedData = fileData.map((row, index) => {
//       if (selectedRows.includes(index)) {
//         return { ...row, status: "Approved" };
//       }
//       return row;
//     });

//     setFileData(updatedData);
//   };
//   const handleNegotiatedStatus = async () => {
//     const updatedData = fileData.map((row, index) => {
//       if (selectedRows.includes(index)) {
//         return { ...row, status: "Negotiated" };
//       }
//       return row;
//     });
//     setFileData(updatedData);
//   };

//   const handleHeaderCheckboxChange = (event) => {
//     if (event.target.checked) {
//       const allRows = Array.from({ length: paginatedFileData.length }, (_, index) => index);
//       setSelectedRows(allRows);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const renderTablePage = () => (
//     <>
//       <DashboardDrawer />

//       <div className="inB">
//         <div className="header-container">
//           <h1>SUPPLIER PRICE LIST</h1>
//           <div className="upload-date-container">
//             <p className="upload-date">Upload Date: {uploadDate && uploadDate.toDateString()}</p>
//           </div>
//         </div>
//         <div className="table-container">
//           {currentFile && fileData && fileData.length > 0 && (
//             <TableContainer component={Paper} sx={{ marginTop: 1 }}>
//               <Table sx={{ minWidth: 650 }} aria-label="excel table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell
//                       className="table-cell"
//                       style={{
//                         backgroundColor: "#04184B",
//                         color: "#fff",
//                         fontWeight: "bold",
//                         width: "40px",
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.length === paginatedFileData.length}
//                         onChange={handleHeaderCheckboxChange}
//                       />
//                     </TableCell>
//                     {fileData[0].map((header, index) => (
//                       <TableCell
//                         key={index}
//                         className="table-cell"
//                         style={{
//                           fontWeight: "bold",
//                           backgroundColor: "#04184B",
//                           color: "#fff",
//                         }}
//                       >
//                         {header}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {Array(rowsPerPage)
//                     .fill()
//                     .map((_, rowIndex) => (
//                       <TableRow key={rowIndex}>
//                         <TableCell className="table-cell">
//                           <input
//                             type="checkbox"
//                             checked={selectedRows.includes(rowIndex)}
//                             onChange={() => handleRowSelect(rowIndex)}
//                           />
//                         </TableCell>
//                         {fileData[0].map((_, colIndex) => (
//                           <TableCell
//                             key={colIndex}
//                             className={`table-cell ${rowIndex === 0 ? "first-row" : ""}`}
//                             style={{
//                               border: "1px solid #000",
//                               padding: "8px",
//                             }}
//                           >
//                             {paginatedFileData[rowIndex]?.[colIndex]}
//                           </TableCell>
                          
//                         )
                      
                         
//                         )}
                        
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//           {fileData.length > rowsPerPage && (
//             <Pagination
//               count={Math.ceil(fileData.length / rowsPerPage)}
//               page={page}
//               onChange={handleChangePage}
//               style={{ marginTop: 16, display: "flex", justifyContent: "center" }}
//             />
//           )}
//           <div className="button-container">
//             <Button
//               sx={{ backgroundColor: "green", margin: "5px" }}
//               variant="contained"
//               onClick={handleApprovedStatus}
//             >
//               Approve
//             </Button>
//             <Button
//               sx={{ backgroundColor: "#8B0000", margin: "5px" }}
//               variant="contained"
//               onClick={handleRejectedStatus}
//             >
//               Reject
//             </Button>
//             <Button
//               sx={{ backgroundColor: "gray", margin: "5px" }}
//               variant="contained"
//               onClick={handleNegotiatedStatus}
//             >
//               Negotiate
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );

//   const renderHomePage = () => (
//     <>
//       <DashboardDrawer />
//       <div className="inB">
//         <h1>SUPPLIER PRICE LIST</h1>
//         <div className="upload-container">
//           <input
//             id="upload-input"
//             className="upload-input"
//             type="file"
//             accept=".xlsx, .xls"
//             style={{ display: "none" }}
//             onChange={handleFileUpload}
//           />
//           <label htmlFor="upload-input">
//             <Button component="span" className="upload-button">
//               Choose File
//             </Button>
//           </label>
//         </div>
//         <TableContainer component={Paper} sx={{ maxWidth: 1100 }}>
//           <Table sx={{ minWidth: 650 }} aria-label="file table">
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "#04184B",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     border: "1px solid rgba(0, 0, 0, 0.5)",
//                     padding: "8px",
//                   }}
//                 >
//                   File Name
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "#04184B",
//                     color: "#fff",
//                     fontWeight: "bold",
//                     border: "1px solid rgba(0, 0, 0, 0.5)",
//                     padding: "8px",
//                   }}
//                 >
//                   Upload Date
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {files.map((file, index) => (
//                 <TableRow
//                   key={index}
//                   onClick={() => handleFileClick(file)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <TableCell>{file.name}</TableCell>
//                   <TableCell>{uploadDate && uploadDate.toDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </>
//   );

//   return currentFile ? renderTablePage() : renderHomePage();
// }
