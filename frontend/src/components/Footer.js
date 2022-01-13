import "../styles/Footer.css";
import logo_footer from "../assets/icon-left-font-monochrome-white.png";

function Footer() {
  return (
    <div className="g-div-footer">
      <div className="g-div-footer-eachdiv">
        <p>
          Contactez-nous par email{" "}
          <a
            target="blank"
            href="mailto:groupomania-reseausocial-contact@gmail.com"
          >
            ici
          </a>
        </p>
      </div>
      <div className="g-div-footer-eachdiv">
        <a
          target="blank"
          href={
            "https://www.google.com/maps/place/93170+Bagnolet/@48.8671248,2.407735,14z/data=!3m1!4b1!4m5!3m4!1s0x47e66d6fcb478cb7:0x40b82c3688b3c70!8m2!3d48.870364!4d2.4234589"
          }
        >
          <ul>
            <li>Grouponania SA</li>
            <li>236 ZA du projet 7</li>
            <li>93170 Bagnolet-sur-OC</li>
          </ul>
        </a>
      </div>
      <div className="g-div-footer-eachdiv">
        <a
          href={
            "https://openclassrooms.com/fr/paths/185/projects/677/assignment"
          }
          target="blank"
        >
          <img
            src={logo_footer}
            href={
              "https://openclassrooms.com/fr/paths/185/projects/677/assignment"
            }
            target="blank"
            className="g-logo-footer"
            alt="Logo Groupomania"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
