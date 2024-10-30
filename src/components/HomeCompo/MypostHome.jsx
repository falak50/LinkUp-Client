import React, { useContext, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { IoImagesSharp } from "react-icons/io5";
import axios from "axios";
import useMypost from "../../hooks/useMypost";
import {
  IconButton,
} from "@mui/material";
import dpImg from "../../assets/dpImg.jpg";
import { AuthContext } from "../../providers/AuthProviders";
const MypostHome = ({ open, setOpen, setResetCount }) => {
  // const [userInfo, ] = useUserinfo();
  const { curUser } = useContext(AuthContext);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [, Mypostsrefetch, ,] = useMypost();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [showCard,setShowCard] = useState(true)
  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...fileList]);
  };
  const handleRemoveImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const formRef = React.useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      description: "",
    },
  });
  const onSubmit = (data) => {
    console.log("data---->", data);
    const uid = owner?._id;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      files[i].title = "image";
      console.log("file info ", files[i]);
      formData.append(`file`, files[i]);
    }

    formData.append("description", data.description);
    formData.append("uid", uid);

    axios
      .post("http://localhost:5000/posts", formData)
      .then((res) => {
        console.log("hello ", res);
        Mypostsrefetch();
      })
      .catch((err) => console.log(err));

    console.log("come my opost");
    setOpen(false);
    reset();
    setResetCount((p) => p + 1);
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      handleSubmit(onSubmit)();
    }
  };

  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };
  const curdate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        PaperProps={{
          style: {
            maxHeight: "90vh", // Adjust this value as needed
            minHeight: "250px", // not work
            marginTop: "3%",
            marginBottom: "3%",
            overflowY: "auto",
            position: "absolute",
            top: "0",
          },
        }}
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
        <DialogTitle id="scroll-dialog-title" className="flex justify-between">
          <div className="flex items-center mb-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                  <img
             className="h-12 w-12 rounded-full"
              src={`http://localhost:5000/images/${curUser?.ProfileImgURL}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
              </div>
            </div>
            <div className="ml-4 flex-grow">
              <div className="font-semibold">
                {curUser?.first_name} {curUser?.last_name}
              </div>
              <div className="text-gray-600 text-sm">{curdate}</div>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl "
          >
            <IoMdClose />
          </button>
        </DialogTitle>
        <DialogContent dividers={scroll}>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="card-body mb-0 mt-0 top-[-20px] relative"
          >
            <div className="form-control">
              <textarea
                onInput={handleInput}
                placeholder="What do you want to talk about?"
                {...register("description")}
                style={{
                  overflowY: "hidden",
                  width: "100%",
                  height: "auto",
                  border: "none",
                  outline: "none",
                  // minHeight:"250px"
                }}
              />
            </div>
        
            {(showCard && files.length === 0) && (
  <div > 

    <div  className="flex justify-between items-center relative p-4 m-2">
      <h1 ></h1> 
      <IconButton
        onClick={() => setShowCard(false)}
        className="text-gray-600 hover:text-gray-900"
      >
        <IoMdClose />
      </IconButton>
    </div>

    <div onClick={handleAddImage} className="flex-grow flex justify-center items-center"> 
  <div className="flex flex-col items-center">
    <p className="font-serif text-center">Add your Photos</p> {/* Center text horizontally */}
    <IoImagesSharp className="text-[#43b661] text-4xl" />
  </div>
</div>
  </div>
)}







            <div>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Image ${index}`}
                    style={{ marginRight: "10px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-circle btn-sm"
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </form>
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 24px", // Optional: Add some padding for better spacing
          }}
        >
          <button className="btn btn-square btn-md" onClick={handleAddImage}>
            <IconButton>
            <IoImagesSharp className="text-[#43b661] " />
            </IconButton>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
          <button
            onClick={handleExternalSubmit}
            className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
          >
            Post
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MypostHome;
