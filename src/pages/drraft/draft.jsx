import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardDrawer from '../drawer';
import MasterList from '../MasterList';

const FormContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px', // Add gap between elements
  '@media (max-width: 600px)': {
    flexDirection: 'column', // Change to column layout on smaller screens
    '& > *': {
      width: '100%', // Set elements to full width on smaller screens
    },
  },
});

const CustomFormControl = styled(FormControl)({
  minWidth: 200, // Set the dropdown minimum width
});

const SupplierForm = () => {
  const [selectedSupplier, setSelectedSupplier] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = React.useState(false);

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleImportButtonClick = () => {
    setIsImportDialogOpen(true);
  };

  const handleImportDialogClose = () => {
    setIsImportDialogOpen(false);
  };

  return (
    <><div style={{ justifyContent: 'center', marginLeft: '13%', marginTop: '7%', }}>
          <DashboardDrawer />
          <FormContainer>
              <TextField label="Search" variant="outlined" margin="normal" />

              <CustomFormControl style={{ marginLeft: '5%' }} variant="outlined" margin="normal">
                  <InputLabel>Supplier</InputLabel>
                  <Select
                      value={selectedSupplier}
                      onChange={handleSupplierChange}
                      label="Supplier"
                      sx={{ width: '100%' }}
                  >
                      <MenuItem value="Contacto">Contacto</MenuItem>
                      {/* Add more supplier options here */}
                  </Select>
              </CustomFormControl>

              <CustomFormControl variant="outlined" margin="normal" style={{ marginLeft: '5%' }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      label="Status"
                      sx={{ width: '100%' }}
                  >
                      <MenuItem value="Accepted">Accepted</MenuItem>
                      <MenuItem value="Not Accepted">Not Accepted</MenuItem>
                      {/* Add more status options here */}
                  </Select>
              </CustomFormControl>

              <Button

                  variant="contained"
                  color="primary"
                  onClick={handleImportButtonClick}
                  style={{ marginLeft: '16%', backgroundColor:'#04184B', }} // Move the button to the left corner
              >
                  Import
              </Button>
          </FormContainer>

          <Dialog open={isImportDialogOpen} onClose={handleImportDialogClose}>
              <DialogTitle>Choose Import Method</DialogTitle>
              <DialogContent>
                  <DialogContentText>Choose how to import data:</DialogContentText>
                  <Button variant="outlined" onClick={handleImportDialogClose}>
                      Excel
                  </Button>
                  <Button variant="outlined" onClick={handleImportDialogClose}>
                      API
                  </Button>
                  <Button variant="outlined" onClick={handleImportDialogClose}>
                      other
                  </Button>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleImportDialogClose} color="primary">
                      Cancel
                  </Button>
              </DialogActions>
          </Dialog>

      </div>
      <div style={{marginLeft:"3%", marginRight:"0%"}}><MasterList /></div></>
      
  );
};

export default SupplierForm;
