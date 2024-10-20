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

export default function MyNetworkOld() {
  const [makeFriendUsers, setMakeFriendUsers] = useState([]);
  const [friendUsers, setFriendUsers] = useState([]);
  const [friendrequestUsers, setFriendrequestUsers] = useState([]);
  const [sentFriendrequestUsers, setSentFriendrequestUsers] = useState([]);
  const [activeSection, setActiveSection] = useState("makeFriends");
  const [ setError] = useState(null);
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
  const [openList, setOpenList] = useState(false);
  return (
    <div className="flex my-2 gap-4 min-h-screen">
      {/* Sidebar with Radio Buttons */}
  
      <div className="w-1/4 p-3 bg-white dark:bg-gray-800 h-full max-h-screen overflow-y-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
       
       <div
     // onClick={()=>setOpenList(!openList)}
     className="flex items-center justify-between bg-white text-black p-1 ">
       <div className="flex items-center">
         <FaUsers className="text-2xl " /> Network
       </div>
       {!openList &&
         <FaChevronUp onClick={()=>setOpenList(!openList)} />
       }
       {openList &&
         <FaChevronDown  onClick={()=>setOpenList(!openList)} />
       }
       
     </div>
     { !openList && 
       <Radio.Group
       className="w-full mt-3"
       onChange={(e) => setActiveSection(e.target.value)}
       value={activeSection}
     >
       <Radio.Button className="w-full mb-2 rounded-lg" value="makeFriends">
         <div className="flex items-center">
           <FaUserPlus className="mr-2" /> <span>Make Friends</span>
         </div>
       </Radio.Button>
       
       <Radio.Button className="w-full mb-2  rounded-lg" value="friends">
         <div className="flex items-center">
           <FaUserFriends className="mr-2" /> <span>Friends</span>
         </div>
       </Radio.Button>
       
       <Radio.Button className="w-full mb-2  rounded-lg text-" value="friendRequests">
         <div className="flex items-center ">
           <FaUserTimes className="mr-2" /> <span>Friend Requests</span>
         </div>
       </Radio.Button>
       
       <Radio.Button className="w-full  rounded-lg " value="sendFriendRequests">
         <div className="flex items-center ">
           <FaUserPlus className="mr-2" /> <span>Send Friend Requests</span>
         </div>
       </Radio.Button>
           </Radio.Group>

     }
      

     </div>

     {/* Main content with cards in a grid */}
     {/* {error && <p className="text-red-500">{error}</p>} */}

     {activeSection === "makeFriends" && (
       <div className="w-3/4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {makeFriendUsers.length > 0 ? (
             makeFriendUsers.map((user) => (
               <PersonCard key={user._id} userCard={user} />
             ))
           ) : (
             <p>No friends available</p>
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
      <div/>
     
    </div>
  );
}

