import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./landing_page/Home"; 
// This must be the file shown at 0:10 in your video!
import PortfolioUI from "./dashboard/Dashboard"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. This is the Zerodha Landing Page */}
        <Route path="/" element={<Home />} /> 
        
        {/* 2. Give your UI Page a UNIQUE path name */}
        <Route path="/trading-ui" element={<PortfolioUI />} /> 
      </Routes>
    </BrowserRouter>
  );
}