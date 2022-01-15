import "../styles/Buttons.css";

////////// LOGIQUE
function Buttons() {
  // fonction qui déconnecte l'utilisateur et le renvoi à la page de connexion
  function disconnectUser(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "http://localhost:4000/";
  }

  // Fonction pour supprimer le compte de l'utilisateur
  function deleteUser(e) {
    e.preventDefault();
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      const userId = sessionStorage.getItem("userId");
      fetch(`http://localhost:3000/api/auth/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(
            sessionStorage.getItem("token")
          )}`,
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
            alert("Une erreur est survenue, veuillez réessayer");
          }
        })
        .catch((error) => alert("Erreur : " + error));
    }
  }

  // fonction qui déconnecte l'utilisateur et le renvoi à la page de connexion
  function accessAdmin(e) {
    const admin = JSON.parse(sessionStorage.getItem("isAdmin"));
    if (admin !== true) {
      alert("Vous n'avez pas les droits pour accéder à cette page.");
    } else {
      window.location.href = "http://localhost:4000/wall/adminpage";
    }
  }

  //Fonction qui cache le bouton admin si l'utilisateur connecté n'est pas admin
  function hideButtonAdmin() {
    let isAnAdmin = sessionStorage.getItem("isAdmin");
    document.addEventListener("DOMContentLoaded", function () {
      if (isAnAdmin === "null") {
        document.getElementById("showButtonAdmin").style.display = "none";
      } else {
        document.getElementById("showButtonDelete").style.display = "none";
      }
    });
  }
  hideButtonAdmin();

  ////////// STRUCTURE
  return (
    <div className="g-div-buttons">
      {" "}
      <button className="button-disconect" onClick={disconnectUser}>
        Déconnecter mon compte
      </button>
      <button
        id="showButtonDelete"
        className="button-delete"
        onClick={deleteUser}
      >
        Supprimer mon compte
      </button>
      <button
        id="showButtonAdmin"
        className="button-delete"
        onClick={accessAdmin}
      >
        Accéder à la page admin
      </button>
    </div>
  );
}

export default Buttons;
