// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProviders";
// import { Navigate, useLocation } from "react-router-dom";
import useUserinfo from "../hooks/useUserinfo";
// import useEduinfo from "../hooks/useEduinfo";
// import useMypost from "../hooks/useMypost";

const PrivateRoute =  ({children}) => {
    //    const {loading}=useContext(AuthContext);
    //    here i am not use own made loader , if need then open it
        // const {user}=useContext(AuthContext);
        // const location = useLocation();
        const [,isLoading] = useUserinfo();

        // const [eduLoading] = useEduinfo();
        // const [MypostsInfo, Mypostsrefetch, MypostsLoading,isFetchingMyposts] = useMypost();
        if(!isLoading){
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
        }else {

            return children;
        }
        // if(user) {
        //     return children;
        // }
        // return <Navigate to="/login" state={{from:location}} replace></Navigate>

};

export default PrivateRoute;