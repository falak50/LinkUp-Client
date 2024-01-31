import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoImagesSharp } from "react-icons/io5";
import axios from 'axios';
import useUserinfo from '../../../hooks/useUserinfo';
import useMypost from '../../../hooks/useMypost';
const MypostAdd = () => {
    const [userInfo, ] = useUserinfo();
    const [, Mypostsrefetch , , ] = useMypost();
    // imagme ----------------- fun start 
    const [files, setFiles] = useState([]);
    const handleAddImage = (e) => {
        // Open file input programmatically
        const fileInput = e.target.nextSibling;
        fileInput.click();
      };
    
      const handleFileChange = (e) => {
        // Convert FileList to an array
        const fileList = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...fileList]);
      };
      const handleRemoveImage = (index) => {
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
      };
      // imagme ----------------- end 

  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef(null);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit} = useForm({
    defaultValues: {
    },
  });
  const onSubmit = (data) => {
    console.log('data---->', data);
    const uid=userInfo?._id;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      files[i].title = "falak";
      console.log("file info ", files[i]);
      formData.append(`file`, files[i]);
    }

    formData.append('description', data.description);
    formData.append('uid', uid);
  

    axios.post('http://localhost:5000/posts', formData)
      .then(res => {
        console.log(res);
        Mypostsrefetch();
      })
      .catch(err => console.log(err));
    
      console.log("come my opost")
  //  Mypostsrefetch(); here work after one  but why . so use then 
    setOpen(false);
    // Add your logic to handle the form data
  };
 

  const handleExternalSubmit = () => {
    if (formRef.current) {
      handleSubmit(onSubmit)();
    }
  };


  /// text area auto increse function
  const [inputValue, setInputValue] = useState('');
  const handleInput = (event) => {
    setInputValue(event.target.value);

    // Auto-expand textarea height based on content
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  
    return (
        <React.Fragment>
        
      <button
        onClick={handleClickOpen()}
        className=" bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto "
      >
        Create a post
      </button>
         

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
              maxHeight: '90vh', // Adjust this value as needed
              minHeight:"250px", // not work 
              marginTop: '3%',
              marginBottom: '3%',
              overflowY: 'auto',
              position: 'absolute',
              top: '0',
            },
          }}
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
        <DialogTitle id="scroll-dialog-title" className="flex justify-between">
          <div className="text-2xl mt-2 mx-6">Post</div>
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
                    value={inputValue}
                    onInput={handleInput}
                    placeholder="What do you want to talk about?"
                    {...register('description')}
                    style={{
                        overflowY: 'hidden',
                        width: '100%',
                        height: 'auto',
                        border: 'none',
                        outline: 'none',
                        // minHeight:"250px"
                    }}
                />

                </div>

                <div>
        {files.map((file, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
            <img src={URL.createObjectURL(file)} alt={`Image ${index}`} style={{  marginRight: '10px' }} />
            <button type='button' className='btn btn-circle btn-sm' style={{ position: 'absolute', top: '0', right: '0' }} onClick={() => handleRemoveImage(index)}>X</button>
          </div>
        ))}
      </div>


            
          
                   
              
            {/* THIS IS NOT PARTH OR FORM  */}
            
         
            
              
        
             {/* THIS IS NOT PARTH OR FORM  */}



        

          </form>

          {/* this is not part of form -------------- start  */}

            {/* Suggested Skills   ------------------ start  */}
         
            {/* Suggested Skills   ------------------ end  */}
        </DialogContent>
     
        <DialogActions
           style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 24px', // Optional: Add some padding for better spacing
          }}
        >
          
         
          
           
          <button className='btn btn-square btn-md' onClick={handleAddImage}><IoImagesSharp /></button>
          <input type="file" onChange={handleFileChange} multiple style={{ display: 'none' }} />     
      

          <button
            onClick={handleExternalSubmit}
            className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
          >
            Save
          </button>
       
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
};

export default MypostAdd;