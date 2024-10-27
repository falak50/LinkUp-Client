import { useEffect, useState, useRef, useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import Reply from "./Reply";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from "../../../providers/AuthProviders";

const Comment = ({ comment, onDelete }) => {
  const { curUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [newComment, setNewComment] = useState("");
  const [replys, setReplys] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(comment?.text || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // console.log('comment ',comment?.commentUserInfo?.email,curUser?.email)
  const handlelike = () => {
    setIsLiked(!isLiked);
    const payload = {
      comment_id: comment._id,
      liker_id: owner._id,
      isAdd: !isLiked,
    };

    axios.post('http://localhost:5000/comments/like', payload)
      .then(res => {
        console.log(res);
        setIsLiked(!isLiked);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const liker_ids = comment?.likes || [];
    if (liker_ids.includes(owner._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [comment]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const payload = {
      text: newComment,
      post_id: null,
      parent_comment_id: comment._id,
      uid: owner._id
    };

    axios.post('http://localhost:5000/comments', payload)
      .then(res => {
        if (res) {
          setNewComment("");
          handleReply();
        }
      })
      .catch(err => console.log(err));
  };

  const handleReply = () => {
    axios.get(`http://localhost:5000/comments/reply/${comment._id}`)
      .then(res => {
        const resNewComment = res.data;
        setReplys(resNewComment);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (comment) {
      handleReply();
    }
  }, [comment]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const hanldeEditComment = () => {
    setIsEdit(true);
    setEditText(comment.text);
  };

  const handleCommentEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") return;

    const payload = {
      text: editText,
      comment_id: comment._id
    };

    axios.post(`http://localhost:5000/comments/edit/${comment._id}`, payload)
      .then(res => {
        console.log('Comment updated:', res.data);
        setIsEdit(false);
        comment.text = editText; // Update the comment text in the UI
      })
      .catch(err => console.log(err));
  };

  const hanldeDeleteComment = () => {
    axios.post(`http://localhost:5000/comments/delete/${comment._id}`)
      .then(res => {
        console.log('Comment deleted:', res.data);
        onDelete(comment._id); // Notify parent component about the deletion
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <div className="flex items-center mx-4 mt-4 mb-4">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img
              src={`http://localhost:5000/images/${comment?.commentUserInfo?.ProfileImgURL}`}
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>
        {/* flex-grow */}
        <div className="ml-4 bg-[#f6f6f6] p-2 rounded-[10px] ">
          <div className="font-semibold">{comment?.commentUserInfo?.first_name} {comment?.commentUserInfo?.last_name}</div>

          {isEdit ? (
            <form onSubmit={handleCommentEditSubmit}>
              <input
                className="form-control border-none bg-[#f6f6f6] rounded-lg py-2 w-full focus:outline-none"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEdit(false)}>Cancel</button>
            </form>
          ) : (
            <div className="text-gray-600 text-sm">{comment?.text}</div>
          )}
        </div>

        {/* 3-dot icon for edit/delete options */}
        {comment?.commentUserInfo?.email==curUser?.email &&
         <div className="relative" ref={dropdownRef}>
         <div
           tabIndex={0}
           role="button"
           className="btn btn-ghost avatar text-gray-500"
           onClick={toggleDropdown}
         >
           <MoreVertIcon />
         </div>

         {isOpen && (
           <ul
             className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
             onClick={closeDropdown}
           >
             <li onClick={hanldeEditComment}>
               <span className="justify-between">Edit</span>
             </li>
             <li onClick={hanldeDeleteComment}>
               <span>Delete</span>
             </li>
           </ul>
         )}
       </div>

        }
       
          {/*end 3-dot icon for edit/delete options */}
      </div>

      <div className="_comment_reply_num mx-[60px]">
        <ul className="_comment_reply_list flex">
          <li onClick={handlelike} className="mr-0">
            {isLiked ? (
              <AiFillLike className="text-xl text-blue-500" style={{ fontSize: "1.25rem" }} />
            ) : (
              <AiFillLike className="text-xl text-gray-500" style={{ fontSize: "1.25rem" }} />
            )}
          </li>
          <li>
            <span className="ml-1">Reply.</span>
          </li>
        </ul>

        <div className="flex flex-col space-y-4 m-3 rounded-lg">
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-start space-x-1"
          >
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  src={`http://localhost:5000/images/${curUser?.ProfileImgURL}`}
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

        {/* <button onClick={handleReply}>Click to load replies</button> */}

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
