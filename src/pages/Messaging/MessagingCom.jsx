import { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import axios from 'axios';
import Messaging from './Messaging';
import ChatList from './ChatList';
const MessagingCom = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const owner = JSON.parse(localStorage.getItem('user'));
  const ownEmail =owner.email;
  const [email,setEmail] = useState('NORMAL');
  const [other,setOther] = useState(null)
  const [isSelect,setIsSelect]= useState(false)
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chats/${ownEmail}`);
        setFriends(response.data.friends);
        console.log("Fetched friends:", response.data.friends);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [email]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (item) => {
    setLoading(true);
    console.log('Clicked item:', item);
    setEmail(item.email)
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
