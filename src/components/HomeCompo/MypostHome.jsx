import React, { useContext, useRef, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { IoImagesSharp } from "react-icons/io5";
import axios from "axios";
import useMypost from "../../hooks/useMypost";
import { IconButton, Button } from "@mui/material";
import { AuthContext } from "../../providers/AuthProviders";
import { Image } from "antd"; // Assuming you're using Ant Design for Image

const pathLink = "http://localhost:5000/images/";

const MypostHome = ({ open, setOpen, setResetCount }) => {
  const [showCard, setShowCard] = useState(true);
  const { curUser } = useContext(AuthContext);
  const owner = JSON.parse(localStorage.getItem("user"));
  const [, Mypostsrefetch] = useMypost();
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

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

  const formRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (data) => {
    const uid = owner?._id;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
    }

    formData.append("description", data.description);
    formData.append("uid", uid);

    axios
      .post("http://localhost:5000/posts", formData)
      .then((res) => {
        Mypostsrefetch();
      })
      .catch((err) => console.log(err));

    setOpen(false);
    reset();
    setResetCount((p) => p + 1);
  };

  const renderMedia = (file) => {
    const mediaType = file.type.split("/").pop().toLowerCase(); // Get the file type from the file object
    const mediaSrc = URL.createObjectURL(file); // Create a local URL for the file

    // List of accepted image file extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];

    return (
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          marginBottom: "10px",
        }}
      >
        {(() => {
          switch (mediaType) {
            case "mp4":
              return (
                <video controls className="w-full h-full">
                  <source src={mediaSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            default:
              if (imageExtensions.includes(mediaType)) {
                return (
                  <Image
                    width={300}
                    src={mediaSrc} // Use the mediaSrc created above
                    alt={`Post image`}
                    className="object-cover w-full h-full"
                  />
                );
              } else {
                return (
                  <div>
                    <a
                      href={mediaSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button type="link">File: {file.name} </Button>{" "}
                      {/* Button for unknown file types */}
                    </a>
                  </div>
                );
              }
          }
        })()}
      </div>
    );
  };

  useEffect(() => {
    return () => {
      // Cleanup URLs to prevent memory leaks
      files.forEach((file) => URL.revokeObjectURL(URL.createObjectURL(file)));
    };
  }, [files]);
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
          {/* <div className="flex items-center mb-2"> */}

          <div className="flex items-center mb-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={`http://localhost:5000/images/${curUser?.ProfileImgURL}`}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
            <div className="ml-4 flex-grow">
              <div className="font-semibold">
                {curUser?.first_name} {curUser?.last_name}
              </div>
              <div className="text-gray-600 text-sm">{curdate}</div>
            </div>
            {/* </div> */}
          </div>
          <button
            onClick={handleClose}
            className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl "
          >
            <IoMdClose />
          </button>
        </DialogTitle>

        <DialogContent dividers>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="mb-0"
          >
            <div className="form-control p-auto font-serif">
              <textarea
                placeholder="What do you want to talk about?"
                {...register("description")}
                className="w-full"
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
            {showCard && files.length === 0 && (
              <div>
                <div className="flex justify-between items-center relative p-4 pd m-2">
                  <h1></h1>
                  <IconButton
                    onClick={() => setShowCard(false)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <IoMdClose />
                  </IconButton>
                </div>

                <div
                  onClick={handleAddImage}
                  className="flex-grow flex justify-center items-center pd-10"
                >
                  <div className="flex flex-col items-center">
                    <p className="font-serif text-center">Add your file</p>{" "}
                    {/* Center text horizontally */}
                    <IoImagesSharp className="text-[#43b661] text-4xl" />
                  </div>
                </div>
                <h1></h1>
                <h1></h1>
              </div>
            )}
            <div>
              {files.map((file, index) => (
                <div
                  key={index}
                  style={{ position: "relative", display: "block" }}
                >
                  {renderMedia(file)} {/* Use renderMedia for uploaded files */}
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

        <DialogActions>
          <button className="btn btn-square btn-md" onClick={handleAddImage}>
            <IoImagesSharp className="text-[#43b661] " />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            multiple
            style={{ display: "none" }}
          />
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="btn bg-[#0a66c2] text-white rounded-full px-6 py-2 text-xl mr-2"
          >
            Post
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MypostHome;
