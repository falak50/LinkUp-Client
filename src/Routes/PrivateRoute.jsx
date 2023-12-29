import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute =  ({children}) => {
   
        const {user,loading}=useContext(AuthContext);
        const location = useLocation();
        if(loading){
           return <>
           <progress className="progress w-56"></progress> 
                  <div className="flex gap-4 items-center">
                    <div className="skeleton w-16 h-16 rounded-full shrink-0">
                    </div>
                    <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                    </div>
                     </div>
                 <div className="skeleton h-32 w-full"></div>
           </>
        }
        if(user) {
            return children;
        }
        return <Navigate to="/login" state={{from:location}} replace></Navigate>

};

export default PrivateRoute;