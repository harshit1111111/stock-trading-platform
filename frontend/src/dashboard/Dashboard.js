import React from "react";
import { Route, Routes } from "react-router-dom";

import Summary from "./Summary";
import Orders from "./Orders";
import Holdings from "./Holdings";
import Funds from "./Funds";
import Learn from "./Learn";
import WatchList from "./WatchList";

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex", height: "90vh" }}>
      {/* This fixes the 'WatchList is defined but never used' warning */}
      <WatchList />

      <div className="right-content" style={{ width: "70%", display: "flex", flexDirection: "column",height:"90vh"}}>
        <div className="content-area" style={{ flex: 1, overflowY: "auto"}}>
          <Routes>
            <Route index element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="funds" element={<Funds />} />
            <Route path="learn" element={<Learn />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;