import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Dot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost avatar text-gray-500"
        onClick={toggleDropdown}
      >
        <MoreVertIcon /> {/* This is where the icon is displayed */}
      </div>
      {isOpen && (
        <ul
          className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          onClick={closeDropdown}
        >
          <li>
            <Link to={`/profile/`} onClick={closeDropdown}>
              <span className="justify-between">
                Edit
              </span>
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={closeDropdown}>
              <span>Delete</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
