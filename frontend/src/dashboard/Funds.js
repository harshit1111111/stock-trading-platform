import React, { useState, useEffect } from "react";

const Funds = () => {
  const uname = localStorage.getItem("username") || "guest";
  const fundsKey = `funds_${uname}`;
  const ordersKey = `orders_${uname}`;

  const [balance, setBalance] = useState(() => Number(localStorage.getItem(`funds_${localStorage.getItem("username") || "guest"}`)) || 100000);
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState("upi");
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setBalance(Number(localStorage.getItem(fundsKey)) || 100000);
  }, [fundsKey]);

  const formatCard = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePay = () => {
    setError("");
    if (tab === "upi") {
      if (!upiId.includes("@")) { setError("Enter a valid UPI ID (e.g. name@upi)"); return; }
    } else {
      if (cardNumber.replace(/\s/g, "").length < 16) { setError("Enter a valid 16-digit card number"); return; }
      if (!cardName.trim()) { setError("Enter cardholder name"); return; }
      if (expiry.length < 5) { setError("Enter a valid expiry (MM/YY)"); return; }
      if (cvv.length < 3) { setError("Enter a valid CVV"); return; }
    }
    setPaying(true);
    setTimeout(() => {
      const newBalance = balance + 100000;
      setBalance(newBalance);
      localStorage.setItem(fundsKey, newBalance.toString());
      const newOrder = {
        id: "PAY_" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        scrip: "FUND REFILL", type: "DEPOSIT", qty: 1, price: 299,
        status: "SUCCESS", date: new Date().toLocaleString(),
      };
      const existing = JSON.parse(localStorage.getItem(ordersKey) || "[]");
      localStorage.setItem(ordersKey, JSON.stringify([newOrder, ...existing]));
      setPaying(false);
      setSuccess(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false); setSuccess(false); setPaying(false); setError("");
    setUpiId(""); setCardNumber(""); setCardName(""); setExpiry(""); setCvv("");
  };

  const tabStyle = (active) => ({
    flex: 1, padding: "11px 6px", border: "none", cursor: "pointer",
    fontWeight: "600", fontSize: "13px",
    background: active ? "#fff" : "#f5f5f5",
    color: active ? "#387ed1" : "#666",
    borderBottom: active ? "2px solid #387ed1" : "2px solid transparent",
  });

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: "1px solid #ddd",
    borderRadius: "6px", fontSize: "14px", boxSizing: "border-box",
    outline: "none", marginTop: "6px",
  };

  return (
    <div style={{ padding: "40px 30px", fontFamily: "Arial, sans-serif", maxWidth: "520px", margin: "0 auto" }}>

      {/* Balance Card */}
      <div style={{
        background: "linear-gradient(135deg, #1a4fa0, #387ed1)",
        borderRadius: "16px", padding: "32px", color: "#fff",
        marginBottom: "28px", boxShadow: "0 6px 20px rgba(56,126,209,0.3)",
      }}>
        <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "8px", letterSpacing: "1px", textTransform: "uppercase" }}>
          Available Trading Funds
        </div>
        <div style={{ fontSize: "44px", fontWeight: "800" }}>
          ₹{balance.toLocaleString("en-IN")}
        </div>
        <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "8px" }}>
          Logged in as <strong>{uname}</strong>
        </div>
      </div>

      {/* Refill Section */}
      <div style={{
        background: "#fff", borderRadius: "12px", border: "1px solid #eee",
        padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <h3 style={{ margin: "0 0 6px", color: "#1a1a2e" }}>Refill Your Account</h3>
        <p style={{ color: "#666", fontSize: "14px", margin: "0 0 20px" }}>
          Add <strong>₹1,00,000</strong> virtual trading funds for just <strong>₹299</strong>.
        </p>
        <button onClick={() => setShowModal(true)} style={{
          width: "100%", padding: "14px", background: "#387ed1", color: "#fff",
          border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "700", cursor: "pointer",
        }}>
          Pay ₹299 to Refill
        </button>
      </div>

      {/* PAYMENT MODAL */}
      {showModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000,
        }}>
          <div style={{
            background: "#fff", borderRadius: "12px", width: "420px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden",
          }}>
            {success ? (
              <div style={{ padding: "48px 32px", textAlign: "center" }}>
                <div style={{ fontSize: "60px", marginBottom: "12px" }}>✅</div>
                <h2 style={{ color: "#2e7d32", margin: "0 0 8px" }}>Payment Successful!</h2>
                <p style={{ color: "#555", fontSize: "14px" }}>₹1,00,000 added to your trading account.</p>
                <button onClick={closeModal} style={{
                  marginTop: "24px", padding: "12px 36px", background: "#387ed1",
                  color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer",
                }}>Done</button>
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div style={{ background: "#387ed1", padding: "16px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>Zerodha Secure Payment</div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>Amount: ₹299</div>
                  </div>
                  <button onClick={closeModal} style={{ background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer", lineHeight: 1 }}>×</button>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", borderBottom: "1px solid #eee" }}>
                  <button style={tabStyle(tab === "upi")} onClick={() => { setTab("upi"); setError(""); }}>📱 UPI</button>
                  <button style={tabStyle(tab === "debit")} onClick={() => { setTab("debit"); setError(""); }}>🏧 Debit Card</button>
                  <button style={tabStyle(tab === "credit")} onClick={() => { setTab("credit"); setError(""); }}>💳 Credit Card</button>
                </div>

                <div style={{ padding: "22px" }}>
                  {/* UPI */}
                  {tab === "upi" && (
                    <div>
                      <div style={{ display: "flex", gap: "10px", marginBottom: "18px", justifyContent: "center" }}>
                        {[
                          { name: "GPay", color: "#4285F4" },
                          { name: "PhonePe", color: "#5f259f" },
                          { name: "Paytm", color: "#002970" },
                        ].map(app => (
                          <div key={app.name} style={{
                            border: `2px solid ${app.color}20`, borderRadius: "8px",
                            padding: "10px 14px", textAlign: "center", fontSize: "12px",
                            fontWeight: "700", color: app.color, cursor: "pointer",
                            background: `${app.color}08`, minWidth: "70px",
                          }}>{app.name}</div>
                        ))}
                      </div>
                      <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>UPI ID</label>
                      <input style={inputStyle} placeholder="yourname@okicici"
                        value={upiId} onChange={e => setUpiId(e.target.value)} />
                    </div>
                  )}

                  {/* Debit / Credit Card */}
                  {(tab === "debit" || tab === "credit") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Card Number</label>
                        <input style={inputStyle} placeholder="1234 5678 9012 3456"
                          value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} />
                      </div>
                      <div>
                        <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Cardholder Name</label>
                        <input style={inputStyle} placeholder="Name as on card"
                          value={cardName} onChange={e => setCardName(e.target.value)} />
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>Expiry</label>
                          <input style={inputStyle} placeholder="MM/YY"
                            value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "13px", fontWeight: "600", color: "#444" }}>CVV</label>
                          <input style={inputStyle} placeholder="•••" type="password"
                            maxLength={4} value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div style={{ marginTop: "12px", color: "#c62828", fontSize: "13px", background: "#fff8f8", padding: "8px 12px", borderRadius: "6px", border: "1px solid #ffd7d7" }}>
                      ⚠ {error}
                    </div>
                  )}

                  <button onClick={handlePay} disabled={paying} style={{
                    width: "100%", marginTop: "18px", padding: "13px",
                    background: paying ? "#aaa" : "#387ed1", color: "#fff",
                    border: "none", borderRadius: "8px", fontSize: "15px",
                    fontWeight: "700", cursor: paying ? "not-allowed" : "pointer",
                  }}>
                    {paying ? "⏳ Processing…" : "Pay ₹299"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
