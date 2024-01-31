import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdClose } from 'react-icons/io';
import { MdPhotoCamera } from "react-icons/md";
// import CheckIcon from '@mui/icons-material/Check';
import { RiDeleteBin6Fill } from "react-icons/ri";
import useUserinfo from '../../../hooks/useUserinfo';
import axios from 'axios';
const ProfileImg = ({open,setOpen}) => {
  const [userInfo,refetch ] = useUserinfo();
    const [files, setFiles] = useState([]);

   
    const handleFileChange = (e) => {
        // Convert FileList to an array
    //    console.log(files[0]);
        const fileList = Array.from(e.target.files);
        setFiles(fileList); // Set the state directly to the new array
        console.log("value = ",e.target.files)
     //   console.log(files);
      };
  
  const handleClose = () => {
    setOpen(false);

  };
 


  const handleSubmit = () => {
    console.log('helo',)
    console.log(files[0]);
    const uid=userInfo?._id;
    const formData = new FormData();
    formData.append(`file`, files[0]);
    formData.append('uid', uid);
    axios.post('http://localhost:5000/profileimg', formData)
      .then(res => {
        console.log(res);
        refetch();
      })
      .catch(err => console.log(err));
    
      console.log("come my opost")
  //  Mypostsrefetch(); here work after one  but why . so use then 
    setOpen(false);
    // Add your logic to handle the form data
    // setOpen(false);
    // Add your logic to handle the form data
  };
 



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
            width: '100%',
            '@media (min-width:1000px)': {
              width: '70%', 
              
            },
            '@media (min-width:1224px)': {
              width: '50%', 
              
            },
          }}
      >
        <DialogTitle
        id="scroll-dialog-title" className="flex justify-between  bg-[#1B1F23]">
          <div className="text-[#FFFEFD] text-2xl mt-2 mx-6">Profile photo</div>
          <button
            onClick={handleClose}
            className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl "
          >
            <IoMdClose />
          </button>
        </DialogTitle>
        <DialogContent 
        className='bg-[#1B1F23]'
        dividers={scroll}>
         {/* bod strat  */}
         <div className="flex items-center justify-center">
    <div className="avatar">
        <div className="m-auto w-[70%] rounded-full">
            <img src='https://filmfare.wwmindia.com/content/2020/nov/shahrukhkhan31605693734.jpg' alt="Avatar" />
        </div>
    </div>
</div>

         {/* body end  */}
        </DialogContent>
        <DialogActions
          className=' bg-[#1B1F23]'
           style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 24px', // Optional: Add some padding for better spacing
          }}
        >
          
          <label htmlFor="fileInput" className='flex flex-col items-center mx-4 cursor-pointer'>
            <MdPhotoCamera className='text-white text-2xl mb-1' />
            <h1 className='text-white'>Add photo</h1>
            {/* Use a file input with display: none */}
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />
          </label>
         <div
            className="text-white  px-6 py-2 text-xl mr-2"
          >
            <RiDeleteBin6Fill className='mx-auto text-2xl' />
           <h1 className='mx-auto '>Delete</h1> 
          </div>
          <button
            onClick={handleSubmit}
            className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
          >
            
            Save photo 
          </button>
          


       
        </DialogActions>
         
      
      </Dialog>
    </React.Fragment>
  );
};

export default ProfileImg;