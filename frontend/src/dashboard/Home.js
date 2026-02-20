

import React from "react";
import "./dashboard.css";
import Dashboard from "./Dashboard";
import Menu from "./Menu";

const Home = () => {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* LEFT: Sidebar */}
      <Menu />

      {/* RIGHT: Main content */}
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#fcfcfc" }}>
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;