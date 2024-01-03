import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";

const Main = () => {
    const location = useLocation();
    //console.log(location);
    const noHeaderFooter = location.pathname.includes("/login") || location.pathname.includes("/signup")  ;
    return (
        <div>
           { noHeaderFooter || <div className="bg-[#ffffff] w-[100%]">
            <NavBar></NavBar>
           </div> }
           <div className="max-w-screen-xl mx-auto bg-[#f4f2ee]">
           <Outlet></Outlet>
           </div>
           {/* {noHeaderFooter ||  <Footer></Footer> } */}
        </div>
    );
};

export default Main;