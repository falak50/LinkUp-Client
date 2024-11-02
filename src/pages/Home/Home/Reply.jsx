import { useState, useRef, useEffect, useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from "../../../providers/AuthProviders";
const pathLink = "http://localhost:5000/images/";
import dpImg from "../../../assets/dpImg.jpg";
export default function Reply({ reply, onReplyDelete,setReset }) {
  const { curUser } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(reply?.text || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
//  console.log('reply',reply?.
//   userInfo?.email)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleReplyEdit = () => {
    setIsEdit(true);
    setEditText(reply.text);
  };

  const handleReplyEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() === "") return;

    const payload = {
      text: editText,
      reply_id: reply._id
    };

    axios.post(`http://localhost:5000/comments/edit/${reply._id}`, payload)
      .then(res => {
        // console.log('Reply updated:', res.data);
        setIsEdit(false);
        reply.text = editText; // Update the reply text in the UI
      })
      .catch(err => console.log(err));
  };

  const handleReplyDelete = () => {
    axios.post(`http://localhost:5000/comments/delete/${reply._id}`)
      .then(res => {
        // console.log('Reply deleted:', res.data);
        setReset(p=>p+1)
        // onReplyDelete(reply._id); // Notify parent component about the deletion
      })
      .catch(err => console.log(err));
  };

  // Use effect to handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center mx-4 mt-4 mb-2">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            // src={`http://localhost:5000/images/${reply?.userInfo?.ProfileImgURL}`}
            src={pathLink + reply?.userInfo?.ProfileImgURL|| dpImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = dpImg;
                  }}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>
      {/* flex-grow */}
      <div className="ml-4 bg-[#f6f6f6] p-2 rounded-[10px] ">
        <div className="font-semibold">{reply?.userInfo?.first_name} {reply?.userInfo?.last_name}</div>

        {isEdit ? (
          <form onSubmit={handleReplyEditSubmit}>
            <input
              className="form-control border-none bg-[#f6f6f6] rounded-lg py-2 w-full focus:outline-none"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button type="submit" className="p-1 font-semibold">Save</button>
            <button type="button"className="p-1 font-semibold"  onClick={() => setIsEdit(false)}>Cancel</button>
          </form>
        ) : (
          <div className="text-gray-600 text-sm font-medium">{reply?.text}</div>
        )}
      </div>

      {/* 3-dot icon for edit/delete options */}
      {reply?.
  userInfo?.email == curUser?.email && 
        <div ref={dropdownRef} className="">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost avatar text-gray-500"
          onClick={toggleDropdown}
        >
          <MoreVertIcon />
        </div>
        {isOpen && (
          <ul
            className="absolute mt-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
            onClick={closeDropdown}
          >
            <li className="font-semibold" onClick={handleReplyEdit}>
              <span className="justify-betwee ">Edit</span>
            </li>
            <li  className="font-semibold"  onClick={handleReplyDelete}>
              <span>Delete</span>
            </li>
          </ul>
        )}
      </div>
      }
      
    </div>
  );
}
