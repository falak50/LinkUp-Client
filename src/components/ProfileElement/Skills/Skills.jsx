import { BsCreditCard2BackFill } from "react-icons/bs";
import SkillsAddModal from "./SkillsAddModal";
import useSkillsinfo from "../../../hooks/useSkillsinfo";
import SkillsEdit from "./SkillsEdit";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
const Skills = () => {
  const { curUser } = useContext(AuthContext);
  const  [SkillsInfo]= useSkillsinfo();
  const { email } = useParams();
    return (
      <div className="className='md:w-[100%] bg-[white] rounded-lg relative p-6 top-3">
       <div className="flex mb-4">
             <h1 className="text-2xl font-semibold">Skills</h1>
             {email == curUser?.email &&
   <button className="btn btn-circle bg-white hover:bg-[#ededec] border-none  text-[#6a6a6a] text-3xl ml-auto">
   {/* hre icon  */}
   <SkillsAddModal></SkillsAddModal>
   </button>
             }
         
             </div>
             <div className="">
                

             <div className="mappppppp">
           {SkillsInfo.map((skill, index) => (
        <div key={index} className="">
         {index!=0?<div className="divider"></div> :<></> } 
               <div className="flex">
               
                <div className="flex-1">
                 <h1 className="text-xl font-semibold mb-2 ">{skill.skill}</h1> 
                {
                  skill?.skillsWhereUse?.map((obj,index)=>{
                   return <>
                    <div key={index} className="flex items-center mb-2">
                 <BsCreditCard2BackFill className="text-2xl mr-2 text-[#442b2b]">
                  
                 </BsCreditCard2BackFill>
                 <h1>{obj}</h1>
               
                 </div>
                   </>
                  })
                }
                 
                 </div>
                 {email == curUser?.email &&
                 <div>
                  {/* <h1>icon</h1> */}
                  <SkillsEdit skill={skill}></SkillsEdit>
                 </div>
}
                 </div>    
        </div>
      ))}
            
           </div>
                   
             </div>
     
 </div>
    );
};

export default Skills;