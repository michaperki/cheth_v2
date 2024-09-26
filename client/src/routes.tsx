import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import ConnectWallet from './views/ConnectWallet';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connect-wallet" element={<ConnectWallet />} />
    </Routes>
  </Router>
);

export default AppRoutes;
