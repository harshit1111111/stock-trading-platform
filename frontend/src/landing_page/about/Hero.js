import React from "react";

function Hero() {
  const stats = [
    { value: "1.5 Cr+", label: "Active Clients" },
    { value: "₹0", label: "Brokerage on Delivery" },
    { value: "15%+", label: "of Indian Retail Volume" },
    { value: "2010", label: "Founded" },
  ];

  return (
    <div>
      {/* Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
        color: "#fff",
        padding: "80px 40px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: "800", marginBottom: "16px" }}>
          We pioneered discount broking in India.
          <br />
          <span style={{ color: "#4fc3f7" }}>Now we're redefining it.</span>
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#b0bec5", maxWidth: "600px", margin: "0 auto" }}>
          Founded in 2010, our mission is to make trading accessible, affordable,
          and transparent for every Indian.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", justifyContent: "center", background: "#387ed1", flexWrap: "wrap" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: "1", minWidth: "160px", padding: "28px 20px", textAlign: "center",
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
          }}>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#fff" }}>{s.value}</div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Story */}
      <div style={{ maxWidth: "900px", margin: "60px auto", padding: "0 30px" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "30px" }}>Our Story</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", color: "#555", lineHeight: "1.9", fontSize: "1rem" }}>
          <div>
            <p>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology.</p>
            <p>We named the company <strong>TradeX</strong> — built with the idea of trading without limits. Today, our disruptive pricing models and in-house technology have made us one of the fastest growing brokers in India.</p>
          </div>
          <div>
            <p>Over 1.5+ crore clients place millions of orders every day through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
            <p>We run popular open online educational and community initiatives to empower retail traders and investors across India, from metro cities to tier-3 towns.</p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: "#f5f7fa", padding: "60px 30px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "40px", textAlign: "center" }}>What We Stand For</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "💰", title: "Zero Brokerage", desc: "Free equity delivery trades. Flat ₹20 on intraday and F&O." },
              { icon: "🔒", title: "Transparent & Safe", desc: "SEBI registered. Your funds are always secure and audited." },
              { icon: "⚡", title: "Fast Technology", desc: "In-house built platforms with 99.9% uptime and real-time data." },
              { icon: "📚", title: "Investor Education", desc: "Free learning resources for every level of trader." },
              { icon: "🌍", title: "Made for India", desc: "Built from the ground up for Indian markets and regulations." },
              { icon: "🤝", title: "Customer First", desc: "24×5 support with dedicated account managers for all clients." },
            ].map((v, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "12px", padding: "28px 22px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}>
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{v.icon}</div>
                <h4 style={{ margin: "0 0 8px 0", color: "#1a1a2e" }}>{v.title}</h4>
                <p style={{ margin: 0, color: "#777", fontSize: "0.9rem", lineHeight: "1.6" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
