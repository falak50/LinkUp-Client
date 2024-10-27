import React, { useContext, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import { MdPhotoCamera } from "react-icons/md";
import dpImg from "../../../assets/dpImg.jpg";
// import CheckIcon from '@mui/icons-material/Check';
import { RiDeleteBin6Fill } from "react-icons/ri";
import useUserinfo from "../../../hooks/useUserinfo";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProviders";
const pathLink = "http://localhost:5000/images/";
const ProfileImg = ({ open, setOpen }) => {
  const { curUser } = useContext(AuthContext);
  const [userInfo, refetch, isFetchingIntro] = useUserinfo();
  const [files, setFiles] = useState([]);
  const [img, setImg] = useState(pathLink + userInfo?.ProfileImgURL);
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);

    if (fileList.length > 0) {
      const selectedImgURL = URL.createObjectURL(fileList[0]);
      setImg(selectedImgURL);
    }

    setFiles(fileList);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log("handleSubmit");
    console.log(files[0]);
    const uid = userInfo?._id;
    const formData = new FormData();
    formData.append(`file`, files[0]);
    formData.append("uid", uid);

    try {
      const res = await axios.post(
        "http://localhost:5000/users/profileimg",
        formData
      );

      console.log("add photo done");
      console.log(res);
      refetch().then((userRes) => {
        setImg(pathLink + userRes?.ProfileImgURL);
        setOpen(false);
      });
    } catch (err) {
      console.log(err);
    }

    // console.log("come my opost");
  };

  const handledelete = () => {
    setOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete your profile picture?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("CONFIRM DELETE");
        refetch();
        setImg("");
        console.log("img url ", img);
        fetch(`http://localhost:5000/users/profilePicdelete/${userInfo._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            refetch();
            isFetchingIntro();
            setImg("");
            if (data.deletedCount > 0) {
              console.log("delete done");
              refetch();
              isFetchingIntro();
              setImg("");
              Swal.fire({
                title: "Deleted!",
                text: `Picture has been deleted.`,
                icon: "success",
              });
            }
          });
      } else {
        setOpen(true);
      }
    });
  };

  useEffect(() => {
    if (userInfo && !isFetchingIntro) {
      setImg(pathLink + userInfo?.ProfileImgURL);
      // console.log('reset of introoooo')
    }
  }, [isFetchingIntro,open]);
 console.log('img ',img)
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
        maxWidth="md"
        className="mx-auto"
        sx={{
          width: "100%",
          "@media (min-width:1000px)": {
            width: "70%",
          },
          "@media (min-width:1224px)": {
            width: "50%",
          },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="flex justify-between  bg-[#1B1F23]"
        >
          <div className="text-[#FFFEFD] text-2xl mt-2 mx-6">Profile photo</div>
          <button
            onClick={handleClose}
            className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl "
          >
            <IoMdClose />
          </button>
        </DialogTitle>
        <DialogContent className="bg-[#1B1F23]" dividers={scroll}>
          {/* body strat  */}

          <div className="flex items-center justify-center">
            <div className="avatar w-[80%]">
              <div className="m-auto  w-[70%] rounded-full">
                {/* <img className=" " src={img} alt="Avatar" /> */}
                <img 
  className=" " 
  src={img} 
  alt="Avatar" 
  onError={(e) => { e.target.onerror = null; e.target.src = dpImg; }} 
/>
              </div>
           
            </div>
               <br />
          </div>

          {/* body end  */}
        </DialogContent>
        {userInfo?.email == curUser?.email &&
         <DialogActions
         className=" bg-[#1B1F23]"
         style={{
           display: "flex",
           justifyContent: "space-between",
           padding: "8px 24px",
         }}
       >
         <label
           htmlFor="fileInput"
           className="flex flex-col items-center mx-4 cursor-pointer"
         >
           <MdPhotoCamera className="text-white text-2xl mb-1" />
           <h1 className="text-white">Add photo</h1>
           <input
             id="fileInput"
             type="file"
             onChange={handleFileChange}
             multiple
             style={{ display: "none" }}
           />
         </label>
         <div
           onClick={handledelete}
           className="text-white  px-6 py-2 text-xl mr-2"
         >
           <RiDeleteBin6Fill className="mx-auto text-2xl" />
           <h1 className="mx-auto ">Delete</h1>
         </div>
         <button
           onClick={handleSubmit}
           className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
         >
           Save photo
         </button>
       </DialogActions>
}

       
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileImg;
