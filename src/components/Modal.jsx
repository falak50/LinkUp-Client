import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { IoMdClose } from "react-icons/io";
const Modal = ({ title = 'title here' }) => {
    const [open, setOpen] = React.useState(false);
    const formRef = React.useRef(null);
    const handleClickOpen = () => () => {
      setOpen(true);
    };
  
    const handleClose = ()=>() => {
      setOpen(false);
    };

    const handleExternalSubmit = () => {
        // Trigger form submission from outside the form
        if (formRef.current) {
        
          formRef.current.submit();
        }
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        formRef.current=null
        // Your form submission logic here
        console.log('Form submitted!');
      };
    
    return (
        <React.Fragment>             
        <button onClick={handleClickOpen()} className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto mt-[-90px]">
                    <MdOutlineModeEditOutline className=''/>
                    <h1></h1>
                    {/* <Modal></Modal> */}
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
           
              <form href='' onSubmit={handleSubmit} method='GET' className="card-body mx-0" ref={formRef}
              >
               
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                
                
                
                {/* <div className="form-control mt-6">
                  <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                </div> */}
              </form>
          
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={handleExternalSubmit}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
};

export default Modal;