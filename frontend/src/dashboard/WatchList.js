import React, { useState, useEffect, useContext } from "react";
import { stockList } from "./data/data";
import { GeneralContext } from "./GeneralContext";

const WatchList = () => {
  const { holdings, updateHoldings } = useContext(GeneralContext);
  const [stocks, setStocks] = useState(stockList);
  const [generalFunds, setGeneralFunds] = useState(() => {
    const uname = localStorage.getItem("username") || "guest";
    const saved = localStorage.getItem(`funds_${uname}`);
    return saved ? Number(saved) : 100000;
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
      const uname = localStorage.getItem("username") || "guest";
      setGeneralFunds(newBalance);
      localStorage.setItem(`funds_${uname}`, newBalance);

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
      const uname2 = localStorage.getItem("username") || "guest";
      setGeneralFunds(newBalance);
      localStorage.setItem(`funds_${uname2}`, newBalance);

      // Update or Remove from Holdings
      existing.qty -= quantity;
      if (existing.qty === 0) {
        updatedHoldings = updatedHoldings.filter(h => h.name !== selectedStock.name);
      }
    }

    updateHoldings(updatedHoldings);
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
              {/* LEFT: stock name */}
              <div className="item-left">
                <p className={stock.isDown ? "stock-name down" : "stock-name up"}>{stock.name}</p>
              </div>

              {/* RIGHT: price + percent always visible, buttons appear on hover */}
              <div className="item-right">
                {/* Hover buttons */}
                <div className="actions">
                  <button className="btn btn-buy" onClick={() => { setSelectedStock(stock); setActionType("BUY"); }}>Buy</button>
                  <button className="btn btn-sell" onClick={() => { setSelectedStock(stock); setActionType("SELL"); }}>Sell</button>
                </div>
                {/* Price info */}
                <div className="price-info">
                  <span className="percent">{stock.percent}%</span>
                  <span className={stock.isDown ? "price down" : "price up"}>{stock.price}</span>
                </div>
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
        .stats-dashboard { display: flex; gap: 12px; padding: 16px; background: #fff; border-bottom: 1px solid #eee; }
        .stat-box { flex: 1; padding: 20px 24px; border-radius: 8px; background: #f4f8ff; border: 1px solid #dce8fb; display: flex; flex-direction: column; gap: 6px; }
        .stat-box .label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
        .stat-box .amount { font-size: 22px; font-weight: 800; color: #1a1a2e; }

        .watchlist-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid #f0f0f0; gap: 8px; }
        .watchlist-item:hover { background: #f7faff; }
        .item-left { flex: 1; min-width: 0; }
        .stock-name { margin: 0; font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .item-right { display: flex; align-items: center; justify-content: flex-end; min-width: 90px; position: relative; }
        .price-info { display: flex; flex-direction: column; align-items: flex-end; }
        .percent { font-size: 11px; color: #888; }
        .price { font-size: 13px; font-weight: 700; }

        .actions { display: none; gap: 5px; }
        .watchlist-item:hover .actions { display: flex; }
        .watchlist-item:hover .price-info { display: none; }

        .btn { border: none; padding: 5px 12px; font-size: 12px; font-weight: 700; color: white; border-radius: 3px; cursor: pointer; }
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