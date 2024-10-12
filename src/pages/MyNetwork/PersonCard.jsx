import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../providers/AuthProviders';
import Swal from "sweetalert2";
import { Button, Flex } from "antd";
import Profile from './../Profile/Profile/Profile';

const urlProfileDefault = "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg";
const urlBg = "https://miro.medium.com/v2/resize:fit:1400/0*Eww7pEGuh5F3K8fm";
const pathLink = 'http://localhost:5000/images/';
import bkimg from "../../assets/bkImg.png";
import dpImg from "../../assets/dpImg.jpg";
export default function PersonCard({ userCard }) {
    console.log('userCard ',userCard)
    const { owner } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/profile/${userCard?.email}`);
    };

    const handleAddFriends = () => {
        if (!owner) {
            alert('Owner info is null');
            return;
        }

        const payload = {
            sentFriendRequestEmail: userCard.email,
            ownerEmail: owner.email,
        };

        fetch('http://localhost:5000/users/friendRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(res => {
                console.log('Friend request sent:', res);
                Swal.fire({
                    icon: 'success',
                    title: 'Friend request sent!',
                    text: 'Your friend request has been successfully sent.',
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="#">Why do I have this issue?</a>',
                });
                console.error('Error:', error);
            });
    };
  
    return (
        <div className="card w-[250px] bg-base-100 shadow-lg hover:shadow-xl transition-shadow rounded-lg p-2"> {/* Reduced padding */}
            <div className="relative h-20">
                {/* Background Image */}
                <img 
                   src={pathLink + userCard?.CoverImgURL || bkimg}
                   onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = bkimg;
                   }}
                alt="Background" className="absolute inset-0 w-full h-full object-cover rounded-t-lg" />
                
                {/* Profile Picture */}
                <img 
                 src={pathLink + userCard?.ProfileImgURL || dpImg}
                 onError={(e) => {
                   e.target.onerror = null;
                   e.target.src = dpImg;
                 }}
                alt="Profile" className="w-16 h-16 rounded-full border-2 border-white absolute -bottom-8 left-4" />
            </div>
            <div className="card-body text-center mt-4"> {/* Reduced margin-top */}
                {/* User Name */}
                <h6 className="text-lg text-black font-bold">{userCard?.first_name} {userCard?.last_name}</h6>
                
                {/* Additional Text */}
                <p className="text-xs text-black">{userCard?.headline}</p>
                <button onClick={handleAddFriends}   className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost">
                Add Friend
              </button>
              <button onClick={handleViewProfile}  className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#767676]  text-[#767676] hover:text-[#767676] btn-ghost">
                View Profile
              </button>
           
            </div>
        </div>
    );
}
