import "../styles/Buttons.css";

////////// LOGIQUE
function Buttons() {
    
  // fonction qui déconnecte l'utilisateur et le renvoi à la page de connexion
  function disconnect(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "http://localhost:4000/";
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-buttons">
      {" "}
      <button className="button-disconect" onClick={disconnect}>
        Déconnexion du compte
      </button>
      <button className="button-delete">Supprimer mon compte</button>
    </div>
  );
}

export default Buttons;
