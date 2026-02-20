import React, { useState } from "react";

const topics = [
  {
    icon: "🔓", title: "Account Opening",
    links: ["Online Account Opening", "Offline Account Opening", "NRI Account Opening", "KYC & Document Verification", "Getting Started"],
  },
  {
    icon: "💳", title: "Funds & Payments",
    links: ["Add Funds via UPI", "Bank Transfer / IMPS", "Withdraw Funds", "Payment Failed", "Fund Settlement"],
  },
  {
    icon: "📊", title: "Trading & Orders",
    links: ["Place / Modify / Cancel Order", "Order Rejection Reasons", "Intraday Margins", "F&O Activation", "Market / Limit Orders"],
  },
  {
    icon: "📁", title: "Account & Profile",
    links: ["Update Mobile / Email", "Change Password", "Nomination", "Bank Account Change", "Demat Account Details"],
  },
  {
    icon: "📈", title: "Reports & Statements",
    links: ["P&L Statement", "Tax Report", "Contract Notes", "Holdings Report", "Annual Account Statement"],
  },
  {
    icon: "⚠️", title: "Complaints & Grievances",
    links: ["Lodge a Complaint", "SEBI Grievance", "Freeze / Suspend Account", "Suspicious Activity", "Escalate Ticket"],
  },
];

function CreateTicket() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.topic || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#f5f7fa", padding: "60px 30px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Topics grid */}
        <h2 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "28px" }}>
          Browse Help Topics
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "60px" }}>
          {topics.map((t, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "12px", padding: "24px 22px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1px solid #eee",
            }}>
              <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{t.icon}</div>
              <h4 style={{ margin: "0 0 14px 0", color: "#1a1a2e", fontSize: "1rem" }}>{t.title}</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {t.links.map((link, j) => (
                  <li key={j} style={{ marginBottom: "7px" }}>
                    <span style={{ color: "#387ed1", fontSize: "0.88rem", cursor: "pointer", textDecoration: "underline" }}>
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "48px 44px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)", maxWidth: "640px", margin: "0 auto",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px" }}>
            Create a Support Ticket
          </h2>
          <p style={{ color: "#888", marginBottom: "30px", fontSize: "0.93rem" }}>
            Can't find your answer? Submit a ticket and we'll get back to you within 24 hours.
          </p>

          {submitted ? (
            <div style={{
              background: "#f0fff4", border: "1px solid #b2dfdb", borderRadius: "10px",
              padding: "30px", textAlign: "center",
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "12px" }}>✅</div>
              <h3 style={{ color: "#2e7d32", margin: "0 0 8px 0" }}>Ticket Submitted!</h3>
              <p style={{ color: "#555", margin: 0 }}>
                We've received your request, <strong>{form.name}</strong>. Our team will contact you at <strong>{form.email}</strong> within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} style={inputStyle} required />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} required />
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Topic</label>
                <select name="topic" value={form.topic} onChange={handleChange} style={inputStyle} required>
                  <option value="">Select a topic...</option>
                  {topics.map((t, i) => (
                    <option key={i} value={t.title}>{t.title}</option>
                  ))}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Describe your issue</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  rows={5} style={{ ...inputStyle, resize: "vertical" }} required
                />
              </div>
              <button type="submit" style={{
                background: "#387ed1", color: "#fff", border: "none", borderRadius: "8px",
                padding: "14px", fontSize: "1rem", fontWeight: "700", cursor: "pointer",
                marginTop: "4px",
              }}>
                Submit Ticket
              </button>
            </form>
          )}
        </div>

        {/* Contact channels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "48px" }}>
          {[
            { icon: "📧", title: "Email Us", info: "support@zerodha.com", sub: "Response within 24 hours" },
            { icon: "📞", title: "Call Us", info: "1800-XXX-XXXX", sub: "Mon–Fri, 9AM–6PM" },
            { icon: "💬", title: "Live Chat", info: "Chat on Dashboard", sub: "Available 24×5" },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "12px", padding: "24px 20px",
              textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{c.icon}</div>
              <h4 style={{ margin: "0 0 6px 0", color: "#1a1a2e" }}>{c.title}</h4>
              <p style={{ margin: "0 0 4px 0", color: "#387ed1", fontWeight: "600", fontSize: "0.95rem" }}>{c.info}</p>
              <p style={{ margin: 0, color: "#999", fontSize: "0.82rem" }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const fieldStyle = { display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = { fontSize: "13px", fontWeight: "600", color: "#444" };
const inputStyle = {
  padding: "11px 14px", border: "1px solid #ddd", borderRadius: "8px",
  fontSize: "14px", outline: "none", color: "#222", backgroundColor: "#fafafa",
  width: "100%", boxSizing: "border-box",
};

export default CreateTicket;
