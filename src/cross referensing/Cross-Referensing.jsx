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

const ParentComponent = () => {
  const [data, setData] = useState([]);
  const [table1Data, setTable1Data] = useState([]);
  const [table2Data, setTable2Data] = useState([]);
  const [mergedData, setMergedData] = useState([]);

  useEffect(() => {
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/cross-referencing')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      // Filter data for table 1
      const filteredTable1Data = removeDuplicates(
        data,
        ['Item-Discription', 'Maveko-ID']
      );
      setTable1Data(filteredTable1Data);

      // Filter data for table 2
      const filteredTable2Data = removeDuplicates(
        data,
        ['Item-Discription', 'Maveko-ID', 'customer-ID', 'Customer-Name']
      );
      setTable2Data(filteredTable2Data);

      mergeData();
    }
  }, [data]);

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

  const mergeData = () => {
    if (table1Data.length > 0 && table2Data.length > 0) {
      const merged = table1Data.map((row1) => {
        const matchingRows = table2Data.filter(
          (row2) => row1['Maveko-ID'] === row2['Maveko-ID']
        );

        const customerNames = matchingRows.map((row) => row['Customer-Name']);

        return {
          ...row1,
          'Customer-Name': customerNames.join(', '),
        };
      });
      setMergedData(merged);
    }
  };

  return (
    <div>
      {mergedData.length > 0 ? (
        <MergedTable data={mergedData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ParentComponent;
