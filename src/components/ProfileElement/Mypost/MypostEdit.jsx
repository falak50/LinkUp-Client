import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';


const MypostAdd = () => {

//   here skill function end --------------------
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
    
    setOpen(false);
    // Add your logic to handle the form data
  };
 

  const handleExternalSubmit = () => {
    if (formRef.current) {
      handleSubmit(onSubmit)();
    }
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
          <div className="text-2xl mt-2 mx-6">title</div>
          <button
            onClick={handleClose}
            className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl "
          >
            <IoMdClose />
          </button>
        </DialogTitle>
        <DialogContent dividers={scroll}>
          <span className="text-sm mx-9 text-[#717171]">* Indicates required</span>

          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="card-body mb-0 mt-0 top-[-20px] relative"
          >
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[#717171]">Skill *</span>
              </label>
              <input
                type="text"
                {...register('skill', { required: true })}
                className="input input-bordered h-9"
                />
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
          
         
          <button onClick={handleDelete} className="btn btn-sm text-xl text-[#b4b4b4] ml-2">Delete education</button>
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