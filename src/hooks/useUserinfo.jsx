import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';
import { useParams } from 'react-router-dom';

const useUserinfo = () => {
    const { user } = useContext(AuthContext);
    const params = useParams();
    console.log('intro hooks  params ',params);
    const { refetch, data: userInfo = null ,isLoading,isFetching: isFetchingIntro } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user?.email) {return null;}
            const res = await fetch(`http://localhost:5000/users/${user.email}`);
            return res.json();
        },
    });

    return [userInfo, refetch, isLoading, isFetchingIntro];
}
export default useUserinfo;