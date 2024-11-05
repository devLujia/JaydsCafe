import React, { useState, useEffect } from "react";
import send from '../../image/send.svg';
import socket from '../../AdminModule/Message/socketService';

 // Adjust to your server URL

const ChatWithRider = ({ onClose, id, userId }) => {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Join the room when the component mounts
  useEffect(() => {
    socket.emit('join_room_rider', id);

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit('leave_room_rider', id);
      socket.off('receive_message');
    };
  }, [id]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      room: id,
      userId: userId, // Replace with the actual user ID from your auth system
      message,
      author: "User", // Replace with actual author
    };

    socket.emit('send_message_rider', messageData);
    setMessages((prevMessages) => [...prevMessages, { ...messageData, createdAt: new Date().toLocaleTimeString() }]);
    setMessage("");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <h2 className="text-lg font-semibold text-black">Chat with Rider</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-80">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-2 ${msg.author === "User" ? "justify-end" : ""}`}>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div>
                <div className={`rounded-lg p-3 text-sm ${msg.author === "User" ? "bg-greenColor text-white" : "bg-gray-100 text-gray-800"}`}>
                  {msg.message}
                </div>
                <span className="text-xs text-gray-500">{msg.createdAt}</span>
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
              className="flex-1 p-2 border rounded-lg outline-none text-sm"
              placeholder="Type your message..."
            />
            <button onClick={sendMessage} className="p-2 bg-greenColor text-white rounded-lg hover:bg-green-700">
              <img src={send} alt="" className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithRider;