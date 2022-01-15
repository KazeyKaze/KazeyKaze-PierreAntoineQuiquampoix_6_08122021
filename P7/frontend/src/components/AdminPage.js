import { useState, useEffect } from "react";
import "../styles/AdminPage.css";

//////// LOGIQUE
function AdminPage() {
  // Fonction qui vérifie si l'utilisateur est un admin
  function verifyAdmin() {
    const admin = JSON.parse(sessionStorage.getItem("isAdmin"));
    if (admin !== true) {
      alert(
        "Erreur d'identification, vous allez être redirigé vers la page des publications."
      );
      window.location.href = "http://localhost:4000/wall";
    }
  }
  verifyAdmin();

  // Fonction qui déconnecte l'utilisateur
  function disconnectUser(e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "http://localhost:4000/";
  }

  // Fonction qui retourne l'utilisateur vers la page du mur
  function backToWall(e) {
    e.preventDefault();
    window.location.href = "http://localhost:4000/wall";
  }

  // Fonction GET ALL USERS
  const [users, setUsers] = useState([]);

  async function allUsers() {
    const res = await fetch("http://localhost:3000/api/auth/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    });
    return await res.json();
  }

  // Fonction qui va chercher tous les utilisateurs et les met dans un tableau
  useEffect(() => {
    let mounted = true;
    allUsers().then((items) => {
      if (mounted) {
        setUsers(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // Fonction DELETE USER
  // function deleteUser(userId) {
  //   fetch(`http://localhost:3000/api/auth/${userId}`, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         window.location.reload();
  //       } else {
  //         alert("Une erreur s'est produite, veuillez réessayer.");
  //       }
  //     })
  //     .catch((error) => alert("Erreur : " + error));
  // }
  function deleteUser(userId) {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
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
            alert("Le compte a bien été supprimé.");
            Location.reload();
          } else {
            alert("Une erreur est survenue, veuillez réessayer");
          }
        })
        .catch((error) => alert("Erreur : " + error));
    }
  }

  //////// STRUCTURE
  return (
    <div>
      <div>
        <div className="g-div-buttons">
          <button className="button-disconect" onClick={disconnectUser}>
            Déconnecter mon compte
          </button>
          <button className="button-disconect" onClick={backToWall}>
            Retourner sur le mur
          </button>
        </div>
        <div className="g-div-allWall">
          <div className="g-div-wall">
            <h1 className="g-div-createPost-titre">Liste des utilisateurs</h1>
            <div className="g-div-wall-posts">
              <div className="g-div-admin-header">
                <div className="g-div-admin-header-firstname">Prénom:</div>
                <div className="g-div-admin-header-lastname">Nom:</div>
                <button className="g-button-header-button" disabled="disabled">
                  Action
                </button>
              </div>
              {users.map((user) => (
                <div key={user.id} className="g-div-allAdmin">
                  <div className="g-div-allAdmin-allName">
                    <div className="g-div-allAdmin-firstName">
                      {user.firstName}
                    </div>
                    <div className="g-div-allAdmin-lastName">
                      {user.lastName}
                    </div>
                  </div>
                  <button
                    className="g-button-delete-comment"
                    onClick={function preventDefault(e) {
                      e.preventDefault();
                      deleteUser(user.id);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
              <div className="g-div-allAdmin-end">- Fin -</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
