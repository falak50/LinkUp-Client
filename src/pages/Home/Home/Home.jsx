import { Paper } from '@mui/material';
import Modalfrm from '../../../components/Modal/Modalfrm';
import useUserinfo from '../../../hooks/useUserinfo';
import { useState } from 'react';
const suggestedSkills = [
    'AngularJS',
    'Cascading Style Sheets (CSS)',
    'Redux.js',
    'React Native',
    'Front-End Development',
    'Computer Vision',
    'jQuery',
    'Microsoft Azure Machine Learning',
    'Flutter',
    'Express.js'
  ];
const Home = () => {
   const [userInfo] = useUserinfo();
   const [curSkils, setSkill] = useState('no skill');
   
 
   console.log(userInfo);
    return (
       <div>
        
      <div>

            <h1 className='text-3xl'>new try end--------------------------</h1>
        </div>
            <div>
                <Paper></Paper>
                <h1>hey</h1>
                <h1 className='text-4xl'>here userInfo</h1>
                <h1>fisrt name: {userInfo?.first_name} </h1>
                <h1>last name: {userInfo?.last_name} </h1>
                <h2>email {userInfo?.email}</h2>
                <p>user mongoid id :{userInfo?._id}</p>
                <h1 className='text-4xl'>EduInfo</h1>
                
                


            </div>


           <h1>modal from </h1>
           <br /><br />
            <Modalfrm></Modalfrm>
       </div>
    );
};

export default Home;