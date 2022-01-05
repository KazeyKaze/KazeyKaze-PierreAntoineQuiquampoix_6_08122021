import { useState, useEffect } from "react";
import "../styles/Wall.css";

function Wall() {
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

  useEffect(() => {
    let mounted = true;
    allPosts().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h1>Voici les derniers posts :</h1>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            {item.text}
            <img src={item.image} alt={item.image}></img>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wall;
