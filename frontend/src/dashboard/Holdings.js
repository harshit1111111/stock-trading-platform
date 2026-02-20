import React, { useContext } from "react";
import { GeneralContext } from "./GeneralContext";

const Holdings = () => {
  const { holdings } = useContext(GeneralContext);

  return (
    <div className="holdings-container" style={{ padding: "20px", height: "90vh" }}>
      <h2>Holdings : ({holdings.length})</h2>
      
      <table style={{ width: "200%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #ddd", textAlign: "left", color: "#888" }}>
            <th style={{ padding: "10px" }}>Stocks</th>
            <th style={{ padding: "10px" }}>Qty.</th>
            <th style={{ padding: "10px" }}>Avg. Cost</th>
            <th style={{ padding: "10px" }}>LTP</th>
            <th style={{ padding: "10px" }}>Cur. Val</th>
            <th style={{ padding: "10px" }}>P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((stock, index) => {
             const currentVal = stock.qty * stock.avgPrice; // Simplified for demo
             const pnl = 50; // You can add live price logic here later
             
             return (
              <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{stock.name}</td>
                <td style={{ padding: "10px" }}>{stock.qty}</td>
                <td style={{ padding: "10px" }}>{stock.avgPrice.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{stock.avgPrice.toFixed(2)}</td>
                <td style={{ padding: "10px" }}>{currentVal.toFixed(2)}</td>
                <td style={{ padding: "10px", color: pnl >= 0 ? "green" : "red" }}>{pnl.toFixed(2)}</td>
              </tr>
             );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;