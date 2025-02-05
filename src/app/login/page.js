"use client";

import { useState } from "react";
import "./login.css"; // Ensure you create this CSS file

export default function Login() {
    const [email, setEmail] = useState("test");
    const [password, setPassword] = useState("test");
    return (
        <div className="login-container">
            <h2>Login to Access GISS Temperature Data</h2>
            <p>
                Log in to explore **NASA’s GISS temperature records** and visualize historical climate data.
                This system provides access to **station-based temperature data** used in climate research.
            </p>

            <div className="login-form">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password" // Mask password input
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={() => {
                        fetch("/api/login", {
                            method: "POST",
                            body: JSON.stringify({ email, password }),
                        })
                        .then((ele) => ele.json())
                        .then((ele) => {
                            console.log(ele);
                            if (ele.error) {
                                alert("User not found or password incorrect");
                                return;
                            }
                            document.cookie = `token=${ele.token}`;
                            location.href = "/private";
                        })
                        .catch(() => {
                            alert("User not found or password incorrect");
                        });
                    }}
                >
                    Login
                </button>
            </div>

            <h3>NASA GISS Station Data</h3>
<p>
    You can view the official **GISTEMP v2 station data** by clicking the link below:
</p>

<a
    href="https://data.giss.nasa.gov/gistemp/station_data_v2/"
    target="_blank"
    rel="noopener noreferrer"
    className="gist-link"
>
    Open NASA GISS Station Data
</a>
        </div>
    );
}
