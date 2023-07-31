import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SupplierList from './pages/SupplierList.jsx';
import MasterList from './pages/MasterList.jsx';
import CustomerList from './pages/CustomerList.jsx';
import Dashboard from './pages/dashboard.jsx';
import Approval from './pages/Approval.jsx'
import Validation from "./pages/validation.jsx";
import MyTable from './pages/MasterList.jsx'
import UpTable from './price up/update table.jsx'
import Notify from "./pages/notification.jsx";
import SimpleTable1 from './cross referensing/Cross-table-m-c.jsx';
import SimpleTable2 from './cross referensing/cross-table-s-m.jsx';

import ParentComponent from './cross referensing/Cross-Referensing.jsx';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/supplier" element={<SupplierList />} />
        <Route path="/master" element={<MyTable/>} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/notification" element={<Notify/>} />
        <Route path="/approval" element={<Approval />} />
        <Route path="/validation" element={<Validation />} />
        <Route path="/simpletable1" element={<SimpleTable1/>} />
        <Route path="/simpletable2" element={<SimpleTable2/>} />

        <Route path="/ParentComponent" element={<ParentComponent/>} />
        <Route path="/UpTable" element={<UpTable/>} />


       

        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
