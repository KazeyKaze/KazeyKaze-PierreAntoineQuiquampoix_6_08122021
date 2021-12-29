import Banner from "./Banner";
import logo from "../assets/icon-left-font.png";
import "../styles/App.css";

function App() {
  return (
    <div>
      <Banner>
        <img src={logo} className="g-banner" alt="Logo Groupomania" />
      </Banner>
    </div>
  );
}

export default App;
