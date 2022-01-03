import "../styles/Connect.css";

function Connect() {
  return (
    <div className="g-div-connect">
      {/* LOGIN */}
      <div className="g-div-login">
        <form action="http://localhost:3000/api/auth/login" method="post">
          <div>
            <div className="g-div-h2">
              <h2 >Connexion</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input type="email" id="login-email" name="user_email" />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input type="text" id="login-password" name="user_password" />
          </div>
        </form>
        <button>Connexion</button>
      </div>

      {/* SIGNUP */}
      <div className="g-div-signup">
        <form action="http://localhost:3000/api/auth/signup" method="post">
          <div>
            <div className="g-div-h2">
              <h2>Inscription</h2>
            </div>
            <label htmlFor="email">
              Email:
              <br />
            </label>
            <input type="email" id="signup-email" name="user_email" />
          </div>
          <div>
            <label htmlFor="password">
              Mot de passe:
              <br />
            </label>
            <input type="text" id="signup-password" name="user_password" />
          </div>
          <div>
            <label htmlFor="firstname">
              Prénom:
              <br />
            </label>
            <input type="text" id="signup-firstname" name="user_firstname" />
          </div>
          <div>
            <label htmlFor="lastname">
              Nom:
              <br />
            </label>
            <input type="text" id="signup-lastname" name="user_lastname" />
          </div>
        </form>
        <button>Inscription</button>
      </div>
    </div>
  );
}

export default Connect;
