import "../styles/Buttons.css";

////////// LOGIQUE
function Buttons() {

  // fonction qui déconnecte l'utilisateur et le renvoi à la page de connexion
  function disconnect(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "http://localhost:4000/";
  }

  // Fonction pour supprimer le compte de l'utilisateur
  function deleteUser(e) {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    fetch(`http://localhost:3000/api/auth/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      // Si la réponse est 200 alors l'utilisateur est supprimé
      .then((res) => {
        if (res.status === 200) {
          alert(
            "Votre compte a bien été supprimé, vous allez être redirigé vers l'écran de connexion."
          );
          window.location.href = "http://localhost:4000/";
        } else {
          alert("Une erreur est surevenue, veuillez réessayer");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-buttons">
      {" "}
      <button className="button-disconect" onClick={disconnect}>
        Déconnecter mon compte
      </button>
      <button className="button-delete" onClick={deleteUser}>
        Supprimer mon compte
      </button>
    </div>
  );
}

export default Buttons;
