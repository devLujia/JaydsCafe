import React, { useState } from "react";
import send from '../../image/send.svg';

 const ChatWithRider = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-between items-center pb-2 border-b">
          <h2 className="text-lg font-semibold text-black">Chat with Rider</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto max-h-80">
          {/* Chat messages */}
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div>
              <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800">
                Hello! I've picked up your order and I'm on my way.
              </div>
              <span className="text-xs text-gray-500">2:30 PM</span>
            </div>
          </div>
          
          {/* reply */}
          <div className="flex items-end justify-end space-x-2">
            <div>
              <div className="bg-greenColor text-white rounded-lg p-3 text-sm">
                Great! Thanks for letting me know.
              </div>
              <span className="text-xs text-gray-500">2:31 PM</span>
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
          
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg outline-none text-sm"
              placeholder="Type your message..."
            />
            <button className="p-2 bg-greenColor text-white rounded-lg hover:bg-green-700">
              <img src={send} alt="" className="w-5 h-5"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatWithRider;