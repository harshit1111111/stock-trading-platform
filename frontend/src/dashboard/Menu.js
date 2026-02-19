import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // 1. STATE FOR USERNAME
  const [username, setUsername] = useState("Guest");

  

  // 2. FETCH USERNAME ON LOAD
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "70px" }} />
      <div className="menus">
        <ul>
          <li><Link style={{ textDecoration: "none" }} to="/dashboard" onClick={() => handleMenuClick(0)}><p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/dashboard/orders" onClick={() => handleMenuClick(1)}><p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/dashboard/holdings" onClick={() => handleMenuClick(2)}><p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p></Link></li>
       
          <li><Link style={{ textDecoration: "none" }} to="/dashboard/funds" onClick={() => handleMenuClick(4)}><p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/dashboard/learn" onClick={() => handleMenuClick(5)}><p className={selectedMenu === 5 ? activeMenuClass : menuClass}>Learn</p></Link></li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          {/* Display First Initial of Username */}
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          {/* Display Full Username */}
          <p className="username">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;