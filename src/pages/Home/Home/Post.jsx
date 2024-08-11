import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoMdShareAlt } from "react-icons/io";
import { Button, Image } from "antd"; // Import Button from antd
import Comments from "./Comments";
import { timeAgo } from "./utils";
import axios from "axios";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

console.log('comments ____>',comments)
  useEffect(() => {
    const liker_ids = post.likes || [];
    // console.log("liker_ids ",liker_ids )
    if (liker_ids.includes(owner._id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    setComments(post.comments);

  }, []);
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newComment.trim() === "") return;
    console.log("newComment ", newComment);
    const payload = {
      text: newComment,
      post_id: post._id,
      parent_comment_id:null,
      uid:owner._id
    };
    console.log("payload ", payload);
    axios.post('http://localhost:5000/comments', payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    setComments([...comments, newComment]);
    setNewComment("");
  };


  const handlelike = () => {

    console.log("newComment ", newComment);
    const payload = {
      post_id  : post._id,
      liker_id : owner._id,
      isAdd :  !isLiked,
    };
  
    console.log('payload ',payload)
    // return 
    console.log("payload ", payload);
    axios.post('http://localhost:5000/posts/like', payload)
      .then(res => {
        console.log(res);
        setIsLiked(!isLiked);
        setLikeCount(res.data.likeCount)

      })
      .catch(err => console.log(err));

    // setComments([...comments, newComment]);
    // setNewComment("");
  };
  
  

  // Calculate time ago
  const timeAgoText = timeAgo(post.createdAt);

  const handleToggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedImages = showAll ? post.imgUrls : post.imgUrls.slice(0, 4);

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden py-2 my-5">
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

          <div className="ml-4">
            <div className="font-semibold">
              {post.userInfo?.first_name} {post.userInfo?.last_name}
            </div>
            <div className="text-gray-600 text-sm">{timeAgoText}</div>
          </div>
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
        <span className="text-sm text-[gray]">You and {likeCount} others</span>
      </div>

      <div className="divider mx-5 my-0"></div>
      <div className="flex justify-between items-center mb-4 mx-5">
        <button
          className="btn flex gap-2 text-xl items-center"
          onClick={() => handlelike()}
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

      {/* Input field for new comments */}
      <div className="flex flex-col space-y-4 m-3 rounded-lg">
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-start space-x-1"
        >
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={`http://localhost:5000/images/${post.userInfo?.ProfileImgURL}`}
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

      {/* Render Comments */}
      <div>
        <Comments post_id={post._id} />
      </div>
    </div>
  );
};

export default Post;
