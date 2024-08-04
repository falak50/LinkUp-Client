import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { FaHome, FaSortDown, FaUserFriends  } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
// import useUserinfo from "../../hooks/useUserinfo";

const NavBar = () => {
    const {logOut,user} = useContext(AuthContext);
    // const [userInfo] = useUserinfo();
    const navigate = useNavigate();
    // console.log('user ',user?.email)
    // const [cart]=useCart();
    // console.log(user);
    // console.log('hello from navbar ->>>',userInfo?._id)
    const handleLogOut = () =>{
        logOut()
        .then(()=>{
        })
        .catch(e => console.log(e))
        navigate("login" ,{replace:true});
    }
    // console.log(user);
    const navOptions = <>
  
    <li><Link to="/"><div className="text-gray-500"><FaHome className="flex items-center  md:mx-2 mx-auto  text-2xl "/><h1 className="hidden md:block">Home</h1></div></Link></li>
    <li><Link to="/mynetwork"><div className="text-gray-500"><FaUserFriends className="flex items-center md:mx-7 mx-auto text-2xl"/><h1 className="hidden md:block">My Network</h1></div></Link></li>
    
    <li><Link to="/"><div className="text-gray-500"><GiAchievement className="flex items-center  text-2xl"/><h1 className="hidden md:block">Jobs</h1></div></Link></li>
    <li><Link to="/messaging"><div className="text-gray-500"><AiFillMessage className="flex items-center md:mx-6 mx-auto text-2xl"/><h1 className="hidden md:block">Messaging</h1></div></Link></li>
    <li><Link to="/">
        <div className="text-gray-500"><MdNotificationsActive className="flex items-center md:mx-8 mx-auto text-2xl "/><h1 className="hidden md:block">Notifications</h1></div></Link></li>

    <div className="dropdown dropdown-end text-gray-500 ">
      <div tabIndex={0} role="button" className="btn btn-ghost avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
        
        <FaSortDown  />
          
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li><Link to={`/profile/${user?.email}`}>
          <a className="justify-between">
            Profile
            <span className="badge">{"falak demo"}</span>
          </a>
          </Link>
        </li>
        <li><Link to="/settings"><a>Settings</a></Link></li>
        <li> <button onClick={handleLogOut} >Log Out</button></li>
      </ul>
    </div>
   
    </>
    return (

        <div className=" top-0 left-0 w-full bg-background-container  px-3vw py-0   z-50 border-b border-border-faint navbar   max-w-screen-xl m-auto bg-white text-black ">

            <div className="navbar-start">

              
                <a className="btn btn-ghost normal-case text-xl hidden sm:block">LinkUp</a>
                
                <input type="text" placeholder="Search" className="input input-bordered w-24 h-13 md:w-auto hidden md:block bg-white" />

                
            </div>
            <div className="navbar-center flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div className="mx-20 navbar-end hidden md:block text-gray-500">
                {/* <a className="btn text-gray-500">{userInfo?.first_name} {userInfo?.last_name}</a> */}
            </div>
        </div>

    );
};

export default NavBar;