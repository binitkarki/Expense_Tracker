// src/Login.jsx
import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Login({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      onLogin();
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <span className="link" onClick={switchToRegister}>Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
