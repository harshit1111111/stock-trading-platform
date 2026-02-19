import React, { useState } from "react";

const faqs = [
  { q: "How do I open an account?", a: "Click 'Signup' on our homepage, fill in your details, complete KYC with Aadhaar & PAN, and your account will be activated within 24 hours." },
  { q: "Is there any brokerage on delivery trades?", a: "No! Equity delivery trades are completely free — ₹0 brokerage. For intraday and F&O, we charge a flat ₹20 per order." },
  { q: "How do I add funds to my account?", a: "Go to Dashboard → Funds → click 'Add Funds'. We support UPI, Net Banking, and IMPS. Funds are credited instantly." },
  { q: "How do I withdraw money?", a: "Go to Dashboard → Funds → Withdraw. Withdrawals are processed within 24 hours on trading days." },
  { q: "What markets can I trade in?", a: "You can trade Equities, F&O, Currency, and Commodity on NSE and BSE through our platform." },
  { q: "Is my money safe?", a: "Yes. We are SEBI registered and all client funds are held in separate, audited accounts. We are compliant with all SEBI regulations." },
];

function Hero() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
        padding: "70px 30px", textAlign: "center", color: "#fff",
      }}>
        <h1 style={{ fontSize: "2.4rem", fontWeight: "800", marginBottom: "12px" }}>
          How can we help you?
        </h1>
        <p style={{ color: "#b0bec5", marginBottom: "30px", fontSize: "1rem" }}>
          Search our help centre or browse topics below
        </p>
        <div style={{ maxWidth: "520px", margin: "0 auto", position: "relative" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. How do I activate F&O?"
            style={{
              width: "100%", padding: "14px 20px", borderRadius: "30px",
              border: "none", fontSize: "1rem", outline: "none",
              boxSizing: "border-box", color: "#333",
            }}
          />
        </div>
      </div>

      {/* Quick links */}
      <div style={{ background: "#f5f7fa", padding: "40px 30px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { icon: "🔓", label: "Account Opening" },
              { icon: "💳", label: "Add Funds" },
              { icon: "📊", label: "Trading Help" },
              { icon: "📞", label: "Contact Us" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "10px", padding: "22px 16px",
                textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                cursor: "pointer", border: "1px solid #eee",
              }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{item.icon}</div>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: "#333" }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "50px 30px" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "28px" }}>
          Frequently Asked Questions
        </h2>
        {filtered.length === 0 ? (
          <p style={{ color: "#888" }}>No results found for "{search}"</p>
        ) : (
          filtered.map((faq, i) => (
            <div key={i} onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{
              border: "1px solid #e8eaf0", borderRadius: "10px", marginBottom: "12px",
              overflow: "hidden", cursor: "pointer",
            }}>
              <div style={{
                padding: "18px 22px", display: "flex", justifyContent: "space-between",
                alignItems: "center", background: openIndex === i ? "#f0f4ff" : "#fff",
              }}>
                <span style={{ fontWeight: "600", color: "#1a1a2e", fontSize: "0.97rem" }}>{faq.q}</span>
                <span style={{ color: "#387ed1", fontSize: "1.2rem", fontWeight: "700" }}>
                  {openIndex === i ? "−" : "+"}
                </span>
              </div>
              {openIndex === i && (
                <div style={{ padding: "14px 22px 20px", color: "#555", lineHeight: "1.7", fontSize: "0.93rem", background: "#fff" }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Hero;
