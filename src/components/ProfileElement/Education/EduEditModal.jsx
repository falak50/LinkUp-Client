import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import {  MenuItem, TextField } from '@mui/material';
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from 'react-toastify';
import useUserinfo from '../../../hooks/useUserinfo';
import useEduinfo from '../../../hooks/useEduinfo';
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
const EduEditModal = ({ title = 'Edit education' , edu}) => {
  //console.log(edu)
    const [userInfo] = useUserinfo();
    const [,edurefetch, ,] = useEduinfo();
  //  console.log(edu)
    // console.log("edu ref-> ",edurefetch)
    // console.log("use ref",refetch)
//   here skill function start -------------------------
  const [skills, setSkills] = useState([...edu.skills]);
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
  const handleDelete = () => {

    setOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete your ${edu.school} education?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/education/${edu._id}`,{
          method:'DELETE'
       })
       .then(res => res.json())
       .then(data=> {
        if(data.deletedCount>0){
          edurefetch();
          Swal.fire({
            title: "Deleted!",
            text: `${edu.school} education has been deleted.`,
            icon: "success"
          });
        }
        
       })
        
      }else{
        setOpen(true);
      }
    });
  };

  const { register, handleSubmit , reset } = useForm({
    defaultValues: {
        school:edu.school,
        degree:edu.degree,
        fieldOfStudy:edu.fieldOfStudy,
        grade:edu.grade,
        start_month: edu.start_month,
        start_year:edu.start_year,
        end_month:edu.end_month,
        end_year:edu.end_year,
        activities:edu.activities,
        description:edu.description,
    },
  });

  const onSubmit = (data) => {
   // console.log('data---->', data);
    const uid=userInfo._id
    const totalData = { uid , ...data , skills  };
     //console.log("got to hit for update")
   fetch(`http://localhost:5000/education/${edu._id}`,{
    method:'PATCH', 
    headers:{
      'content-type':'application/json'
    },
    body: JSON.stringify(totalData)

   })
   .then(res=>res.json())
   .then(() => {
    setOpen(false);
    edurefetch();
    edu = totalData; // this is tempo data not mongo data,sunmit data
    reset({
      school: edu.school,
      degree: edu.degree,
      fieldOfStudy: edu.fieldOfStudy,
      grade: edu.grade,
      start_month: edu.start_month,
      start_year: edu.start_year,
      end_month: edu.end_month,
      end_year: edu.end_year,
      activities: edu.activities,
      description: edu.description,
    });
                 
    toast.success("User updated successfully",{
      autoClose: 1200
    })
  
   })
   reset();
  


   // setOpen(false);
    // Add your logic to handle the form data
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      handleSubmit(onSubmit)();
    }
  };

  // useEffect(()=>{
  //   if(EduInfo && !isFetchingEdu)
  //     {
  //       reset();
  //       console.log("when reset => props edu ",edu)
  //   }
  // },[isFetchingEdu])


  return (
    <React.Fragment>
      <button
        onClick={handleClickOpen()}
        className="btn btn-circle border-none  bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto "
      >
        <FiEdit className="" />
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
    defaultValue={months.includes(edu.start_month) ? edu.start_month : ''}
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
                defaultValue={edu.start_year} 
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
                defaultValue={months.includes(edu.end_month) ? edu.end_month : ''}
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
                defaultValue={edu.end_year}
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

export default EduEditModal;