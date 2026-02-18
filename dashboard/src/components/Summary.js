import React, { useState, useEffect } from "react";

const Summary = () => {
  const [funds, setFunds] = useState(100000);
  const [holdings, setHoldings] = useState([]);
  const [totalMarketValue, setTotalMarketValue] = useState(0);

  // Sync data from local storage
  const syncData = () => {
    const savedFunds = localStorage.getItem("funds");
    const savedHoldings = localStorage.getItem("holdings");
    if (savedFunds) setFunds(Number(savedFunds));
    if (savedHoldings) setHoldings(JSON.parse(savedHoldings));
  };

  useEffect(() => {
    syncData();
    
    // Listen for updates from other tabs/components
    const handleStorageChange = () => syncData();
    window.addEventListener("storage", handleStorageChange);

    // Live price simulation
    const priceInterval = setInterval(() => {
      let currentMV = 0;
      const latestHoldings = JSON.parse(localStorage.getItem("holdings")) || [];
      latestHoldings.forEach((stock) => {
        const fluctuation = (Math.random() - 0.5) * 0.2; 
        const livePrice = stock.avgPrice + (stock.avgPrice * fluctuation / 100);
        currentMV += livePrice * stock.qty;
      });
      setTotalMarketValue(currentMV);
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(priceInterval);
    };
  }, []); // <--- The error was likely here (an extra } after this line)

  const totalEquity = funds + totalMarketValue;
  const totalPL = totalMarketValue - holdings.reduce((acc, stock) => acc + (stock.avgPrice * stock.qty), 0);

  return (
    <div className="summary-wrapper">
      <div className="welcome-section">
        <h1>Hi, {JSON.parse(localStorage.getItem("user"))?.username || "Trader"}!</h1>
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