import { useNavigate } from "react-router-dom";
let urlProfile = "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
let urlbg = "https://miro.medium.com/v2/resize:fit:1400/0*Eww7pEGuh5F3K8fm"
const pathLink='http://localhost:5000/images/'
export default function PersonCard({user}) {
    console.log("cart person ",user);
    const navigate = useNavigate();
    if(user?.ProfileImgURL){
        
        urlProfile=pathLink+user?.ProfileImgUR;
        console.log("in if------------->>>>>>>>>>>  ",urlProfile)
    }
    const handleViewProfile = () => {
        navigate(`/profile/${user?.email}`);
    };

    const handleMessage = () => {
        console.log("click here ")
        // navigate(`/message/${user?.id}`);
    };
  return (
    <div className="card w-[30%] bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
    <div className="relative h-48">
        {/* Background Image */}
        <img src={urlbg} alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-t-xl" />
        
        {/* Profile Picture */}
        <img src={urlProfile} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white absolute -bottom-12 left-4" />
    </div>
    <div className="card-body items-center text-center">
        {/* User Name */}
        <h2 className="card-title text-xl text-black font-bold">{user?.email} </h2>  
        
        {/* Additional Text */}
        <p className="text-sm text-black">{user?.headline}</p>
        
        {/* Action Buttons */}
        <div className="card-actions mt-4">
            <button  onClick={handleViewProfile} className="btn btn-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">View Profile</button>
            <button onClick={handleMessage} className="btn btn-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Message</button>
        </div>
    </div>
</div>


  )
}
