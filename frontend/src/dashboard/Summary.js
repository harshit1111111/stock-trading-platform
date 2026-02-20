import React, { useState, useEffect, useContext } from "react";
import { GeneralContext } from "./GeneralContext";

const Summary = () => {
  const { holdings } = useContext(GeneralContext);
  const [funds, setFunds] = useState(() => {
    const uname = localStorage.getItem("username") || "guest";
    const saved = localStorage.getItem(`funds_${uname}`);
    return saved ? Number(saved) : 100000;
  });
  const [totalMarketValue, setTotalMarketValue] = useState(0);

  // Re-sync funds whenever holdings change (buy/sell happened in same tab)
  useEffect(() => {
    const uname = localStorage.getItem("username") || "guest";
    const saved = localStorage.getItem(`funds_${uname}`);
    if (saved) setFunds(Number(saved));
  }, [holdings]);

  // Live price simulation
  useEffect(() => {
    const priceInterval = setInterval(() => {
      let currentMV = 0;
      holdings.forEach((stock) => {
        const fluctuation = (Math.random() - 0.5) * 0.2;
        const livePrice = stock.avgPrice + (stock.avgPrice * fluctuation / 100);
        currentMV += livePrice * stock.qty;
      });
      setTotalMarketValue(currentMV);
    }, 1000);
    return () => clearInterval(priceInterval);
  }, [holdings]);

  const totalEquity = funds + totalMarketValue;
  const totalPL = totalMarketValue - holdings.reduce((acc, stock) => acc + (stock.avgPrice * stock.qty), 0);

  return (
    <div className="summary-wrapper">
      <div className="welcome-section">
        <h1>Hi, {localStorage.getItem("username") || "Trader"}!</h1>
        <p>Your portfolio updates in real-time as you trade.</p>
      </div>

      <div className="stats-grid">
        
        <div className="stat-card">
          <span className="label">Available Cash</span>
          <h2 className="value">₹{funds.toLocaleString('en-IN', {maximumFractionDigits: 2})}</h2>
        </div>
        <div className={`stat-card ${totalPL >= 0 ? "profit" : "loss"}`}>
          <span className="label">Live P&L</span>
          <h2 className="value">
            {totalPL >= 0 ? "+" : ""}₹{totalPL.toLocaleString('en-IN', {maximumFractionDigits: 2})}
          </h2>
        </div>
      </div>

      <div className="holdings-summary">
        <h3>Current Portfolio ({holdings.length} Positions)</h3>
        {holdings.length > 0 ? (
          <table className="holdings-table">
            <thead>
              <tr>
                <th>Stock</th>
                <th>Qty.</th>
                <th>Avg. Price</th>
                <th>Current Value</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock, index) => (
                <tr key={index}>
                  <td><strong>{stock.name}</strong></td>
                  <td>{stock.qty}</td>
                  <td>₹{stock.avgPrice.toFixed(2)}</td>
                  <td>₹{(stock.avgPrice * stock.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>Your portfolio is empty. Start trading from the Watchlist!</p>
          </div>
        )}
      </div>

      <style>{`
      
        .summary-wrapper { padding: 20px;,height:"70vh" }
        .stats-grid { display: flex; gap: 15px; margin: 20px 0; }
        .stat-card { flex: 1; padding: 20px; background: white; border: 1px solid #eee; border-radius: 8px; }
        .stat-card.blue { background: #387ed1; color: white; }
        .stat-card.profit { border-top: 4px solid #4caf50; }
        .stat-card.loss { border-top: 4px solid #f44336; }
        .value { font-size: 22px; margin-top: 5px; }
        .label { font-size: 12px; font-weight: bold; opacity: 0.8; }
        .holdings-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .holdings-table th { text-align: left; color: #888; font-size: 12px; padding: 10px; border-bottom: 1px solid #eee; }
        .holdings-table td { padding: 12px 10px; border-bottom: 1px solid #f9f9f9; font-size: 14px; }
      `}</style>
    </div>
  );
};

export default Summary;