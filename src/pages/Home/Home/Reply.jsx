import { useState } from "react";
import { AiFillLike } from "react-icons/ai";

export default function Reply() {
  const [isReact, setIsReact] = useState(true);

  return (
    <div className="flex items-center my-2">
      <div className="flex bg-[#f6f6f6] p-2 rounded-[8px]">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="ml-4">
          <div className="font-semibold">John Doe</div>
          <div className="text-gray-600 text-sm">nice picture</div>
          <div className="_comment_reply flex items-center"></div>
        </div>
      </div>
    </div>
  );
}
