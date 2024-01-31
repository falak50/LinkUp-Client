// import { BsCreditCard2BackFill } from "react-icons/bs";

// import SkillsEdit from "./SkillsEdit";
// import useSkillsinfo from "../../../hooks/useSkillsinfo";
// import SkillsEdit from "../Skills/SkillsEdit";
import MypostAdd from "./MypostAdd";
import useMypost from "../../../hooks/useMypost";
// import SkillsAddModal from "../Skills/SkillsAddModal";
const pathLink='http://localhost:5000/images/'
const Mypost = () => {
    // const  [SkillsInfo]= useSkillsinfo();
    const [MypostsInfo, , , ] = useMypost();
    //console.log("SKILSS",SkillsInfo);
    //console.log("my post data -> ",MypostsInfo)
    return (
      <div className="className='md:w-[100%] bg-[white] rounded-lg relative p-6 top-8 ">
       <div className="flex mb-4">
            <div>
            <h1 className="text-2xl font-semibold">
                Activity
            </h1>
            <span className="text-[#3232b8] font-semibold">963 followers</span>
            
            </div>
             
            <button className="btn  btn-sm bg-white hover:bg-[#ededec] border-none  text-[#6a6a6a] text-2xl ml-auto">
            
            <MypostAdd></MypostAdd>
            {/* <SkillsAddModal></SkillsAddModal> */}
            </button>
             </div>
             <div className="">

             <div className="mappppppp">
           {MypostsInfo?.map((skill, index) => (
    
        <div key={index} className="">
    
         {index!=0?<div className="divider"></div> :<></> } 
               <div className="flex">
               
                <div className="flex">
               
            { skill.imgUrls.lenght !==0 ?    
                <img src={pathLink+skill?.imgUrls[0]} className="w-20" alt="" /> :
                <div className="absolute">sadsad</div>
            }
            

              <span className="p-2 ">
                {skill?.description}
              </span> 
                 
                 </div>
               

                 </div>    
        </div>
      ))}
            
           </div>
                   
             </div>
     
 </div>
    );
};

export default Mypost;