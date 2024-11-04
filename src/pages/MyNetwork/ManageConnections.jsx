import { Select, Input, Typography, Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dpImg from "../../assets/dpImg.jpg";
import { SearchOutlined } from "@ant-design/icons";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;
import PersonCard from "./PersonCard";
import FriendRequests from "./ManageComp.jsx/FriendRequests";
import SendFriendRequests from "./ManageComp.jsx/SendFriendRequests";

const ManageConnections = () => {
  const [page, setPage] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [makeFriendUsers, setMakeFriendUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("makeFriends");
  const owner = JSON.parse(localStorage.getItem("user"));
  const [cnt,setCnt] = useState(0)
  const fetchFriends = async (pagePera = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/networks/makeFriendUsers/${owner._id}`,
        {
          params: {
            search: searchQuery, // Pass search query
            page: pagePera,
          },
        }
      );
      // Ensure data is fetched only once for page 1
      if (pagePera === 1) {
        setMakeFriendUsers(response.data.makeFriendUsers || []);
      } else {
        setMakeFriendUsers((prevPosts) => [
          ...prevPosts,
          ...response.data.makeFriendUsers,
        ]);
      }
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  // Run fetchFriends only once when component mounts
  useEffect(() => {
    fetchFriends(1);
  }, [cnt]);

  const more = async () => {
    setIsMoreLoading(true);
    const newPage = page + 1;
    setPage(newPage); // Set new page number
    await fetchFriends(newPage); // Fetch next page of friends
    setIsMoreLoading(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    setPage(1); // Reset page to 1 on search
    fetchFriends(1); // Fetch friends with updated search query
  };

  return (
    <div className="bg-white p-4 my-2 w-[77%]">
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

          {activeSection === "makeFriends" && (
            <div className="flex items-center space-x-4">
              <Search
                placeholder="Search by name"
                onChange={(e) => handleSearch(e.target.value)} // Update to onChange
                style={{ width: 250 }}
                allowClear
                enterButton={<SearchOutlined />}
              />

              <Button type="link" onClick={() =>  handleSearch()}>
                Search with filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-6">
        {activeSection === "makeFriends" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {makeFriendUsers.length > 0 ? (
              makeFriendUsers.map((user) => (
                <PersonCard setCnt={setCnt} key={user._id} userCard={user} />
              ))
            ) : (
              <p>No friends available</p>
            )}
          </div>
        )}

        {activeSection === "makeFriends" && (
          <div className="flex justify-center my-6">
            <Button
              onClick={more}
              type="primary"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              size="large"
              loading={isMoreLoading}
            >
              Load More
            </Button>
          </div>
        )}

        {activeSection === "friendRequests" && <FriendRequests />}

        {activeSection === "sendFriendRequests" && <SendFriendRequests />}
      </div>
    </div>
  );
};

export default ManageConnections;
