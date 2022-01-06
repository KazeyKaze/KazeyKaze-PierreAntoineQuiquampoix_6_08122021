import { useState, useEffect } from "react";
import "../styles/Wall.css";
const moment = require("moment");
require("moment/min/locales.min");
moment.locale("fr");

////////// LOGIQUE

function Wall() {
  // Fonction qui vérifie le token en cas de manipulation de l'URL sans token
  function verifyToken() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token === null || token === undefined) {
      alert(
        "Il y a eu une erreur concernant votre identification, vous allez être redirigé vers la page de connexion"
      );
      window.location.href = "http://localhost:4000";
    }
  }
  verifyToken();

  // Fonction qui récupère tous les posts de la BDD
  const [posts, setPosts] = useState([]);

  async function allPosts() {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    });
    return await res.json();
  }

  // Fonction qui récupère les posts et les met dans un tableau ???
  useEffect(() => {
    let mounted = true;
    allPosts().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  ////////// STRUCTURE
  return (
    <div>
      <h1>Voici les derniers posts :</h1>
      {posts.map((item) => (
        <div key={item.id}>
          <div>
            <div>
              {item.User.firstName} {item.User.lastName}
            </div>
            <div>le {moment(item.createdAt).format("Do/M/YYYY à HH:mm")}</div>
          </div>
          <div>{item.text}</div>
          <div>
            <img src={item.image} alt={item.image}></img>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wall;
