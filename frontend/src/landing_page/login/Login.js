import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3002/login", { email, password });

      if (response.status === 200) {
        // Just set the username — per-user data loads automatically from holdings_x / funds_x / orders_x keys
        localStorage.setItem("username", response.data.username);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      const data = err.response?.data;
      if (!err.response) {
        setError("Cannot reach server. Make sure the backend is running on port 3002.");
      } else {
        setError(data?.error || data?.message || "Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to your trading account</p>
        </div>

        {error && (
          <div style={styles.errorBanner}>
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.signupLink}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Create one here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
    padding: "40px 44px",
    width: "100%",
    maxWidth: "420px",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a2e",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#888",
  },
  errorBanner: {
    backgroundColor: "#fff0f0",
    border: "1px solid #ffcccc",
    color: "#c0392b",
    borderRadius: "6px",
    padding: "10px 14px",
    marginBottom: "18px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
  },
  input: {
    padding: "11px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    color: "#222",
    backgroundColor: "#fafafa",
  },
  button: {
    marginTop: "8px",
    padding: "13px",
    backgroundColor: "#387ed1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
  },
  signupLink: {
    textAlign: "center",
    marginTop: "22px",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#387ed1",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;