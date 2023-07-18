import React from 'react';
import { FormControl, MenuItem, Select, styled } from '@mui/material';
import DashboardDrawer from './drawer';
import SupplierForm from './pricesource'; // Import the SupplierForm component

const CustomFormControl = styled(FormControl)({
  minWidth: 400, // Set the minimum width of the dropdown
  width: '500px', // Set a fixed width for the dropdown
  marginRight: '25%',
  float:'left' // Add left margin to align it to the left
});

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSupplierClick = () => {
    setSelectedOption('');
  };

  return (
    <>
      <DashboardDrawer />
      {selectedOption === '' ? (
        <CustomFormControl style={{ marginTop: '4%', float: 'right' }}>
          <Select
            value={selectedOption}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Select an option' }}
          >
            <MenuItem value="">
              <em>Choose an option</em>
            </MenuItem>
            <MenuItem value="Supplier" onClick={handleSupplierClick}>
              Supplier
            </MenuItem>
            <MenuItem value="Maveko">Maveko</MenuItem>
            <MenuItem value="Back Order">Back Order</MenuItem>
          </Select>
        </CustomFormControl>
      ) : null}

      {/* Conditionally render the SupplierForm */}
      {selectedOption === 'Supplier' && <SupplierForm />}
    </>
  );
};

export default Dropdown;
