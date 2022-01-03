import "../styles/Connect.css";

////////// LOGIQUE
function connection() {
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: document.getElementById("login-email").value,
      password: document.getElementById("login-password").value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

////////// STRUCTURE
function Connect() {
  return (
    <div className="g-div-connect">
      {/* LOGIN */}
      <div className="g-div-login">
        <form action="">
          <div>
            <div className="g-div-h2">
              <h2>Connexion</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input type="email" id="login-email" name="user_login_email" />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input type="text" id="login-password" name="user_login_password" />
          </div>
        </form>
        <button id="button-connect" onClick={connection}>
          Connexion
        </button>
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
            <input type="email" id="signup-email" name="user_signup_email" />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input
              type="text"
              id="signup-password"
              name="user_signup_password"
            />
          </div>
          <div>
            <label htmlFor="firstname">
              Prénom:
              <br />
            </label>
            <input
              type="text"
              id="signup-firstname"
              name="user_signup_firstname"
            />
          </div>
          <div>
            <label htmlFor="lastname">
              Nom:
              <br />
            </label>
            <input
              type="text"
              id="signup-lastname"
              name="user_signup_lastname"
            />
          </div>
        </form>
        <button>Inscription</button>
      </div>
    </div>
  );
}

export default Connect;
