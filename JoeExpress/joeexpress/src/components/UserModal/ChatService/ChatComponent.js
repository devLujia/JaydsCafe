import React, { useEffect, useState } from 'react';
import chatlogo from '../../image/chat.svg';
import socket from '../../AdminModule/Message/socketService';
import axios from 'axios';

const ChatComponent = ({ name, userId }) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [ticketId, setTicketId] = useState('');

  const generateRandomTicketId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let ticketId = '';
    for (let i = 0; i < 8; i++) {  // You can adjust the length of the ticketId
      ticketId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return ticketId;
  };

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
  }, [name,ticketId ]);

  // const handleJoinRoom = () => {
  //   if (name && room){
  //     socket.emit("join_room", room)
  //   }
  // }

  const createNewTicket = async () => {
    try {
      const newTicketId = generateRandomTicketId();
      setTicketId(newTicketId);
  
      const response = await axios.post('http://localhost:8081/createTicket', {
        ticketId: newTicketId,  
        userId: userId
      });
  
      socket.emit('join_room', newTicketId);
      console.log('New ticket created with ID:', newTicketId);
  
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };
    
  
  const sendMessage = async (e) => {
    if (currentMessage.trim() !== '') {
      // e.preventDefault();

      const messageData = {
       author: name,
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
            room: ticketId,
            message: currentMessage,
            time:
            new Date(Date.now()).getHours()+
            ":" +
            new Date(Date.now()).getMinutes(),
    
          }

          await socket.emit("send_message", messageData);
          setMessageList((prevChat) => [...prevChat,  messageData ]);
          setCurrentMessage('');
      }
  };

  // useEffect(() => {
  //   socket.on('receiveMessage', (messageData) => {
  //     setMessageList((list) => [...list, messageData]);
  //   });

  //   return () => {
  //     socket.off('receiveMessage');
  //   };
  // }, []);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receiveMessage', (messageData) => {
      // Update the message list with the new message
      setMessageList((prevChat) => [...prevChat, messageData]);
    });
  
    // Cleanup the socket listener when the component unmounts
    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);
  
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
        <div id="chat-container" className="fixed bottom-16 right-4 w-96 z-50">
          <div className="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-[#067741] text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Jayd'sCafe Admin</p>
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
                {!ticketId ? <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  👋 Hi there! This message will be directed to the admins of Jayd's Cafe.
                  We are here to make your experience as smooth and enjoyable as possible.
                </p>
                : 
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  Ticket Created : {ticketId}
                    <br></br>
                    <br></br>
                  👋 Hi there! You are now connected to the admin, Please address your concern.
                </p>
              }
              </div>
              {/* <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                  Feel free to ask me anything, and I'll do my best to assist you.
                  Let's get started on finding your perfect drink today! 🥤
                </p>
              </div> */}

              {/* Display chat messages */}

              
              {messageList.map((messageContent) => {
                      return (
                      <div className={`mb-2 ${messageContent.author === name ? 'text-right' : 'text-left'}`}>

                          <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                               {messageContent.author === name ? `Me: ${messageContent.message}` : `Admin : ${messageContent.message}`  }
                            </p>
                      </div>)
            })}
            </div>

            {!ticketId ? (
              <div className="p-4 border-t flex">
                <button
                  onClick={createNewTicket}
                  className="bg-[#067741] text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-[#055c34] hover:to-[#067741] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Create New Ticket
                </button>
                </div>
              ) : (
                <div className="p-4 border-t flex">
                  <input
                    type="text"
                    placeholder="Type a message"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={handleKeyDown} // Allows sending message via 'Enter' key
                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-[#067741] text-white px-4 py-2 rounded-r-md hover:from-[#055c34] hover:to-[#067741] transition duration-300"
                  >
                    Send
                  </button>
                </div>
              )}
            
            {/* {!ticketId && (
                  <button onClick={createNewTicket}>
                    Create New Ticket
                  </button>
                )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
