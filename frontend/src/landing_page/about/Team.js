import React from "react";

const team = [
  {
    name: "Harshit Jadhav",
    role: "Founder & CEO",
    emoji: "👨‍💼",
    bio: "Harshit founded TradeX in 2010 after a decade as an active trader. His vision: make stock trading free, fair, and fast for every Indian. Under his leadership, TradeX grew to serve over 1.5 crore clients.",
    social: ["LinkedIn", "Twitter"],
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    emoji: "👩‍💻",
    bio: "Priya leads all technology at TradeX. A former engineer at Goldman Sachs, she built our in-house trading engine that handles millions of orders per second with 99.9% uptime.",
    social: ["LinkedIn", "GitHub"],
  },
  {
    name: "Rajeev Nair",
    role: "Head of Operations",
    emoji: "👨‍🔧",
    bio: "Rajeev ensures TradeX runs like clockwork — from regulatory compliance to back-office operations. He brings 15+ years of experience from SEBI-regulated brokerages.",
    social: ["LinkedIn"],
  },
  {
    name: "Sneha Kulkarni",
    role: "Head of Customer Success",
    emoji: "👩‍🎓",
    bio: "Sneha built our 24×5 support team from scratch. She is passionate about investor education and leads TradeX's free learning initiatives reaching 2 lakh+ students.",
    social: ["LinkedIn", "Twitter"],
  },
];

function Team() {
  return (
    <div style={{ background: "#fff", padding: "60px 30px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", textAlign: "center" }}>
          The People Behind TradeX
        </h2>
        <p style={{ textAlign: "center", color: "#888", marginBottom: "48px", fontSize: "1rem" }}>
          A small, passionate team obsessed with making investing better for everyone.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          {team.map((member, i) => (
            <div key={i} style={{
              background: "#f9fafb", borderRadius: "14px", padding: "32px 28px",
              border: "1px solid #eee", display: "flex", flexDirection: "column", gap: "12px",
            }}>
              <div style={{ fontSize: "3rem" }}>{member.emoji}</div>
              <div>
                <h3 style={{ margin: "0 0 6px 0", color: "#1a1a2e", fontSize: "1.2rem" }}>{member.name}</h3>
                <span style={{
                  background: "#e8f0fe", color: "#387ed1", fontSize: "0.78rem",
                  fontWeight: "600", padding: "3px 10px", borderRadius: "20px",
                }}>{member.role}</span>
              </div>
              <p style={{ margin: 0, color: "#666", fontSize: "0.92rem", lineHeight: "1.7" }}>{member.bio}</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {member.social.map((s, j) => (
                  <span key={j} style={{
                    fontSize: "0.82rem", color: "#387ed1", fontWeight: "600",
                    cursor: "pointer", textDecoration: "underline",
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join us */}
        <div style={{
          marginTop: "60px",
          background: "linear-gradient(135deg, #1a1a2e, #387ed1)",
          borderRadius: "16px", padding: "48px 40px", textAlign: "center", color: "#fff",
        }}>
          <h3 style={{ margin: "0 0 10px 0", fontSize: "1.6rem" }}>Want to join us?</h3>
          <p style={{ margin: "0 0 24px 0", color: "rgba(255,255,255,0.8)", fontSize: "1rem" }}>
            We're always looking for passionate people to help build the future of Indian investing.
          </p>
          <button style={{
            background: "#fff", color: "#387ed1", border: "none", borderRadius: "8px",
            padding: "12px 30px", fontWeight: "700", fontSize: "1rem", cursor: "pointer",
          }}>View Open Positions →</button>
        </div>
      </div>
    </div>
  );
}

export default Team;
