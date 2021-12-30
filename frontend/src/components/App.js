import Banner from "./Banner";
import logo from "../assets/icon-left-font-monochrome-black.png";
import Connect from "../components/Connect";
import "../styles/App.css";

function App() {
  return (
    <div className="g-div-app">
      <Banner>
        <img src={logo} className="g-banner" alt="Logo Groupomania" />
      </Banner>
      <Connect />
    </div>
  );
}

export default App;
