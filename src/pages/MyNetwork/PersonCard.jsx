import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../providers/AuthProviders';
import Swal from "sweetalert2";
let urlProfile = "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
let urlbg = "https://miro.medium.com/v2/resize:fit:1400/0*Eww7pEGuh5F3K8fm"
const pathLink='http://localhost:5000/images/'
export default function PersonCard({userCard}) {
    console.log("cart person ",userCard);
      const { owner } = useContext(AuthContext);
      
      console.log('owner',owner)
    const navigate = useNavigate();
    if(userCard?.ProfileImgURL){
        
        urlProfile=pathLink+userCard?.ProfileImgUR;
        console.log("in if------------->>>>>>>>>>>  ",urlProfile)
    }
    const handleViewProfile = () => {
        navigate(`/profile/${userCard?.email}`);
    };

    const handleAddFriends = () => {
        if(!owner)alert('owner info is null');

        console.log("click here user",userCard.email)
        console.log('ownerUser',owner.email)

        const payload = {
            sentFriendRequestEmail : userCard.email,
            ownerEmail :owner.email
        }
        console.log(payload);

        fetch('http://localhost:5000/users/friendRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then(res => res.json())
          .then(res => {
            console.log('social log in done res', res);
 
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="#">Why do I have this issue?</a>',
            });
            console.error('Error:', error); // Handle any errors
          });
        
        
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
        <h2 className="card-title text-xl text-black font-bold">{userCard?.email} </h2>  
        
        {/* Additional Text */}
        <p className="text-sm text-black">{userCard?.headline}</p>
        
        {/* Action Buttons */}
        <div className="card-actions mt-4 flex space-x-4">
            <button 
                onClick={handleViewProfile} 
                className="btn btn-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                View
            </button>
            <button 
                onClick={handleAddFriends} 
                className="btn btn-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Add friend
            </button>
        </div>
    </div>
</div>


  )
}
