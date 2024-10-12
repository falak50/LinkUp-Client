
import axios from 'axios';
import{ useEffect, useState } from 'react'
import dpImg from "../../../assets/dpImg.jpg";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const pathLink = "http://localhost:5000/images/";

export default function FriendRequests() {
    
  const navigate = useNavigate();

    const [friendrequestUsers, setFriendrequestUsers] = useState([]);
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
        console.log('response.data.sentfriendrequestUsers',response.data.sentfriendrequestUsers)
        } catch (err) {
          console.error("Error fetching friends:", err);
        }
      };
      fetchFriends();
    }, [owner._id]);


   const handleAcceptFriendRequest = (connection) => {
    console.log('connection',connection)
    if (!owner) alert("owner info is null");

    console.log("click here user", connection.email);
    console.log("ownerUser", owner.email);

    const payload = {
      sentFriendRequestEmail: connection.email,
      ownerEmail: owner.email,
    };
    console.log(payload);
    // return
    fetch("http://localhost:5000/users/acceptFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("social log in done res", res);
        // getRelation();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); 
      });
  };

  return (
   <div>
     {friendrequestUsers?.map((connection, index) => (
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
              onClick={() => handleAcceptFriendRequest(connection)}

                className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost">
                Accept Friend Request
              </button>
        </div>
      ))}
   </div>
  )
}
