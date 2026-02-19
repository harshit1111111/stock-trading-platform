

import React from "react";
import "./dashboard.css";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

const Home = () => {
  return (
    <div className="main-container">
      {/* 1. Top Navigation Menu */}
      <Menu />

      <div className="content-body" style={{ display: "flex", height: "90vh" }}>
        
        {/* 2. LEFT SIDE: Watchlist (Fixed width) */}
        
        {/* 3. RIGHT SIDE: Dashboard (Main content) */}
        <div className="right-pane" style={{ 
          
          flex: 1, 
          overflowY: "auto", 
          backgroundColor: "#fcfcfc", 
         
        }}>
          <Dashboard />
        </div>

      </div>
    </div>
  );
};

export default Home;