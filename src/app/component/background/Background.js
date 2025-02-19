"use client";

import React from "react";

const SkyBackground = ({ children }) => {
  return (
    <div className="sky">
      {/* Background layer with blur */}
      <div className="background-blur">
        <div className="sun"></div>
        <div className="cloud cloud1 medium"></div>
        <div className="cloud cloud2 small"></div>
        <div className="cloud cloud3 large"></div>
      </div>
      {/* Content rendered above the blurred background */}
      <div className="content">{children}</div>
      <style jsx>{`
        html,
        body,
        .sky {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        .sky {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, #87ceeb 0%, #e0f7fa 100%);
        }
        .background-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          filter: blur(8px);
          z-index: 0;
        }
        .sun {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #ffd700 40%, #ffa500 100%);
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
        }
        .cloud {
          position: absolute;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .cloud:before,
        .cloud:after {
          content: "";
          position: absolute;
          background: #fff;
          border-radius: 50%;
        }
        .cloud:before {
          width: 50%;
          height: 50%;
          top: -25%;
          left: 10%;
        }
        .cloud:after {
          width: 60%;
          height: 60%;
          top: -40%;
          right: 10%;
        }
        .cloud.small {
          width: 80px;
          height: 50px;
        }
        .cloud.medium {
          width: 120px;
          height: 70px;
        }
        .cloud.large {
          width: 200px;
          height: 100px;
        }
        .cloud1 {
          top: 100px;
          left: 15%;
        }
        .cloud2 {
          top: 150px;
          left: 50%;
        }
        .cloud3 {
          top: 50px;
          left: 75%;
        }
        .content {
          position: relative;
          z-index: 1;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default SkyBackground;
