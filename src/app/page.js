"use client"; // Required for using hooks
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

import { useState } from "react";
import Login from "./login/page";
export default function Home() {


  return (
    <div>
      <nav className="nav">
        <Link href={`/`} className="nav-link active">Home</Link>
        <Link href={`/register`} className="nav-link ">Register</Link> </nav>
      <div>
        <Login></Login>
      </div>
    </div>
  );
}
