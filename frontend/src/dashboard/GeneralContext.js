import React, { useState, createContext } from "react";

export const GeneralContext = createContext();

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orders, setOrders] = useState(() => {
    try {
      const uname = localStorage.getItem("username") || "guest";
      return JSON.parse(localStorage.getItem(`orders_${uname}`)) || [];
    } catch {
      return [];
    }
  });

  // Shared holdings state — initialized from per-user localStorage key
  const [holdings, setHoldings] = useState(() => {
    try {
      const uname = localStorage.getItem("username") || "guest";
      return JSON.parse(localStorage.getItem(`holdings_${uname}`)) || [];
    } catch {
      return [];
    }
  });

  const handleOpenBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const addOrder = (newOrder) => {
    const uname = localStorage.getItem("username") || "guest";
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    const existingOrders = JSON.parse(localStorage.getItem(`orders_${uname}`)) || [];
    localStorage.setItem(`orders_${uname}`, JSON.stringify([newOrder, ...existingOrders]));
  };

  // Called by WatchList after every buy/sell — persists & propagates instantly
  const updateHoldings = (updatedHoldings) => {
    const uname = localStorage.getItem("username") || "guest";
    setHoldings(updatedHoldings);
    localStorage.setItem(`holdings_${uname}`, JSON.stringify(updatedHoldings));
  };

  return (
    <GeneralContext.Provider
      value={{
        isBuyWindowOpen,
        selectedStockUID,
        allOrders: orders,
        holdings,
        updateHoldings,
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