import { useEffect, useState } from 'react';
import { Avatar, List } from 'antd';
import axios from 'axios';
import Messaging from './Messaging';
import ChatCard from '../../not_includes/ChatCard';
import Chat from '../../not_includes/Chat';

const MessagingPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const owner = JSON.parse(localStorage.getItem('user'));
  const ownEmail =owner.email;
  const [email,setEmail] = useState('NORMAL');
  const [other,setOther] = useState(null)
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
    

    setLoading(false);
  };

  return (
   <>
   <h1 className='text-4xl'>{owner.first_name}</h1>
    <div className="flex pt-10">
      {/* First div with 40% width */}
      <div
        id="scrollableDiv"
        className="w-2/5 h-96 overflow-auto p-4 border border-gray-300"
      >
        <List
          dataSource={friends}
          renderItem={item => (
            <List.Item
              onClick={() => handleClick(item)}
              key={item._id}
            >
              <List.Item.Meta
                avatar={<Avatar src={`http://localhost:5000/images/${item.ProfileImgURL}`} />} // Adjust path if needed
                title={`${item.first_name} ${item.last_name}`}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </div>

      {/* Second div with 60% width */}
      <div className="w-3/5 p-4">
        <h1>{other?.email}</h1>
       {other?.email && 
        //  <Chat></Chat>
        <Messaging other={other}></Messaging>
       } 
      </div>
    </div>
   </>
  );
};

export default MessagingPage;
