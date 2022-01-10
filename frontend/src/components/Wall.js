import { useState, useEffect, useRef } from "react";
import "../styles/Wall.css";
const moment = require("moment");
require("moment/min/locales.min");
moment.locale("fr");

////////// LOGIQUE

/* FONCTION WALL */
function Wall() {
  // Fonction qui vérifie le token en cas de manipulation de l'URL sans token
  function verifyToken() {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token === null || token === undefined) {
      alert(
        "Erreur d'identification, vous allez être redirigé vers la page de connexion"
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

  // Fonction qui récupère les posts et les met dans un tableau
  useEffect(() => {
    let mounted = true;
    allPosts().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  // Fonction qui supprime un post
  function deletePost(postId) {
    fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          alert("Vous n'avez pas les droits pour supprimer ce post.");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  // Fonction qui modifie un post
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const inputRef = useRef();
  let formData = new FormData();
  formData.append("text", text);
  formData.append("image", img);
  
  function modifyPost(postId) {
    fetch(`http://localhost:3000/api/posts/${postId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
          window.location.reload();
        } else {
          alert(
            "Vous n'avez pas les droits pour modifier ce post ou le post est vide."
          );
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-allWall">
      {/* Mapping des posts */}
      {posts.map((item) => (
        <div key={item.id} className="g-div-wall">
          <h3>Post #{item.id}</h3>

          {/* Posts */}
          <div className="g-div-wall-posts">
            <div className="g-div-wall-posts-header">
              <div className="g-div-wall-posts-header-last">
                {item.User.firstName} {item.User.lastName}
              </div>
              <div className="g-div-wall-posts-header-date">
                {moment(item.createdAt).format("Do/M/YYYY à HH:mm")}
              </div>
            </div>
            <div className="g-div-wall-buttons">
              <button
                className="g-button-delete-post"
                onClick={function preventDefault(e) {
                  e.preventDefault();
                  deletePost(item.id);
                }}
              >
                Supprimer
              </button>
              <button
                className="g-button-modify-post"
                onClick={function preventDefault(e) {
                  e.preventDefault();
                  modifyPost(item.id);
                }}
              >
                Modifier
              </button>
            </div>
            <div>

              {/* ///////////////////////////////////////////////////// */}
              <div>
                <form action="">
                  <textarea
                    id="text-createPost"
                    rows="2"
                    placeholder="Modifiez votre message et/ou choisissez un fichier"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  ></textarea>
                  <input
                    type="file"
                    id="img-createPost"
                    onChange={() => setImg(inputRef.current.files[0])}
                    ref={inputRef}
                  ></input>
                </form>
              </div>
              {/* ///////////////////////////////////////////////////// */}
              
            </div>
            <div className="g-div-wall-posts-text">{item.text}</div>
            <div className="g-div-wall-posts-img">
              <img src={item.image} alt={item.image}></img>
            </div>
          </div>

          {/* Comments */}
          <h4>Commentaires ({item.Comments.length})</h4>
          <div className="g-div-wall-comments-edit">
            <form className="g-div-wall-comments-edit">
              <textarea
                className="g-button-modify-post"
                id="text-createPost"
                rows="2"
                placeholder="Commentaire..."
              ></textarea>
              <button className="g-button-modify-comment">Commenter</button>
            </form>
          </div>

          {/* Mapping des comments */}
          {item.Comments.map((comment) => (
            <div key={comment.id} className="g-div-wall-comments">
              <div className="g-div-wall-comments-header">
                <div className="g-div-wall-comments-header-last">
                  {item.Comments[0].User.firstName}{" "}
                  {item.Comments[0].User.lastName}
                </div>
                <div className="g-div-wall-comments-header-date">
                  {moment(comment.createdAt).format("Do/M/YYYY à HH:mm")}
                </div>
              </div>
              <div className="g-div-wall-buttons">
                <button className="g-button-delete-comment">Supprimer</button>
                <button className="g-button-modify-comment">Modifier</button>
              </div>
              <div className="g-div-wall-comments-text">{comment.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Wall;
