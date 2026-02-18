import React from "react";

const BuyActionWindow = ({ uid, stockPrice, stockQuantity, closeBuyWindow }) => {
  
  // PASTE THE CODE HERE
  const handleBuyClick = () => {
    const newOrder = { 
      name: uid, 
      qty: stockQuantity, 
      price: stockPrice, 
      mode: "BUY", 
      time: new Date().toLocaleTimeString(), 
      status: "EXECUTED" 
    };

    // 1. Save to Orders History
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

    // 2. ALSO Save to Holdings (so it shows in your portfolio)
    const existingHoldings = JSON.parse(localStorage.getItem("allHoldings")) || [];
    localStorage.setItem("allHoldings", JSON.stringify([newOrder, ...existingHoldings]));

    closeBuyWindow();
    window.location.reload(); // This ensures Orders.js sees the new data immediately
  };

  return (
    <div className="modal">
      {/* ... your UI for quantity/price ... */}
      <button onClick={handleBuyClick}>Buy</button>
      <button onClick={closeBuyWindow}>Cancel</button>
    </div>
  );
};