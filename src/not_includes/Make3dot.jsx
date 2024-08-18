import React from 'react';
import { Link } from 'react-router-dom';

const make3dot = () => {
    return (
        <div className="dropdown dropdown-end text-gray-500 ">
        <div tabIndex={0} role="button" className="btn btn-ghost avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
          
          dasd
            
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li><Link to={`/profile/}`}>
            <a className="justify-between">
              Profile
              <span className="badge">{"falak demo"}</span>
            </a>
            </Link>
          </li>
          <li><Link to="/settings"><a>Settings</a></Link></li>
          <li> <button  >Log Out</button></li>
        </ul>
      </div>
    );
};

export default make3dot;