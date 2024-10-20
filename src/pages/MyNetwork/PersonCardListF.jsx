import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../../providers/AuthProviders';
import Swal from "sweetalert2";
import { Button } from "antd";

const urlProfileDefault = "https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg";
const pathLink = 'http://localhost:5000/images/';

export default function PersonCardListF({ userCard }) {
    const { owner } = useContext(AuthContext);
    const navigate = useNavigate();

    // Determine Profile Image URL
    const urlProfile = userCard?.ProfileImgURL ? `${pathLink}${userCard.ProfileImgURL}` : urlProfileDefault;

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
        <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mb-4 flex items-center p-4">
            {/* Profile Picture */}
            <img src={urlProfile} alt="Profile" className="w-16 h-16 rounded-full border-2 border-white mr-4" />

            {/* User Details */}
            <div className="flex-1">
                <h6 className="text-lg font-bold text-gray-900 dark:text-gray-100">{userCard?.first_name} {userCard?.last_name}</h6>
                <p className="text-sm text-gray-600 dark:text-gray-400">{userCard?.headline}</p>
                
                {/* Actions */}
                <div className="mt-2 flex gap-2">
                    <Button onClick={handleAddFriends} className="btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2]">
                        Add Friend
                    </Button>
                    <Button onClick={handleViewProfile} className="btn-outline hover:bg-opacity-20 hover:bg-[#767676] text-[#767676] hover:text-[#767676]">
                        View Profile
                    </Button>
                </div>
            </div>
        </div>
    );
}
