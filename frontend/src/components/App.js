import Header from "./Header";
import logo_header from "../assets/icon-left-font-monochrome-black.png";
import Login from "./Login";
import Footer from "../components/Footer";
import "../styles/App.css";

function App() {
  return (
    <div className="g-div-app">
      <header>
        <Header>
          <img src={logo_header} className="g-header" alt="Logo Groupomania" />
        </Header>
      </header>
      <div>
        <Login />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
