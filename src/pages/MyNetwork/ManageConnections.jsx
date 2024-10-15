import { Avatar, Select, Input, Typography, Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dpImg from "../../assets/dpImg.jpg";
import { AuthContext } from "../../providers/AuthProviders";
import { SearchOutlined } from "@ant-design/icons";
import { FaUserFriends, FaUserPlus, FaUserTimes } from "react-icons/fa";
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;
import PersonCard from "./PersonCard";
import FriendRequests from "./ManageComp.jsx/FriendRequests";
import SendFriendRequests from "./ManageComp.jsx/SendFriendRequests";
import addImage from "./Image/ADD.jpg";
import imgNoData from "./Image/NODATA.jpg";
const pathLink = "http://localhost:5000/images/";

const ManageConnections = () => {
  const [connections, setConnections] = useState([]);
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState(0);
  const { other, setOther, isSelect, setIsSelect } = useContext(AuthContext);
  const [call, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("recent");
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [page, setPage] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const navigate = useNavigate();

  const handleMessage = (e, connection) => {
    e.stopPropagation();
    console.log("Selected connection:", connection);
    setOther(connection);
    setIsSelect(true);
  };
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
          `http://localhost:5000/users/networks/makeFriendUsers/${owner._id}`
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
    <div className="bg-white p-4 my-2 w-[77%]">
      {/* Header Section */}
     
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Text>Action:</Text>
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

                <Option value="friendRequests">
                  <div className="flex items-center">
                    <FaUserFriends className="mr-2" />{" "}
                    <span>Friend Requests</span>
                  </div>
                </Option>

                <Option value="sendFriendRequests">
                  <div className="flex items-center">
                    <FaUserPlus className="mr-2" /> <span>Sent Requests</span>
                  </div>
                </Option>
              </Select>
            </div>
          </div>
      
          {activeSection === "makeFriends" &&
    <div className="flex items-center space-x-4">
    <Search
      placeholder="Search by name"
      onChange={(e) => handleSearch(e.target.value)} // Update to onChange
      style={{ width: 250 }}
      allowClear
      enterButton={<SearchOutlined />}
    />

    <Button type="link" onClick={() => setCount((p) => p + 1)}>
      Search with filters
    </Button>
  </div>
}
        </div>
      </div>

      <div className="flex-1 p-6">
        {activeSection === "makeFriends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {makeFriendUsers.length > 0 ? (
              makeFriendUsers.map((user) => (
                <PersonCard key={user._id} userCard={user} />
              ))
            ) : (
              <p>No friends available</p>
            )}
          </div>
        )}

        {activeSection === "friendRequests" && (
          <FriendRequests></FriendRequests>
        )}

        {activeSection === "sendFriendRequests" && (
          <SendFriendRequests></SendFriendRequests>
        )}
      </div>
    </div>
  );
};

export default ManageConnections;
