import  { useState} from 'react';
import Button from "@mui/material/Button"
import DashboardDrawer from './drawer';


// import './validation.css'
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

  return (<>
    <DashboardDrawer/>
    <div className='container' style={{ margin:'95px',width:'900px' }}>
      <h1 style={{ textAlign: 'left' }}>Formula</h1>

      <div className='form-container '>
        <form className='form'>
            <div ><h4 style={{  textAlign: 'left'  }}>Master List Formula</h4>
          <label htmlFor="supplierId">Supplier ID:</label>
          <select
            className="input-field"
          
            id="supplierId"
            name="supplierId"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{ height: '40px', padding: '10px' , margin: '15px'}}
          >
            <option value="">Select a supplier</option>
            <option value="supplier1">Supplier 1</option>
            <option value="supplier2">Supplier 2</option>
           
          </select>    
          <label htmlFor="selectedFormula">Select New Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px' , margin: '15px'}}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select> <Button variant='contained'sx={{backgroundColor:'#05184C',margin:'10px'}}>Apply Formula</Button></div>
         <div > <h4 style={{ textAlign: 'left' }}>New Customer Formula</h4>
          <label htmlFor="supplierId">Customer ID:</label>
          <select
            className="input-field"
            id="supplierId"
            name="supplierId"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{ height: '40px', padding: '10px' , margin: '15px'}}
          >
            <option value="">Select a customer</option>
            <option value="supplier1">XYZ</option>
            <option value="supplier2">TWIP</option>
      
          </select>
          <label htmlFor="selectedFormula">Select New Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select>
          <Button variant='contained'sx={{backgroundColor:'#05184C',margin:'10px'}}>Apply Formula</Button>
          </div>
          <div> <h4 style={{ textAlign: 'left' }}>Update Customer Formula</h4>
          <label htmlFor="supplierId">Customer ID:</label>
          <select
            className="input-field"
            id="supplierId"
            name="supplierId"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a customer</option>
            <option value="supplier1">XYZ</option>
            <option value="supplier2">TWIP</option>
      
          </select>
          <label htmlFor="selectedFormula">Select current Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select>
          <br />
          <label htmlFor="selectedFormula">Select New Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select>
          <Button variant='contained'sx={{backgroundColor:'#05184C',margin:'10px'}}>Apply Formula</Button>
          </div>
          <div> <h4 style={{ textAlign: 'left' }}>Apply Formula</h4>
          <label htmlFor="supplierId">Customer ID:</label>
          <select
            className="input-field"
            id="supplierId"
            name="supplierId"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a customer</option>
            <option value="supplier1">XYZ</option>
            <option value="supplier2">TWIP</option>
      
          </select>
          <label htmlFor="selectedFormula">Select current Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px' }}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select>
         
     
          <Button variant='contained' sx={{backgroundColor:'#05184C',margin:'10px'}}>Apply Formula</Button>
          </div>
          <div> <h4 style={{ textAlign: 'left' }}>Remove Formula</h4>
         
          <label htmlFor="selectedFormula" >Select current Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
            style={{ height: '40px', padding: '10px', margin: '15px'}}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
          
          </select>
         
          <Button variant='contained' sx={{backgroundColor:'#FF4040' ,margin:'10px'}}>Remove Formula</Button>
          </div>
       
       
          
{/* <div> <label htmlFor="itemId">Item ID:</label>
          <select
            id="itemId"
            name="itemId"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          >
            <option value="">Select an item</option>
            <option value="item1">Item 1</option>
            <option value="item2">Item 2</option>
          
          </select>
          <br />
         
          <label htmlFor="selectedFormula">Select New Formula:</label>
          <select
            className='input-field'
            id="selectedFormula"
            name="selectedFormula"
            value={selectedFormula}
            onChange={(e) => setSelectedFormula(e.target.value)}
          >
            <option value="">Select a formula</option>
            <option value="oldPrice * 0.9">10% Discount</option>
            <option value="oldPrice + 100">Add $100</option>
       
          </select>

        
          </div> */}
         

         

          {/* <label htmlFor="oldPrice">Old Price:</label>
          <input
            className='input-field'
            type="number"
            id="oldPrice"
            name="oldPrice"
            value={oldPrice}
            onChange={(e) => setOldPrice(parseFloat(e.target.value))} />
          <br />
          <br /> */}

          {/* <input className="btn-primary" type="button" value="Update Price" onClick={updatePrice}  /> */}
        </form>
      {/* </div>
      {updatedPrices.length > 0 && (
        <div>
          <h2>Updated Prices</h2>
          <div className='table-container'>
            <table className="table">
              <thead>
                <tr>
                  <th>Supplier ID</th>
                  <th>Item ID</th>
                  <th>Old Price</th>
                  <th>Updated Price</th>
                  <th>Percentage Change</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody> */}
                {/* {updatedPrices.map((price, index) => (
                  <tr key={index}>
                    <td>{price.supplierId}</td>
                    <td>{price.itemId}</td>
                    <td>{price.oldPrice}</td>
                    <td>{price.updatedPrice}</td>
                    <td
                      style={{
                        color: price.percentageChange < 0 ? 'red' : 'green', */}
            {/* //           }}
            //         > */}
            {/* //           {price.percentageChange}%
            //         </td>
            //         <td>
            //           <input */}
            {/* //             type="checkbox"
            //             checked={selectedRows.includes(price)}
            //             onChange={() => handleRowSelection(index)} /> */}
            {/* //         </td>
            //       </tr> */}
            {/* //     ))}
            //   </tbody> */}
            {/* </table>
            <br/>
            <button className="btn-primary" onClick={handleApprove}>Approve Selected</button>
          </div>
          <br />

        </div> */}
      {/* )} */}
{/* 
      {masterList.length > 0 && (
        <div>

          <h2>Master List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Supplier ID</th>
                <th>Item ID</th>
                <th>Old Price</th>
                <th>Updated Price</th>
                <th>Percentage Change</th>
              </tr>
            </thead>
            <tbody>
              {masterList.map((row, index) => (
                <tr key={index}>
                  <td>{row.supplierId}</td>
                  <td>{row.itemId}</td>
                  <td>{row.oldPrice}</td>
                  <td>{row.updatedPrice}</td>
                  <td>{row.percentageChange}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

</div>
    </div>
    </>
  );
}

export default Information;