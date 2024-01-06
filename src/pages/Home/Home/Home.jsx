
// import Modal from '../../../components/Modal';
import Modalfrm from '../../../components/Modal/Modalfrm';
import useUserinfo from '../../../hooks/useUserinfo';

const Home = () => {
   const [userInfo, refetch] = useUserinfo();
   console.log(userInfo);
    return (
       <div>
            <div>
                <h1>hey</h1>
                <h1>here login user info</h1>
                <h1>fisrt name: {userInfo?.firs_tname} </h1>
                <h1>last name: {userInfo?.last_name} </h1>
                <h2>email {userInfo?.email}</h2>
                <p>user mongoid id :{userInfo?._id}</p>

            </div>


           <h1>modal from </h1>
           <br /><br />
            <Modalfrm></Modalfrm>
       </div>
    );
};

export default Home;