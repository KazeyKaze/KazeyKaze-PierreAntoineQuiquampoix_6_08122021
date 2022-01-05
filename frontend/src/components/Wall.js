import "../styles/Wall.css";

//////////////////////////////////////////////////
// - "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
//////////////////////////////////////////////////

function Wall() {
  return fetch("http://localhost:3000/api/posts")
    .then((res) => {
      return res.json();
    })
    .catch((error) => alert("Erreur : " + error));
}

export default Wall;
