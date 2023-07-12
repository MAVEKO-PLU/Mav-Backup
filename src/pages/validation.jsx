import { useState } from 'react';
import Button from "@mui/material/Button";
import DashboardDrawer from './drawer';

function Information() {
  const [supplierId, setSupplierId] = useState('');
  const [itemId, setItemId] = useState('');
  const [selectedFormula, setSelectedFormula] = useState('');
  const [oldPrice, setOldPrice] = useState(0);
  const [updatedPrices, setUpdatedPrices] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [masterList, setMasterList] = useState([]);

  const updatePrice = () => {
    if (!selectedFormula) {
      alert('Please select a formula.');
      return;
    }

    const updatedPrice = calculateUpdatedPrice(oldPrice, selectedFormula);
    const percentageChange = calculatePercentageChange(oldPrice, updatedPrice);

    // Check if the updated price is for an existing item ID
    const existingIndex = updatedPrices.findIndex((price) => price.itemId === itemId);
    if (existingIndex !== -1) {
      const updatedItem = updatedPrices[existingIndex];
      updatedItem.updatedPrice = updatedPrice;
      updatedItem.percentageChange = percentageChange;
      setUpdatedPrices((prevPrices) => {
        const updatedList = [...prevPrices];
        updatedList.splice(existingIndex, 1, updatedItem);
        return updatedList;
      });
    } else {
      // Add the updated price, old price, and percentage change to the table
      setUpdatedPrices((prevPrices) => [
        ...prevPrices,
        { supplierId, itemId, oldPrice, updatedPrice, percentageChange },
      ]);
    }
  };

  const calculateUpdatedPrice = (price, formula) => {
    // Implement your own logic to calculate the updated price based on the selected formula
    // For this example, we'll assume a basic arithmetic expression
    try {
      const updatedPrice = eval(formula);
      if (isNaN(updatedPrice)) {
        throw new Error('Invalid formula');
      }
      return updatedPrice;
    } catch (error) {
      console.error('Error calculating updated price:', error);
      return price; // Return the original price if there is an error in the formula
    }
  };

  const calculatePercentageChange = (oldPrice, newPrice) => {
    const change = newPrice - oldPrice;
    const percentageChange = ((change / oldPrice) * 100).toFixed(2); // Round to 2 decimal places
    return parseFloat(percentageChange);
  };

  const handleApprove = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one row to approve.');
      return;
    }

    // Add the selected rows to the master list
    setMasterList((prevList) => [...prevList, ...selectedRows]);

    // Reset the selected rows
    setSelectedRows([]);

    // Remove the selected rows from updatedPrices
    const filteredPrices = updatedPrices.filter(
      (price) => !selectedRows.includes(price)
    );
    setUpdatedPrices(filteredPrices);
  };

  const handleRowSelection = (index) => {
    const selectedRow = updatedPrices[index];

    if (selectedRows.includes(selectedRow)) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((row) => row !== selectedRow)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, selectedRow]);
    }
  };

  return (
    <>
      <DashboardDrawer />
      <h1 style={{ textAlign: 'left', margin: '100px' }}>Customer Formula</h1>
      <div className='container' style={{ margin: '100px', width: '1000px', boxShadow:'50px' }}>
        <div className='form-container'>
          <form className='form'>
            <div>
              <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <h3 style={{ textAlign: 'left' }}>Master List Formula</h3>
                <div style={{marginLeft:'-300px'}}><select
                  className="input-field"
                  id="supplierId"
                  name="supplierId"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', borderRadius:'4px' }}
                >
                  <option value="">Choose Supplier </option>
                  <option value="supplier1">Supplier 1</option>
                  <option value="supplier2">Supplier 2</option>
                </select>
            
                <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', width:'350px', borderRadius:'4px' }}
                >
                  <option value="">Choose Formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <Button variant='contained' sx={{ backgroundColor: '#05184C', margin: '10px', height:'42px' }}>Apply Formula</Button>
              </div>
                 </div>

              <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <h3 style={{ textAlign: 'left' }}>New Formula</h3>
              <div style={{marginLeft:'-300px'}}> <select
                  className="input-field"
                  id="supplierId"
                  name="supplierId"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', borderRadius:'4px' }}
                >
                  <option value="" >Choose customer</option>
                  <option value="supplier1">XYZ</option>
                  <option value="supplier2">TWIP</option>
                </select>
            
                <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', width:'350px', borderRadius:'4px' }}
                >
                  <option value="">Select a formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <Button variant='contained' sx={{ backgroundColor: '#05184C', margin: '10px', height:'42px' }}>Apply Formula</Button>
             </div>
                </div>

              <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <h3 style={{ textAlign: 'left' }}>Update Customer Formula</h3>
              <div style={{marginLeft:'-470px'}}> <select
                  className="input-field"
                  id="supplierId"
                  name="supplierId"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', borderRadius:'4px' }}
                >
                  <option value="">Choose Customer</option>
                  <option value="supplier1">XYZ</option>
                  <option value="supplier2">TWIP</option>
                </select>

                <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px' , width:'350px', borderRadius:'4px'}}
                >
                  <option value=""> Current Formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <br />
              
                <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', width:'365px', borderRadius:'4px' }}
                >
                  <option value="">Updated Formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <Button variant='contained' sx={{ backgroundColor: '#05184C', margin: '10px', height:'42px' }}>Apply Formula</Button>
              </div>
               </div>

              <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <h3 style={{ textAlign: 'left' }}>Apply Formula</h3>
             <div style={{marginLeft:'-300px'}}> <select
                  className="input-field"
                  id="supplierId"
                  name="supplierId"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', borderRadius:'4px' }}
                >
                  <option value="">Choose Customer</option>
                  <option value="supplier1">XYZ</option>
                  <option value="supplier2">TWIP</option>
                </select>
               
                <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px' , width:'350px', borderRadius:'4px'}}
                >
                  <option value="">Choose Formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <Button variant='contained' sx={{ backgroundColor: '#05184C', margin: '10px', height:'42px' }}>Apply Formula</Button>
              </div>
               </div>

              <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <h3 style={{ textAlign: 'left' }}>Remove Formula</h3>
<div style={{marginLeft:'-460px'}}> <select
                  className='input-field'
                  id="selectedFormula"
                  name="selectedFormula"
                  value={selectedFormula}
                  onChange={(e) => setSelectedFormula(e.target.value)}
                  style={{ height: '40px', padding: '10px', margin: '15px', width:'350px', borderRadius:'4px' }}
                >
                  <option value="">Select a formula</option>
                  <option value="oldPrice * 0.9">10% Discount</option>
                  <option value="oldPrice + 100">Add $100</option>
                </select>
                <Button variant='contained' sx={{ backgroundColor: '#FF4040', margin: '10px', height:'42px' }}>Remove Formula</Button>
              </div>
               </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Information;
