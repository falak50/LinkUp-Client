import { useQuery } from '@tanstack/react-query'
import useUserinfo from './useUserinfo';

const useMypost = () => {
    const [userInfo] = useUserinfo();
    
    const { refetch:Mypostsrefetch , data: MypostsInfo = [], isLoading: MypostsLoading ,isFetching: isFetchingMyposts } = useQuery({
        queryKey: ['myPostInfo', userInfo?._id],
        queryFn: async () => {
            // if (!userInfo?._id) {return null;}
            const res = await fetch(`http://localhost:5000/myposts/${userInfo?._id}`);
            return res.json();
        },
    });
    // console.log('ok-------------------',SkillsInfo)
    return [MypostsInfo,Mypostsrefetch, MypostsLoading,isFetchingMyposts];
};

export default useMypost;