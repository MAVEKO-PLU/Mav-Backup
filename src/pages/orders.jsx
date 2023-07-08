import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination } from '@mui/material';
import './new.css';
// import Navbar from './Navbar';
import DashboardDrawer from './drawer';

// Generate Order Data
function createData(id, date, name, description, price, percentage) {
  return { id, date, name, description, price, percentage };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Tupelo, MS', 'discription', 312.44, -5),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  createData(1, '16 Mar, 2019', 'London, UK', 'discription', 866.99, 10),
  // Add more rows as needed
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const paginatedRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <React.Fragment>
      <Table size="medium" className="ordersTable">
        <TableHead className="tablerow">
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                {row.price}{' '}
                <span style={{ color: row.percentage < 0 ? 'red' : 'green', fontSize: '11px' }}>
                  {row.percentage}%
                </span>
              </TableCell>
              <TableCell align="right">{`$${row.price}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      /> */}
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
