import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Completion from '../components/QR/Payment/Completion';
import Payment from '../components/QR/Payment/Payment';
import ViewQRTickets from '../components/QR/Ticket/ViewQRTickets';
import PurchaseTicket from '../components/QR/Ticket/PurchaseTicket';
import QrTicket from '../components/QR/Ticket/QR';
import ViewTrainFare from '../components/QR/Fare/ViewTrainFare';
import LandingPage from '../pages/LandingPage';
import ViewUser from '../components/Auth/ViewUser';
import ViewRefundQRTickets from '../components/QR/Ticket/ViewRefundQRTickets';
import UserProfile from '../components/Auth/UserProfile';
import ChangePassword from '../components/Auth/ChangePassword';
// import NotFoundPage from './pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isAuthenticated = !!token;
    setIsAuthenticated(isAuthenticated);

  }, [navigate]);

  return (
    <Routes>
     <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<HomePage/>} />
      {/*<Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="/completion" element={<Completion />} />
      <Route path="/completion" element={<QrTicket />} />
      <Route path="/viewQRTickets" element={<ViewQRTickets />} />
      <Route path="/purchaseTicket" element={<PurchaseTicket />} />
      <Route path="/refundTickets" element={<ViewRefundQRTickets />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/viewTrainFare" element={<ViewTrainFare />} />
      <Route path="/viewUser" element={<ViewUser />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/changePassword" element={<ChangePassword />} />
    </Routes>
  );
};

export default AppRoutes;