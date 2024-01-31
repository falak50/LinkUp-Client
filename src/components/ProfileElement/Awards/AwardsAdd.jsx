import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { MenuItem, TextField } from '@mui/material';
const months = ['January','February','March','April','May','June','July','August',
    'September','October','November','December',
  ];
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);


const AwardsAdd = () => {
 
//   Form + modal open close fun  start--------------------
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

//   Form + modal open close fun  end--------------------  
    const onSubmit = (data) => {
     console.log('data---->', data);
    //const uid=userInfo._id
   // const totalData = { uid , ...data , skillsWhereUse };
   // console.log(totalData);
   // console.log('tatolData --> ',totalData)
    // fetch(`http://localhost:5000/skills`,{
    //     method:'POST', 
    //     headers:{
    //       'content-type':'application/json'
    //     },
    //     body: JSON.stringify(totalData)

    //    })
    //    .then(res=>res.json())
    //    .then(data => {
    //     // edurefetch();
    //      console.log("back end id edu add resuld ",data)
                        
    //         toast.success("Add Skill successfully", {
    //             autoClose: 1200
    //           })
    //        /// here add 
    //     //    edurefetch();
    //     //    refetch();  
    //         skillsrefetch();
    //         reset();
    //         setSkillsWhereUse([]);
    //        setOpen(false);
           
    //    })
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
        className="btn btn-circle border-none  bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto "
      >
        <IoAdd className="" />
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
          <div className="text-2xl mt-2 mx-6">Edit honors & awards</div>
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
                <span className="label-text text-[#717171]">Title *</span>
              </label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="input input-bordered h-9"
                />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[#717171]">Issuer *</span>
              </label>
              <input
                type="text"
                {...register('skill', { required: true })}
                className="input input-bordered h-9"
                />
            </div>

            {/* start date --------------------- start date */}
            
            <div className='flex justify-between'>
           <div className="form-control w-[48%]">
              <label className="label ">
                <span className="label-text text-[#717171]">Issue month</span>
              </label>
              <TextField
                select
                {...register('issue_month')}
                placeholder="Select a month"
                // className="h-9"
                size="small"
                fullWidth
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </div>
             {/* Starting Year Selection Dropdown */}
             
             <div className="form-control w-[48%]">
              <label className="label">
                <span className="label-text text-[#717171]">Issue Year</span>
              </label>
              <TextField
                select
                {...register('issue_year')}
                placeholder="Select a starting year"
                // className="input input-bordered"
                size="small"
                fullWidth
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            </div>


            {/* start date --------------------- start date */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Description</span>
              </label>
              <textarea
                {...register('description')}
                placeholder="Description about your experience"
                className="input input-bordered h-20 resize-y"
              />
            </div>
         
            <button className="btn btn-circle bg-white hover:bg-[#ededec] border-none  text-[#6a6a6a] text-3xl ml-auto">
            {/* hre icon  */}
            {/* <SkillsAddModal></SkillsAddModal> */}
            
            {/* <h1>icons</h1> */}
            <AwardsAdd></AwardsAdd>
            </button>


        

          </form>

          {/* this is not part of form -------------- start  */}

            {/* Suggested Skills   ------------------ start  */}
         
            {/* Suggested Skills   ------------------ end  */}
        </DialogContent>
        <DialogActions>
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

export default AwardsAdd;