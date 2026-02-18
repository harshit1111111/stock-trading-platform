import React, { useState, createContext } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  // This defines the 'orders' state that was missing/unused
  const [orders, setOrders] = useState([]);

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const addOrder = (newOrder) => {
    // Updates the state and matches your localStorage logic
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));
  };

  return (
    <GeneralContext.Provider
      value={{
        isBuyWindowOpen,
        selectedStockUID,
        allOrders: orders, // This fixes the 'allOrders is not defined' error
        handleOpenBuyWindow,
        handleCloseBuyWindow,
        addOrder,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;