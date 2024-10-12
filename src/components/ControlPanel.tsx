// ControlPanel.js
import React from "react";

function ControlPanel() {
  return (
    <div
      className="absolute top-3 right-3 bottom-3 w-1/4 bg-white shadow-lg p-6 rounded-xl"
      style={{
        backgroundImage: `
        radial-gradient(circle, rgba(255, 255, 255, 0) 60%, rgba(255, 255, 255, 1) 100%),
        linear-gradient(90deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px),
        linear-gradient(0deg, rgba(200, 200, 200, 0.2) 1px, transparent 1px)
      `,
        backgroundSize: "20px 20px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Empty styled container for the control panel */}
    </div>
  );
}

export default ControlPanel;
