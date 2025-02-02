"use client"; // Required for using hooks

import { useState } from "react";
import Login from "./login/page";

export default function Home() {


  return (
    <div>
        <nav className="nav">
          <a href="/" className="nav-link active">Home</a>
            <a href="/register" className="nav-link ">Register</a>
        </nav>
        <div>
          <Login></Login>
        </div>
    </div>
  );
}
