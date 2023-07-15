import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from '@mui/material';
import DashboardDrawer from "./drawer";
import { isSameDay, addDays, parseISO } from 'date-fns';
import { CheckCircle } from '@mui/icons-material';

const tableContainerStyles = {
  width: '100%',
  maxWidth: '1300px',
  marginBottom: '1rem',
};

const tableStyles = {
  minWidth: '650px',
};

const tableHeadStyles = {
  backgroundColor: '#04184B',
};

const tableHeaderTextStyles = {
  color: '#ffffff',
};

const tickIconStyles = {
  color: 'green',
  fontSize: '1.2rem', // Adjust the font size as needed
};

const MyTable = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/masterlist');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = data && data.length > 0 ? Object.keys(data[0]).filter((column) => column !== 'id') : [];
  const filteredData = data.filter((row) => {
    const rowValues = Object.values(row).join(' ').toLowerCase();
    return rowValues.includes(searchQuery.toLowerCase());
  });

  const today = new Date();

  const isPriceValid = (priceValidFrom) => {
    const fromDate = parseISO(priceValidFrom);
    const toDate = addDays(fromDate, 3); // Add three more days to make it three consecutive days

    const isSameAsToday = isSameDay(fromDate, today);
    const isConsecutiveDays =
      isSameAsToday && isSameDay(addDays(fromDate, 1), addDays(today, 1)) && isSameDay(addDays(fromDate, 2), addDays(today, 2));

    return isConsecutiveDays;
  };

  return (
    <>
      <DashboardDrawer />
      <h1 style={{ marginRight: '68%', marginTop: '5%' }}>MASTER PRICE LIST</h1>
      <div style={{ marginRight: '68%' }}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          margin="normal"
        />
      </div>
      <div style={{ marginLeft: '10%' }}>
        <TableContainer component={Paper} sx={tableContainerStyles}>
          <Table sx={tableStyles} aria-label="My Table">
            <TableHead sx={tableHeadStyles}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column} sx={tableHeaderTextStyles}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column}>
                      {column === 'Unit Price' && isPriceValid(row['Price Valid From']) && (
                        <CheckCircle sx={tickIconStyles} />
                      )}
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MyTable;
