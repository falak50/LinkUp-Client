import { useState } from "react";
// import { MdOutlinePermMedia } from "react-icons/md";
// import { FaCalendarAlt, FaRegCommentDots, FaShare } from "react-icons/fa";
import {  FaRegCommentDots } from "react-icons/fa";
// import { TfiWrite } from "react-icons/tfi";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { IoMdShareAlt } from "react-icons/io";

const FacebookPostCard = () => {
  const [isLine, setIsLike] = useState(true);

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      {/* Card Header */}
      {/* Post Content */}
      <div className="p-4">
        {/* Left Side */}
        <div className="flex items-center mb-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
            </div>
          </div>
          <div className="ml-4">
            <div className="font-semibold">John Doe</div>
            <div className="text-gray-600 text-sm">2 hours ago</div>
          </div>
        </div>
        {/* Post Text */}
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Sed ac sapien a nisi gravida fermentum. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Morbi id nisi tempus, congue lacus at, lacinia libero. Ut id
          tincidunt justo.
        </p>
        {/* Additional content goes here */}
      </div>
      {/* Card Actions */}
      <div className="flex items-center mx-5">
        <div className="w-[10%]">
          <img src="https://as2.ftcdn.net/v2/jpg/05/88/10/25/1000_F_588102589_x5jlJUTfRCm0I5MLM9ESIQSck6wWZ56i.jpg" />
        </div>
        <span className="text-sm text-gray-500">You and 23 others</span>
      </div>
      <div className="divider mx-5 my-0"></div>
      <div className="flex justify-between items-center mb-4 mx-5">
        <button className="btn flex gap-2 text-xl items-center bg-white border border-gray-300">
          {isLine ? (
            <FcLike className="text-3xl" />
          ) : (
            <FcLikePlaceholder className="text-3xl" />
          )}
          Love 
        </button>
        <button className="btn flex gap-2 text-xl items-center bg-white border border-gray-300">
          <FaRegCommentDots className="text-2xl" /> Comment
        </button>
        <button className="btn flex gap-2 text-xl items-center bg-white border border-gray-300">
          <IoMdShareAlt className="text-2xl" /> Share
        </button>
      </div>
    </div>
  );
};

export default FacebookPostCard;
