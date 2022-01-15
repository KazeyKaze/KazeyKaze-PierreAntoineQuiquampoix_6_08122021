import "../styles/Header.css";
import logo_header from "../assets/icon-left-font-monochrome-black.png";

function Header() {
  return (
    <div className="g-div-header">
      <img src={logo_header} className="g-header" alt="Logo Groupomania" />
    </div>
  );
}

export default Header;
