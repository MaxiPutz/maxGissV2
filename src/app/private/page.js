"use client"
import StoreProvider from "../StoreProvider"
import App from "./app/App"
import "./private.css"

export default function Private() {
  return (
    <StoreProvider>
      <div className="private-container">
        <header className="header">
          <h1>NASA GISS Temperature Data</h1>
          <p>Visualizing global temperature changes using NASA's GISS dataset.</p>
        </header>
        
        <main>
          <App />
        </main>
      </div>
    </StoreProvider>
  );
}