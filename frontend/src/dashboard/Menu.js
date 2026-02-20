import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Orders",    icon: "📋", path: "/dashboard/orders" },
  { label: "Holdings",  icon: "💼", path: "/dashboard/holdings" },
  { label: "Funds",     icon: "💰", path: "/dashboard/funds" },
  { label: "Learn",     icon: "📚", path: "/dashboard/learn" },
];

const Menu = () => {
  const location = useLocation();
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  return (
    <div className="menu-container">
      {/* Logo */}
      <div style={{ padding: "16px 18px 10px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px",
            background: "linear-gradient(135deg, #387ed1, #1a4fa0)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <polyline points="2,18 8,12 13,17 22,6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="18,6 22,6 22,10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "15px", color: "#1a1a2e", letterSpacing: "0.3px" }}>Zerodha</div>
            <div style={{ fontSize: "10px", color: "#888", marginTop: "-1px" }}>by Zerodha</div>
          </div>
        </div>
      </div>
      <div className="menus">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 18px",
                  margin: "3px 8px",
                  borderRadius: "6px",
                  background: isActive(item.path) ? "#387ed1" : "transparent",
                  color: isActive(item.path) ? "#fff" : "#444",
                  fontWeight: isActive(item.path) ? "700" : "500",
                  fontSize: "14px",
                  transition: "background 0.15s",
                  cursor: "pointer",
                }}>
                  <span style={{ fontSize: "16px" }}>{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <hr />
          <div className="profile">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <p className="username">{username}</p>
        </div>
        <button
          onClick={() => {
            // Only remove session key — user data (holdings_x, funds_x, orders_x) stays intact
            localStorage.removeItem("username");
            window.location.href = "/login";
          }}
          style={{
            margin: "8px 16px 16px",
            width: "calc(100% - 32px)",
            padding: "6px 0",
            background: "#fff0f0",
            color: "#d32f2f",
            border: "1px solid #f5c6c6",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "12px",
            letterSpacing: "0.2px",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#ffd6d6"}
          onMouseLeave={e => e.currentTarget.style.background = "#fff0f0"}
        >
          🚪 Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;