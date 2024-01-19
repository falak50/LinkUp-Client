import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoMdClose } from 'react-icons/io';
import { FiEdit } from "react-icons/fi";
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { MdOutlineIndeterminateCheckBox } from 'react-icons/md';
import { RiAddCircleFill } from 'react-icons/ri';
import Swal from 'sweetalert2';
import useSkillsinfo from '../../../hooks/useSkillsinfo';
import { toast } from 'react-toastify';
const SkillsEdit = ({skill}) => {
  const [, skillsrefetch]=useSkillsinfo();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
   //   here skill function start -------------------------
   console.log(skill?.skillsWhereUse)
  const [skillsWhereUse, setSkillsWhereUse] = useState(skill?.skillsWhereUse);
  const [newSkillsWhereUse, setNewSkillsWhereUse] = useState('');

  
  const addSkill = () => {
    setOpen(true);
    if (newSkillsWhereUse.trim() !== '') {
        setSkillsWhereUse([...skillsWhereUse, newSkillsWhereUse]);
        setNewSkillsWhereUse('');
    }
    setOpen(true);
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skillsWhereUse];
    updatedSkills.splice(index, 1);
    setSkillsWhereUse(updatedSkills);
  };
//   here skill function end --------------------
const handleDelete = () => {

    setOpen(false);
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete your ${skill.skill} skill?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/skills/${skill._id}`,{
          method:'DELETE'
       })
       .then(res => res.json())
       .then(data=> {
        if(data.deletedCount>0){
            skillsrefetch();
          Swal.fire({
            title: "Deleted!",
            text: `${skill.skill} education has been deleted.`,
            icon: "success"
          });
        }
        
       })
        
      }else{
        setOpen(true);
      }
    });
  };

//   update submit ---------- start
const onSubmit = () => {
    // console.log('data---->', data);
    console.log('click')
     skill.skillsWhereUse=skillsWhereUse;
     const totalData = skill;
     console.log("update data= >>>>> ",totalData);

      //console.log("got to hit for update")
    fetch(`http://localhost:5000/skills/${skill._id}`,{
     method:'PATCH', 
     headers:{
       'content-type':'application/json'
     },
     body: JSON.stringify(totalData)
 
    })
    .then(res=>res.json())
    .then(() => {
     setOpen(false);
     skillsrefetch();
     // this is tempo data not mongo data,sunmit data              
     toast.success("User updated successfully",{
       autoClose: 1200
     })
   
    })
   
   
 
   };
 


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
          sx={{ width: '41%' }}
        >
          <DialogTitle id="scroll-dialog-title" className='flex justify-between'>

          <div className='text-2xl mt-2 '>
              {skill.skill}
              </div>
            <button onClick={handleClose} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ">
            <IoMdClose />
            </button>

          </DialogTitle>
          <DialogContent  dividers={scroll} >
           {/* body start ------------------------------ body start  */}
           <div className="mt-10"> 
        <div className='mb-3'>
            <h1 className="text-xl text-black font-semibold">Skill used</h1>
            <span>We recommend add where you use this skill. They’ll also appear in your Skills section.</span>
        </div>
            
              
        <div>
          {skillsWhereUse.length === 0 && <p className='text-[gray] text-sm mb-2'>No skill uses added yet.</p>}
          <div className='flex '>
            
            <input
              type="text" className="input input-bordered h-9"
              value={newSkillsWhereUse}
              onChange={(e) => setNewSkillsWhereUse(e.target.value)}
              placeholder="Enter skill"
              style={{ width: '100%' }}
            />
        
            <button type='button' onClick={addSkill}><RiAddCircleFill className='text-2xl ml-2 hover:text-[black] text-[gray]  bg-[white]' /></button>
            
          </div>
          <div className='mb-3'>
                {skillsWhereUse.map((skill, index) => (
                <div key={index} className='flex  p-2'>
                    <button type='button' className="flex items-center " onClick={() => removeSkill(index)}>
            
                    <BsCreditCard2BackFill className='mr-2 mt-1'/> <h1 className='text-xl font-semibold mr-2'>{skill} </h1><MdOutlineIndeterminateCheckBox className='pt-0.5  text-xl font-semibold'/>
         
                    </button>
               </div>
               ))}
            </div>
        </div>
        </div>
          
            
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
            onClick={onSubmit}
            className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
          >
            Save
          </button>
       
        </DialogActions>
        </Dialog>
      </React.Fragment>
    );
};

export default SkillsEdit;