import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const UpdateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#04BB00',
  color: 'white',
  '&:hover': {
    backgroundColor: '#04BB00'
  },
  marginRight: '8px' 
}));

const UpdateAllButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00BBA5',
  color: 'white',
  '&:hover': {
    backgroundColor: '#00BBA5',
  },
  marginRight: '8px' 
}));

const ButtonGroup = styled(DialogActions)({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '8px', 
});



const PopupDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [customersData, setCustomersData] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (customerId) => (event) => {
    if (event.target.checked) {
      setSelectedCustomers((prevSelected) => [...prevSelected, customerId]);
    } else {
      setSelectedCustomers((prevSelected) => prevSelected.filter((id) => id !== customerId));
    }
  };

  const handleUpdate = () => {
    // Perform update logic for selected customers
    console.log('Update selected customers:', selectedCustomers);
  };

  const handleUpdateAll = () => {
    // Perform update logic for all customers
    console.log('Update all customers');
  };

  useEffect(() => {
    fetch('https://64ac386b9edb4181202f4c4e.mockapi.io/customer-list')
      .then((response) => response.json())
      .then((data) => {
        setCustomersData(data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  return (
    <>
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ backgroundColor: '#04BB00' }}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Customers List</DialogTitle>
        <DialogContent>
          {customersData.map((customer) => (
            <FormControlLabel
              key={customer.id}
              control={<Checkbox checked={selectedCustomers.includes(customer.id)} onChange={handleCheckboxChange(customer.id)} />}
              label={`${customer.Customer_name} (${customer.Customer_Id})`}
            />
          ))}
        </DialogContent>
        <ButtonGroup>
          <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
          <UpdateAllButton onClick={handleUpdateAll}>Update All</UpdateAllButton>
        </ButtonGroup>
      </Dialog>
    </div>
    </>
  );
};

export default PopupDialog;
