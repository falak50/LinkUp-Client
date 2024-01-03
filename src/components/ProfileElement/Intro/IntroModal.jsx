import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineModeEditOutline } from 'react-icons/md';
const IntroModal = ({title = 'uppdate here' }) => {
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
           <button onClick={handleClickOpen()} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto mt-[-90px]">
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
              {title}
              </div>
            <button onClick={handleClose} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ">
            <IoMdClose />
            </button>

          </DialogTitle>
          <DialogContent  dividers={scroll} >
            <span className='text-sm mx-9 text-[#717171]'>* Indicates required</span>
          
            <form
  ref={formRef}
  onSubmit={handleSubmit(onSubmit)}
  className="card-body mb-0 mt-0 top-[-20px] relative"
>
  <div className="form-control">
    <label className="label">
      <span className="label-text text-[#717171]">First name*</span>
    </label>
    <input
      type="text"
      {...register("first_name", { required: true })}
      placeholder="First name"
      className="input input-bordered h-9"
    />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text text-[#717171]">Last name*</span>
    </label>
    <input
      type="text"
      {...register("last_name", { required: true })}
      placeholder="Last name"
      className="input input-bordered h-9"
    />
  </div>
  <div className="form-control mb-10">
    <label className="label">
      <span className="label-text text-[#717171]">Additional name</span>
    </label>
    <input
      type="text"
      {...register("additional_name")}
      placeholder="Additional name"
      className="input input-bordered h-9"
    />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text text-[#717171]">Headline *</span>
    </label>
    <textarea
      {...register("headline", { required: true })}
      placeholder="Headline"
      className="input input-bordered h-20 resize-y"
    />
  </div>

  <div className="form-control mb-5">
    <label className="label">
      <span className="label-text text-xl text-black">Education*</span>
    </label>
    <input
      type="text"
      {...register("education", { required: true })}
      placeholder="Education"
      className="input input-bordered"
    />
  </div>
  <h1 className="text-xl text-black">Location</h1>
  <div className="form-control">
    <label className="label">
      <span className="label-text text-[#717171]">Country/Region</span>
    </label>
    <input
      type="text"
      {...register("country")}
      placeholder="Country"
      className="input input-bordered"
    />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text text-[#717171]">City</span>
    </label>
    <input
      type="text"
      {...register("city")}
      placeholder="City"
      className="input input-bordered"
    />
  </div>
</form>
          
            
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            {/* <Button onClick={handleExternalSubmit}>Subscribe</Button> */}
            <button onClick={handleExternalSubmit} className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2">save</button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
};

export default IntroModal;