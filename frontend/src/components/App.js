import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import logo_header from "../assets/icon-left-font-monochrome-black.png";
import Footer from "../components/Footer";
import Login from "./Login";
import Buttons from "./Buttons";
import Wall from "./Wall";
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
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              exact
              path="/wall"
              element={
                <>
                  <Buttons />
                  <Wall />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
