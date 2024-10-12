import "./App.css";
import BackgroundMap from "./components/BackgroundMap";
import ControlPanel from "./components/ControlPanelComponents/ControlPanel";
import TitleLogo from "./components/TitleLogo";

function App() {
  return (
    <div className="relative h-screen w-screen">
      <BackgroundMap />
      <ControlPanel />
      <TitleLogo />
    </div>
  );
}

export default App;
