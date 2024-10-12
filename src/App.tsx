import React, { useState } from 'react';
import "./App.css";
import BackgroundMap from "./components/BackgroundMap";
import ControlPanel from "./components/ControlPanelComponents/ControlPanel";
import TitleLogo from "./components/TitleLogo";

const App = () => {
  const [route, setRoute] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  const handleRouteUpdate = (newRoute:any, start:any, end:any) => {
    setRoute(newRoute);
    setStartPoint(start);
    setEndPoint(end);
  };

  return (
    <div className="relative h-screen w-screen">
      <BackgroundMap route={route} startPoint={startPoint} endPoint={endPoint} />
      <ControlPanel onRouteUpdate={handleRouteUpdate} />
      <TitleLogo />
    </div>
  );
};

export default App;