import "../styles/Login.css";
import React, { useState } from "react";

//////////////////////////////////////////////////
// - Rendre fonctionnelle l'inscription
// - Récupérer le token
// - Placer le token dans le session storage
//////////////////////////////////////////////////

////////// LOGIQUE
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function connect(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-connect">
      {/* LOGIN */}
      <div className="g-div-login">
        <form action="" onSubmit={connect}>
          <div>
            <div className="g-div-h2">
              <h2>Connexion</h2>
              <p>{email}</p>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input
              type="email"
              id="login-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-connect">
            <button type="submit">Connexion</button>
          </div>
        </form>
      </div>

      {/* SIGNUP */}
      <div className="g-div-signup">
        <form action="">
          <div>
            <div className="g-div-h2">
              <h2>Inscription</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input type="email" id="signup-email" placeholder="Email" />
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
            />
          </div>
          <div>
            <label htmlFor="lastname">
              Nom:
              <br />
            </label>
            <input type="lastname" id="signup-lastname" placeholder="Nom" />
          </div>
        </form>
        <button>Inscription</button>
      </div>
    </div>
  );
};

export default Login;
