import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/loginPic2.svg";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { sendEmailVerification } from "firebase/auth"; // Import for email verification
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm(); 
  const { createUser, updateUserProfile, setOwner } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const results = await createUser(data.email, data.password);
      const loggedUser = results.user;

      console.log('firebase loggedUser signup ---->', loggedUser);
      
      // Send email verification
      await sendEmailVerification(loggedUser);
      Swal.fire({
        icon: "info",
        title: `<span class="font-bold text-lg text-gray-800">Please verify your email</span>`,
        html: `
          <p class="text-gray-600">
            A verification link has been sent to your email.
          </p>
          <br />
          <a href="/login" class="text-blue-500 underline hover:text-blue-700">
            Login
          </a>
        `,
        background: "#f0f9ff", // Light blue background
        color: "#333", // Text color
        showConfirmButton: false,
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "mb-2",
          htmlContainer: "text-base",
        },
      });
      
     // here i  
      // Update profile 
      await updateUserProfile(data.name, data.photoURL);
      console.log('Profile updated');

      // Prepare user data to save
      const saveUser = { first_name: data.name, email: data.email };

      // Save user to backend
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveUser),
      });

      const responseData = await response.json();
      console.log("Backend response data:", responseData);

      if (responseData._id) {
        localStorage.setItem('user', JSON.stringify(responseData));
        setOwner(responseData);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `<span class="font-bold text-lg text-gray-800">User created successfully.</span>`,
          html: `<p class="text-gray-600">Verify your email. You can log in once it is verified.</p>`,
          background: "#f0f9ff", // Light blue background
          color: "#333", // Text color
          showConfirmButton: false,
          timer: 5000,
          customClass: {
            popup: "rounded-lg shadow-lg p-6",
            title: "mb-2",
            htmlContainer: "text-base",
          },
        });
        
        
        navigate('/login');
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: `<span class="font-bold text-lg text-gray-800">Email exists on MongoDB server</span>`,
          html: `<p class="text-gray-600">Something went wrong!</p>`,
          footer: `<p class="text-gray-500">This email is already registered on the MongoDB server.</p>`,
          background: "#fef2f2", // Light red background
          color: "#333", // Text color
          showConfirmButton: true,
          confirmButtonText: "Okay",
          confirmButtonColor: "#ef4444", // Tailwind's red-500 color
          customClass: {
            popup: "rounded-lg shadow-lg p-6",
            title: "mb-2",
            htmlContainer: "text-base",
            footer: "text-sm mt-2", // Tailwind classes for footer styling
          },
        });
        
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `<span class="font-bold text-lg text-gray-800">Email exists</span>`,
        html: `<p class="text-gray-600">This email is already registered. Please try logging in or use a different email address.</p>`,
        background: "#fef2f2", // Light red background
        color: "#333", // Text color
        showConfirmButton: true,
        confirmButtonText: "Okay",
        confirmButtonColor: "#ef4444", // Tailwind's red-500 color
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "mb-2",
          htmlContainer: "text-base",
        },
      });
      
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Helmet>
        <title>LinkUp | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-gray-800">Sign Up Now!</h1>
      <img src={loginImg} alt="Sign Up Illustration" className="mt-6 rounded-lg shadow-lg" />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-white rounded-lg border border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.name && <span className="text-red-800">Name field is required</span>}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.email && <span className="text-red-800">Email field is required</span>}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type="password"
            {...register("password", { 
              required: true,
              minLength: 6,
              maxLength: 20 // Optional: Keep this if you want to limit max length
            })}
            placeholder="Enter your password"
            className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.password?.type === "required" && <span className="text-orange-900" role="alert">Password is required</span>}
          {errors.password?.type === "minLength" && <span className="text-orange-900" role="alert">Password must be at least 6 characters</span>}
          {errors.password?.type === "maxLength" && <span className="text-orange-900" role="alert">Password must be no more than 20 characters</span>}
        </div>
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
      <p className="mx-10 font-serif text-center">
        <small>
          Already have an account?{' '}
          <Link className="text-blue-600 hover:underline" to="/login">Login</Link>
        </small>
      </p>
      <SocialLogin />
    </div>
  </div>
</div>

    </>
  );
};

export default SignUp;
