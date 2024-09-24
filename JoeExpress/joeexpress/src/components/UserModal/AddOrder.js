import axios from 'axios';
import React, { useState } from 'react'

function AddOrder({closeModal}) {
    
    const [values, setValues] = useState({
        name: '',
        price: ''
      });
    
      const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
      };
    
    const handleSubmit = () =>{
        axios.post('http://localhost:8081/menu', values)
            .then(res =>{
                closeModal(false);
            });
}
return(
    <div>
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
            <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
                
                <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-bold'>Sweetness</h1>
                <button 
                onClick={()=> closeModal(false)}
                className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
                    X
                </button>
                </div>
            
               <h1> Hello world </h1>
            </div>
        </div>
    </div>
)
}

export default AddOrder