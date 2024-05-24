import { useQuery } from '@tanstack/react-query'

const useAllUser = () => {

    const { refetch, data: users = null ,isLoading,isFetching} = useQuery({
        queryKey: ['AllUser'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users`);
            return res.json();
        },
    });

    return [users, refetch, isLoading, isFetching];
}
export default useAllUser;