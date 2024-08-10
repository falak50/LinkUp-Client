import axios from "axios";
import Post from "./Post";
import { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts`)
      .then((response) => {
        console.log("response ", response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} /> // Mapping through posts and passing each 
        ))
      ) : (
        <p>No posts available.</p> // Message to display if there are no posts
      )}
    </div>
  );
};

export default Posts;
