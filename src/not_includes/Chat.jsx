import { useState } from "react";
import ChatCard from "./ChatCard";
import { IoMdSend } from "react-icons/io";
const Chat = () => {
    // Initial chat messages
    const [chatMessages, setChatMessages] = useState([
      { message: 'Hello, how are you?', sender: 'Alice', isOwnMessage: false },
      { message: 'I am good, thank you!', sender: 'Bob', isOwnMessage: true },
      { message: 'Great to hear!', sender: 'Alice', isOwnMessage: false }
    ]);
  
    // State to manage the input value
    const [inputValue, setInputValue] = useState('');
  
    // Function to handle sending a message
    const sendMessage = () => {
      if (inputValue.trim()) {
        setChatMessages([
          ...chatMessages,
          { message: inputValue, sender: 'You', isOwnMessage: true }
        ]);
        setInputValue(''); // Clear the input field after sending
      }
    };
  
    // Function to handle input change
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    // Function to handle key press (Enter key)
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };
  
    return (
      <div className="w-80 h-96 border-2 border-gray-300 rounded-lg shadow-xl bg-white flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {chatMessages.map((chat, index) => (
            <ChatCard 
              key={index} 
              message={chat.message} 
              sender={chat.sender} 
              isOwnMessage={chat.isOwnMessage} 
            />
          ))}
        </div>
        {/* Input box */}
        <div className="p-4 border-t border-gray-300 bg-gray-100 flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
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
    );
  };

export default Chat;