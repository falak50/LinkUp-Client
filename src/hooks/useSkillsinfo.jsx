import { useQuery } from '@tanstack/react-query'
import useUserinfo from './useUserinfo';
import { useParams } from 'react-router-dom';
const useSkillsinfo = () => {
    const [userInfo] = useUserinfo();
    const { email } = useParams();
    const { refetch: skillsrefetch, data: SkillsInfo = [], isLoading: SkillsLoading ,isFetching: isFetchingskills } = useQuery({
        queryKey: ['skillinfo', userInfo?._id],
        queryFn: async () => {
            // if (!userInfo?._id) {return null;}
            const res = await fetch(`http://localhost:5000/skills/${email}`);
            return res.json();
        },
    });
    console.log('ok-------------------',SkillsInfo)
    return [SkillsInfo, skillsrefetch, SkillsLoading ,isFetchingskills];
};

export default useSkillsinfo;