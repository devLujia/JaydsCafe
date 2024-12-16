import React, { useState, useEffect } from "react";
import send from '../../image/send.svg';
import socket from '../../AdminModule/Message/socketService';
import axios from "axios";

 // Adjust to your server URL

const ChatWithRider = ({ onClose, id, userId }) => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageList, setMessageList] = useState([]);

  // Join the room when the component mounts
  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('receive_message', (messageData) => {
       // Only add message if it was sent by someone else
       if (messageData.userId !== userId) {
          setMessages((prevChat) => [...prevChat, messageData]);
       }
    });

    // Cleanup the socket listener when the component unmounts
    return () => {
       socket.off('receive_message');
    };

 }, [userId]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      room: id,
      userId: userId,
      role: "User",           
      message,
      author: "User",
    };

    socket.emit('send_message_rider', messageData);
    setMessages((prevMessages) => [...prevMessages, { ...messageData, time: new Date(Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}]);
    setMessage("");
  };


  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default action like a line break in textarea
      sendMessage(); // Send the message
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (id) {
        try {
          const response = await axios.post('https://jaydscafe.com/api/getRiderMessages', { ticketId: id });
          setMessageList(response.data);
  
          // Emit the socket event to join the room
          socket.emit('join_room_rider', id);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
  
    fetchMessages();
  
  }, [id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <h2 className="text-lg font-semibold text-black">Chat with Rider</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-80">
          
        {messageList.map((msg) => (
            <div key={msg.id} className={`flex items-start space-x-2 ${msg.sender_id === userId ? "justify-end" : 'justify-start'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.sender_id === userId ? 'bg-blue-500' : 'bg-green-500'}`}>
                <span className="text-white text-sm font-semibold">{msg.sender_id === userId ? "Me" : "Rider"}</span>
              </div>
              <div>
                <div className={`rounded-lg p-3 text-sm ${msg.sender_id === userId ? "bg-greenColor text-white" : "bg-gray-500 text-white"}`}>
                  {msg.content}
                </div>
                <span className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleTimeString()}
                  </span>
              </div>
            </div>
          ))}

          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-2 ${msg.author === "User" ? "justify-end" : ""}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.author === "User" ? 'bg-blue-500' : 'bg-green-500'}`}>
                <span className="text-white text-sm font-semibold">{msg.author === "User" ? "Me" : "Rider"}</span>
              </div>
              <div>
                <div className={`rounded-lg p-3 text-sm ${msg.author === "User" ? "bg-greenColor text-white" : "bg-gray-500 text-white"}`}>
                  {msg.message}
                </div>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
            </div>
          ))}
          
      

        </div>
        <div className="border-t pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 p-2 border rounded-lg outline-none text-sm"
              placeholder="Type your message..."
            />
            <button
                onClick={sendMessage}
                className="p-2 bg-greenColor text-white rounded-lg hover:bg-green-700"
              >
                <img src={send} alt="Send" className="w-5 h-5"/>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithRider;