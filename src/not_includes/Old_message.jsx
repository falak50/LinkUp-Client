import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const socket = io.connect("http://localhost:5000");

function Messaging({ other, onClose }) {
  const owner = JSON.parse(localStorage.getItem("user"));
  console.log('other first', other);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  // Automatically join the room when the component mounts and fetch old messages
  useEffect(() => {
    console.log('123',other,'owner' ,owner)
    if (owner && owner.email) {
      socket.emit("join_room", { userId: owner._id });
      console.log('1234',other,'owner' ,owner)
      // Fetch previous messages
      console.log('inside other',other)
      if (other?._id) {
        console.log('12345',other,'owner' ,owner)
        const chatId = [owner._id, other._id].sort().join('_');
        console.log('chatId 12345',chatId)
        axios.get(`http://localhost:5000/chats/messages/${chatId}`)
          .then(response => {
            console.log('response 123456', response);
            const formattedMessages = response.data.map(msg => ({
              ...msg,
              sender: msg.senderId === owner._id ? "You" : other.email,
              isOwnMessage: msg.senderId === owner._id,
              timestamp: new Date(msg.timestamp).toLocaleTimeString()
            }));
            setMessages(formattedMessages);
          })
          .catch(error => {
            console.error('Error fetching messages:', error);
          });
      }
    }
  }, [other]);

  // Function to send a message
  const sendMessage = () => {
    if (!other?._id) {
      alert("Please select another user");
      return;
    }
    if (message.trim()) {
      const otherUserId = other._id;
      const senderId = owner._id;
      const newMessage = {
        otherUserId,
        message,
        senderId,
        sender: "You",
        isOwnMessage: true,
        timestamp: new Date().toLocaleTimeString()
      };

      socket.emit("send_message", newMessage);

      // Update local state with the new message
      setMessages([...messages, newMessage]);
      setMessage(""); // Clear the input field
    }
  };

  // Function to handle receiving a message
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log('data ', data);
      console.log('other ', other);
      if (data.senderId === other._id) {
        setMessages((prevMessages) => [...prevMessages, { ...data, sender: other.email, isOwnMessage: false, timestamp: new Date(data.timestamp).toLocaleTimeString() }]);
      }
    });

    // Clean up the event listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [other._id]);

  // Auto-scroll to the bottom when a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="">
      <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-md ">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-2"
              src={`http://localhost:5000/images/${other?.ProfileImgURL}`}
            />
            <h1 className="text-xl font-bold">{other?.email}</h1>
          </div>
          <button onClick={onClose} className="text-red-500">
            <IoMdClose className="text-xl" />
          </button>
        </div>
        <div ref={chatContainerRef} className="mb-4 h-80 overflow-y-auto border border-gray-300 rounded-lg p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.isOwnMessage ? 'chat-end' : 'chat-start'} mb-4`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src={msg.isOwnMessage ? `http://localhost:5000/images/${owner?.ProfileImgURL}` : `http://localhost:5000/images/${other?.ProfileImgURL}`}
                  />
                </div>
              </div>
              <div className="chat-header">
                {msg.sender}
                <time className="text-xs opacity-50">{msg.timestamp}</time>
              </div>
              <div className={`chat-bubble ${msg.isOwnMessage ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>{msg.message}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-300 bg-gray-100 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg flex items-center"
          >
            <IoMdSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
