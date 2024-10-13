import { useState } from "react";
import "./App.css";
import BackgroundMap from "./components/BackgroundMap";
import ControlPanel from "./components/ControlPanelComponents/ControlPanel";
import TitleLogo from "./components/TitleLogo";

const App = () => {
  const [attackPort, setAttackPort] = useState<string>("");

  const handleAttackPortUpdate = (newAttackPort: string) => {
    setAttackPort(newAttackPort);
  };

  return (
    <div className="relative h-screen w-screen">
      <BackgroundMap
        attackPort={attackPort} // Pass attackPort to BackgroundMap
      />
      <ControlPanel onAttackPortUpdate={handleAttackPortUpdate} />
      <TitleLogo />
    </div>
  );
};

export default App;
