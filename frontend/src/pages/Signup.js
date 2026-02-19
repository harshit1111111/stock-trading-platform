import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3002/signup", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        localStorage.setItem("username", username);
        setSuccess("Account created! Logging you in...");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
      }
    } catch (err) {
      // Read error from backend: tries .message first, then .error, then validation errors array
      const data = err.response?.data;
      if (data?.errors && Array.isArray(data.errors)) {
        setError(data.errors.map((e) => e.msg).join(". "));
      } else if (data?.error) {
        setError(data.error);
      } else if (data?.message) {
        setError(data.message);
      } else if (!err.response) {
        setError("Cannot reach server. Make sure the backend is running on port 3002.");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo / Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join and start trading today</p>
        </div>

        {/* Error / Success banners */}
        {error && (
          <div style={styles.errorBanner}>
            ⚠ {error}
          </div>
        )}
        {success && (
          <div style={styles.successBanner}>
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              placeholder=""
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

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
            <label style={styles.label}>Password <span style={styles.hint}>(min. 6 characters)</span></label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.loginLink}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login here</Link>
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
  successBanner: {
    backgroundColor: "#f0fff4",
    border: "1px solid #b2dfdb",
    color: "#27ae60",
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
  hint: {
    fontWeight: "400",
    color: "#aaa",
    fontSize: "12px",
  },
  input: {
    padding: "11px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
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
    transition: "background 0.2s",
  },
  loginLink: {
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

export default Signup;