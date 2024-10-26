import { Avatar, Select, Input, Typography, Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dpImg from "../../assets/dpImg.jpg";
import { AuthContext } from "../../providers/AuthProviders";
import { SearchOutlined } from "@ant-design/icons";
import Load from "../components/Load";

const { Option } = Select;
const { Text } = Typography;
const { Search } = Input;

const pathLink = "http://localhost:5000/images/";

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [total, setTotal] = useState(0);
  const [result,setResult] =useState(0);
  const { other, setOther, isSelect, setIsSelect } = useContext(AuthContext);
  const [call, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("recent");
  const [searchQuery, setSearchQuery] = useState(""); // Add searchQuery state
  const [page, setPage] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const navigate = useNavigate();
  const owner = JSON.parse(localStorage.getItem("user"));
  const ownId = owner?._id || "";

  const handleViewProfile = (email) => {
    navigate(`/profile/${email}`);
  };

  const handleSearch = (value) => {
    setSearchQuery(value); // Update search query state
  };

  const handleSortChange = (value) => {
    setSortOption(value); // Update sort option
  };

  const fetchFriends = async (pagePera) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/connections/${ownId}`,
        {
          params: {
            search: searchQuery, // Pass search query
            sort: sortOption, // Pass sort option
            page: pagePera,
          },
        }
      );
      console.log('response', response);
      let data = response.data;
      console.log('data ', data);
      let fetchedConnections = data.friends;

      // setConnections(fetchedConnections);
      if (pagePera === 1) {
        setConnections(fetchedConnections);  // Replace posts on the first load or reset
      } else {
        setConnections((prevPosts) => [...prevPosts, ...fetchedConnections]);  // Append posts for subsequent loads
      }
      setTotal(data.total);
      setIsMoreLoading(false);
      console.log("Fetched friends:", fetchedConnections);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ownId) {
      setPage(1);
      fetchFriends(1);
    }
  }, [ownId, sortOption, call]); // Trigger effect on search and sort changes

  const more = async ()=>{
    console.log('clcik');
    setIsMoreLoading(true);
    setPage((p) => p + 1);// for next call
    fetchFriends(page+1)
    // try {
    //   const response = await axios.get(
    //     `http://localhost:5000/users/connections/${ownId}`,
    //     {
    //       params: {
    //         search: searchQuery, // Pass search query
    //         sort: sortOption, // Pass sort option
    //         page: page+1,
    //       },
    //     }
    //   );
    //   console.log('response', response);
    //   let data = response.data;
    //   console.log('data ', data);
    //   let fetchedConnections = data.friends;

    //   // setConnections(fetchedConnections);
    //   // setConnections(p=>[...p,...fetchedConnections])
    //   setConnections((prevPosts) => [...prevPosts, ...fetchedConnections]); 
     
    //   setTotal(data.total);
    //   setResult(data.result)
    //   setIsMoreLoading(false);
    //   console.log("Fetched friends:", fetchedConnections);
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  }
  if (loading) return <Load></Load>;

  const handleMessage = (e, connection) => {
    e.stopPropagation();
    console.log("Selected connection:", connection);
    setOther(connection);
    setIsSelect(true);
  };

  return (
    <div className="bg-white p-4 my-2 w-[77%]">
      {/* Header Section */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Text className="text-lg font-semibold">{total} Connections</Text>
            <div className="flex items-center space-x-2">
              <Text>Sort by:</Text>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                style={{ width: 160 }}
                className="rounded-lg"
              >
                <Option value="first_name">First Name</Option>
                <Option value="last_name">Last Name</Option>
                <Option value="recent">Recently Added</Option>
              </Select>
            </div>
          </div>
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
        </div>
      </div>

      {/* Connections List */}
      {connections?.map((connection, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            <img
              className="bg-gray-300 rounded-full w-16 h-16"
              src={
                connection?.ProfileImgURL
                  ? pathLink + connection.ProfileImgURL
                  : dpImg
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
            <div>
              <p
                className="text-lg font-semibold text-black cursor-pointer hover:underline"
                onClick={() => handleViewProfile(connection.email)}
              >
                {connection?.first_name} {connection?.last_name}
              </p>
              <p className="text-sm text-gray-500">{connection?.headline}</p>
              <p className="text-sm text-gray-400">{connection?.education}</p>
            </div>
          </div>
          <button
            onClick={(e) => handleMessage(e, connection)}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Message
          </button>
        </div>
      ))}

      {2 > 0 && (
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
    </div>
  );
};

export default ConnectionList;
