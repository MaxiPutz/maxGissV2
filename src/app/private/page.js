"use client"
import SkyBackground from "../component/background/Background";
import StoreProvider from "../StoreProvider"
import App from "./app/App"
import "./private.css"

export default function Private() {
  return (
    <StoreProvider>
        <SkyBackground>
      <div className="private-container">

        <main>
          <App />
        </main>
      </div>
        </SkyBackground>
    </StoreProvider>
  );
}