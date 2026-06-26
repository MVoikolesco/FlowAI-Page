import React from "react";

export const AmbientLights: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div
      className="absolute float-slow"
      style={{
        top: "8%",
        left: "3%",
        width: "280px",
        height: "280px",
        background: "radial-gradient(circle, rgba(200, 146, 42, 0.1), transparent 70%)",
      }}
    ></div>
    <div
      className="absolute float-slow"
      style={{
        top: "55%",
        right: "0%",
        width: "320px",
        height: "320px",
        background: "radial-gradient(circle, rgba(184, 115, 42, 0.08), transparent 70%)",
        animationDelay: "-5s",
      }}
    ></div>
  </div>
);
