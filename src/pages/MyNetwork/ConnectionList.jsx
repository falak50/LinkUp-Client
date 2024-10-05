import { Avatar } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dpImg from "../../assets/dpImg.jpg";

const pathLink = "http://localhost:5000/images/";

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const owner = JSON.parse(localStorage.getItem("user"));
  const ownId = owner?._id || "";

  const handleViewProfile = (email) => {
    navigate(`/profile/${email}`);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/connections/${ownId}`
        );
        setConnections(response.data);
        console.log("Fetched friends:", response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ownId) {
      fetchFriends();
    }
  }, [ownId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleMessage = (e) => {
    e.stopPropagation(); // Stop event propagation to parent
    alert('Hello!');
  };

  return (
    <div className="bg-white p-4 my-2 w-[77%]">
      {connections?.map((connection, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
        >
          <div className="flex items-center space-x-4">
            {/* Profile Avatar */}
            <img
              className="bg-gray-300 rounded-full w-16 h-16"
              src={connection?.ProfileImgURL ? pathLink + connection.ProfileImgURL : dpImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
            <div>
              {/* Make Name Clickable and Black */}
              <p
                className="text-lg font-semibold text-black cursor-pointer hover:underline"
                onClick={() => handleViewProfile(connection.email)} // Navigate on name click
              >
                {connection?.first_name} {connection?.last_name}
              </p>
              <p className="text-sm text-gray-500">{connection?.headline}</p>
              <p className="text-sm text-gray-400">{connection?.education}</p>
            </div>
          </div>
          <button
            onClick={(e) => handleMessage(e)} // Pass the event to stop propagation
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Message
          </button>
        </div>
      ))}
    </div>
  );
};

export default ConnectionList;
