// import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
// import { AuthContext } from '../../../providers/AuthProviders';
// import { MdOutlineModeEditOutline } from "react-icons/md";
// import bkimg from '../../../assets/backgroudPIC.jpg'
// import profileimg from '../../../assets/profilePic.jpg'
// import Modalfrm from '../../../components/Modal/Modalfrm';
// import { Button } from '@mui/base';
import Intro from '../../../components/ProfileElement/Intro/Intro';
import Education from '../../../components/ProfileElement/Education/Education';
import Skills from '../../../components/ProfileElement/Skills/Skills';;

const Profile = () => {
    // const {user} = useContext(AuthContext);
    
    
    return (
        <div>
            <Helmet>
            <title>LinkUp | prifile</title>
            </Helmet>
            
             <div className='md:flex '>
             <div className='md:flex md:flex-col  m-2 gap-4 '>
             {/* first div main content  relative absolute */}
            <div>
              <Intro></Intro>
              <Education></Education>
              <Skills></Skills>
              {/* <h1>skill come after project and onwer</h1> */}


              </div>
              
                
             
            {/* 2nd  div useless content  */}   
            
                
            </div>

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