import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { animateEntrance, animateError, animateExit } from "./loginAnimation";
import styles from "./Login.module.css";

const API = import.meta.env.VITE_API_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) animateEntrance(cardRef.current);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/api/auth/login`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);

      animateExit(cardRef.current, () => navigate("/"));
    } catch (err) {
      animateError(cardRef.current);
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.container}>
      {/* Ambient orbs */}
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orb3}`} aria-hidden="true" />

      <div className={styles.loginCard} ref={cardRef}>
        {/* Icon */}
        <div className={styles.iconWrap} aria-hidden="true">🌿</div>

        {/* Heading */}
        <h1 className={styles.title}>
          Our <em className={styles.titleAccent}>Private</em> Space
        </h1>
        <p className={styles.subtitle}>Welcome back, Namit & Shivaa</p>

        {/* Divider */}
        <div className={styles.divider}>
          <div className={styles.dividerLine} />
          <div className={styles.dividerDot} />
          <div className={styles.dividerLine} />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>✦</span>
              <input
                type="text"
                className={styles.input}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>◈</span>
              <input
                type="password"
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Enter Our World
          </button>
        </form>

        {/* Footer */}
        <p className={styles.cardFooter}>made with ❤️ for us</p>
      </div>
    </div>
  );
};

export default Login;