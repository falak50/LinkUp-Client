import { Helmet } from 'react-helmet-async';
import Intro from '../../../components/ProfileElement/Intro/Intro';
import Education from '../../../components/ProfileElement/Education/Education';
import Skills from '../../../components/ProfileElement/Skills/Skills';
import Awards from '../../../components/ProfileElement/Awards/Awards';
import Mypost from '../../../components/ProfileElement/Mypost/Mypost';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useUserinfo from '../../../hooks/useUserinfo';
import Swal from 'sweetalert2';
import Check from '../../../not_includes/Check';
import ChatCard from '../../../not_includes/ChatCard';
import Chat from '../../../not_includes/Chat';
import Messaging from '../../Messaging/Messaging';
import MessagingPage from '../../Messaging/MessagingPage';

const Profile = () => {
  const [owner, setOwner] = useState(JSON.parse(localStorage.getItem('user')));
  const { email } = useParams(); 

  const [relation, setRelation] = useState("");
  const [redender, setRedender] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userInfo] = useUserinfo();

  useEffect(() => {
    if (userInfo?.email && owner?.email) {
      const payload = {
        sentFriendRequestEmail: userInfo.email,
        ownerEmail: owner.email,
      };

      fetch("http://localhost:5000/users/active-button-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          setRelation(res.message);
          setLoading(false); 
        })
        .catch((error) => {
          console.log("res ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [userInfo, owner, redender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative min-h-screen">
      <Helmet>
        <title>LinkUp | Profile</title>
      </Helmet>
      <div className="md:flex">
        <div className="md:flex md:flex-col m-2 gap-4">
          <div>
            <Intro owner={owner} email={email} relation={relation} setRelation={setRelation} setRedender={setRedender} />
            <Education />
            <Skills />
            <Mypost className='' />
            <br />
            <Awards className='mt-4' />
            <br />
            <br />
          </div>
        </div>
        <div className='md:w-[80%]'>
          <div className='bg-[white] rounded-lg p-3'>
            <h1>Profile language</h1>
            {/* <Check /> */}
            <div className="p-4">
              {/* Place other content here if needed */}
            </div>
          </div>
          <div className='bg-[white] rounded-lg p-3'>
            {/* <Messaging /> */}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg shadow-lg p-4">
        <Chat /> {/* Positioned at the bottom right */}
      </div>
    </div>
  );
};

export default Profile;
