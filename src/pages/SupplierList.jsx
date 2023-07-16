import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Checkbox from "@mui/material/Checkbox";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { fetchSL, update } from "../api.js";
import NavBar from "./NavBar.jsx";
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
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const rowsPerPage = 10;

  const fetchData = async () => {
    const response = await fetchSL();
    setData(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakerapi.dev/api/products?_quantity=10");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data from Faker API:", error);
      }
    };

    fetchData();
  }, []);

  
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
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleUpdateItem = async (item, newValue, reference) => {
    const yes = await update(item.id, price);
    if (yes) {
      setSnackbarMessage(
        "Item " +
          reference +
          " purchase price has been updated to " +
          price +
          "!"
      );
      setSnackbarOpen(true);

      await fetchData();
      setState(state + 1);
    } else {
      // setSnackbarMessage("Item " + reference + " has  updated!" + price);
      // setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      {/* <NavBar></NavBar> */}
<DashboardDrawer/>
      <div className="inB" style={{ margin: "65px" }}>
        <h1>SUPPLIER PRICE LIST</h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.item.id}>
                  <TableCell>
                    <IconButton onClick={() => handleIconClick(row)}>
                      <PackageIcon />
                    </IconButton>
                  </TableCell>
               
                  <TableCell>{row.item.reference_No}</TableCell>
                  <TableCell>{row.item.Supplier_Name}</TableCell>
                  <TableCell>{row.item.Received_date}</TableCell>
                  <TableCell>{row.pricing.effective_as_of}</TableCell>
                  <TableCell>{row.item.status}</TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleTick(row)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleReject(row)}
                    >
                      <RejectIcon />
                    </IconButton>

                    <Checkbox
          checked={row.checked}
          onChange={() =>
            setData((prevRows) => {
              const updatedRows = prevRows.map((prevRow) => {
                if (prevRow.item.id === row.item.id) {
                  return {
                    ...prevRow,
                    checked: !prevRow.checked,
                  };
                }
                return prevRow;
              });
              return updatedRows;
            })
          }
        />
                  {/* </TableCell>
                  <TableCell>
                  <IconButton onClick={() => handleTick(selectedItem)}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={() => handleReject(selectedItem)}>
                    <RejectIcon />
                  </IconButton>
                </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        id={`input-${row.item.id}`}
                        variant="outlined"
                        size="small"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Newvalue"
                      />
                      <IconButton
                        onClick={(e) =>
                          handleUpdateItem(
                            row.item,
                            e.target.value,
                            row.item.item_code
                          ) */}
                        {/* }
                      >
                        <UpdateIcon />
                      </IconButton>
                    </div> */}
                  </TableCell>
                </TableRow>
              ))}
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
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>

        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Pricing Details</DialogTitle>
          <DialogContent>
            {selectedItem && (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Price in Euro:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.price_in_euro}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Old Purchase Price:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.old_purchase_price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid from Old Purchase:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.valid_from_old_purchase}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Purchase Price:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.new_purchase_price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid from New Purchase:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.valid_from_new_purchase}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid to New Purchase:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.valid_to_new_purchase}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Old Retail Price:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.old_retail_price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.new_retail_price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price Valid from:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.new_retail_price_valid_from}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price Valid to:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.new_retail_price_valid_to}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Change in Percentage:
                    </TableCell>
                    <TableCell>
                      {selectedItem.pricing.change_in_percentage}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity="success"
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
}
