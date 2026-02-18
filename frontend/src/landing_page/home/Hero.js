import React from "react";

function Hero() {
  const handleDashboardClick = () => {
    // This tells the browser to go to the actual address of your Dashboard UI
    // In your video, it was running at http://localhost:3001
    window.location.href = "http://localhost:3001"; 
  };

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="/Media/homeHero.png"
          alt="Hero Image"
          className="mb-5"
        />
        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
        
        {/* We use window.location.href here because the Dashboard is a separate app */}
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={handleDashboardClick}
        >
          DASHBOARD
        </button>
      </div>
    </div>
  );
}

export default Hero;