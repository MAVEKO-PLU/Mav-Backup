import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#04184B',
  color: 'white',
}));

const MergedTable = ({ data }) => (
  
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Maviko Item Description</StyledTableCell>
          <StyledTableCell>Supplier ID</StyledTableCell>
          <StyledTableCell>Supplier Item ID</StyledTableCell>
        
          <StyledTableCell>Maveko Item ID</StyledTableCell>
          <StyledTableCell>Customer ID</StyledTableCell>
          <StyledTableCell>Customer Item ID</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row['Maveko-Item-Description']}</TableCell>
            <TableCell>{row['Suppliers-ID']}</TableCell>
            <TableCell>{row['Suppliers-Item-ID']}</TableCell>
          
            <TableCell>{row['Maveko-Item-ID']}</TableCell>
            <TableCell>{row['customer-ID']}</TableCell>
            <TableCell>{row['Customer-Item-ID']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const CrossReferencing = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchAttribute, setSearchAttribute] = useState('customer-ID'); // Default attribute

  useEffect(() => {
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/cross-referencing')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((row) =>
      row[searchAttribute].toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  const handleSelectAttribute = (event) => {
    setSearchAttribute(event.target.value);
  };

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width:'20%',padding:'3%' }}>
      <div>
        <FormControl variant="outlined" size="small">
          <InputLabel>Filter by attribute</InputLabel>
          <Select
            value={searchAttribute}
            onChange={handleSelectAttribute}
            label="Filter by attribute"
          >
            <MenuItem value="customer-ID">Customer ID</MenuItem>
            <MenuItem value="Suppliers-ID">Supplier ID</MenuItem>
            
            <MenuItem value="Maveko-Item-ID">Maveko Item ID</MenuItem>
            <MenuItem value="Maveko-Item-Description">Maviko Item Description</MenuItem>
            <MenuItem value="Customer-Item-ID">Customer Item ID</MenuItem>
            <MenuItem value="Suppliers-Item-ID">Suppliers-Item-ID</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          label={`Filter by ${searchAttribute}`}
          variant="outlined"
          size="small"
          onChange={handleFilter} />
      </div>
    </div>
    <div>
        {filteredData.length > 0 ? (
          <MergedTable data={filteredData} />
        ) : (
          <p>No data found.</p>
        )}
      </div>
      </>
  );
};

export default CrossReferencing;
