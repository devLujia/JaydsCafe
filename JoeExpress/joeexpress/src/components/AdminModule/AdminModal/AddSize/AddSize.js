import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AddSize({closeModal,id}) {

    const [values, setValues] = useState({
        id: '',
        size: '',
        price: ''
      });

    useEffect(() => {
        if (id){
            setValues((prevValues) => ({
                ...prevValues,
                id: id
            }));
        }
    }, [id]);

    const handleInput = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () =>{

        axios.post('http://localhost:8081/addSize', values)
            .then(res =>{
                closeModal(false)
            })
      }



  return (
    <div>
       <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
        <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
          
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>Add size</h1>
            <button 
            onClick={()=> closeModal(false)}
            className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
              X
            </button>
          </div>
      
          <div className='flex-1'>

            <form className='flex flex-col' onSubmit={handleSubmit}>

              <div className='mb-4'>
                <label for="size" className="flex text-gray-600 text-sm font-bold tracking-wider">Size</label>
                <input 
                  type="text" 
                  name="size" 
                  id="size"
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="Size" 
                  required
                />
              </div>                        
      
              <div className='mb-4'>
                <label for="price" className="flex text-gray-600 text-sm font-bold tracking-wider">Price</label>
                <input 
                  type="text" 
                  name="price" 
                  id="price"
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="₱69" 
                  required
                />
                
              </div>        
      
              <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full">
                Add Size
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSize
