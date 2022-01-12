import { useState, useEffect, useRef } from "react";
import "../styles/Wall.css";
const moment = require("moment");
require("moment/min/locales.min");
moment.locale("fr");

////////////////////////////////////////
////////////// LOGIQUE /////////////////
////////////////////////////////////////

/* ////////////////// COMPOSANT WALL ////////////////// */
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

  ////////////////////////////////////////////////////
  // Fonction GET ALL POST
  //////////////////////////////////////////////////
  async function allPosts() {
    const res = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    });
    return await res.json();
  }

  //////////////////////////////////////////////////////////////
  // Fonction qui récupère les posts et les met dans un tableau
  //////////////////////////////////////////////////////////////
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    allPosts().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  /////////////////////////////////
  // Fonction DELETE POST
  /////////////////////////////////
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

  ////////////////////////////////
  // Fonction MODIFY POST
  ////////////////////////////////
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

  ////////////////////////////////
  // Fonction CREATE COMMENT
  ////////////////////////////////
  const [textCreateComment, setTextCreateComment] = useState("");

  function createComment(postId) {
    fetch(`http://localhost:3000/api/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({
        text: textCreateComment,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
        } else {
          alert("Votre commentaire est vide, veuillez réessayer");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////////////////////////////////
  // Fonction DELETE COMMENT
  ////////////////////////////////////
  function deleteComment(commentId) {
    fetch(`http://localhost:3000/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          alert("Vous n'avez pas les droits pour supprimer ce commentaire.");
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ///////////////////////////////////
  // Fonction MODIFY COMMENT
  ///////////////////////////////////
  const [textModifyComment, setTextModifyComment] = useState("");

  function modifyComment(commentId) {
    fetch(`http://localhost:3000/api/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({
        text: textModifyComment,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        } else {
          alert(
            "Vous n'avez pas les droits pour modifier ce commentaire ou le commentaire est vide."
          );
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////////////////////////////////////
  ////////////// STRUCTURE ///////////////
  ////////////////////////////////////////
  return (
    /* Wall Post */
    <div className="g-div-allWall">
      {/* Mapping et affichage des posts */}
      {posts.map((post) => (
        <div key={post.id} className="g-div-wall">
          <h2 className="g-div-wall-titre">Post #{post.id}</h2>

          {/* Post */}
          <div className="g-div-wall-posts">
            <div className="g-div-wall-posts-header">
              <div className="g-div-wall-posts-header-last">
                {post.User.firstName} {post.User.lastName}
              </div>
              <div className="g-div-wall-posts-header-date">
                {moment(post.createdAt).format("Do/M/YYYY à HH:mm")}
              </div>
            </div>
            <div className="g-div-wall-buttons">
              <button
                className="g-button-delete-post"
                onClick={function preventDefault(e) {
                  e.preventDefault();
                  deletePost(post.id);
                }}
              >
                Supprimer
              </button>
              <button
                className="g-button-modify-post"
                onClick={function preventDefault(e) {
                  e.preventDefault();
                  modifyPost(post.id);
                }}
              >
                Modifier
              </button>
            </div>
            <div>
              {/* Form Modify Posts */}
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
                    required
                  ></input>
                </form>
              </div>
              {/* Form Modify Post */}
            </div>
            <div className="g-div-wall-posts-text">{post.text}</div>
            <div className="g-div-wall-posts-img">
              <img src={post.image} alt={post.image}></img>
            </div>
          </div>

          {/* Comment */}
          <h3>Commentaires ({post.Comments.length})</h3>

          {/* Form Create Comment */}
          <div className="g-div-wall-comments-edit">
            <form className="g-div-wall-comments-edit">
              <textarea
                className="g-button-modify-post"
                id="text-createPost"
                rows="2"
                placeholder="Commentaire..."
                value={textCreateComment}
                onChange={(e) => setTextCreateComment(e.target.value)}
                required
              ></textarea>
              <button
                className="g-button-modify-comment"
                onClick={function preventDefault(e) {
                  e.preventDefault();
                  createComment(post.id);
                }}
              >
                Commenter
              </button>
            </form>
          </div>
          {/* Form Create Comment */}

          {/* Mapping et affichage des comments */}
          {post.Comments.map((comment) => (
            <div key={comment.id} className="g-div-wall-comments">
              <div className="g-div-wall-comments-header">
                <div className="g-div-wall-comments-header-last">
                  {post.Comments[0].User.firstName}{" "}
                  {post.Comments[0].User.lastName}
                </div>
                <div className="g-div-wall-comments-header-date">
                  {moment(comment.createdAt).format("Do/M/YYYY à HH:mm")}
                </div>
              </div>
              <div className="g-div-wall-buttons">
                <button
                  className="g-button-delete-comment"
                  onClick={function preventDefault(e) {
                    e.preventDefault();
                    deleteComment(comment.id);
                  }}
                >
                  Supprimer
                </button>
                <button
                  className="g-button-modify-comment"
                  onClick={function preventDefault(e) {
                    e.preventDefault();
                    modifyComment(comment.id);
                  }}
                >
                  Modifier
                </button>
              </div>

              {/* Form Modify Comment */}
              <div>
                <form action="">
                  <textarea
                    id="text-createPost"
                    rows="2"
                    placeholder="Modifiez votre commentaire"
                    value={textModifyComment}
                    onChange={(e) => setTextModifyComment(e.target.value)}
                    required
                  ></textarea>
                </form>
              </div>
              {/* Form Modify Comment */}

              <div className="g-div-wall-comments-text">{comment.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Wall;
