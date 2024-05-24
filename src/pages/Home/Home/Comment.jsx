import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import Reply from "./Reply";

const Comment = () => {
  const [isReact, setIsReact] = useState(true);
  return (
    <div>
      <div className="flex items-center my-2">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              alt="Profile"
              className="h-12 w-12 rounded-full"
            />
          </div>
        </div>

        <div className="ml-4 bg-[#f6f6f6] p-2  rounded-[10px] ">
          <div className="font-semibold">John Doe</div>
          <div className="text-gray-600 text-sm">nice picture </div>
          <div className="_comment_reply flex items-center"></div>
        </div>
      </div>
      <div className="_comment_reply_num mx-16  ">
        <ul className="_comment_reply_list flex ">
          <li className="mr-3">
            {isReact ? (
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
        </ul>
        
        <form className="flex-grow">
          <input
            className="form-control border-none bg-[#f6f6f6] rounded-lg px-3 py-2 w-full focus:outline-none"
            placeholder="Write a comment"
          />
        </form>
        
        <Reply></Reply>


      </div>
    </div>
  );
};

export default Comment;
