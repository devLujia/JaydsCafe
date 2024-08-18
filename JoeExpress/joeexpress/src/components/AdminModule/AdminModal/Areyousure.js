import axios from 'axios';
import React from 'react'
import './AYS.css'

function Areyousure( {closeModal, id} ) {
    
    const handleDeleteUser = () => {

        axios.post('http://localhost:8081/deleteUserData', {id})
        .then(res=>{
            closeModal(false);
        })
    
    }

  return (
    <div className='modalBackground z-50' >
      <div className='modalContainer'>
                
            <div className='title flex'><h1>Are you sure you want to delete the user ?</h1> <button className='text-white text-center bg-red-500 px-2 hover:bg-red-600 rounded-sm' onClick={()=> closeModal(false)}> X </button> </div>
            <div className='body'>
                
            
            <button
            onClick={() => {
                closeModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button onClick={()=>handleDeleteUser()}>Continue</button>
            </div>

      </div>
    </div>
  )
}

export default Areyousure
