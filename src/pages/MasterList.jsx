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
import { fetchML } from "../api.js";
import NavBar from "./NavBar.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Chart from './chart.jsx'
import DashboardDrawer from "./drawer"
import FlagIcon from '@mui/icons-material/Flag';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";


const mockData = [
  {
    id: 1,
    item: {
      item_code: "ABC123",
      item_name: "Item 1",
      item_description: "Item 1 description",
      dimensions: "10x10",
      article_group: "Group A",
      weight: 0.5,
      unit_measure: "kg",
      currency: "USD",
      decor_code:'Am342',
      valid_from_new_purchase: "2023-07-01",
    },
    pricing: {
      old_purchase_price: 10.99,
      new_purchase_price: 12.99,
      valid_from_old_purchase: "2023-07-01",
      valid_from_new_purchase: "2023-08-01"
    }
  },
  {
    id: 2,
    item: {
      item_code: "DEF456",
      item_name: "Item 2",
      item_description: "Item 2 description",
      dimensions: "20x20",
      article_group: "Group B",
      weight: 1.0,
      unit_measure: "kg",
      currency: "USD",
      decor_code:'Am7842',
      valid_from_new_purchase: "2023-08-01",
      
    },
    pricing: {
      old_purchase_price: 8.99,
      new_purchase_price: 8.99,
      valid_from_old_purchase: "2023-07-01",
      valid_from_new_purchase: "2023-08-01"
    }
  }

];


export default function MasterList() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchML();
  //     setData(response);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    setData(mockData);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = () => {
    
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
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
    
      
      <DashboardDrawer/>
      
      <div
        className="inB"
        style={{ margin: "65px"}}
      >
        <h1>MASTER PRICE LIST</h1>
        <div style={{ display: "flex", alignItems: "center" , margin:'10px'}}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            variant="outlined"
            style={{ marginRight: "10px" }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon sx={{
              bgcolor: "#04184B",
              borderRadius: "4px",
              padding: "14px",
              color: "#fff"
            }} />
          </IconButton>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow  >
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Item Code</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Decor Code</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Item Name</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Item Description</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Dimensions</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Article Group</TableCell>

                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Weight</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Unit of Measure</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Currency</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Current Price</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>New Price</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}>Price Valid From</TableCell>
                <TableCell sx={{ backgroundColor: "#04184B", color: "#fff" }}></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.item.id}
                  onClick={() => handleRowClick(row)}
                >
                  
                  <TableCell>{row.item.item_code}</TableCell>
                  <TableCell>{row.item.decor_code}</TableCell>
                  <TableCell>{row.item.item_name}</TableCell>
                  <TableCell>{row.item.item_description}</TableCell>
                  <TableCell>{row.item.dimensions}</TableCell>
                  <TableCell>{row.item.article_group}</TableCell>

                  <TableCell>{row.item.weight}</TableCell>
                  <TableCell>{row.item.unit_measure}</TableCell>
                  <TableCell>{row.item.currency}</TableCell>
                  <TableCell>{row.pricing.old_purchase_price}</TableCell>
                  <TableCell>{row.pricing.new_purchase_price}</TableCell>
                  <TableCell>{row.item.valid_from_new_purchase}</TableCell>
                  {row.pricing.old_purchase_price !== row.pricing.new_purchase_price  && (
                    <TableCell>
                      {/* <span style={{ color: "red" }}>Flag</span> */}
                      <FlagIcon  style={{ color: "red" }} />
                    </TableCell> )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>

        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>Pricing Details</DialogTitle>
          <DialogContent>
            {selectedItem && (
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Old Purchase Price:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.old_purchase_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid from Old Purchase:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.valid_from_old_purchase}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Purchase Price:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.new_purchase_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid from New Purchase:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.valid_from_new_purchase}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Valid to New Purchase:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.valid_to_new_purchase}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Old Retail Price:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.old_retail_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.new_retail_price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price Valid from:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.new_retail_price_valid_from}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      New Retail Price Valid to:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.new_retail_price_valid_to}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Change in Percentage:
                    </TableCell>
                    <TableCell>{selectedItem.pricing.change_in_percentage}</TableCell>
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
