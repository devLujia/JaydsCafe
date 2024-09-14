import axios from 'axios';
import React, { useState } from 'react'

function AddCategory({closeModal}) {

    const [values, setValues] = useState({
        title: '',
        image_url: null
    });
    
    const handleInput = (e) => {
      const { name, type, files, value } = e.target;
    
      if (type === 'file' && files.length > 0) {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: files[0] 
        }));
      } 
      else {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value 
        }));
      }
    };

    const handleSubmit = (e) =>{
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('image_url', values.image_url);

      formData.forEach((value, key) => {
        console.log(key, value);
      });

        axios.post('http://localhost:8081/addCategory', formData)
        .then(res =>{
            alert('Category added successfully');
            closeModal(false)
        })
    }    


  return (
    <div>
       <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
        <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
          
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>Add Category</h1>
            <button 
            onClick={()=> closeModal(false)}
            className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
              X
            </button>
          </div>
      
          <div className='flex-1'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor="title" className="flex text-gray-600 text-sm font-bold tracking-wider">Category Name</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title"
                  onChange={handleInput} 
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="Category Name" 
                  required
                />
              </div>                        
      
              <div className='mb-4'>
                <label htmlFor="image_url" className="flex text-gray-600 text-sm font-bold tracking-wider">Image URL</label>
                <input 
                  type="file" 
                  name="image_url" 
                  id="image_url"
                  onChange={handleInput}
                  accept="image/png, image/gif, image/jpeg"
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="image.png" 
                  required
                />
                
              </div>        
      
              <button type="submit" className="bg-greenColor hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg w-full">
                Add Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategory
