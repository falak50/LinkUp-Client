import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const {googleSignIn,setOwner} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from=location.state?.from?.pathname || "/";

    const handleGoogleSignIn = ()=> {
        googleSignIn()
        .then(result =>{
            const loggedInUser = result.user;
            console.log("firebase user",loggedInUser);
            const saveUser = {first_name: loggedInUser.displayName,email: loggedInUser.email}
            fetch('http://localhost:5000/users',{
                method:'POST',
                headers:{
                  'content-type':'application/json'
                },
                body: JSON.stringify(saveUser)
              })
              .then(res => res.json())
              .then( (res) => {

                // console.log('social log in done res',res)
               if(loggedInUser?.email){
                fetch(`http://localhost:5000/users/${loggedInUser.email}`)
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json(); // Parse JSON response asynchronously
                })
                .then((user) => {
                  // console.log("User data: --- infolol", user); // Handle user data here
                  // Perform additional actions if needed
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Login Successful.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setOwner(user);
                  localStorage.setItem('user', JSON.stringify(user));
                  navigate(from, { replace: true });
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
                  console.error("Error:", error); // Handle any errors
                });
               }
              
                  navigate(from ,{replace:true});
              })
      
        })
    }
    return (
    <div>
        <div className="divider"></div>
        <div className="w-full text-center my-4">
        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
          <FaGoogle></FaGoogle>
        </button>
        </div>
    </div>
    );
};

export default SocialLogin;