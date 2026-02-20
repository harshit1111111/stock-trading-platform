import React, { useState, useEffect } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const uname = localStorage.getItem("username") || "guest";
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${uname}`) || "[]");
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-container" style={{ padding: "20px", fontFamily: "Arial, sans-serif",height:"90vh" }}>
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", marginTop: "50px" }}>
          <p>No transactions yet.</p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ background: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
              <th style={thStyle}>Time</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Instrument</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              // Check if this is a Fund Deposit or a Stock Trade
              const isDeposit = order.type === "DEPOSIT";

              return (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  
                  {/* Time */}
                  <td style={tdStyle}>{order.date.split(",")[1]}</td> {/* Shows time only */}

                  {/* Type Badge */}
                  <td style={tdStyle}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      backgroundColor: isDeposit ? "#FFD700" : (order.type === "BUY" ? "#e8f5e9" : "#ffebee"),
                      color: isDeposit ? "#000" : (order.type === "BUY" ? "#2e7d32" : "#c62828")
                    }}>
                      {order.type}
                    </span>
                  </td>

                  {/* Instrument Name */}
                  <td style={{...tdStyle, fontWeight: isDeposit ? "bold" : "normal"}}>
                    {order.scrip}
                  </td>

                  {/* Quantity */}
                  <td style={tdStyle}>{order.qty}</td>

                  {/* Price */}
                  <td style={tdStyle}>
                    ₹{Number(order.price).toFixed(2)}
                  </td>

                  {/* Status */}
                  <td style={tdStyle}>
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {order.status || "COMPLETE"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Simple Styles for Table Cells
const thStyle = { padding: "12px", textAlign: "left", color: "#666" };
const tdStyle = { padding: "12px", textAlign: "left" };

export default Orders;