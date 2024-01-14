import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import useUserinfo from '../../../hooks/useUserinfo';
import { IoAdd } from 'react-icons/io5';
import { MenuItem, TextField } from '@mui/material';
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
const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i); // Customize the range as needed


const EduAddModal2 = ({ title = 'Add education' }) => {
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef(null);
    const [userInfo] = useUserinfo();
    console.log(userInfo);
    const handleClickOpen = () => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const {register,handleSubmit} = useForm();
    const onSubmit = data => {
        console.log("data---->",data);
       
               setOpen(false);

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
          className="btn btn-circle border-none bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto "
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
          sx={{ width: '41%' }}
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
                <span className="label-text text-[#717171]">Month</span>
              </label>
              <TextField
                select
                {...register('start_month')}
                placeholder="Select a month"
                className="input input-bordered"
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
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#717171]">Starting Year</span>
              </label>
              <TextField
                select
                {...register('education.startingYear')}
                placeholder="Select a starting year"
                className="input input-bordered"
                fullWidth
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </div>
  
             
  
              {/* Activities and Societies Textarea */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#717171]">Activities and societies</span>
                </label>
                <textarea
                  {...register('activitiesAndSocieties')}
                  placeholder="Ex: Alpha Phi Omega Band Volleyball"
                  className="input input-bordered h-20 resize-y"
                />
              </div>
  
              {/* Description Textarea */}
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
  
  export default EduAddModal2;