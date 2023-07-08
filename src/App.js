import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn.jsx';
import SupplierList from './pages/SupplierList.jsx';
import MasterList from './pages/MasterList.jsx';
import CustomerList from './pages/CustomerList.jsx';
import Dashboard from './pages/dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/supplier" element={<SupplierList />} />
        <Route path="/master" element={<MasterList />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
