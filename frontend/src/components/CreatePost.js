import "../styles/CreatePost.css";
import { useState, useRef } from "react";

////////// LOGIQUE

/* FONCTION CREATEPOST */
function CreatePost() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const inputRef = useRef();
  let formData = new FormData();
  formData.append("text", text);
  formData.append("image", img);

  // Fonction de création de post
  function fetchPost(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/posts/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
      },
    })
      .then((res) => {
        if (res.status === 201) {
          window.location.reload();
        } else {
          alert(
            "Votre post est vide, veuillez réessayer"
          );
        }
      })
      .catch((error) => alert("Erreur : " + error));
  }

  ////////// STRUCTURE
  return (
    <div className="g-div-createPost">
      <h3>Création de post</h3>
      <form action="">
        <textarea
          id="text-createPost"
          rows="5"
          placeholder="Editez votre message et/ou choisissez un fichier"
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
        <label htmlFor="createPost">
          <button className="button-createPost" onClick={fetchPost}>
            Poster
          </button>
        </label>
      </form>
    </div>
  );
}

export default CreatePost;