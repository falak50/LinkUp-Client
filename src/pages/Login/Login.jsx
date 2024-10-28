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
        const response = await fetch(`http://localhost:5000/users/${user.email}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const userData = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login Successful.",
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.setItem('user', JSON.stringify(userData));
        setOwner(userData);
        navigate(from, { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please check your email and password.",
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
     <h1>123aA@</h1>  
       <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <img src={loginImg} alt="Login" />
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
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
  
            <p className="mx-10 font-serif"><small>Create an account <Link className="text-blue-600" to="/signup">Sing Up</Link> </small></p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
