import { useQuery } from '@tanstack/react-query'
// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProviders';
import useUserinfo from './useUserinfo';

const useEduinfo = () => {
    // const { user } = useContext(AuthContext);
    const [userInfo] = useUserinfo();
    console.log('eduinfo ->userInfo?._id: ',userInfo?._id)
    const { refetch: edurefetch, data: EduInfo = [], isLoading: eduLoading ,isFetching: isFetchingEdu } = useQuery({
        queryKey: ['user', userInfo?._id],
        queryFn: async () => {
            // if (!userInfo?._id) {return null;}
            const res = await fetch(`http://localhost:5000/education/${userInfo?._id}`);
            return res.json();
        },
    });

    return [EduInfo, edurefetch, eduLoading ,isFetchingEdu];
};

export default useEduinfo;