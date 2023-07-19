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

const SimpleTable_m_c = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/cross-referencing')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        const uniqueData = removeDuplicates(data, ['Item-Discription', 'Maveko-ID', 'customer-ID']);
        setData(uniqueData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const removeDuplicates = (array, keys) => {
    const seenKeys = new Set();
    return array.filter((row) => {
      const key = keys.map((key) => row[key]).join('|');
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        return true;
      }
      return false;
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Maveko Item Description</StyledTableCell>
            <StyledTableCell>Maveko ID</StyledTableCell>
            <StyledTableCell>Customer ID</StyledTableCell>
            <StyledTableCell>Customer Item ID</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row['Maveko-Item-Description']}</TableCell>
              <TableCell>{row['Maveko-ID']}</TableCell>
              <TableCell>{row['customer-ID']}</TableCell>
              <TableCell>{row['Customer-Item-ID']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable_m_c;
