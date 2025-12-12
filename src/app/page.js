"use client"; // Required for using hooks
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

import { useState } from "react";
import Login from "./login/page";
export default function Home() {


  return (
    <div>
        <nav className="nav">
          <a href={`${basePath}/`} className="nav-link active">Home</a>
            <a href={`${basePath}/register`} className="nav-link ">Register</a>
        </nav>
        <div>
          <Login></Login>
        </div>
    </div>
  );
}
