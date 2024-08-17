import { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";

const Comments = ({comments}) => {
    // const [comments, setComments] = useState([]);

    // useEffect(() => {
    //     // Make sure to use the actual post_id value in the URL

    //     axios
    //         .get(`http://localhost:5000/comments/${post_id}`)
    //         .then((response) => {
    //             console.log("response comment", response.data);
    //             setComments(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching comments:", error);
    //         });
    // }, [post_id]); // Adding post_id as a dependency ensures the effect runs again if the post_id changes
//    console.log('comments need1',comments)
     return (
        <div>
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
            ))}
        </div>
    );
};

export default Comments;
