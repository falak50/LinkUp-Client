import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../providers/AuthProviders";
import { FaHome, FaSortDown, FaUserFriends } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import dpImg from "../../assets/dpImg.jpg";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const pathLink = "http://localhost:5000/images/";

const NavBar = () => {
  const { logOut, curUser } = useContext(AuthContext);
  const owner = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((e) => console.log(e));
    navigate("login", { replace: true });
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-black border-b-2 border-black border-solid rounded-none" : "text-gray-500"
          }
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
            isActive ? "text-black border-b-2 border-black border-solid rounded-none" : "text-gray-500"
          }
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
            isActive ? "text-black border-b-2 border-black border-solid rounded-none" : "text-gray-500"
          }
        >
          <div className="flex flex-col items-center">
            <GiAchievement className="text-2xl" />
            <h1 className="text-sm hidden md:block">Jobs</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/messaging"
          className={({ isActive }) =>
            isActive ? "text-black border-b-2 border-black border-solid rounded-none" : "text-gray-500"
          }
        >
          <div className="flex flex-col items-center">
            <AiFillMessage className="text-2xl" />
            <h1 className="text-sm hidden md:block">Messaging</h1>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            isActive ? "text-black border-b-2 border-black border-solid rounded-none" : "text-gray-500"
          }
        >
          <div className="flex flex-col items-center">
            <MdNotificationsActive className="text-2xl" />
            <h1 className="text-sm hidden md:block">Notifications</h1>
          </div>
        </NavLink>
      </li>
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
    </>
  );

  return (
    <div className="top-0 left-0 w-full bg-background-container px-3vw py-0 z-50 border-b border-border-faint navbar max-w-screen-xl m-auto bg-white text-black">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl hidden sm:block">
          LinkUp
        </a>
       
      </div>
      <div className="navbar-center flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="mx-20 navbar-end hidden md:block text-gray-500"></div>
    </div>
  );
};

export default NavBar;
