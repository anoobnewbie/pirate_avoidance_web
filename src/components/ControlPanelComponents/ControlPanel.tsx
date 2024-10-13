"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

import {
  AttackPortCombobox,
} from "./PortCombobox";

interface ControlPanelProps {
  onAttackPortUpdate: (attackPort: string) => void;
}

function ControlPanel({ onAttackPortUpdate }: ControlPanelProps) {
  const [attackPort, setAttackPort] = React.useState("");

  const handleUpdatePredictions = async (): Promise<void> => {
    console.log("Selected Attack Port:", attackPort);
    onAttackPortUpdate(attackPort);
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
      <AttackPortCombobox value={attackPort} setValue={setAttackPort} />

      <Button className="w-full mt-8" onClick={handleUpdatePredictions}>
        Update Predictions
      </Button>
    </div>
  );
}

export default ControlPanel;
