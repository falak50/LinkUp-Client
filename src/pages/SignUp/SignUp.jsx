import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProviders";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/loginPic2.svg"
import Swal from "sweetalert2";

const SignUp = () => {
  const {register,handleSubmit,reset,formState: { errors }} = useForm(); 
    const {createUser,updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = data => {
     console.log("data---->",data);
     console.log('in submit')
     createUser(data.email,data.password)
     .then(results => {
         console.log('in the createUSER')
         const loggedUsed = results.user;
         console.log(loggedUsed);
         console.log('signup->createuser->then->name,url',data.name,data.photoURL)
         console.log('in create user sing in  ')
         updateUserProfile(data.name)
         .then(()=>{
           console.log('in update user');
           const saveUser = {name:data.name,email:data.email}
           fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body: JSON.stringify(saveUser)

           })
           .then(res=>res.json())
           .then(data => {
               if(data.insertedId)
               {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1000
                });
                navigate('/');
                reset();
               }
           })
          
         })
        
     })
    };
 
    return (
        <>
            <Helmet>
            <title>LinkUp | Sing Up</title>
           </Helmet>
           <h1>123aA@</h1>
       <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <img src={loginImg}   alt="" />
       
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name",{ required: true })}  name="name" placeholder="Name" className="input input-bordered"  />
                 {errors.name && <span className="text-red-800">Name field is required</span>}
              </div>
              
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text" {...register("photoURL",{ required: true })}  placeholder="Photo URL" className="input input-bordered"  />
                 {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email",{ required: true })}   name="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-800">Email field is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" {...register("password",{ 
                    required: true,
                    minLength:6,
                    maxLength:20,
                    pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    })}  placeholder="password" className="input input-bordered"  />
                {errors.password?.type === "required" && (
                  <span className="text-orange-900" role="alert">password is required</span>)}
                {errors.password?.type === "minLength" && (
                  <span className="text-orange-900" role="alert">password minLength must be more than 5 characters</span>)}
                {errors.password?.type === "maxLength" && (
                  <span className="text-orange-900" role="alert">Ensure that the password length does not exceed 20 characters.</span>)}
                {errors.password?.type === "pattern" && (
                  <span className="text-orange-900" role="alert">The password must include at least one uppercase letter, one lowercase letter, one special character, and one digit.</span>)}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary" type="submit" value="Sing Up"/>
              </div>
            </form>
            <p><small>Already have an acount <Link to="/login">Login</Link> </small></p>
            {/* <SocialLogin></SocialLogin> */}
          </div>
        </div>
      </div>
       </>
    );
};

export default SignUp;