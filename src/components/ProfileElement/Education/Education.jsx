
// import { IoAdd } from "react-icons/io5";
import EduAddModal from "./EduAddModal";
import edu_Icon from "../../../assets/imgICON/edu_ICON.png"
import useEduinfo from "../../../hooks/useEduinfo";
// import { Divider } from "@mui/material";
import EduEditModal from "./EduEditModal";
// import { useEffect } from "react";

const Education = () => {
    const [EduInfo, ,] = useEduinfo();
  //  console.log(EduInfo);
    
  
    return (
        <div className="className='md:w-[100%] bg-[white] rounded-lg relative p-6">
             <div className="flex mb-4">
             <h1 className="text-2xl font-semibold">Education</h1>
             
            <button className="btn btn-circle bg-white hover:bg-[#ededec] border-none  text-[#6a6a6a] text-3xl ml-auto">
            <EduAddModal></EduAddModal>
            {/* icon ai jaigat bnt bitor a modal call hove */}
            </button>
             </div>
           <div className="mappppppp">
           {EduInfo?.map((edu, index) => (
        <div key={index}>
          <div className="flex items-center">
                <div className="flex">
                 <img src={edu_Icon} className="w-auto h-auto" alt="" />
                 <div className="p-2">
                    <h1 className="font-semibold">{edu.school} </h1>
                     <p>{edu?.degree}, {edu?.fieldOfStudy}</p>
                     <span className="text-[gray]">{edu?.start_year} - {edu?.end_year}
                     </span>
                 </div>
               </div>
           
                <button    
                className="btn btn-circle border-none  bg-white hover:bg-[#ededec] text-[#6a6a6a] text-2xl ml-auto "
                >
                {/* <GrFormEdit className="text-3xl" /> */}
                <EduEditModal 
                edu={edu}
                ></EduEditModal>
                </button>
           </div>
           <div className="divider"></div> 
        </div>
      ))}
            
          
           
           
           </div>
            
        </div>
    );
};

export default Education;