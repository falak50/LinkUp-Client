import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ comments }) => {
    const [commentsm, setCommentsm] = useState(comments);

    useEffect(() => {
        setCommentsm(comments);
    }, [comments]);

    const onDelete = (commentId) => {
        // Filter out the deleted comment from the commentsm state
        const updatedComments = commentsm.filter(comment => comment._id !== commentId);
        setCommentsm(updatedComments);
    };

    return (
        <div className="">
            {commentsm.map((comment, index) => (
                <Comment key={index} comment={comment} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default Comments;
