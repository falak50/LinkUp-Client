/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/loginPic.svg";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const { signIn, setOwner } = useContext(AuthContext);
  const [loading, setLoading] = useState(false); // loading state
  
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // start loading
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;

    

      console.log('firebase user email singin',user)
      if (user?.email) {
      
        // without varifi then comment this !user?.emailVerified
        if (!user?.emailVerified) {
          Swal.fire({
            icon: "info",
            title: `<span class="font-bold text-lg text-gray-800">You need to verify your email first.</span>`,
            html: `<p class="text-gray-600">We've sent a verification link to your email. Please check your inbox!</p>`,
            background: "#f0f9ff", // Soft background color
            color: "#333", // Text color
            showConfirmButton: true,
            confirmButtonText: "Got it!",
            confirmButtonColor: "#3b82f6", // Tailwind's blue-500 color
            customClass: {
              popup: "rounded-lg shadow-lg p-6",
              title: "mb-2",
              htmlContainer: "text-base",
            },
          });
          setLoading(false);
          return;
        }
        

        const response = await fetch(`http://localhost:5000/users/${user.email}`);
        // console.log('response ok',response.ok)
        if (!response.ok) throw new Error("Network response was not ok");
        console.log('response',response)
        const userData = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login Successful.",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          customClass: {
            title: 'swal-title-custom', // Custom title class
            popup: 'swal-popup-custom', // Custom popup class
          },
          timerProgressBar: true,
        });

        localStorage.setItem('user', JSON.stringify(userData));
        setOwner(userData);
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `<span class="font-bold text-lg text-gray-800">Invalid credentials.</span>`,
        html: `<p class="text-gray-600">Something went wrong! Please check your email and password.</p>`,
        background: "#fef2f2", // Light red background
        color: "#333", // Text color
        showConfirmButton: true,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444", // Tailwind's red-500 color
        customClass: {
          popup: "rounded-lg shadow-lg p-6",
          title: "mb-2",
          htmlContainer: "text-base",
        },
      });
      
      console.error("Error: ", error);
    }

    setLoading(false); // stop loading
  };

  return (
    <>
    <Helmet>
      <title>LinkUp | Login</title>
    </Helmet>
    <div className="hero min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800">Login now!</h1>
          <img src={loginImg} alt="Login" className="mt-6 rounded-lg shadow-lg" />
        </div>
        <div className="card md:w-1/2 max-w-sm shadow-2xl bg-white rounded-lg border border-gray-200">
          <form onSubmit={handleLogin} className="card-body p-6">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
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
                  "Login"
                )}
              </button>
            </div>
          </form>
  
          <p className="mx-10 font-serif text-center">
            <small>
              Don't have an account?{' '}
              <Link className="text-blue-600 hover:underline" to="/signup">Sign Up</Link>
            </small>
          </p>
          <SocialLogin />
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Login;
