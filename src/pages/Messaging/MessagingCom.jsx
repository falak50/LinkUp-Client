import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Messaging from './Messaging';
import ChatList from './ChatList';
import { AuthContext } from '../../providers/AuthProviders';
import Load from '../../components/Load';
const MessagingCom = () => {
   const {   other,
    setOther , isSelect,
    setIsSelect} = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const owner = JSON.parse(localStorage.getItem('user'));
  const ownEmail =owner?.email;
  const [email,setEmail] = useState('NORMAL');
  const {  curUser } = useContext(AuthContext);
  // const [other,setOther] = useState(null)
  // const [isSelect,setIsSelect]= useState(false)
  
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chats/${curUser?.email}`);
        setFriends(response.data.friends);
        // console.log("Fetched friends:", response.data.friends);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   if(curUser?.email)fetchFriends();
  }, [curUser?.email]);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (item) => {
    setLoading(true);
    console.log('Clicked item:', item);
    setEmail(item?.email)
    setOther(item)
    setIsSelect(true)

    setLoading(false);
  };
 const onclose = () =>{
  console.log('hello')
  setIsSelect(false)
 }
  return (
   <>
   {!isSelect &&
    <ChatList friends={friends} handleClick={handleClick} setIsSelect={setIsSelect}
    owner={owner}
    ></ChatList>
   }
   {

   }
   {/* <ChatList friends={friends} handleClick={handleClick}></ChatList> */}
    <div className="">
       {isSelect && 
        //  <Chat></Chat>
        <Messaging other={other} onclose={onclose}></Messaging>
       } 
      </div>
   </>
  );
};

export default MessagingCom;
