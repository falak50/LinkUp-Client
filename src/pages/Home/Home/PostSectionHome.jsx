import { MdOutlinePermMedia } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import MypostHome from "../../../components/HomeCompo/MypostHome";
import { useState } from "react";
const PostSectionHome = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mx-auto bg-white shadow-md rounded-lg overflow-hidden my-2">
      <MypostHome open={open} setOpen={setOpen}></MypostHome>
      {/* ------------------------------------------   */}
      <div className="bg-[#ffffff] m-2 p-3 ">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="btn btn-outline flex justify-start text-[gray] w-[90%] text-left hover:bg-[#f6f5f5] hover:text-black cursor-pointer rounded-xl  ml-auto"
          >
            Start a post . . . .
          </button>
        </div>

        <div className="flex justify-between items-center m-4">
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
        </div>
      </div>
    </div>
  );
};

export default PostSectionHome;
