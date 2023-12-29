import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// import Swal from 'sweetalert2';
import loginImg from "../../assets/loginPic.svg"
import { AuthContext } from '../../providers/AuthProviders';
import Swal from 'sweetalert2';
const Login = () => {
    // const [disabled,setDisabled] = useState(true);//todo add disabled 
    // const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from  =location.state?.from?.pathname || "/";
    
    const {signIn} = useContext(AuthContext)
    // useEffect(()=>{
    //   loadCaptchaEnginge(6); 
    // },[])
  
    const handleLogoin = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email,password);
      signIn(email,password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        });
        navigate(from ,{replace:true});
      })
    }
    // const handleValidateCaptcha = (e) => {
    //  const user_captcha_value = e.target.value;
      // console.log(value);
    //   if (validateCaptcha(user_captcha_value)==true) {
    //     //alert('Captcha Matched');
    //     setDisabled(false);
    //   }else {
    //     setDisabled(true);
        //alert('Captcha Does Not Match');
  //  }
    // }
return(
          <>
          <Helmet>
              <title>LinkUp | Login</title>
          </Helmet>
          <h1>123aA@</h1>
          <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
               
              <h1 className="text-5xl font-bold">Login now!</h1>
              {/* <p className="py-6"></p> */}
              <img src={loginImg}   alt="" />
                {/* <h1>here is image</h1> */}
            </div>
            <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogoin} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                
                {/* <div className="form-control">
                  <label className="label">
                  <LoadCanvasTemplate />
                  </label>
                  <input onBlur={handleValidateCaptcha} type="text"  name="captcha" placeholder="type the capcha above" className="input input-bordered" required />
             
                </div> */}
                <div className="form-control mt-6">
  
                  {/*realone todo:remove comment for captch 
                  <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" /> */}
                  <input disabled={false} className="btn btn-primary" type="submit" value="Login" />
                </div>
              </form>
              <p><small>New Here? <Link to="/signup">Create an acount</Link> </small></p>
             
             {/* social lonin add here  */}
             {/* <SocialLogin></SocialLogin> */}
  
            </div>
          </div>
        </div>
          </>
      );
  
};

export default Login;