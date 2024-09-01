import { useEffect, useState } from "react";
import axios from "axios";
import PersonCard from "./PersonCard";
import {
  FaUsers,
  FaUserFriends,
  FaUserPlus,
  FaUserTimes,
} from "react-icons/fa"; // Import icons
import PersonCardListF from "./PersonCardListF";

export default function MyNetwork() {
  // Initialize state as empty arrays
  const [makeFriendUsers, setMakeFriendUsers] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);
  const [friendrequestUsers, setFriendrequestUsers] = useState([]);
  const [sentFriendrequestUsers, setSentFriendrequestUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("makeFriends"); // State for active section
  const [error, setError] = useState(null); // State to handle errors
  const owner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/makeFriendList/${owner._id}`
        );
        setMakeFriendUsers(response.data.makeFriendUsers || []);
        setFriendUsers(response.data.friendUsers || []);
        setFriendrequestUsers(response.data.friendrequestUsers || []);
        setSentFriendrequestUsers(response.data.sentfriendrequestUsers || []);
      } catch (err) {
        setError("Error fetching friends: " + err.message);
        console.error("Error fetching friends:", err);
      }
    };

    fetchFriends();
  }, [owner._id]);

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Determine the button classes based on the active section
  const buttonClass = (section) =>
    `w-full text-left p-3 rounded-lg flex items-center gap-2 ${
      activeSection === section
        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    } transition-colors`;

  return (
    <div className="flex my-2 gap-4 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-6 bg-white dark:bg-gray-800 h-full max-h-screen overflow-y-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <FaUsers className="text-2xl mr-2" /> Network
        </h2>
        <ul className="space-y-2">
          <li>
            <button
              className={buttonClass("makeFriends")}
              onClick={() => handleSectionChange("makeFriends")}
            >
              <FaUserPlus className="text-lg" /> Make Friends
            </button>
          </li>
          <li>
            <button
              className={buttonClass("friends")}
              onClick={() => handleSectionChange("friends")}
            >
              <FaUserFriends className="text-lg" /> Friends
            </button>
          </li>
          <li>
            <button
              className={buttonClass("friendRequests")}
              onClick={() => handleSectionChange("friendRequests")}
            >
              <FaUserTimes className="text-lg" /> Friend Requests
            </button>
          </li>
          <li>
            <button
              className={buttonClass("sendFriendRequests")}
              onClick={() => handleSectionChange("sendFriendRequests")}
            >
              <FaUserPlus className="text-lg" /> Send Friend Requests
            </button>
          </li>
        </ul>
      </div>
      
      {/* Main content with cards in a grid */}
      {error && <p className="text-red-500">{error}</p>}
      {activeSection === "makeFriends" && (
        <div className="w-3/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 ">
            {makeFriendUsers.length > 0 ? (
              makeFriendUsers.map((user) => (
                <PersonCardListF key={user._id} userCard={user} />
              ))
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>
      )}
      {activeSection === "friends" && (
        <div className="w-3/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendUsers.length > 0 ? (
              friendUsers.map((user) => (
                <PersonCard key={user._id} userCard={user} />
              ))
            ) : (
              <p>No friends available</p>
            )}
          </div>
        </div>
      )}
      {activeSection === "friendRequests" && (
        <div className="w-3/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendrequestUsers.length > 0 ? (
              friendrequestUsers.map((user) => (
                <PersonCard key={user._id} userCard={user} />
              ))
            ) : (
              <p>No friend requests available</p>
            )}
          </div>
        </div>
      )}
      {activeSection === "sendFriendRequests" && (
        <div className="w-3/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sentFriendrequestUsers.length > 0 ? (
              sentFriendrequestUsers.map((user) => (
                <PersonCard key={user._id} userCard={user} />
              ))
            ) : (
              <p>No sent friend requests available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
