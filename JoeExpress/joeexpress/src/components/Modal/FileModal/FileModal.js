import React from 'react';

const CheckoutModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Checkout Successful</h2>
        <p className="mb-6">Your order has been placed successfully!</p>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;