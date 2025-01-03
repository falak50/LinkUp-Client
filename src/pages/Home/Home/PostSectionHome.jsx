import MypostHome from "../../../components/HomeCompo/MypostHome";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
const pathLink = "http://localhost:5000/images/";
import dpImg from "../../../assets/dpImg.jpg";
const PostSectionHome = ({setResetCount}) => {
  const { curUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  
  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden my-2">
      
      <MypostHome open={open} setOpen={setOpen} setResetCount={setResetCount} ></MypostHome>
      {/* ------------------------------------------   */}
      <div className="bg-[#ffffff] m-2 p-3 ">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full  ">
            <img
              src={pathLink + curUser?.ProfileImgURL || dpImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
            </div>
          </div>
        
          <button
            onClick={() => setOpen(true)}
            className="btn btn-outline flex justify-start bg-[#ffffff] text-[gray] w-[90%] text-left hover:bg-[#f6f5f5] hover:text-black cursor-pointer rounded-xl  ml-auto"
          >
           <p className="font-sans text-gray-700 text-xm">Start a post . . . .</p> 
          </button>
        </div>

        {/* <div className="flex justify-between items-center m-4">
          <div className="flex gap-2 text-xl items-center">
            <MdOutlinePermMedia className="text-[blue]" />
            Media{" "}
          </div>
          <div className="flex gap-2 text-xl items-center">
            <FaCalendarAlt className="text-[#e8d767]" /> Event{" "}
          </div>
          <div className="flex gap-2 text-xl items-center text-red">
            <TfiWrite className="text-[#FF7F50]" />
            Write aticle
          </div>
        </div> */}
        
          {/* <div className="p-4">
        <nav className="flex space-x-4 mt-2 text-gray-500">
          <a href="#" className="text-green-600 border-b-2 border-green-600 pb-1">Companies</a>
          <a href="#" className="hover:text-green-600 ">Groups</a>
        </nav>
      </div> */}
      </div>
    </div>
  );
};

export default PostSectionHome;
