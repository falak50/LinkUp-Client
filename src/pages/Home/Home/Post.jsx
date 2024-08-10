import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { IoMdShareAlt } from "react-icons/io";
import { Button, Image } from "antd"; // Import Button from antd
import Comments from "./Comments";
// import { formatDistanceToNow } from 'date-fns'; // Import date-fns for time formatting

const Post = ({ post }) => {
  const [isLine, setIsLike] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  // Calculate time ago
  // const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  const [showAll, setShowAll] = useState(false);

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
            {/* <div className="text-gray-600 text-sm">{timeAgo}</div> */}
          </div>
        </div>

        {/* Post Text */}
        <p className="text-gray-700">{post.description}</p>

        {/* Display Images */}
        <div className="mt-2 flex justify-center bg-[#f7f7f6] rounded-lg p-2">
          <div className="grid grid-cols-2 gap-2">
            {post.imgUrls && post.imgUrls.length > 1 && (
              displayedImages.map((url, index) => (
                <div key={index} className="w-full h-48 overflow-hidden rounded-lg">
                  <Image
                    width={300}
                    src={`http://localhost:5000/images/${url}`}
                    alt={`Post image ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            )}
          </div>

          <div className="flex justify-center mt-2">
            {post.imgUrls && post.imgUrls.length === 1 && (
              displayedImages.map((url, index) => (
                <div key={index} className="w-full max-w-2xl rounded-lg">
                  <Image
                    width={500}
                    src={`http://localhost:5000/images/${url}`}
                    alt={`Post image ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            )}
          </div>

          {/* Show More / Show Less Button */}
        
        </div>
        {post.imgUrls.length > 4 && (
            <div className="mt-4 text-black">
              <Button
                type="link"
                onClick={handleToggleShowAll}
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            </div>
          )}
      </div>

      {/* Card Actions */}
      <div className="flex items-center mx-5">
        <div className="w-[10%]">
          <img src="https://as2.ftcdn.net/v2/jpg/05/88/10/25/1000_F_588102589_x5jlJUTfRCm0I5MLM9ESIQSck6wWZ56i.jpg" />
        </div>
        <span className="text-sm text-[gray]">You and 23 others</span>
      </div>

      <div className="divider mx-5 my-0"></div>
      <div className="flex justify-between items-center mb-4 mx-5">
        <button className="btn flex gap-2 text-xl items-center" onClick={() => setIsLike(!isLine)}>
          {isLine ? <FcLike className="text-3xl" /> : <FcLikePlaceholder className="text-3xl" />}
          Love
        </button>
        <button className="btn flex gap-2 text-xl items-center" onClick={handleCommentSubmit}>
          <FaRegCommentDots className="text-2xl" /> Comment
        </button>
        <button className="btn flex gap-2 text-xl items-center text-red">
          <IoMdShareAlt className="text-2xl" />
          Share
        </button>
      </div>

      {/* Input field for new comments */}
      <div className="flex flex-col space-y-4 m-3 rounded-lg">
        <div className="flex items-start space-x-1">
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </div>
          </div>
          <form className="flex-grow">
            <input
              className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 w-full focus:outline-none"
              placeholder="Write a comment"
              value={newComment}
              onChange={handleCommentChange}
            />
          </form>
        </div>
      </div>

      {/* Render Comments */}
      <div>
        <Comments />
      </div>
    </div>
  );
};

export default Post;
