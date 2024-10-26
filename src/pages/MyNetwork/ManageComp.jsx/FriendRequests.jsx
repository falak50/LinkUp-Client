import axios from 'axios';
import { useEffect, useState } from 'react';
import dpImg from "../../../assets/dpImg.jpg";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const pathLink = "http://localhost:5000/images/";

export default function FriendRequests() {

  const navigate = useNavigate();
  const [friendrequestUsers, setFriendrequestUsers] = useState([]);
  const [loadingStates, setLoadingStates] = useState({}); // Manage loading state for each user
  const [reset, setReset] = useState(0);
  const owner = JSON.parse(localStorage.getItem("user"));

  const handleViewProfile = (email) => {
    navigate(`/profile/${email}`);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/networks/friendrequestUsers/${owner._id}`
        );
        setFriendrequestUsers(response.data.friendrequestUsers || []);
      } catch (err) {
        console.error("Error fetching friends:", err);
      }
    };
    fetchFriends();
  }, [owner._id, reset]);

  const handleAcceptFriendRequest = async (connection) => {
    setLoadingStates((prev) => ({ ...prev, [connection.email]: 'accepting' })); // Set loading state for 'accept' button

    const payload = {
      sentFriendRequestEmail: connection.email,
      ownerEmail: owner.email,
    };

    try {
      const res = await fetch("http://localhost:5000/users/acceptFriendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Response:", data);
      setReset(p => p + 1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [connection.email]: null })); // Clear loading state
    }
  };

  const handleCancelFriendRequest = async (connection) => {
    setLoadingStates((prev) => ({ ...prev, [connection.email]: 'cancelling' })); // Set loading state for 'cancel' button

    const payload = {
      sentFriendRequestEmail: connection.email,
      ownerEmail: owner.email,
    };

    try {
      const res = await fetch("http://localhost:5000/users/cancelFriendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Response:", data);
      setReset(p=>p+1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      console.error("Error:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [connection.email]: null })); // Clear loading state
    }
  };

  return (
    <div>
      {friendrequestUsers?.map((connection, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 mb-4 border rounded-lg shadow-sm"
        >
         <div className="flex items-center space-x-4">
  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
    <img
      className="w-full h-full object-cover"
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
  </div>
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

          <div>
            <button
              onClick={() => handleAcceptFriendRequest(connection)}
              disabled={loadingStates[connection.email] === 'accepting'} // Disable during accept action
              className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost"
            >
              Accept Request
            </button>
            <button
              onClick={() => handleCancelFriendRequest(connection)}
              disabled={loadingStates[connection.email] === 'cancelling'} // Disable during cancel action
              className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost"
            >
              Cancel Request
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
