import MypostAdd from "./MypostAdd";
import useMypost from "../../../hooks/useMypost";
import Swal from "sweetalert2";
import MypostEdit from "./MypostEdit";
import { useState } from "react";
import Post from "../../../pages/Home/Home/Post";
const pathLink = 'http://localhost:5000/images/'

const Mypost = () => {
    const [MypostsInfo, , , ] = useMypost();
   
    const handleDelete = (postId) => {
        // Implement the delete logic here, e.g., making an API call to delete the post by ID
        console.log(`Deleting post with ID: ${postId}`);
        Swal.fire({
          title: "Are you sure?",
          text: `You want to delete your profile picture?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('CONFIRM DELETE');
            
           fetch(`http://localhost:5000/posts/delete/${postId}`,{
              method:'POST'
           })
           .then(res => res.json())
           .then(data=> {
            console.log(data)
            // refetch();
            //   isFetchingIntro();
            //   setImg('');
            if(data){
              console.log('delete done')
              // refetch();
              // isFetchingIntro();
              // setImg('');
              Swal.fire({
                title: "Deleted!",
                text: `Picture has been deleted.`,
                icon: "success"
              });
            }
            
           })
            
          }else{
            // setOpen(true);
          }
        });
    };

    return (
        <div className="md:w-[100%] bg-white rounded-lg relative p-6 top-8">
            <div className="flex mb-4">
                <div>
                    <h1 className="text-2xl font-semibold">Activity</h1>
                    <span className="text-[#3232b8] font-semibold">963 followers</span>
                </div>
                <button className="btn btn-sm bg-white hover:bg-[#ededec] border-none text-[#6a6a6a] text-2xl ml-auto">
                    <MypostAdd />
                </button>
            </div>
            <div className="">
                <div className="mappppppp">
                    {MypostsInfo?.map((post) => (
                        <Post key={post.id} post={post} />
                        // <div key={index} className="">
                        //     {index !== 0 ? <div className="divider"></div> : null}
                        //     <div className="flex justify-between items-center">
                        //         <div className="flex">
                        //             {post.imgUrls.length !== 0 ? (
                        //                 <img src={pathLink + post?.imgUrls[0]} className="w-20" alt="" />
                        //             ) : (
                        //                 <div className="absolute"></div>
                        //             )}
                        //             <span className="p-2">
                        //                 {post?.description}
                        //             </span>
                        //         </div>
                        //         <div>
                        //         <button
                        //             className="btn btn-sm bg-red-500 hover:bg-red-700 text-white"
                        //             onClick={() => handleDelete(post._id)}
                        //         >
                        //             Delete
                        //         </button>
                        //         {/* <MypostEdit post={post} open={open} setOpen={setOpen}></MypostEdit>  */}
                        //         </div>
                            
                                
                        //     </div>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mypost;
