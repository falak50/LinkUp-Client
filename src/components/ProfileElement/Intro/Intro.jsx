import { MdOutlineModeEditOutline } from "react-icons/md";
import bkimg from "../../../assets/bkImg.png";
import dpImg from "../../../assets/dpImg.jpg";
import IntroModal from "./IntroModal";
import useUserinfo from "../../../hooks/useUserinfo";
import { useContext, useState } from "react";
import ProfileImg from "./ProfileImg";
import Swal from "sweetalert2";
import BackgroudImg from "./BackgroudImg";
import { AuthContext } from "../../../providers/AuthProviders";
import { Modal } from "antd";
const pathLink = "http://localhost:5000/images/";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram ,FaEnvelope  } from 'react-icons/fa';
const Intro = ({ owner, email, relation, setRelation }) => {
  const { curUser } = useContext(AuthContext);
  const [userInfo] = useUserinfo();
  // console.log("cover  userInfo--------------->", userInfo);
  // console.log("relation ", relation);
  const [open, setOpen] = useState(false);
  const [openbg,setOpenbg] = useState(false);

  const getRelation = () => {
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
        console.log("res data", res);
        setRelation(res.message);
        // setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log("res ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); // Handle any errors
        // setLoading(false); // Set loading to false even if there's an error
      });
  };

  const profileImgModal = () => {
    // console.log("click");
    setOpen(true);
  };

  const handleAddFriends = () => {
    if (!owner) alert("owner info is null");

    console.log("click here user", userInfo.email);
    console.log("ownerUser", owner.email);

    const payload = {
      sentFriendRequestEmail: userInfo.email,
      ownerEmail: owner.email,
    };
    console.log(payload);
    // return

    fetch("http://localhost:5000/users/friendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        getRelation();
        console.log("social log in done res", res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); // Handle any errors
      });
  };
  const handleCancelfriendRequest = () => {
    if (!owner) alert("owner info is null");

    console.log("click here user", userInfo.email);
    console.log("ownerUser", owner.email);

    const payload = {
      sentFriendRequestEmail: userInfo.email,
      ownerEmail: owner.email,
    };
    console.log(payload);
    // return

    fetch("http://localhost:5000/users/cancelFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("social log in done res", res);
        getRelation();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); // Handle any errors
      });
  };
  const handleAcceptFriendRequest = () => {
    if (!owner) alert("owner info is null");

    console.log("click here user", userInfo.email);
    console.log("ownerUser", owner.email);

    const payload = {
      sentFriendRequestEmail: userInfo.email,
      ownerEmail: owner.email,
    };
    console.log(payload);
    // return
    fetch("http://localhost:5000/users/acceptFriendRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("social log in done res", res);
        getRelation();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); // Handle any errors
      });
  };
  const handleRemovefriend = () => {
    if (!owner) alert("owner info is null");

    console.log("click here user", userInfo.email);
    console.log("ownerUser", owner.email);

    const payload = {
      sentFriendRequestEmail: userInfo.email,
      ownerEmail: owner.email,
    };
    console.log("payload ", payload);
    // return
    fetch("http://localhost:5000/users/removefriend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("social log in done res", res);
        getRelation();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error("Error:", error); // Handle any errors
      });
  };
  console.log('cover ',userInfo?.CoverImgURL)
  console.log('cover ',userInfo?.CoverImgURL)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="md:w-[100%] bg-[white] rounded-lg relative pb-4">
       <Modal title="Contact info" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <div className="flex items-center space-x-2 mb-4">
        <FaEnvelope className="text-gray-600 text-lg" />
        <p className="text-lg font-medium">Email: {email}</p>
      </div>
      
      <div className="flex space-x-4 mt-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 text-2xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-blue-400 text-2xl" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-700 text-2xl" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-600 text-2xl" />
        </a>
      </div>
      </Modal>
      <ProfileImg open={open} setOpen={setOpen}></ProfileImg>
      <BackgroudImg open={openbg} setOpen={setOpenbg}></BackgroudImg>
      <div className="">
  
           <img
            className="h-[200px] w-full rounded-t-lg  object-cover"
              src={pathLink + userInfo?.CoverImgURL || bkimg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = bkimg;
              }}
              alt="Profile"
            />
      </div>

      <div className="mt-[-100px] ">
        <div className="avatar mx-4  flex ">
          <div
            className="w-40 rounded-full ring ring-[white] ring-offset-base-100 ring-offset-2"
            onClick={profileImgModal}
          >
            <img
              src={pathLink + userInfo?.ProfileImgURL || dpImg}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = dpImg;
              }}
              alt="Profile"
            />
          </div>
          <button 
          onClick={()=>setOpenbg(true)}
          className="btn btn-circle   bg-white text-[#6a6a6a] text-2xl ml-auto mt-[-90px]">
            <MdOutlineModeEditOutline className="" />
            {/* icon ar jaigait modal btn ar bitor */}
          </button>
        </div>
        <div className="mx-4 flex">
          <div>
            <h1 className="text-3xl font-[600]">
              {userInfo?.first_name} {userInfo?.last_name}
              {userInfo?.additional_name && (
                <span className="badge">{userInfo?.additional_name}</span>
              )}
            </h1>
            {/* <p>MERN Stack Web Developer || Competitive Programmer</p> */}
            <div className=" w-[60%]">
              <p>{userInfo?.headline}</p>
            </div>

            <div className="flex">
              <span>
                {userInfo?.city} {userInfo?.country}
              </span>
              <div onClick={showModal} className="mx-4 font-[600] text-[#2779c9]">
                <p href=""> Contact info</p>
              </div>
            </div>
            <div className="font-[600] text-[#2779c9]">
              {/* <a href="">{userInfo?.friend} connections</a> */}
            </div>
            <div className="mt-3 mx-0">
              {email !== owner?.email && (
                <>
                  {relation === "add_friend" && (
                    <button
                      className="btn btn-sm mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]"
                      onClick={() => handleAddFriends()}
                    >
                      Add Friend
                    </button>
                  )}

                  {relation === "unfriend" && (
                    <button
                      className="btn btn-sm mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]"
                      onClick={() => handleRemovefriend()}
                    >
                      Unfriend
                    </button>
                  )}

                  {relation === "cancel_request" && (
                    <button
                      className="btn btn-sm mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]"
                      onClick={() => handleCancelfriendRequest()}
                    >
                      Cancel Request
                    </button>
                  )}

                  {relation === "accept_&_cancel_request" && (
                    <>
                      <button
                        className="btn btn-sm mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]"
                        onClick={() => handleAcceptFriendRequest()}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm mx-0 rounded-[50px] bg-[#0a66c2] hover:bg-[#004182] text-[white]"
                        onClick={() => handleCancelfriendRequest()}
                      >
                        Cancel Request
                      </button>
                    </>
                  )}
                </>
              )}
              {/* <button className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#0a66c2] text-[#0a66c2] hover:text-[#0a66c2] btn-ghost">
                Add profile section
              </button>
              <button className="btn btn-sm mx-2 rounded-[50px] btn-outline hover:bg-opacity-20 hover:bg-[#767676]  text-[#767676] hover:text-[#767676] btn-ghost">
                More
              </button> */}
            </div>
          </div>
{userInfo?.email == curUser?.email &&
  <button className="ml-auto">
            <IntroModal title="Edit intro"></IntroModal>
          </button>
}
     
          
          {/* <h1>here model end of intr</h1> */}
        </div>
        {/* <div className="flex p-2 mx-4 w-[70%] m-4  bg-opacity-20 bg-[#0a66c2]  rounded-xl  justify-between">
          <div className="mx-2">
            <h1>Open to work</h1>
            <p>
              Software Engineer, React Developer, Javascript Developer and
              Programmer role
            </p>
            <div className="font-[600] text-[#2779c9]">
              <a href="">Show details</a>
            </div>
          </div>
          <div className="m-1">
            <button className="btn btn-circle  bg-[#ededec] text-[#6a6a6a] text-2xl ">
              <MdOutlineModeEditOutline className="" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Intro;
