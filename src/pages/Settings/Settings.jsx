import { useState } from "react";
import { useForm } from "react-hook-form";

const Settings = () => {
    
    const [file, setFile] = useState([]);
    const handleFileChange = (e) => {
        const newFile = e.target.files;
    
        console.log('newFile ',newFile);
    
        setFile(newFile);
    
        console.log(newFile);
        console.log(file);
      };
      const { register, handleSubmit} = useForm({
        defaultValues: {
    
        },
      });
      const onSubmit = (data) => {
        console.log('data---->', data);
        const formData = new FormData();
         
        const newFile = Object.values(file);
    
        newFile.forEach((f) => {
            console.log(f)
          formData.append("file", f);
        });
    
        formData.append("title", data?.title);
        for (const entry of formData.entries()) {
            console.log("oneeeeeeeee")
            console.log(entry[0], entry[1]);
          }
          
        console.log(formData);  

        fetch(`http://localhost:5000/picture1`,{
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
              },
            body: formData
           })
           .then(res=>res.json())
           .then(data => {
             console.log("back end id edu add resuld ",data)
               
           })
  

     };
 
    return (
      <div>

          {/* form start ------------------- */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body mb-0 mt-0 top-[-20px] relative"
          >
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[#717171]">Title *</span>
              </label>
              <input
                type="text"
                {...register('title', { required: true })}
                className="input input-bordered h-9"
                />
            </div>
   {/* input start ----------------- */}
              <input
              className="form-control"
              onChange={handleFileChange}
              type="file"
              multiple

              style={{height:"45px"}}
             
            ></input>
       {/* input start ----------------- */}

            <button
            className="btn bg-[#0a66c2] text-white rounded-full  px-6 py-2 text-xl mr-2"
             >
            Save
            </button>
           


        

          </form>
       {/* from end ------------------------------- */}

    
            
      </div>


  
    );
};

export default Settings;