import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import useUserinfo from '../../../hooks/useUserinfo';
import { toast } from 'react-toastify'
const IntroModal = ({title = 'NOT SET TITLE' }) => {
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef(null);
    const [userInfo, refetch,isFetchingIntro] = useUserinfo();
    //console.log(userInfo);
    const handleClickOpen = () => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const {register,handleSubmit,reset} = useForm({
      defaultValues:{
        first_name:userInfo?.first_name,
        last_name: userInfo?.last_name,
        additional_name:userInfo?.additional_name,
        headline: userInfo?.headline,
        education:userInfo?.education,
        country:userInfo?.country,
        city:userInfo?.country
      },
      
    });
    const onSubmit = data => {
       // console.log("data---->",data);
        // const saveUser = {last_name:data.name,email:data.email}
           fetch(`http://localhost:5000/users/${userInfo._id}`,{
            method:'PATCH', 
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify(data)

           })
           .then(res=>res.json())
           .then(() => {
              //(data) then //console.log("back end id ",data) 
                refetch();               
                toast.success("User updated successfully",{
                  autoClose: 1200
                })
               /// here add 
              //  reset();
              setOpen(false);
               
           })


        // setOpen(false);

    }
    const handleExternalSubmit = () => {
        // Trigger form submission from outside the form
      //  console.log('click')

        if (formRef.current) {
        
            handleSubmit(onSubmit)();
        }
      };

      useEffect(()=>{
        if(userInfo && !isFetchingIntro)
        {
          reset()
          console.log('reset of introoooo')
        } 
      },[isFetchingIntro])

    return (
        <React.Fragment>
           <button onClick={handleClickOpen()} className="btn btn-circle border-none  bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto mt-[-90px]">
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
          sx={{
            width: '100%', // Set the width to 98% on small devices
            '@media (min-width:1000px)': {
              width: '70%', // Set the width to 70% for medium devices
            },
            '@media (min-width:1224px)': {
              width: '50%', // Set the width to 41% for large devices
              
            },
          }}
        >
          <DialogTitle id="scroll-dialog-title" className='flex justify-between'>

          <div className='text-2xl mt-2 mx-6'>
              {title}
              </div>
            <button onClick={handleClose} className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ">
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
      // value={register("headline", { required: true }).value || ''}
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