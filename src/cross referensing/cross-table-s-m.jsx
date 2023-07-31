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

const SimpleTable2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/cross-referencing')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        const uniqueData = removeDuplicates(data, ['Item-Discription', 'Suppliers-ID', 'Maveko-ID']);
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
            <StyledTableCell>Maviko Item Description</StyledTableCell>
            <StyledTableCell>Supplier ID</StyledTableCell>
            <StyledTableCell>Supplier Items ID</StyledTableCell>
            <StyledTableCell>Maveko ID</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row['Maveko-Item-Description']}</TableCell>
              <TableCell>{row['Suppliers-ID']}</TableCell>
              <TableCell>{row['Suppliers-Item-ID']}</TableCell>
              <TableCell>{row['Maveko-ID']}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable2;
