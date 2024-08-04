// import React from 'react';

// const ChatCard = ({ message, sender, isOwnMessage }) => {
//   return (
//     <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
//       <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} relative z-10`}>
//         <p className="text-xs text-gray-500 mb-1">{sender}</p>
//         <div className={`max-w-xs rounded-lg p-2 shadow-lg ${isOwnMessage ? 'bg-blue-600 text-white border-r-4 border-blue-800' : 'bg-gray-200 text-gray-800 border-l-4 border-gray-400'}`}>
//           {message}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatCard;
import React from 'react';

const ChatCard = ({ message = "Hello, this is a sample message.", sender = "Debo", isOwnMessage = false }) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'} relative z-10`}>
        <p className="text-xs text-gray-500 mb-1">{sender}</p>
        <div className={`max-w-xs rounded-lg p-2 shadow-lg ${isOwnMessage ? 'bg-blue-600 text-white border-r-4 border-blue-800' : 'bg-gray-200 text-gray-800 border-l-4 border-gray-400'}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;