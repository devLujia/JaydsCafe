import axios from 'axios';
import React from 'react'
import './AYS.css'

function Areyousure( {closeModal, id} ) {
    
  const handleDeleteUser = async () => {
    try {
      // Send the id in an object
      const res = await axios.post('https://jaydscafe.com/api/deleteUserData', { id }); 
      closeModal(false); // Close the modal on success
      console.log('User deleted:', res.data); // Log the response for debugging
    } catch (err) {
      console.error('Error deleting user:', err); // Log the error for debugging
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] sm:w-[400px]">
    {/* Header */}
    <div className="flex justify-start items-center mb-4">
      <h1 className="text-black text-2xl font-semibold">Delete Admin!</h1>
      
    </div>

    {/* Body */}
    <div className="flex flex-col mb-6">
      <p className="text-black font-normal text-left mb-5">
        Are you sure you want to delete this admin? This action is irreversible.
      </p>
    </div>

    {/* Footer */}
    <div className="flex justify-end space-x-4">
      <button 
        className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition" 
        onClick={() => closeModal(false)}
      >
        Cancel
      </button>
      <button 
        className="py-2 px-4 bg-greenColor text-white rounded hover:bg-green-600 transition" 
        onClick={handleDeleteUser}
      >
        Continue
      </button>
    </div>
  </div>
</div>
  )
}

export default Areyousure