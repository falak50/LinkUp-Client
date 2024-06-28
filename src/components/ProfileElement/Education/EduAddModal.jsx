import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { MenuItem, TextField } from '@mui/material';
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import useUserinfo from '../../../hooks/useUserinfo';
import useEduinfo from '../../../hooks/useEduinfo';

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
const EduAddModal = ({ title = 'Add education' }) => {
    const [userInfo, refetch] = useUserinfo();
    const [, edurefetch, ] = useEduinfo();
    // console.log("edu ref-> ",edurefetch)
    // console.log("use ref",refetch)
   
//   here skill function start -------------------------
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  
  const addSkill = () => {
    setOpen(true);
    if (newSkill.trim() !== '') {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
    setOpen(true);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };
//   here skill function end --------------------
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef(null);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit , reset } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    console.log('data---->', data);
    const uid=userInfo._id;
    const email=userInfo.email;
    const totalData = { uid , email , ...data , skills  };

    console.log('tatolData --> ',totalData)
    fetch(`http://localhost:5000/education`,{
        method:'POST', 
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(totalData)

       })
       .then(res=>res.json())
       .then(data => {
        edurefetch();
         console.log("back end id edu add resuld ",data)
                        
            toast.success("Add Education successfully", {
                autoClose: 1200
              })
           /// here add 
           edurefetch();
           refetch();  
            reset();
            setSkills([]);
           setOpen(false);
           
       })
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
          <div className="text-2xl mt-2 mx-6">{title}</div>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">School *</span>
              </label>
              <input
                type="text"
                {...register('school', { required: true })}
                placeholder="School"
                className="input input-bordered h-9"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Degree *</span>
              </label>
              <input
                type="text"
                {...register('degree', { required: true })}
                placeholder="Degree"
                className="input input-bordered h-9"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Field of Study</span>
              </label>
              <input
                type="text"
                {...register('fieldOfStudy')}
                placeholder="Field of Study"
                className="input input-bordered h-9"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Grade</span>
              </label>
              <input
                type="text"
                {...register('grade')}
                placeholder="Grade"
                className="input input-bordered h-9"
              />
            </div>

            {/*  data----------------------------------------start  */}
             {/* text  */}
               {/* Starting month Year Selection Dropdown */}


               <div className='flex justify-between'>
                  {/* Starting month Selection Dropdown */}
           <div className="form-control w-[48%]">
              <label className="label ">
                <span className="label-text text-[#717171]">Start Month</span>
              </label>
              <TextField
                select
                {...register('start_month')}
                placeholder="Select a month"
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
                <span className="label-text text-[#717171]">Start Year</span>
              </label>
              <TextField
                select
                {...register('start_year')}
                placeholder="Select a starting year"
                // className="input input-bordered"
                fullWidth
                size="small"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </div>
             </div>
               {/* ending month Year Selection Dropdown */}


             <div className='flex justify-between'>
                  {/* ending month Selection Dropdown */}
           <div className="form-control w-[48%]">
              <label className="label ">
                <span className="label-text text-[#717171]">End month</span>
              </label>
              <TextField
                select
                {...register('end_month')}
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
                <span className="label-text text-[#717171]">End Year</span>
              </label>
              <TextField
                select
                {...register('end_year')}
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

          {/* text end  */}
            {/*  data----------------------------------------end */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Activities and societies</span>
              </label>
              <textarea
                {...register('activities')}
                placeholder="Ex: Alpha Phi Omega Band Volleyball"
                className="input input-bordered h-20 resize-y"
                
              />
            </div>

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


          
          

          </form>


            {/* THIS IS NOT PARTH OR FORM  */}
            
            <div className="mx-7 p-2 "> 
        <div className='mb-3'>
            <h1 className="text-xl text-black font-semibold">Skills</h1>
            <span>We recommend adding your top 5 used in this experience. They’ll also appear in your Skills section.</span>
        </div>
            <div className='flex flex-wrap mb-3'>
                {skills.map((skill, index) => (
                <div key={index} className=''>
                    <button className="btn bg-[#01754f] text-white rounded-full  text-l  my-2 mr-2" onClick={() => removeSkill(index)}>
            
                     {skill} <IoMdClose />
         
                    </button>
               </div>
               ))}
            </div>
              
        <div>
          {skills.length === 0 && <p className='text-[gray] text-sm mb-2'>No skills added yet.</p>}
          <div className='flex items '>
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Enter skill"
            />
        
            <button onClick={addSkill}><RiAddCircleFill className='text-2xl hover:text-[black] text-[gray]  bg-[white]' /></button>
            
          </div>
        </div>
        </div>
             {/* THIS IS NOT PARTH OR FORM  */}
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

export default EduAddModal;