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
import Skills from '../../../components/ProfileElement/Skills/Skills';import Awards from '../../../components/ProfileElement/Awards/Awards';
import Mypost from '../../../components/ProfileElement/Mypost/Mypost';
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import useUserinfo from '../../../hooks/useUserinfo';
// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';


const Profile = () => {
  
    // const {user} = useContext(AuthContext);
    // const [userInfo] = useUserinfo();
    const params = useParams();
    console.log('profile  params ',params);
    // const [isVistor,setIsVistor] = useState(false);
    // console.log('from prfile prams id ->>> ',params.id,typeof params.id) ;
    // console.log("User Info id ->> ",userInfo?._id,typeof userInfo?._id);
    // console.log("userInfoo ->>",userInfo);

    // if(typeof(params.id)==="undefined"){
    //     params.id=userInfo?._id
    // }
    // console.log('from prfile prams id ->>> ',params.id,typeof params.id) ;

  
    //   console.log('kmooon aso kutay useEffect');
      // if(userInfo?._id!==params?.id)setIsVistor(true); infinite loop.
    //   const {  data:curdata , isLoading  } = useQuery({
    //     queryKey: ['CurrentInfo', userInfo?._id],
    //     queryFn: async () => {
    //         // if (!userInfo?._id) {return null;}
    //         const res = await fetch(`http://localhost:5000/profile/${params?.id}`);
    //         return res.json();
    //     },
    // });
    //  console.log("params data - - - >> ",curdata,isLoading )
    // console.log("isVistor ->>> ",isVistor)
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
               {/* in intro first lo ading edit info data not loading  check late*/}
              <Education></Education>
              <Skills></Skills>
              <Mypost></Mypost>
              <Awards></Awards>
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