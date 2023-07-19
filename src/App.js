import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SupplierList from './pages/SupplierList.jsx';
import MasterList from './pages/MasterList.jsx';
import CustomerList from './pages/CustomerList.jsx';
import Dashboard from './pages/dashboard.jsx';
import Approval from './pages/Approval.jsx'
import Validation from "./pages/validation.jsx";
import SailingPrice from "./pages/calculateSellingPrice.jsx";
import MyTable from './pages/MasterList.jsx'
import UpTable from './pages/price up/update table.jsx'
import Dropdown from "./pages/drraft/dropdown.jsx";

import Notify from "./pages/notification.jsx";
import SimpleTable from './cross referensing/cross-table-s-m.jsx';
import ParentComponent from './cross referensing/Cross-Referensing.jsx';

function App() {
  return (
    <Router>
      
      <Routes>

        <Route path="/master" element={<MasterList />} />

        <Route path="/supplier" element={<SupplierList />} />
        <Route path="/masterUP" element={<MyTable/>} />
        <Route path="/Dropdown" element={<Dropdown/>} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/notification" element={<Notify/>} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/selling" element={<SailingPrice/>} />
        <Route path="/UpTable" element={<UpTable/>} />

        <Route path="/simpletable" element={<SimpleTable/>} />
        <Route path="/ParentComponent" element={<ParentComponent/>} />



       


        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
