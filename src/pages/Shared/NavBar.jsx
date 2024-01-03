import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import { FaHome, FaSortDown, FaUserFriends  } from "react-icons/fa";
import { GiAchievement } from "react-icons/gi";
import { AiFillMessage } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";

const NavBar = () => {
    const {user,logOut} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [cart]=useCart();
    // console.log(user);
    // console.log('hello from navbar')
    const handleLogOut = () =>{
        logOut()
        .then(()=>{})
        .catch(e => console.log(e))
        navigate("login" ,{replace:true});
    }
    // console.log(user);
    const navOptions = <>
  
    <li><Link to="/"><div className="text-gray-500"><FaHome className="flex items-center  md:mx-2 mx-auto  text-2xl "/><h1 className="hidden md:block">Home</h1></div></Link></li>
    <li><Link to="/"><div className="text-gray-500"><FaUserFriends className="flex items-center md:mx-7 mx-auto text-2xl"/><h1 className="hidden md:block">My Network</h1></div></Link></li>
    
    <li><Link to="/"><div className="text-gray-500"><GiAchievement className="flex items-center  text-2xl"/><h1 className="hidden md:block">Jobs</h1></div></Link></li>
    <li><Link to="/"><div className="text-gray-500"><AiFillMessage className="flex items-center md:mx-6 mx-auto text-2xl"/><h1 className="hidden md:block">Messaging</h1></div></Link></li>
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
        <li><Link to="/profile">
          <a className="justify-between">
            Profile
            <span className="badge">check</span>
          </a>
          </Link>
        </li>
        <li><Link to="/settings"><a>Settings</a></Link></li>
        <li> <button onClick={handleLogOut} >Log Out</button></li>
      </ul>
    </div>
    {/* <li><Link to="/menu">Our Menu</Link></li>
    <li><Link to="/order/salad">Order Food</Link></li> */}
    {/* <li><Link to="/profile">
    <div> <div className="avatar text-gray-500">
            <div className="w-5 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
            </div >
              <div className="flex">
              <h1>My</h1>
            <FaSortDown />
              </div>
            </div>
               
        </Link></li> */}
   
    {/* <li>
       <Link to="/dashboard/mycart">
            <button className="btn">
            <FaShoppingCart />
            <div className="badge badge-secondary">+{cart?.length || 0}</div>
            </button>
       </Link>
    </li> */}
    
   {/* {
    user ?   <>
    <button onClick={handleLogOut}  className="btn btn-ghost">Log Out</button>
    </> : <>
     <li><Link to="/login">Login</Link></li>
    </>
   } */}
    </>
    return (
        <>
        <div className="bg-background-container  left-0 px-3vw py-0 top-0  z-50 border-b border-border-faint navbar   max-w-screen-xl m-auto bg-white text-black ">

            <div className="navbar-start">

                {/* <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stro keLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div> */}
                <a className="btn btn-ghost normal-case text-xl hidden sm:block">LinkUp</a>
                
                <input type="text" placeholder="Search" className="input input-bordered w-24 h-13 md:w-auto hidden md:block" />
                
            </div>
            <div className="navbar-center flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="divider lg:divider-horizontal"></div> 
            <div className="mx-20 navbar-end hidden md:block text-gray-500">
                <a className="btn text-gray-500">{user?.displayName}</a>
            </div>
        </div>
    </>
    );
};

export default NavBar;