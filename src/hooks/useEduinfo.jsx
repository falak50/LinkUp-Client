import { useQuery } from '@tanstack/react-query'
// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProviders';
import useUserinfo from './useUserinfo';
import { useParams } from 'react-router-dom';

const useEduinfo = () => {
    // const { user } = useContext(AuthContext);
    const [userInfo] = useUserinfo();
    const { email } = useParams();
   // console.log('email ----->',email)
   // console.log('eduinfo ->userInfo?._id: ',userInfo?._id)
   //console.log('user info',userInfo)
    const { refetch: edurefetch, data: EduInfo = [], isLoading: eduLoading ,isFetching: isFetchingEdu } = useQuery({
        queryKey: ['edu', email],
        queryFn: async () => {
            // if (!userInfo?._id) {return null;}
            const res = await fetch(`http://localhost:5000/education/${email}`);
            return res.json();
        },
        // enabled : !!userInfo?.id
    });
    
  // console.log(EduInfo)
    return [EduInfo, edurefetch, eduLoading ,isFetchingEdu];
};

export default useEduinfo;