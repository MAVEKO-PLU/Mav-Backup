import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Custumer_list from './Cust_list';
import DashboardDrawer from "../drawer"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#04184B',
  color: 'white',
}));

const UpTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch('https://64b6e4b2df0839c97e163f80.mockapi.io/update-table') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      })
      .catch((error) => {
        console.error('Error fetching table data:', error);
      });
  }, []);

  return (
    <>
      <DashboardDrawer/>
      <div>
      <Typography variant="h6" align="right" fontSize="30px" fontWeight="bold" style={{marginTop:'5%'}}>
        Calculate Selling Price
      </Typography>
      <TableContainer component={Paper} style={{width:'85%',marginLeft:'10%',marginTop:'3%'}}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item no</StyledTableCell>
              <StyledTableCell>Item Description</StyledTableCell>
              <StyledTableCell>Dimension</StyledTableCell>
              <StyledTableCell>Decor Number</StyledTableCell>
              <StyledTableCell>UOM</StyledTableCell>
              <StyledTableCell>Purchase Price</StyledTableCell>
              <StyledTableCell>Selling Price</StyledTableCell>
              <StyledTableCell>Valid From</StyledTableCell>
              <StyledTableCell>Valid To</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.itemNo}</TableCell>
                <TableCell>{row.itemDescription}</TableCell>
                <TableCell>{row.dimension}</TableCell>
                <TableCell>{row.decorNumber}</TableCell>
                <TableCell>{row.uom}</TableCell>
                <TableCell>{row.purchasePrice}</TableCell>
                <TableCell>{row.sellingPrice}</TableCell>
                <TableCell>{row.validFrom}</TableCell>
                <TableCell>{row.validTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{marginLeft:'85%',marginTop:'10%'}}>
      <Custumer_list/>
      </div>
      </div>
    </>
  );
};

export default UpTable;