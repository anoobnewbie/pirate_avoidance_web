"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import RouteCombobox from "./RouteCombobox";
import CargoCombobox from "./CargoCombobox";

function ControlPanel() {
  const [valueCargo, setValueCargo] = React.useState("");
  const [valueRoute, setValueRoute] = React.useState("");

  const handleUpdatePredictions = () => {
    console.log("Selected Cargo Type:", valueCargo);
    console.log("Selected Shipping Route:", valueRoute);

    // Call the API to update the predictions

    // Mock API response
    /// get this to the BackgroundMap...
  };

  return (
    <div
      className="absolute bottom-3 right-3 w-1/4 bg-white shadow-lg p-4 rounded-xl"
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
      {/* Cargo Type Combobox */}
      <CargoCombobox value={valueCargo} setValue={setValueCargo} />

      {/* Shipping Route Combobox */}
      <RouteCombobox value={valueRoute} setValue={setValueRoute} />

      {/* Update Predictions Button */}
      <Button className="w-full mt-4" onClick={handleUpdatePredictions}>
        Update Predictions
      </Button>
    </div>
  );
}

export default ControlPanel;
