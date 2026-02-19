import React, { useState, useEffect } from "react";
import { stockList } from "./data/data";

const WatchList = () => {
  const [stocks, setStocks] = useState(stockList);
  const [generalFunds, setGeneralFunds] = useState(() => {
    const saved = localStorage.getItem("funds");
    return saved ? Number(saved) : 100000;
  });

  // 1. STATE FOR HOLDINGS & P&L
  const [holdings, setHoldings] = useState(() => {
    const saved = localStorage.getItem("holdings");
    return saved ? JSON.parse(saved) : [];
  });
  const [totalPL, setTotalPL] = useState(0);
  
  const [selectedStock, setSelectedStock] = useState(null); 
  const [actionType, setActionType] = useState(null);       
  const [quantity, setQuantity] = useState(1);              

  // 2. LIVE PRICE SIMULATION + P&L CALCULATION
  useEffect(() => {
    const interval = setInterval(() => {
      let currentLivePL = 0;

      setStocks((prevStocks) => {
        const updatedStocks = prevStocks.map((stock) => {
          const fluctuation = (Math.random() - 0.5); 
          const newPrice = stock.price + (stock.price * fluctuation) / 100;
          
          // Check if we own this stock to calculate P&L
          const holding = holdings.find(h => h.name === stock.name);
          if (holding) {
            currentLivePL += (newPrice - holding.avgPrice) * holding.qty;
          }

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            isDown: fluctuation < 0,
            percent: parseFloat(fluctuation.toFixed(2))
          };
        });
        setTotalPL(parseFloat(currentLivePL.toFixed(2)));
        return updatedStocks;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, [holdings]);

  // 3. BUY/SELL LOGIC WITH P&L TRACKING
  const handleConfirmOrder = () => {
    const totalValue = Number((selectedStock.price * quantity).toFixed(2));
    let updatedHoldings = [...holdings];

    if (actionType === "BUY") {
      if (totalValue > generalFunds) {
        alert("Insufficient Funds!");
        return;
      }
      const newBalance = generalFunds - totalValue;
      setGeneralFunds(newBalance);
      localStorage.setItem("funds", newBalance);

      // Add to Holdings
      const existing = updatedHoldings.find(h => h.name === selectedStock.name);
      if (existing) {
        existing.qty += quantity;
      } else {
        updatedHoldings.push({ name: selectedStock.name, qty: quantity, avgPrice: selectedStock.price });
      }
    } 
    
    else if (actionType === "SELL") {
      const existing = updatedHoldings.find(h => h.name === selectedStock.name);
      if (!existing || existing.qty < quantity) {
        alert("You don't have enough shares to sell!");
        return;
      }
      
      const newBalance = generalFunds + totalValue;
      setGeneralFunds(newBalance);
      localStorage.setItem("funds", newBalance);

      // Update or Remove from Holdings
      existing.qty -= quantity;
      if (existing.qty === 0) {
        updatedHoldings = updatedHoldings.filter(h => h.name !== selectedStock.name);
      }
    }

    setHoldings(updatedHoldings);
    localStorage.setItem("holdings", JSON.stringify(updatedHoldings));
    setSelectedStock(null);
    setActionType(null);
  };

  return (
    <>
      <div className="watchlist-container">
        {/* PROFIT & LOSS AND FUNDS DASHBOARD */}
        
        <div className="stats-dashboard">
          <div className="stat-box">
            <span className="label">Available Funds</span>
            <span className="amount">₹{generalFunds.toLocaleString('en-IN')}</span>
          </div>
          <div className="stat-box">
            <span className="label">Total P&L</span>
            <span className={`amount ${totalPL >= 0 ? "up" : "down"}`}>
              {totalPL >= 0 ? "+" : ""}₹{totalPL.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Search stocks..." className="search" />
          <span className="counts">{stocks.length} / 50</span>
        </div>

        <ul className="list">
          {stocks.map((stock, index) => (
            <li key={index} className="watchlist-item">
              <div className="item-left">
                <p className={stock.isDown ? "stock-name down" : "stock-name up"}>{stock.name}</p>
              </div>
              <div className="item-right">
                <div className="actions">
                  <button className="btn btn-buy" onClick={() => setSelectedStock(stock) || setActionType("BUY")}>B</button>
                  <button className="btn btn-sell" onClick={() => setSelectedStock(stock) || setActionType("SELL")}>S</button>
                </div>
                <span className="percent">{stock.percent}%</span>
                <span className={stock.isDown ? "price down" : "price up"}>{stock.price}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* MODAL SECTION */}
        {selectedStock && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className={`modal-header ${actionType === "BUY" ? "bg-blue" : "bg-red"}`}>
                <h3 style={{margin: 0}}>{actionType} {selectedStock.name}</h3>
                <p style={{margin: 0}}>Price: ₹{selectedStock.price}</p>
              </div>
              <div className="modal-body">
                <div className="input-group">
                  <label>Quantity</label>
                  <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                </div>
              </div>
              <div className="modal-footer">
                <span className="total">Total: ₹{(selectedStock.price * quantity).toFixed(2)}</span>
                <div className="modal-buttons">
                  <button className="btn-confirm" onClick={handleConfirmOrder}>Confirm {actionType}</button>
                  <button className="btn-cancel" onClick={() => setSelectedStock(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .stats-dashboard { display: flex; gap: 10px; padding: 10px; background: #fff; border-bottom: 1px solid #eee; }
        .stat-box { flex: 1; padding: 15px; border-radius: 4px; background: #f9f9f9; border: 1px solid #eee; display: flex; flexDirection: column; }
        .stat-box .label { font-size: 12px; color: #666; margin-bottom: 5px; }
        .stat-box .amount { font-size: 18px; font-weight: bold; }
        
        .watchlist-item { display: flex; justify-content: space-between; padding: 12px 15px; border-bottom: 1px solid #eee; align-items: center; }
        .item-right { display: flex; align-items: center; gap: 10px; min-width: 150px; justify-content: flex-end; }
        .actions { display: none; gap: 5px; }
        .watchlist-item:hover .actions { display: flex; }
        .btn { border: none; width: 28px; height: 28px; color: white; border-radius: 3px; cursor: pointer; }
        .btn-buy { background: #4184f3; }
        .btn-sell { background: #ff5722; }
        .up { color: #4caf50; }
        .down { color: #df514c; }
        
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-content { background: white; width: 350px; border-radius: 4px; overflow: hidden; }
        .modal-header { padding: 15px; color: white; }
        .bg-blue { background: #4184f3; }
        .bg-red { background: #ff5722; }
        .modal-body { padding: 20px; }
        .modal-footer { padding: 15px; background: #f9f9f9; display: flex; justify-content: space-between; align-items: center; }
        .btn-confirm { background: #4184f3; color: white; border: none; padding: 8px 15px; cursor: pointer; border-radius: 3px; }
        .btn-cancel { background: white; border: 1px solid #ccc; padding: 8px 15px; cursor: pointer; border-radius: 3px; }
      `}</style>
    </>
  );
};

export default WatchList;