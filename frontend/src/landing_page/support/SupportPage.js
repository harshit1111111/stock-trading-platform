import React from "react";
import Hero from "./Hero";
import CreateTicket from "./CreateTicket";
//import Navbar from "../Navbar"; // Import is here
//import Footer from "../Footer"; // Import is here

function SupportPage() {
  return (
    <>
      {/* 🟢 You must use them here to remove the warning */}
      
      <Hero />
      <CreateTicket />
    
    </>
  );
}

export default SupportPage;