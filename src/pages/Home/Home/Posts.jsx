import axios from "axios";
import Post from "./Post";
import { useEffect, useState } from "react";

const Posts = ({posts,setResetCount}) => {

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} setResetCount={setResetCount}/> // Mapping through posts and passing each 
        ))
      ) : (
        <p>No posts available.</p> // Message to display if there are no posts
      )}
    </div>
  );
};

export default Posts;
