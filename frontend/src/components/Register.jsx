// src/Register.jsx
import { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Register({ onRegistered }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      alert("Passwords do not match");
      return;
    }
    try {
      // send plain JSON instead of FormData since no file upload
      const data = {
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      };
      await axios.post("http://127.0.0.1:8000/api/register/", data);
      alert("Registration successful");
      onRegistered();
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <h2>Register</h2>
        <input
          name="first_name"
          placeholder="First name"
          value={form.first_name}
          onChange={change}
        />
        <input
          name="last_name"
          placeholder="Last name"
          value={form.last_name}
          onChange={change}
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={change}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={change}
          required
        />
        <input
          name="password2"
          type="password"
          placeholder="Confirm password"
          value={form.password2}
          onChange={change}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
