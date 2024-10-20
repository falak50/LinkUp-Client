import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoMdSend, IoMdClose } from "react-icons/io";
import dpImg from '../../assets/dpImg.jpg';

// Socket connection
const socket = io.connect("http://localhost:5000");

function Messaging({ other, onclose }) {
  const owner = JSON.parse(localStorage.getItem("user"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Join room once when component mounts
  useEffect(() => {
    if (owner && owner.email) {
      socket.emit("join_room", { userId: owner._id });
    }
  }, []); // Only on mount

  // Fetch chat messages when 'other' changes
  useEffect(() => {

    console.log('hello api')
    if (owner && owner.email && other?._id) {
      const chatId = [owner._id, other._id].sort().join("_");
      axios
        .get(`http://localhost:5000/chats/messages/${chatId}`)
        .then((response) => {
          const formattedMessages = response.data.map((msg) => ({
            ...msg,
            sender: msg.senderId === owner._id ? "" : other.first_name,
            isOwnMessage: msg.senderId === owner._id,
            timestamp: new Date(msg.timestamp).toLocaleTimeString(),
          }));
          setMessages(formattedMessages);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }
  }, [other,owner._id]);

  // Send a message
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
        timestamp: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", newMessage);

      setMessages([...messages, newMessage]);
      setMessage(""); // Clear the input field
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.senderId === other._id) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...data,
            sender: other.email,
            isOwnMessage: false,
            timestamp: new Date(data.timestamp).toLocaleTimeString(),
          },
        ]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [other.email]);

  // Smooth scrolling to the bottom of the chat
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container && isAtBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isAtBottom]);

  // Handle scroll behavior and determine if at the bottom of the chat
  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.clientHeight <= container.scrollTop + 1;
      setIsAtBottom(isAtBottom);
    }
  };

  // Function to determine the correct image URL
  const getImageUrl = (imageURL) => {
    return imageURL ? `http://localhost:5000/images/${imageURL}` : dpImg;
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 w-[365px] max-w-lg">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-blue-600 text-white p-4">
          <div className="flex items-center">
            <img
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-2"
              src={getImageUrl(other?.ProfileImgURL)}
            />
            <h1 className="text-xl font-semibold">
              {other?.first_name} {other?.last_name}
            </h1>
          </div>
          <button onClick={onclose} className="text-white hover:text-red-400">
            <IoMdClose className="text-xl" />
          </button>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="h-80 overflow-y-auto p-4 border-b border-gray-300 bg-gray-50"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isOwnMessage ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`flex flex-col ${
                  msg.isOwnMessage ? "items-end" : "items-start"
                } relative`}
              >
                <div
                  className={`flex ${
                    msg.isOwnMessage ? "flex-row-reverse" : "flex-row"
                  } items-end`}
                >
                  {!msg.isOwnMessage && (
                    <img
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                      src={getImageUrl(other?.ProfileImgURL)}
                    />
                  )}
                  <div
                    className={`max-w-xs rounded-lg p-2 shadow-lg ${
                      msg.isOwnMessage
                        ? "bg-blue-600 text-white border-blue-800"
                        : "bg-gray-200 text-gray-800 border-gray-400"
                    }`}
                  >
                    <div className="text-base">{msg.message}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gray-100 flex items-center">
          <input
            type="text"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
              }
            }}
            className="flex-1 p-2 border rounded-lg border-gray-300 text-base focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors duration-300 ease-in-out"
          >
            <IoMdSend className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
