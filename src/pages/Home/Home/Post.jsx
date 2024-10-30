import { useState, useRef, useEffect, useContext } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoMdShareAlt } from "react-icons/io";
import { Button, Image } from "antd";
import Comments from "./Comments";
import { timeAgo } from "./utils";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MypostEdit from "../../../components/ProfileElement/Mypost/MypostEdit";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProviders";

const Post = ({ post, setResetCount }) => {
  const { curUser } = useContext(AuthContext);
  const owner = JSON.parse(localStorage.getItem("user"));
  
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCmtOper,setIsCmtOper] = useState(false)
  const dropdownRef = useRef(null);

  useEffect(() => {
    const likerIds = post.likes || [];
    setIsLiked(likerIds.includes(owner._id));
   setComments(post.comments);
  }, [post._id]);

  const handleCommentChange = (e) => setNewComment(e.target.value);

  const handleDeletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete your post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`http://localhost:5000/posts/delete/${post._id}`)
          .then(() => {
            setResetCount(p => p + 1);
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          });
      }
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const payload = { text: newComment, post_id: post._id, parent_comment_id: null, uid: owner._id };
    
    axios.post('http://localhost:5000/comments', payload)
      .then(res => {
        setComments([res.data.comment, ...comments]);
        setNewComment("");
      })
      .catch(console.error);
  };

  const handleLike = () => {
    const payload = { post_id: post._id, liker_id: owner._id, isAdd: !isLiked };
    
    axios.post('http://localhost:5000/posts/like', payload)
      .then(res => {
        setIsLiked(!isLiked);
        setLikeCount(res.data.likeCount);
      })
      .catch(console.error);
  };

  const timeAgoText = timeAgo(post.createdAt);
  const displayedImages = showAll ? post.imgUrls : post.imgUrls.slice(0, 4);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const renderMedia = (url) => {
  const mediaType = url.split('.').pop().toLowerCase(); // Ensure the file type is in lowercase
  const mediaSrc = `http://localhost:5000/images/${url}`;
  
  // List of accepted image file extensions
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
      {(() => {
        switch (mediaType) {
          case 'pdf':
            return (
              <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <iframe
                  src={mediaSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title="PDF Preview"
                />
                <a
                  href={mediaSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'transparent',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Button type="link" style={{ color: 'black' }}>Open PDF</Button>
                </a>
              </div>
            );
          case 'txt':
            return (
              <a href={mediaSrc} target="_blank" rel="noopener noreferrer">
                <Button type="link">Download File</Button>
              </a>
            );
          case 'mp4':
            return (
              <video controls className="w-full h-full">
                <source src={mediaSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          default:
            if (imageExtensions.includes(mediaType)) {
              return   <Image
              width={post.imgUrls.length === 1 ? 500 : 290} 
              src={mediaSrc}
              alt={`Post image`}
              className="object-cover w-full h-full"
            />
            } else {
              return (
                <div>
                  <a href={mediaSrc} target="_blank" rel="noopener noreferrer">
                    <Button type="link">Download File</Button> {/* Button for unknown file types */}
                  </a>
                </div>
              );
            }
        }
      })()}
    </div>
  );
};
  

  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden py-2 my-5 pb-4">
      <MypostEdit post={post} open={open} setOpen={setOpen} setResetCount={setResetCount} />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={`http://localhost:5000/images/${post.userInfo?.ProfileImgURL}`} alt="Profile" className="h-12 w-12 rounded-full" />
            </div>
          </div>
          <div className="ml-4 flex-grow">
            <div className="font-semibold">{post.userInfo?.first_name} {post.userInfo?.last_name}</div>
            <div className="text-gray-600 text-sm">{timeAgoText}</div>
          </div>
          {post.userInfo?.email === curUser?.email && (
            <div className="flex-none ml-4">
              <div className="" ref={dropdownRef}>
                <div tabIndex={0} role="button" className="btn btn-ghost avatar text-gray-500" onClick={toggleDropdown}>
                  <MoreVertIcon />
                </div>
                {isOpen && (
                  <ul className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40" onClick={closeDropdown}>
                    <li onClick={() => setOpen(true)}><span className="justify-between">Edit</span></li>
                    <li onClick={handleDeletePost}><span>Delete</span></li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

       <div className="font-serif">
       <p  style={{ whiteSpace: 'pre-line' }}>{post.description}</p>
       </div>
     
       

        {post.imgUrls.length == 1 &&
 <div className="mt-2  flex justify-center bg-[#f7f7f6] rounded-lg p-2 w-full">
 <div className="w-full">
   {displayedImages.map((url, index) => (
     <div key={index} className="w-full overflow-hidden rounded-lg flex justify-center">
       {renderMedia(url)}
     </div>
   ))}
 </div>
</div>

}
{post.imgUrls.length > 1 &&
 <div className="mt-2 flex justify-center bg-[#f7f7f6] rounded-lg p-2 w-full">
 <div className="grid grid-cols-2 gap-2 w-full">
   {displayedImages.map((url, index) => (
     <div key={index} className="w-full h-48 overflow-hidden rounded-lg">
       {renderMedia(url)}
     </div>
   ))}
 </div>
</div>

}
       

        {post.imgUrls.length > 4 && (
          <div className="flex justify-center mt-2">
            <Button onClick={() => setShowAll(prev => !prev)}>
              {showAll ? "Show Less" : "Show All"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center ">
        <div className="ml-8 mx-2">
        <FcLike className="" />
        </div>
        <span className="text-sm text-[gray]">
          {isLiked && likeCount === 1 ? "You reacted to this post" :
          isLiked && likeCount > 1 ? `You and ${likeCount - 1} others reacted to this post` :
          !isLiked ? `${likeCount} reacted to this post` : ""}
        </span>
      </div>

      <div className="divider mx-5 my-0"></div>

      <div className="flex justify-between items-center mb-4 mx-5">
        <button className="btn w-[47%] flex gap-2 text-xl items-center" onClick={handleLike}>
          {isLiked ? <FcLike className="text-3xl" /> : <FcLikePlaceholder className="text-3xl" />}
          Love
        </button>
        <button onClick={()=>setIsCmtOper(!isCmtOper)}  className="btn w-[47%] flex gap-2 text-xl items-center">
          <FaRegCommentDots className="text-2xl" /> Comment
        </button>
        {/* <button className="btn flex gap-2 text-xl items-center text-red">
          <IoMdShareAlt className="text-2xl" /> Share
        </button> */}
      </div>
{/* {isCmtOper &&  */}
{isCmtOper &&
<>
<div className="flex flex-col space-y-4 m-3 rounded-lg">
 <form onSubmit={handleCommentSubmit} className="flex items-start space-x-1">
   <div className="avatar">
     <div className="w-9 rounded-full">
       <img src={`http://localhost:5000/images/${owner.ProfileImgURL}`} alt="Profile" className="h-9 w-9 rounded-full" />
     </div>
   </div>
   <input
     type="text"
     className="input input-bordered w-full"
     placeholder="Add a comment..."
     value={newComment}
     onChange={handleCommentChange}
   />
   <button type="submit"  className="btn w-[18%] mr-2 btn-primary">Comment</button>
 </form>
</div>
{/* } */}
<Comments comments={comments} setComments={setComments} />
</>
}
 
     
    </div>
  );
};

export default Post;
