// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/MainPage/login';
import RequestResetPass from './components/MainPage/RequestResetPass';
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/MainPage/RegisterPage';
import FinancePage from './components/AppPages/Finance';
import GraphicsPage from './components/AppPages/Graphics';
import InventoryPage from './components/AppPages/Inventory';
import SummaryPage from './components/AppPages/Summary';
import TrendingPage from './components/AppPages/Trending';
import PaymentMethod from './components/AppPages/PaymentMethod';
import Comparation from './components/AppPages/Comparation';
import Layout from './components/MainPage/layout';
//import UserDashboard from './components/PanelUser/UserDashboard';
//import AdminDashboard from './components/PanelAdmin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route index element={<Login />} />  
        <Route path="/" element={<Layout />}>
          <Route path="request-reset-password" element={<RequestResetPass />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="graphics" element={<GraphicsPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="paymethod" element={<PaymentMethod />} />
          <Route path="comparation" element={<Comparation />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
