import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SupplierList from './pages/SupplierList.jsx';
import MasterList from './pages/MasterList.jsx';
import CustomerList from './pages/CustomerList.jsx';
import Dashboard from './pages/dashboard.jsx';
import Approval from './pages/Approval.jsx'
import Validation from "./pages/validation.jsx";
import SupplierExcel from './pages/suppliersExcl.jsx'

import Notify from "./pages/notification.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/supplier" element={<SupplierList />} />
        <Route path="/master" element={<MasterList />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/notification" element={<Notify/>} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/excel" element={<SupplierExcel />} />

       

        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
