import  { useContext, useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import Comments from "../../Home/Home/Comments";
import { Alert, Spin } from "antd";
import { AuthContext } from '../../../providers/AuthProviders';
import Comment from '../../Home/Home/Comment';
import { useParams } from 'react-router-dom';
import dpImg from "../../../assets/dpImg.jpg";
const pathLink = "http://localhost:5000/images/";
export default function PrivateComents({post}) {
    const { id } = useParams();
  const { curUser } = useContext(AuthContext);
//   console.log('curUser ',curUser)
// console.log('post ',post)
  const owner = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reset,SetReset] = useState(0);
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const payload = {
      text: newComment,
      post_id: post._id,
      parent_comment_id: null,
      uid: owner._id,
      type:'product'
    };
//   console.log('payload ',payload)
    // return 
    axios
      .post("http://localhost:5000/comments", payload)
      .then((res) => {
        setComments([res.data.comment, ...comments]);
        setNewComment("");
      })
      .catch(console.error);
  };
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/comments/${id}`,)
      .then((response) => {
        setComments(response.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      });
  }, [reset]);
  const onDelete = (commentId) => {
    SetReset(p=>p+1);
    // Filter out the deleted comment from the comments state
    // const updatedComments = comments.filter(comment => comment._id !== commentId);
    // setComments(updatedComments);
};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  console.log('comments --> ',comments)
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg my-4 ">
      <Alert
        message="Private Comment"
        description="Only seller can see your comment."
        type="info"
      />

      {/* <Alert
                    message="Owner Alert"
                    description="You can only reply to the text."
                    type="info"
                    className="mt-2"
                /> */}
      <br />
      <>
        <div className="flex flex-col space-y-4 m-3 rounded-lg">
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-start space-x-1"
          >
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img 
                  src={pathLink + curUser?.ProfileImgURL || dpImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = dpImg;
                  }}
                  alt="Profile"
                  className="h-9 w-9 rounded-full"
                />
                 
              </div>
            </div>

            <div className="w-[80%]">
              <input
                className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 w-full focus:outline-none"
                placeholder="Write a comment"
                value={newComment}
                onChange={handleCommentChange}
              />
            </div>
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg flex items-center"
            >
              <IoMdSend className="text-lg" />
            </button>
          </form>
        </div>
        {/* } */}
        {/* <Comments comments={comments} setComments={setComments} /> */}
        <div className="">
  {comments.map((comment, index) =>
    (comment.uid === curUser._id || post.uid === curUser._id) && (
      <Comment key={index} comment={comment} onDelete={onDelete} />
    )
  )}
</div>
      </>
    </div>
  );
}
