import React from "react";
// Try lowercase 'watchlist' if 'WatchList' fails


const About = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", color: "#222" }}>Market Experience</h1>
        <p style={{ color: "#666" }}>You can buy and sell stocks directly from this page to test your strategy.</p>
      </div>

      <div style={{ 
        
        
        border: "2px solid #ddd", 
        borderRadius: "10px", 
        padding: "20px", 
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)" ,
        textAlign:"center"
      }}>
        {/* Renders your trading logic */}
                                    <h2><button>DASHBOARD </button> </h2>
      </div>

      <div style={{ marginTop: "30px", textAlign: "center", color: "#888", fontSize: "14px" }}>
        <p>Note: These trades are executed using your virtual balance.</p>
      </div>
    </div>
  );
};

export default About;