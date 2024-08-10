import { Outlet, useLocation } from "react-router-dom";
// import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";
import Chat from "../not_includes/Chat";

const Main = () => {
    const location = useLocation();
    //console.log(location);
    const noHeaderFooter = location.pathname.includes("/login") || location.pathname.includes("/signup")  ;
    return (
        <div>
           { noHeaderFooter || <div className="bg-[#ffffff] w-[100%] min-h-full">
            <NavBar ></NavBar>
           </div> }
           <div className="max-w-screen-xl mx-auto bg-[#f4f2ee] min-h-screen ">
           <div className="flex w-[100%]">
            <div className="w-[77%]">
            <Outlet></Outlet> 
            </div>
            <div className="w-[22%]">
            <div className="fixed bottom-0 right-0 m-4 bg-white rounded-lg shadow-lg p-4">
        <Chat /> {/* Positioned at the bottom right */}
      </div>
            </div>

           </div>
           </div>
           {/* {noHeaderFooter ||  <Footer></Footer> } */}
          
        </div>
    );
};

export default Main;