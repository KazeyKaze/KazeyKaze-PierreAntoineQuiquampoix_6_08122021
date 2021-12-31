import Banner from "./Banner";
import logo from "../assets/icon-left-font-monochrome-black.png";
import Connect from "../components/Connect";
import "../styles/App.css";

function App() {
  return (
    <div className="g-div-app">
      <header>
        <Banner>
          <img src={logo} className="g-banner" alt="Logo Groupomania" />
        </Banner>
      </header>
      <div>
        <Connect />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
