import AwardsAdd from "./AwardsAdd";

const Awards = () => {

    return (
      <div className="className='md:w-[100%] bg-[white] rounded-lg relative p-6 top-6">
       <div className="flex mb-4">
             <h1 className="text-2xl font-semibold">Skills</h1>
             
            <button className="btn btn-circle bg-white hover:bg-[#ededec] border-none  text-[#6a6a6a] text-3xl ml-auto">
            {/* hre icon  */}
            {/* <SkillsAddModal></SkillsAddModal> */}
            
            {/* <h1>icons</h1> */}
            <AwardsAdd></AwardsAdd>
            </button>
             </div>
             <div className="">
                

             <div className="mappppppp">

              <h1>here add items </h1>  
            
             </div>
                   
             </div>
     
 </div>
    );
};

export default Awards;