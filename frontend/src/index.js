import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import HomePage from './landing_page/home/HomePage';
import Signup from './pages/Signup';
import Login from './landing_page/login/Login';
import About from './landing_page/about/About';
import ProductPage from "./landing_page/products/ProductsPage";
import SupportPage from "./landing_page/support/SupportPage";
import PricingPage from './landing_page/pricing/PricingPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';

import DashboardHome from './dashboard/Home';
import { GeneralContextProvider } from './dashboard/GeneralContext';

function App() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <GeneralContextProvider>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/dashboard/*" element={<DashboardHome />} />
      </Routes>
      {!isDashboard && <Footer />}
    </GeneralContextProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

