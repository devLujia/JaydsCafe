import React, { useEffect, useState } from 'react';
import chatlogo from '../../image/live-chat.png';
import socket from '../../AdminModule/Message/socketService';

const ChatComponent = ({ userId, role }) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      // Emit message to the server
      socket.emit('sendMessage', { message, to: role === 'User' ? 'Admin' : userId });
      // Add the message to the local chat
      setMessages((prevChat) => [...prevChat, { message, from: 'Me' }]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);
  
  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-16 h-16">
        <button
          onClick={toggleChat}
          className="bg-footer text-white py-2 px-4 rounded-full hover:bg-amber-700 transition duration-300 flex items-center w-16 h-16"
        >
          <img src={chatlogo} alt="chat" />
        </button>
      </div>

      {chatVisible && (
        <div id="chat-container" className="fixed bottom-16 right-4 w-96 z-50">
          <div className="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-footer text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">JoeBot</p>
              <button onClick={toggleChat} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  👋 Hi there! This message will be directed to the admins of Jayd's Cafe.
                  We are here to make your experience as smooth and enjoyable as possible.
                </p>
              </div>
              {/* <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  Feel free to ask me anything, and I'll do my best to assist you.
                  Let's get started on finding your perfect drink today! 🥤
                </p>
              </div> */}

              {/* Display chat messages */}
              {messages.map((c, index) => (
    <div 
        key={index} 
        className={`mb-2 ${c.from === 'Me' ? 'text-right' : 'text-left'}`}
    >
        {c.from === 'Me' ? 
        (
            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                Me: {c.message}
            </p>
        ) : 
        (
            <p className="bg-blue-300 text-black rounded-lg py-2 px-4 inline-block">
                {c.from === 'Admin' ? 'Admin' : c.from}: {c.message}
            </p>
        )}
    </div>
))}
            </div>

            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-footer text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
