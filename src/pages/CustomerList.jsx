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
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { fetchCL } from "../api.js";
import NavBar from "./NavBar.jsx";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DashboardDrawer from "./drawer"
import FlagIcon from '@mui/icons-material/Flag';


export default function CustomerList() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCL();
      setData(response);
    };

    fetchData();
  }, []);

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

  const handleSearch = async () => {
    try {
      const newData = await fetchCL();
  
      setTimeout(() => {
        const filteredData = newData.filter((row) =>
          (
            String(row.item_code).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.decor_code).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.item_name).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.item_description).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.dimensions).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.article_group).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.tax_class).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.weight).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.pricing.old_retail_price).toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(row.pricing.new_retail_price).toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setData(filteredData); // Update the data with the filtered results
      }, 500);
  
      setPage(1); // Reset the page to the first page
    } catch (error) {
      console.error("Error while searching:", error);
    }
  };
  
  

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      {/* <NavBar></NavBar> */}
      
      <DashboardDrawer/>
      <div className="inB" style={{ margin: "65px" }}>
        <h1>CUSTOMER PRICE LIST</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
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
        <br /> <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='tableheader'> 
              <TableRow>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                  Item Code
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                  Decor Code
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                  Item Name
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#04184B ", color: "#fff" }}
                >
                  Item Description
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                  Dimensions
                </TableCell>
                {/* <TableCell sx={{ backgroundColor: "##04184B ", color: "#fff" }}>
                  Article Group
                </TableCell> */}
                {/* <TableCell sx={{ backgroundColor: "##04184B ", color: "#fff" }}>
                  Tax Class
                </TableCell> */}
                {/* <TableCell sx={{ backgroundColor: "##04184B ", color: "#fff" }}>
                  Weight
                </TableCell> */}
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
               Unit of Measure
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                 Current Price
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                  New Price
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B ", color: "#fff" }}>
                 Price Valid From 
                </TableCell>
                <TableCell sx={{ backgroundColor: "#04184B "}}>
                
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell>{row.item_code}</TableCell>
                  <TableCell>{row.decor_code}</TableCell>
                  <TableCell>{row.item_name}</TableCell>
                  <TableCell>{row.item_description}</TableCell>
                  <TableCell>{row.dimension.length + "x" + row.dimension.width + "x" + row.dimension.height}</TableCell>
                  {/* <TableCell>{row.item.article_group}</TableCell>
                  <TableCell>{row.item.tax_class}</TableCell>
                  <TableCell>{row.item.weight}</TableCell> */}
                  <TableCell>{row.base_unit.unit}</TableCell>
                  <TableCell>{row.customer_item_pricing.pricing.old_retail_price}</TableCell>
                  <TableCell>{row.customer_item_pricing.pricing.new_retail_price}</TableCell>
                  <TableCell>{row.customer_item_pricing.pricing.valid_from_new_purchase}</TableCell>
                  {row.customer_item_pricing.pricing.old_retail_price !== row.customer_item_pricing.pricing.new_retail_price  && (
                    <TableCell>
                      {/* <span style={{ color: "red" }}>Flag</span> */}
                      <FlagIcon  style={{ color: "red" }} />
                    </TableCell> )}


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
                    {/* <TableCell component="th" scope="row">
                      Old Retail Price:
                    </TableCell> */}
                    <TableCell>
                      {selectedItem.pricing.old_retail_price}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell component="th" scope="row">
                      New Retail Price:
                    </TableCell> */}
                    {/* <TableCell>
                      {selectedItem.pricing.new_retail_price}
                    </TableCell> */}
                  </TableRow>
                  <TableRow>
                    {/* <TableCell component="th" scope="row">
                      New Retail Price Valid from:
                    </TableCell> */}
                    <TableCell>
                      {selectedItem.pricing.new_retail_price_valid_from}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* <TableCell component="th" scope="row">
                      New Retail Price Valid to:
                    </TableCell> */}
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
