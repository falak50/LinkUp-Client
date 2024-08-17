import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import Reply from "./Reply";
import axios from "axios";

const Comment = ({comment}) => {
  // const [isReact, setIsReact] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(comment.likes?.length || 0);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const [replys, setReplys] = useState([]);
  const handlelike = () => {
    setIsLiked(!isLiked);
    // return 
    // console.log("newComment ", newComment);
    const payload = {
      comment_id  : comment._id,
      liker_id : owner._id,
      isAdd :  !isLiked,
    };
  
    console.log('payload ',payload)
    // return 
    // console.log("payload ", payload);
    axios.post('http://localhost:5000/comments/like', payload)
      .then(res => {
        console.log(res);
        setIsLiked(!isLiked);
        // setLikeCount(res.data.likeCount)

      })
      .catch(err => console.log(err));

    // setComments([...comments, newComment]);
    // setNewComment("");
  };
  useEffect(() => {
    const liker_ids = comment?.likes || [];
    // console.log("liker_ids ",liker_ids )
    if (liker_ids.includes(owner._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    
    
    // setComments(post.comments);

  }, [comment]);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newComment.trim() === "") return;
    // console.log("newReply ", newComment);
    // return
    const payload = {
      text: newComment,
      post_id: null,
      parent_comment_id:comment._id,
      uid:owner._id
    };
    // console.log("payload ", payload);
    // return
    axios.post('http://localhost:5000/comments', payload)
      .then(res => {
        console.log('res need ',res.data.comment);
        const resNewComment = res.data.comment
        console.log('resNewComment need',resNewComment);
        console.log('pre comments need',replys)
        setReplys([resNewComment,...replys]);
        setNewComment("");
      })
      .catch(err => console.log(err));

   
  };
  // console.log('comment ',comment);


  const handleReply = () =>{
    console.log('click');
    axios.get(`http://localhost:5000/comments/reply/${comment._id}`,)
    .then(res => {
      console.log('res need uuu',res.data);
      const resNewComment = res.data;
      setReplys(resNewComment);
      setNewComment("");
    })
    .catch(err => console.log(err));
  }


  useEffect(()=>{
    if(comment){
    handleReply()
    }
  },[comment])
  return (
    <div>
      <div className="flex items-center mx-4 mt-4 mb-2 ">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img
             src={`http://localhost:5000/images/${comment?.commentUserInfo?.ProfileImgURL}`}
              // src={comment.commentUserInfo.ProfileImgURL}
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>

        <div className="ml-4 bg-[#f6f6f6] p-2  rounded-[10px] ">
          <div className="font-semibold">{comment?.commentUserInfo?.first_name} {comment?.commentUserInfo?.last_name}</div>
          <div className="text-gray-600 text-sm">{comment?.text} </div>
        </div>
      </div>
      <div className="_comment_reply_num mx-[60px]  ">
        <ul className="_comment_reply_list flex ">
          <li 
          onClick={handlelike}
          className="mr-0">
            {isLiked ? (
              <AiFillLike
                className="text-xl text-blue-500"
                style={{ fontSize: "1.25rem" }}
              />
            ) : (
              <AiFillLike
                className="text-xl text-gray-500"
                style={{ fontSize: "1.25rem" }}
              />
            )}
          </li>
          <li>
            <span className="ml-1">Reply.</span>
          </li>
          {/* <li>
            <span className="ml-1">{likeCount}</span>
          </li> */}
        </ul>
        
        <div className="flex flex-col space-y-4 m-3 rounded-lg">
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-start space-x-1"
        >
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img
                src={`http://localhost:5000/images/${owner?.ProfileImgURL}`}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </div>
          </div>
          <div className="flex-grow">
            <input
              className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 w-full focus:outline-none"
              placeholder="Write a comment"
              value={newComment}
              onChange={handleCommentChange}
            />
          </div>
          <button type="submit" className="hidden">
            Submit
          </button>
        </form>
      </div>
      <button onClick={handleReply}>clcik</button>
      <div>
            {replys.map((reply, index) => (
                <Reply key={index} reply={reply} />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Comment;
