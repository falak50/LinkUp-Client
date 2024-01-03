
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import Myself from './Myself';
const navOptions = <>

</>
const Myself2 = () => {
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef(null);
    const handleClickOpen = () => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const {register,handleSubmit,formState: { errors }} = useForm();
    const onSubmit = data => {
        console.log("data---->",data);
        setOpen(false);
    }
    const handleExternalSubmit = () => {
        // Trigger form submission from outside the form
        console.log('click')

        if (formRef.current) {
        
            handleSubmit(onSubmit)();
        }
      };

    return (
        <React.Fragment>
      
        {/* <h1>here is dailog</h1> */}

        <><button onClick={handleClickOpen()} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto mt-[]">
                 <MdOutlineModeEditOutline className=''/>
                 
         </button>
     <Dialog
       open={open}
       onClose={handleClose}
       aria-labelledby="scroll-dialog-title"
       aria-describedby="scroll-dialog-description"
       fullWidth
       maxWidth="md"
       className="mx-auto"
       sx={{ width: '41%' }}
     >
       <DialogTitle id="scroll-dialog-title" className='flex justify-between'>

       <div className='text-2xl mt-2 mx-6'>
           
           </div>
         <button onClick={handleClose} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ">
         <IoMdClose />
         </button>

       </DialogTitle>
       <DialogContent  dividers={scroll} >
         <span className='text-sm mx-9 text-gray'>* Indicates required</span>
       <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="card-body className='mb-0 mt-0 top-[-20px] relative">
           <div className="form-control">
             <label className="label">
               <span className="label-text">Name</span>
             </label>
             <input type="text" {...register("name",{ required: true })}  name="name" placeholder="Name" className="input input-bordered"  />
              {errors.name && <span className="text-red-800">Name field is required</span>}
           </div>
        
         </form>
        
       
         
       </DialogContent>
       <DialogActions>
         {/* <Button onClick={handleClose}>Cancel</Button> */}
         {/* <Button onClick={handleExternalSubmit}>Subscribe</Button> */}
         <button onClick={handleExternalSubmit} className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2">save</button>
       </DialogActions>
     </Dialog></>
        


        
        
        
   </React.Fragment>
    );
};

export default Myself2;