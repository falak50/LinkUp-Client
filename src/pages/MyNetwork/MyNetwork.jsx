import { useEffect, useState } from "react";
import axios from "axios";
import PersonCard from "./PersonCard";
import { Radio } from "antd";
import {
  FaUsers,
  FaUserFriends,
  FaUserPlus,
  FaUserTimes,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa"; // Import icons
import MyNetworkOld from "./MyNetworkOld";
import ConnectionList from "./ConnectionList";

export default function MyNetwork() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className=" mt-2 gap-4">
      <div className="p-4 bg-white rounded-lg w-[77%]">
        <nav className="flex space-x-4 mt-2 text-gray-500">
          {/* Public Feed Button */}
          <button
            onClick={() => setIsPublic(true)}
            className={`pb-1 font-semibold text-xl ${
              isPublic
                ? 'text-black border-b-2 border-black' // Active state with deep black
                : 'hover:text-black' // Inactive state with hover effect
            }`}>
            Connections
          </button>

          {/* Friends Feed Button */}
          <button
            onClick={() => setIsPublic(false)}
            className={`pb-1 font-semibold text-xl ${
              !isPublic
                ? 'text-black border-b-2 border-black' // Active state with deep black
                : 'hover:text-black' // Inactive state with hover effect
            }`}>
            Manage Connections
          </button>
        </nav>
      </div>
      <div className=""> {/* Adjust the margin-top (mt-16) to move "hello" down */}
        <ConnectionList></ConnectionList>
      </div>
    </div>
  );
}
