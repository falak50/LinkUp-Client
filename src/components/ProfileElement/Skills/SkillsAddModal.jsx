import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { IoAdd } from 'react-icons/io5';
import { RiAddCircleFill } from 'react-icons/ri';
import useUserinfo from '../../../hooks/useUserinfo';
import { MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { toast } from 'react-toastify';
import useSkillsinfo from '../../../hooks/useSkillsinfo';


// import { RiAddCircleFill } from "react-icons/ri";
// import useUserinfo from '../../../hooks/useUserinfo';
const suggestedSkills = [
    'AngularJS',
    'Cascading Style Sheets (CSS)',
    'Redux.js',
    'React Native',
    'Front-End Development',
    'Computer Vision',
    'jQuery',
    'Machine Learning',
    'Flutter',
    'Express.js'
  ];
const SkillsAddModal = ({ title = 'Add Skills' }) => {
   const  [,skillsrefetch,,]= useSkillsinfo();
    const [curSkill, setSkill] = useState('');
    const [userInfo,] = useUserinfo();

     //   here skill function start -------------------------
  const [skillsWhereUse, setSkillsWhereUse] = useState([]);
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
  const [open, setOpen] = React.useState(false);
  const [SuggestionOpen, setSuggestionOpen] = useState(true);
  const formRef = React.useRef(null);

  const handleClickOpen = () => () => {
    setOpen(true);
    setSuggestionOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSuggestionOpen(true);
  };
  const handleCloseSuggestion = () => {
    setSuggestionOpen(false);
  };

  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
     skill: curSkill
    },
  });
  const onSubmit = (data) => {
    // console.log('data---->', data);
    const uid=userInfo._id
    const email=userInfo.email
    const totalData = { uid , email , ...data , skillsWhereUse };
    console.log(totalData);
    console.log('tatolData --> ',totalData)
    fetch(`http://localhost:5000/skills`,{
        method:'POST', 
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(totalData)

       })
       .then(res=>res.json())
       .then(data => {
        // edurefetch();
         console.log("back end id edu add resuld ",data)
                        
            toast.success("Add Skill successfully", {
                autoClose: 1200
              })
           /// here add 
        //    edurefetch();
        //    refetch();  
            skillsrefetch();
            reset();
            setSkillsWhereUse([]);
           setOpen(false);
           
       })
    setOpen(false);
    // Add your logic to handle the form data
  };
  const setSkillFun = (str) =>{
    setSkill(str);
    console.log(str);
    reset({
        skill: str
      });
    
  }

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
            { 
          SuggestionOpen
          ? (<div className='bg-[#e2e9f3]  mt-2 rounded-lg p-2 '>
            <div className='flex justify-between mt-2 mb-2'>
              <h2 className="text-xl font-semibold ml-6 mt-3 ">Suggested Skills</h2>
              <button
              type='button'
                onClick={handleCloseSuggestion}
                className="btn btn-circle border-none bg-white hover:bg-[#e2e9f3] text-[#6a6a6a] text-xl btn-sm mr-1"
               >
                <IoMdClose />
              </button>
            </div>
           
            <div className="flex  flex-wrap   pl-6 ">
            {suggestedSkills.map((skill, index) => (
                <p  key={index} className="mb-2 ml-auto ">
                <button type='button' onClick={() => { setSkillFun(skill) }} className="btn btn-outline hover:bg-[#9ba4ae] hover:text-[black] ">{skill}</button>
                </p>
            ))}
            </div>
       
    
        </div>
        )
          : <></>

        }

                   
              
          {/* THIS IS NOT PARTH OR FORM  */}
            
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
             {/* THIS IS NOT PARTH OR FORM  */}



        

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

export default SkillsAddModal;