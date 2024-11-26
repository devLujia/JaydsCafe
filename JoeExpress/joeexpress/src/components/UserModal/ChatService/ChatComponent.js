import React, { useEffect, useState, useRef  } from 'react';
import chatlogo from '../../image/chat.svg';
import socket from '../../AdminModule/Message/socketService';
import axios from 'axios';

const ChatComponent = ({ name, userId, ticketId }) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  // const [ticketId, setTicketId] = useState('');
  const [subject, setSubject] = useState('');
  const [success, setSuccess] = useState(null);
  const [confirm, setConfirm] = useState(false);


  // const generateRandomTicketId = () => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let ticketId = '';
  //   for (let i = 0; i < 8; i++) {
  //     ticketId += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return ticketId;
  // };

  //for auto scroll
  const chatboxRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever messageList updates
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messageList]);

  const toggleChat = () => {
    setChatVisible(!chatVisible);
    // if(chatVisible){
    //   handleJoinRoom();
    // }
  };

  useEffect(() => {
    const joinRoom = async () => {
      if (name !== '' && ticketId !== '') {
        await socket.emit("join_room", ticketId);
      }
    };
  
    joinRoom();
  }, [name,ticketId]);

  // const handleJoinRoom = () => {
  //   if (name && room){
  //     socket.emit("join_room", room)
  //   }
  // }

  const createNewTicket = async () => {
    try {
      // setTicketId(ticket);
  
      const response = await axios.post('http://localhost:8081/createTicket', {
        ticketId: ticketId,  
        userId: userId,
        subject: subject,
      });
      setSuccess(response.data.message);
      setConfirm(true);
  
      socket.emit('join_room', ticketId);
      console.log('New ticket created with ID:', ticketId);
  
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
    
  
    const sendMessage = async (e) => {

      if (currentMessage.trim() !== '') {
        e.preventDefault();

        const messageData = {
        author: name,
        role : "User",
        room : ticketId,
        userId: userId,
        message: currentMessage,
          time:
          new Date(Date.now()).getHours()+
          ":" +
          new Date(Date.now()).getMinutes(),
        }

        // Emit message to the server
        await socket.emit('send_message', messageData);
        setMessageList((prevChat) => [...prevChat,  messageData ]);
        setCurrentMessage('');
      }
    
    };

    const handleKeyDown = async (e) => {
      if (e.key === 'Enter' && currentMessage.trim() !== '') {
        e.preventDefault();

      const messageData = {
       author: name,
       role : "User",
       room : ticketId,
       userId: userId,
       message: currentMessage,
        time:
        new Date(Date.now()).getHours()+
        ":" +
        new Date(Date.now()).getMinutes(),
      }

      // Emit message to the server
      await socket.emit('send_message', messageData);
      setMessageList((prevChat) => [...prevChat,  messageData ]);
      setCurrentMessage('');
      }
  };


  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receive_message', (messageData) => {

       if(messageData.userId !== userId){
          setMessageList((prevChat) => [...prevChat, messageData]);
       }
    });
  
    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, [userId]);
  
  return (
    <>

      {/* UI of the Chat Button */}
      <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-16 h-16">
        <button
          onClick={toggleChat}
          className="bg-[#067741] text-white py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-[#055c34] hover:to-[#067741] hover:scale-110 hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center w-16 h-16"
        >
          <img src={chatlogo} alt="chat" className="w-8 h-8" />
        </button>
      </div>

  
      {chatVisible && (
        <div
        id="chat-container"
        className="fixed bottom-4 sm:bottom-16 right-2 sm:right-4 w-full sm:w-96 z-50 px-5"
      >
        <div className="bg-cards2 shadow-md rounded-lg max-w-full sm:max-w-lg w-full mx-2 sm:mx-0">
          <div className="p-3 sm:p-4 border-b bg-[#067741] text-white rounded-t-lg flex justify-between items-center">
            <p className="text-sm sm:text-lg font-semibold truncate">Jayd'sCafe Admin {subject}</p>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6"
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
      
          <div
            id="chatbox"
            ref={chatboxRef}
            className="p-3 sm:p-4 h-64 sm:h-80 overflow-y-auto bg-white rounded-lg shadow-md"
          >
            <div className="mb-2">
              {!ticketId ? (
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-3 sm:px-4 inline-block">
                  👋 Hi there! This message will be directed to the admins of Jayd's Cafe. We are here to make your experience as smooth and enjoyable as possible.
                </p>
              ) : (
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-3 sm:px-4 inline-block w-full">
                  <div className="mt-2 text-sm">
                    Conversation ID: <span className="font-semibold">{ticketId}</span>
                    <br />
                    👋 Hi there! You are now connected to the admin. Please address your concern.
                    {success}
                  </div>
                </p>
              )}
            </div>
      
            {messageList.map((messageContent, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  messageContent.userId === userId ? 'justify-end' : 'justify-start'
                }`}
              >
                <p
                  className={`${
                    messageContent.userId === userId ? 'bg-blue-500' : 'bg-gray-700'
                  } text-white rounded-lg py-2 px-3 sm:px-4 inline-block w-auto max-w-[80%] sm:max-w-[70%] text-sm`}
                >
                  {messageContent.role === 'User'
                    ? `Me: ${messageContent.message}`
                    : `${messageContent.author}: ${messageContent.message}`}
                </p>
              </div>
            ))}
          </div>
      
          {!confirm ? (
            <div className="p-3 sm:p-4 border-t flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Please state your concern"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={createNewTicket}
                className="bg-[#067741] text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-[#055c34] hover:to-[#067741] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-sm"
              >
                Open a Ticket
              </button>
            </div>
          ) : (
            <div className="p-3 sm:p-4 border-t flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Type a message"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Allows sending message via 'Enter' key
                className="w-full px-3 py-2 border rounded-md sm:rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-[#067741] text-white px-4 py-2 rounded-md sm:rounded-r-md hover:from-[#055c34] hover:to-[#067741] transition duration-300 text-sm"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </>
  );
};

export default ChatComponent;
