import React, { useState } from "react";
import "./App.css";
import BackgroundMap from "./components/BackgroundMap";
import ControlPanel from "./components/ControlPanelComponents/ControlPanel";
import TitleLogo from "./components/TitleLogo";

const App = () => {
  const [route, setRoute] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [attackPort, setAttackPort] = useState<string>("");

  const handleRouteUpdate = (newRoute: any, start: any, end: any) => {
    setRoute(newRoute);
    setStartPoint(start);
    setEndPoint(end);
  };

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
