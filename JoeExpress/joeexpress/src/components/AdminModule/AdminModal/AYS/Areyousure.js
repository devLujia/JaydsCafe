import axios from 'axios';
import React from 'react'
import './AYS.css'

function Areyousure( {closeModal, id} ) {
    
  const handleDeleteUser = async () => {
    try {
      const res = await axios.post('http://localhost:8081/deleteUserData', { id });
      closeModal(false);
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className='modalBackground z-50' >
      <div className='modalContainer'>
                
            <div className='title flex'>
              <h1 className='text-black text-2xl font-semibold'>Delete Admin!</h1> 
              <button className='text-white text-center bg-red-500 px-3 py-2 hover:bg-red-600 rounded-md' onClick={()=> closeModal(false)}> X </button> 
            </div>

            <div className='body flex flex-col mb-0'>
              <p className='text-black font-normal mb-5'>
                Are you sure you want to delete the user ?
              </p>
            
              <div className='flex flex-row w-full'>
                <button onClick={() => { closeModal(false); }} id="cancelBtn">
                  Cancel
                </button>
                <button onClick={()=>handleDeleteUser()}>Continue</button>
              </div>
            </div>

      </div>
    </div>
  )
}

export default Areyousure
