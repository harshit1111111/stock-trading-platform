import React, { useState, useEffect } from "react";

const Funds = () => {
  const [balance, setBalance] = useState(0);

  // --- 1. Helper function to load Razorpay Script ---
  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // --- 2. Initial Data Loading & Event Listener ---
  const loadData = () => {
    const isReturningUser = localStorage.getItem("isReturningUser");
    const savedFunds = localStorage.getItem("funds");

    if (!isReturningUser) {
      // New User: Give Free Money
      const freeMoney = 100000;
      setBalance(freeMoney);
      localStorage.setItem("funds", freeMoney.toString());
      localStorage.setItem("isReturningUser", "true");
    } else {
      // Returning User: Load Saved Money
      setBalance(Number(savedFunds));
    }
  };

  useEffect(() => {
    loadData();

    // Listen for updates from other components (Buy/Sell actions)
    window.addEventListener("dataUpdated", loadData);

    return () => {
      window.removeEventListener("dataUpdated", loadData);
    };
  }, []);

  // --- 3. Payment Logic ---
  const handlePayment = async () => {
    // A. Load the script dynamically
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // B. Create the Payment Object
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID_HERE", // <--- PASTE YOUR KEY ID HERE
      amount: 29900, // ₹299.00
      currency: "INR",
      name: "Trading App Premium",
      description: "Refill Funds (₹1,00,000)",
      image: "https://cdn-icons-png.flaticon.com/512/2534/2534204.png",
      
      // Payment Success Handler
      handler: function (response) {
        // 1. Add Funds to Balance
        const currentBalance = Number(localStorage.getItem("funds")) || 0;
        const newBalance = currentBalance + 100000;
        
        setBalance(newBalance);
        localStorage.setItem("funds", newBalance.toString());

        // 2. SAVE TRANSACTION TO ORDERS
        const newOrder = {
          id: "PAY_" + response.razorpay_payment_id.slice(-6),
          scrip: "PREMIUM FUNDS",
          type: "DEPOSIT",
          qty: 1,
          price: 299.00,
          status: "SUCCESS",
          date: new Date().toLocaleString()
        };

        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const updatedOrders = [newOrder, ...existingOrders];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        
        // 3. IMPORTANT: Fire the signal to update Dashboard immediately
        window.dispatchEvent(new Event("dataUpdated"));
        
        alert(`Payment Successful! ₹1,00,000 added. Transaction ID: ${response.razorpay_payment_id}`);
      },

      prefill: {
        name: "Trader Name",
        email: "trader@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    // C. Open the Window
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", textAlign: "center", height:"70vh"}}>
      
      {/* BALANCE CARD */}
      <div style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "15px",
        padding: "30px",
        maxWidth: "400px",
        margin: "0 auto 40px auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
      }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#666" }}>Your Trading Funds</h3>
        <div style={{ 
          fontSize: "48px", 
          fontWeight: "bold", 
          color: balance === 0 ? "red" : "#2e7d32" 
        }}>
          ₹{balance.toLocaleString('en-IN')}
        </div>
        {balance === 0 && (
          <p style={{ color: "red", fontWeight: "bold" }}>You are out of funds!</p>
        )}
      </div>

      {/* PAYMENT BUTTON */}
      <div style={{
        borderTop: "2px dashed #ccc",
        paddingTop: "30px",
        maxWidth: "500px",
        margin: "0 auto"
      }}>
        <h3>Refill Your Account</h3>
        <p>Run out of money? Buy <strong>₹1,00,000</strong> virtual cash for real <strong>₹299 .</strong></p>
        
        <button 
          onClick={handlePayment}
          style={{
            backgroundColor: "#1976D2",
            color: "white",
            border: "none",
            padding: "15px 40px",
            fontSize: "18px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
          }}
        >
          Pay ₹299 to Refill
        </button>
      </div>
    </div>
  );
};

export default Funds;