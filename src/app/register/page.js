"use client";

import { useState } from "react";
import "./register.css"; // Ensure you have this CSS file
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const h = `test`
  return (
    <div className="register-container">
      <nav className="nav">
        <Link href={`/`} className="nav-link">Home</Link>
        <Link href="/register" className="nav-link active">Register</Link>
      </nav>

      <h2>Create an Account</h2>
      <p>
        Register to access **NASA GISS Temperature Data** and visualize historical climate trends.
      </p>

      <div className="register-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => {
            fetch(`${basePath}/api/register`, {
              method: "POST",
              body: JSON.stringify({ email, password }),
            })
              .then((res) => res.json())
              .then((ele) => {
                if (ele.error) {
                  alert("User already exists");
                  return;
                }
                document.cookie = `token=${ele.token}`;
                location.href = `${basePath}/private`;

              })
              .catch(() => {
                alert("Registration failed");
              });
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
