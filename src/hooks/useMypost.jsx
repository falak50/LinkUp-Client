import { useQuery } from '@tanstack/react-query'
// import useUserinfo from './useUserinfo';
import { useParams } from 'react-router-dom';

const useMypost = () => {
    // const [userInfo] = useUserinfo();
    const { email } = useParams();
    const { refetch:Mypostsrefetch , data: MypostsInfo = [], isLoading: MypostsLoading ,isFetching: isFetchingMyposts } = useQuery({
        queryKey: ['posts', email],
        queryFn: async () => {
            // if (!userInfo?._id) {return null;}
            const res = await fetch(`http://localhost:5000/posts/${email}`);
            return res.json();
        },
    });
    // console.log('ok-------------------',SkillsInfo)
    return [MypostsInfo,Mypostsrefetch, MypostsLoading,isFetchingMyposts];
};

export default useMypost;