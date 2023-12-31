import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProviders';
// import { MdOutlineModeEditOutline } from "react-icons/md";
import bkimg from '../../../assets/backgroudPIC.jpg'
import profileimg from '../../../assets/profilePic.jpg'

const Profile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <Helmet>
            <title>LinkUp | prifile</title>
            </Helmet>
            
            <div className='md:flex  m-2 gap-4 '>
             {/* first div main content  relative absolute */}
                <div className='md:w-[72%] bg-[white] rounded-lg relative'>

                        <div className=''>
                        <img className='h-[200px] w-full rounded-t-lg  object-cover' src={bkimg} alt="" />
                        </div>
                                   

                    <div className='mt-[-100px]'>
                    <div className="avatar mx-4  ">
                    <div className="w-40 rounded-full ring ring-[white] ring-offset-base-100 ring-offset-2">
                        <img src={profileimg} />
                    </div>
                    </div>
                    <div className='mx-4'>
                    <h1 className='text-2xl '>Falak Ahmed Shakib</h1>
                    </div>    
                        
                    </div> 

                    
                   
                 </div>
            {/* 2nd  div useless content  */}   
            <div className='md:w-[25%]'>
               <div className='bg-[white]  rounded-lg p-3 '>
                 <h1>Profile language</h1>
                 <span>English</span>
                 <div className="divider"></div> 
                 <h1>Profile languagee</h1>
                 <span>www.linkedin.com/in/falak-ahmed-shakib-a5182823a</span>
                </div>
                
             
                
            </div>
                
            </div>
           

        </div>
    );
};

export default Profile;