import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const useUserinfo = () => {
    const { user } = useContext(AuthContext);

    const { refetch, data: userInfo = null ,isLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user?.email) {return null;}
            const res = await fetch(`http://localhost:5000/users/${user.email}`);
            return res.json();
        },
    });

    return [userInfo, refetch, isLoading];
}
export default useUserinfo;