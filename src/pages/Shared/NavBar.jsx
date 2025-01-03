import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { FaHome, FaSortDown, FaUserFriends } from "react-icons/fa";
// import { GiAchievement } from "react-icons/gi";
import { MdNotificationsActive, MdShoppingCart } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import dpImg from "../../assets/dpImg.jpg";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
const pathLink = "http://localhost:5000/images/";
// import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
// import linkup from "../../assets/linkUp/linkup7.png";
import { FaBusinessTime } from "react-icons/fa6";

const NavBar = () => {
  const { logOut, curUser } = useContext(AuthContext);
  const owner = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // const handleLogOut = () => {
  //   logOut()
  //     .then(() => {})
  //     .catch((e) => console.log(e));
  //   navigate("login", { replace: true });
  // };
  const handleLogOut = () => {
    logOut()
        .then(() => {
            localStorage.removeItem('user');
            navigate("login", { replace: true });
        })
        .catch((e) => console.log(e));
   };
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const navOptions = (
    <ul className="flex space-x-0 md:space-x-4 lg:space-x-4">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black border-solid rounded-none bg-transparent focus:bg-transparent active:bg-transparent"
              : "text-gray-700 hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex flex-col items-center">
            <FaHome className="text-2xl" />
            <h1 className="text-sm hidden md:block">Home</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/mynetwork"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black border-solid rounded-none bg-transparent focus:bg-transparent active:bg-transparent"
              : "text-gray-500 hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex flex-col items-center">
            <FaUserFriends className="text-2xl" />
            <h1 className="text-sm hidden md:block">My Network</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/job"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black border-solid rounded-none bg-transparent focus:bg-transparent active:bg-transparent"
              : "text-gray-500 hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex flex-col items-center">
            <FaBusinessTime className="text-2xl" />
            <h1 className="text-sm hidden md:block">Jobs</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black border-solid rounded-none bg-transparent focus:bg-transparent active:bg-transparent"
              : "text-gray-500 hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex flex-col items-center">
            <MdNotificationsActive className="text-2xl" />
            <h1 className="text-sm hidden md:block">Notifications</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            isActive
              ? "text-black border-b-2 border-black border-solid rounded-none bg-transparent focus:bg-transparent active:bg-transparent"
              : "text-gray-500 hover:text-black hover:bg-transparent focus:bg-transparent active:bg-transparent"
          }
          style={{ backgroundColor: 'transparent' }}
        >
          <div className="flex flex-col items-center">
            <MdShoppingCart className="text-2xl" />
            <h1 className="text-sm hidden md:block">Marketplace</h1>
          </div>
        </NavLink>
      </li>
    </ul>
  );
  
  
  
  
  
  
  return (
    <div className="top-0 left-0 w-full flex justify-between bg-background-container py-0 z-50 border-b border-border-faint navbar max-w-screen-xl mx-auto bg-white text-black">
      
      {/* Hide this div on small screens */}
      <div className="hidden sm:block">
        <p className="font-serif text-3xl text-[#102260] pl-3">LinkUp</p>
      </div>
  
      <ul className="menu menu-horizontal">{navOptions}</ul>
      
      <div className="dropdown dropdown-end text-gray-500">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost avatar"
          onClick={handleDropdownToggle}
        >
          <div className="w-10 rounded-full">
            <img
              src={pathLink + curUser?.ProfileImgURL || dpImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
          </div>
          <FaSortDown />
        </div>
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
          >
            <li>
              <Link
                to={`/profile/${owner?.email}`}
                onClick={closeDropdown}
                className="flex items-center gap-x-2 text-gray-500"
              >
                <CgProfile />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                onClick={closeDropdown}
                className="flex items-center gap-x-2 text-gray-500"
              >
                <IoSettingsSharp />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogOut();
                  closeDropdown();
                }}
                className="flex items-center gap-x-2 text-gray-500"
              >
                <IoIosLogOut />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
