import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: '#04184B',
  color: 'white',
}));

const MergedTable = ({ data }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell>Item Description</StyledTableCell>
          <StyledTableCell>Supplier ID</StyledTableCell>
          <StyledTableCell>Maveko ID</StyledTableCell>
          <StyledTableCell>Customer ID</StyledTableCell>
          <StyledTableCell>Customer Name</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row['Item-Discription']}</TableCell>
            <TableCell>{row['Suppliers-ID']}</TableCell>
            <TableCell>{row['Maveko-ID']}</TableCell>
            <TableCell>{row['customer-ID']}</TableCell>
            <TableCell>{row['Customer-Name']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const CrossReferencing = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
      row['Customer-Name'].toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <input type="text" placeholder="Filter by customer name" onChange={handleFilter} />
      {filteredData.length > 0 ? (
        <MergedTable data={filteredData} />
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
};

export default CrossReferencing;