
import { useEffect, useState } from 'react';
import MyCard from '../../../not_includes/MyCard';
import PostSectionHome from './PostSectionHome';
import Posts from './Posts'
import axios from 'axios';
const MidHome = () => {
    const [posts, setPosts] = useState([]);
    const [resetCount,setResetCount] = useState(0)
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
    }, [resetCount]);

    return (
        <div  className='' >
        <PostSectionHome setResetCount={setResetCount}></PostSectionHome>
        <Posts posts={posts} setResetCount={setResetCount}></Posts>

        </div>
    );
};

export default MidHome;