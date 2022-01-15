import { useState } from "react";
import "../styles/Login.css";

////////// LOGIQUE

/* FONCTION LOGIN */
const Login = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // Envoie des données à l'API pour la connexion
  function connect(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: emailLogin,
        password: passwordLogin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      // Si un token a été renvoyé, alors, redirection vers la page mur
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("userId", JSON.stringify(data.userId));
        sessionStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        const token = data.token;
        if (token !== null || token !== undefined) {
          window.location.href = "http://localhost:4000/wall";
        } else {
          alert("Utilisateur non identifié ou mot de passe incorrect");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  /* FONCTION REGISTER */
  const [emailSignup, setEmailSignup] = useState("");
  const [passwordSignup, setPasswordSignup] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // Envoie des données à l'API pour l'inscription
  function register(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: emailSignup,
        password: passwordSignup,
        firstName: firstname,
        lastName: lastname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Si la réponse est 201 alors l'utilisateur peut se connecter
      .then((res) => {
        if (res.status === 201) {
          alert(
            "Votre compte a bien été crée, veuillez à présent vous connecter."
          );
        } else {
          alert("Une erreur est survenue, veuillez réessayer");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-connect">
      <div className="g-div-h1">
        <h1>Choississez de vous connecter ou de vous inscrire</h1>
      </div>
      {/* LOGIN */}
      <div className="g-div-login">
        <form action="" onSubmit={connect}>
          <div>
            <div className="g-div-h2">
              <h2>Connexion</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input
              type="password"
              id="login-password"
              placeholder="Mot de passe"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              required
            />
          </div>
          <div className="button-form">
            <button type="submit">Connexion</button>
          </div>
        </form>
      </div>

      {/* SIGNUP */}
      <div className="g-div-signup">
        <form action="" onSubmit={register}>
          <div>
            <div className="g-div-h2">
              <h2>Inscription</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input
              type="email"
              id="signup-email"
              placeholder="Email"
              value={emailSignup}
              onChange={(e) => setEmailSignup(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input
              type="password"
              id="signup-password"
              placeholder="Mot de passe"
              value={passwordSignup}
              onChange={(e) => setPasswordSignup(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="firstname">
              Prénom:
              <br />
            </label>
            <input
              type="firstname"
              id="signup-firstname"
              placeholder="Prénom"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastname">
              Nom:
              <br />
            </label>
            <input
              type="lastname"
              id="signup-lastname"
              placeholder="Nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="button-form">
            <button type="submit">Inscription</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
