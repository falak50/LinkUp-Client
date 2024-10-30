import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ comments,setComments }) => {
    // const [comments, setComments] = useState(comments);

    // useEffect(() => {
    //     setComments(comments);
    // }, [comments]);

    const onDelete = (commentId) => {
        // Filter out the deleted comment from the comments state
        const updatedComments = comments.filter(comment => comment._id !== commentId);
        setComments(updatedComments);
    };

    return (
        <div className="">
            {comments.map((comment, index) => (
                <Comment key={index} comment={comment} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Comments;
