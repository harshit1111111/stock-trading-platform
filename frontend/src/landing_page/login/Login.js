import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", { email, password });
      
      if (response.status === 200) {
        // Save the username returned from backend so the Dashboard knows who you are
        localStorage.setItem("username", response.data.username);
        
        // Redirect to Dashboard
        window.location.href = "http://localhost:3001/";
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container" style={{ padding: "50px", textAlign: "center" }}>
      <form onSubmit={handleLogin} style={{ display: "inline-block", border: "1px solid #ccc", padding: "20px" }}>
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ display: "block", margin: "10px 0" }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ display: "block", margin: "10px 0" }} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;