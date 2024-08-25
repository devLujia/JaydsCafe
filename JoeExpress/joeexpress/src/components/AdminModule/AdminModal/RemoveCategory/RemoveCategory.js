import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RemoveCategory({ closeModal }) {

    const [categories, setCategories] = useState([]);
    const [id, setSelectedCategoryId] = useState('');

    const handleInput = (e) => {
        setSelectedCategoryId(e.target.value);
    };

    const handleRemove = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:8081/deleteCategory', { id })
        .then(res => {
            closeModal(false);
        })
        .catch(error => {
            console.log("There was an error deleting the category!", error);
        });
    };

    useEffect(() => {
        axios.post('http://localhost:8081/fetchCategory')
        .then(res => {
            setCategories(res.data);
        })
        .catch(error => {
            console.log("There was an error on fetching the category details!", error);
        });
    }, []);

    return (
        <div>
           <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
            <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
              
              <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl font-bold'>Remove Category</h1>
                <button 
                onClick={() => closeModal(false)}
                className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
                  X
                </button>
              </div>
          
              <div className='flex-1'>
                <form className='flex flex-col' onSubmit={handleRemove}>
                  <div className='mb-4'>
                    <label htmlFor="category" className="flex text-gray-600 text-sm font-bold tracking-wider">Category Name</label>     

                    <select className='p-2 mt-5'
                    id="category"
                    name="category"
                    value={id} 
                    onChange={handleInput}>

                        {categories.map(category => (
                        <option 
                        key={category.id} 
                        value={category.id}>
                            {category.title}
                        </option>
                        ))}

                    </select>
                  </div>
                                             
                  <button type='submit' className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full">
                    Remove Category
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
    );
}

export default RemoveCategory;