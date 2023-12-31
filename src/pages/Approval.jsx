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
import { fetchSL } from "../api.js";
import NavBar from "./NavBar.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Chart from "./chart.jsx";
import DashboardDrawer from "./drawer.jsx";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import Checkbox from "@mui/material/Checkbox";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import RejectIcon from "@mui/icons-material/HighlightOff";

const mockData = [
  {
    item: {
      id: 1,
      item_code: "ABC001",
      decor_code: "DEC001",
      item_name: "Product 1",
      item_description: "Description of Product 1",
      image: "product1.jpg",
      dimensions: "10x10x10",
      article_group: "Group 1",
      tax_class: "Tax Class 1",
      status: "pending",
      unit: "pcs",
    },
    price: 50,
    pricing: {
      old_purchase_price: 40,
      new_purchase_price: 45,
    },
  },
  {
    item: {
      id: 2,
      status: "pending",
      item_code: "ABC002",
      decor_code: "DEC002",
      item_name: "Product 2",
      item_description: "Description of Product 2",
      image: "product2.jpg",
      dimensions: "20x20x20",
      article_group: "Group 2",
      tax_class: "Tax Class 2",
      unit: "pcs",
    },
    price: 60,
    pricing: {
      old_purchase_price: 55,
      new_purchase_price: 58,
    },
  },
  // Add more items as needed
];

export default function MasterList() {
  const [data, setData] = useState(mockData);
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSL();
      setData(response);
    };

    fetchData();
  }, []);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleApprovedStatus = async () => {
    const updatedRows = data.map((row) => {
      if (row.checked && row.item.status === 'pending') {
        return { ...row, item: { ...row.item, status: 'Approved' } };
      }
      return row;
    });
  
    await setData(updatedRows);
  };
  

  const handleNegotiatedStatus = async () => {
    const updatedRows = data.map((row) => {
      if (row.checked) {
        return { ...row, status: "Pending" };
      }
      return row;
    });
    setData(updatedRows);
  };
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
    if (row.item.status === 'pending' || row.item.status === 'approved') {
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
  

  const handleRejectedStatus = () => {
    const updatedRows = data.map((row) => {
      if (row.checked && row.item.status === 'pending') {
        return { ...row, item: { ...row.item, status: "Rejected" } };
      }
      return row;
    });
  
    setData(updatedRows);
  };
  

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      {/* <NavBar></NavBar> */}

      <DashboardDrawer />
      <div className="inB" style={{ margin: "65px" }}>
        <h1>Supplier Items</h1>
        <h3>12/08/23</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Item Code
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Item Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Item Description
                </TableCell>

                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Old Price
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  New Price
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Unit of Measure
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Status
                </TableCell>

                <TableCell
                  sx={{ backgroundColor: "#04184B", color: "#fff" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.item.id}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{row.item.item_code}</TableCell>

                  <TableCell>{row.item.item_name}</TableCell>
                  <TableCell>{row.item.item_description}</TableCell>

                  <TableCell>{row.pricing.old_purchase_price}</TableCell>
                  <TableCell>{row.pricing.new_purchase_price}</TableCell>
                  <TableCell>{row.item.unit}</TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          sx={{ backgroundColor: "green", margin: "5px" }}
          variant="contained"
          startIcon={<DoneAllIcon />}
          onClick={handleApprovedStatus}
        >
          Approve
        </Button>
        <Button
          sx={{ backgroundColor: "#8B0000", margin: "5px" }}
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={handleRejectedStatus}
        >
          Rejected
        </Button>
        <Button
          sx={{ backgroundColor: "gray", margin: "5px" }}
          variant="contained"
          startIcon={<PeopleOutlineIcon />}
          onClick={handleNegotiatedStatus}
        >
          Negotiate
        </Button>
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
      </div>
    </>
  );
}
