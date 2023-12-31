import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../../providers/AuthProviders';
import { MdOutlineModeEditOutline } from "react-icons/md";
import bkimg from '../../../assets/backgroudPIC.jpg'
import profileimg from '../../../assets/profilePic.jpg'

const Profile = () => {
    const {user} = useContext(AuthContext);
    
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
                    <div className="avatar mx-4  flex">
                    <div className="w-40 rounded-full ring ring-[white] ring-offset-base-100 ring-offset-2">
                        <img src={profileimg} />
                    </div>
                    <button className="btn btn-circle   bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto mt-[-90px]">
                    <MdOutlineModeEditOutline className=''/>
                     </button>
                    </div>
                    <div className='mx-4 flex'>
                    <div>
                    <h1 className='text-3xl font-[600]'>Falak Ahmed Shakib</h1>
                    <p>MERN Stack Web Developer || Competitive Programmer</p>
                     <div className='flex'>
                     <span>Sylhet, Bangladesh .</span> 
                     <div className='mx-4 font-[600] text-[#2779c9]'>
                     <a href="" > Contact info</a>
                     </div>
                    
                     </div>
                     <div className='font-[600] text-[#2779c9]'>
                     <a href="" >500+ connections</a>
                     </div>
                     <div className='mt-3 mx-0'>
                        
                     <button className="btn btn-sm  mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]">Open to</button>
                     <button className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost">Add profile section</button>
                     <button className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#767676]  text-[#767676] hover:text-[#767676] btn-ghost">More</button>
                     </div>

                       

                    </div>
                    
                    <button className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto">
                    <MdOutlineModeEditOutline className=''/>
                     </button>

                    </div>    
                    <div className='flex p-2 mx-4 w-[70%] m-4  bg-opacity-20 bg-[#0a66c2]  rounded-xl  justify-between'>
                           <div className='mx-2'>
                            <h1>Open to work</h1>
                            <p>Software Engineer, React Developer, Javascript Developer and Programmer role</p>
                            <div className='font-[600] text-[#2779c9]'>
                     <a href="" >Show details</a>
                     </div>
                           </div>
                           <div className='m-1'>
                           <button className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ">
                            <MdOutlineModeEditOutline className=''/>
                            </button>
                           </div>
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


