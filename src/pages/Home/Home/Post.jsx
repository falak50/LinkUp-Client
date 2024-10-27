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

const Post = ({ post ,setResetCount }) => {
  const { curUser } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const liker_ids = post?.likes || [];
    if (liker_ids.includes(owner._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    
    setComments(post.comments);
  }, [post]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };


  const handleDeletePost = () => {
    const postId = post._id;
    console.log(`Deleting post with ID: ${postId}`);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete your profile picture?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('CONFIRM DELETE');
       fetch(`http://localhost:5000/posts/delete/${postId}`,{
          method:'POST'
       })
       .then(res => res.json())
       .then(data=> {
        console.log(data)
        setResetCount(p=>p+1);
        // refetch();
        //   isFetchingIntro();
        //   setImg('');
        if(data){
          console.log('delete done')
          // refetch();
          // isFetchingIntro();
          // setImg('');
          Swal.fire({
            title: "Deleted!",
            text: `Picture has been deleted.`,
            icon: "success"
          });
        }
        
       })
        
      }else{
        // setOpen(true);
      }
    });
};

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const payload = {
      text: newComment,
      post_id: post._id,
      parent_comment_id: null,
      uid: owner._id
    };
    axios.post('http://localhost:5000/comments', payload)
      .then(res => {
        const resNewComment = res.data.comment;
        setComments([resNewComment, ...comments]);
        setNewComment("");
      })
      .catch(err => console.log(err));
  };

  const handleLike = () => {
    const payload = {
      post_id: post._id,
      liker_id: owner._id,
      isAdd: !isLiked,
    };
    axios.post('http://localhost:5000/posts/like', payload)
      .then(res => {
        setIsLiked(!isLiked);
        setLikeCount(res.data.likeCount);
      })
      .catch(err => console.log(err));
  };

  const timeAgoText = timeAgo(post.createdAt);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedImages = showAll ? post.imgUrls : post.imgUrls.slice(0, 4);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // const handleEditModalOpen = () => {
  //   setIsEditModalOpen(true);
  //   closeDropdown(); // Close the dropdown when opening the modal
  // };

  // const handleEditModalClose = () => {
  //   setIsEditModalOpen(false);
  // };

  // console.log('post?.userInfo',post?.userInfo?.email)
  // console.log('curUser?.email',curUser?.email)

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden py-2 my-5 pb-4">
       <MypostEdit post={post} open={open} setOpen={setOpen} setResetCount={setResetCount}></MypostEdit> 
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={`http://localhost:5000/images/${post.userInfo?.ProfileImgURL}`}
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </div>
          </div>
          <div className="ml-4 flex-grow">
            <div className="font-semibold">
              {post.userInfo?.first_name} {post.userInfo?.last_name}
            </div>
            <div className="text-gray-600 text-sm">{timeAgoText}</div>
          </div>

{post?.userInfo?.email == curUser?.email && 
   <div className="flex-none ml-4">
   <div className="" ref={dropdownRef}>
     <div
       tabIndex={0}
       role="button"
       className="btn btn-ghost avatar text-gray-500"
       onClick={toggleDropdown}
     >
       <MoreVertIcon />
     </div>
    
     {isOpen && (
       //  <MypostEdit post={post}></MypostEdit>
       <ul
         className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
         onClick={closeDropdown}
       >
         <li  onClick={()=>setOpen(true)}>
           <span className="justify-between">Edit</span>
         </li>
          {/* <MypostEdit post={post}></MypostEdit> */}
         <li onClick={handleDeletePost}>
           <span>Delete</span>
         </li>
       </ul>
     )}
   </div>
 </div>
}
       
        </div>

        <p className="text-gray-700">{post.description}</p>

        <div className="mt-2 flex justify-center bg-[#f7f7f6] rounded-lg p-2">
          <div className="grid grid-cols-2 gap-2">
            {post.imgUrls &&
              post.imgUrls.length > 1 &&
              displayedImages.map((url, index) => (
                <div
                  key={index}
                  className="w-full h-48 overflow-hidden rounded-lg"
                >
                  <Image
                    width={300}
                    src={`http://localhost:5000/images/${url}`}
                    alt={`Post image ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
          </div>

          <div className="flex justify-center mt-2">
            {post.imgUrls &&
              post.imgUrls.length === 1 &&
              displayedImages.map((url, index) => (
                <div key={index} className="w-full max-w-2xl rounded-lg">
                  <Image
                    width={500}
                    src={`http://localhost:5000/images/${url}`}
                    alt={`Post image ${index}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
          </div>
        </div>

        {post.imgUrls.length > 4 && (
          <div className="mt-4 text-black">
            <Button type="link" onClick={handleToggleShowAll}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center mx-5">
        <div className="w-[10%]">
          <img src="https://as2.ftcdn.net/v2/jpg/05/88/10/25/1000_F_588102589_x5jlJUTfRCm0I5MLM9ESIQSck6wWZ56i.jpg" />
        </div>
        {(isLiked && likeCount == 1) &&
  <span className="text-sm text-[gray]">You react this post</span> 
        }
       {(isLiked && likeCount > 1) &&
   <span className="text-sm text-[gray]">You and {likeCount-1} others react this post</span>
        }
        {(!isLiked) &&
                <span className="text-sm text-[gray]">             
                {likeCount} react this post</span> 

        }
       
      </div>

      <div className="divider mx-5 my-0"></div>
      <div className="flex justify-between items-center mb-4 mx-5">
        <button
          className="btn flex gap-2 text-xl items-center"
          onClick={handleLike}
        >
          {isLiked ? (
            <FcLike className="text-3xl" />
          ) : (
            <FcLikePlaceholder className="text-3xl" />
          )}
          Love
        </button>
        <button className="btn flex gap-2 text-xl items-center">
          <FaRegCommentDots className="text-2xl" /> Comment
        </button>
        <button className="btn flex gap-2 text-xl items-center text-red">
          <IoMdShareAlt className="text-2xl" />
          Share
        </button>
      </div>

      <div className="flex flex-col space-y-4 m-3 rounded-lg">
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-start space-x-1"
        >
          <div className="avatar">
            <div className="w-9 rounded-full">
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

      <div>
        <Comments comments={comments} />
      </div>

     
    </div>
  );
};

export default Post;
