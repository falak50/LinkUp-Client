import { useEffect, useState } from "react";
import axios from "axios";
import PersonCard from "./PersonCard";
import { Input, Select } from "antd";
import { FaUserFriends, FaUserPlus, FaUserTimes } from "react-icons/fa"; // Import necessary icons
const { Option } = Select;
const { Search } = Input;

export default function ManageConnections() {
  const [makeFriendUsers, setMakeFriendUsers] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);
  const [friendrequestUsers, setFriendrequestUsers] = useState([]);
  const [sentFriendrequestUsers, setSentFriendrequestUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("makeFriends");
  const [error, setError] = useState(null);
  const owner = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/networks/${owner._id}`
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

  return (
    <div className="flex flex-col my-2 min-h-screen w-[77%]">
      {/* Navbar */}
      <div className="bg-gray-100 p-4 border-b border-gray-200 0 ">
        <div className="flex items-center justify-between">
        <Select
          defaultValue={activeSection}
          style={{ width: 240 }}
          onChange={(value) => setActiveSection(value)}
        >
          <Option value="makeFriends">
            <div className="flex items-center">
              <FaUserPlus className="mr-2" /> <span>Make Friends</span>
            </div>
          </Option>

          <Option value="friends">
            <div className="flex items-center">
              <FaUserFriends className="mr-2" /> <span>Friends</span>
            </div>
          </Option>

        

          <Option value="sendFriendRequests">
            <div className="flex items-center">
              <FaUserPlus className="mr-2" /> <span>Sent Requests</span>
            </div>
          </Option>
        </Select>
          <div className="flex items-center space-x-4">
            <Search placeholder="Search by name" style={{ width: 250 }} allowClear />
          </div>
        </div>
      </div>

    

      {/* Content Sections */}
      <div className="flex-1 p-6">
        {activeSection === "makeFriends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {makeFriendUsers.length > 0 ? (
              makeFriendUsers.map((user) => <PersonCard key={user._id} userCard={user} />)
            ) : (
              <p>No friends available</p>
            )}
          </div>
        )}
    
        {activeSection === "friendRequests" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {friendrequestUsers.length > 0 ? (
              friendrequestUsers.map((user) => <PersonCard key={user._id} userCard={user} />)
            ) : (
              <p>No friend requests available</p>
            )}
          </div>
        )}
        {activeSection === "sendFriendRequests" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sentFriendrequestUsers.length > 0 ? (
              sentFriendrequestUsers.map((user) => <PersonCard key={user._id} userCard={user} />)
            ) : (
              <p>No sent friend requests available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
