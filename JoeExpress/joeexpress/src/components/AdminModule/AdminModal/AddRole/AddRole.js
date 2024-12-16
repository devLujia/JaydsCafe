import axios from 'axios';
import React, { useState } from 'react';

function AddRole({ closeModal }) {
    const [values, setValues] = useState({
    title: '',
    administer: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const res = await axios.post('https://jaydscafe.com/api/addRole', values);
          alert(res.data);
          closeModal(false);
        } catch (err) {
          console.error('Error adding role:', err);
        }
      };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
    }));
    };

    return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
        <div className='bg-white w-[500px] rounded-lg shadow-lg flex flex-col p-6'>
        <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>Add Admin Role</h1>
            <button 
            onClick={() => closeModal(false)}
            className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-lg'>
            X
            </button>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col'>
            {/* Role Title */}
            <div className='mb-4'>
            <label htmlFor='role' className='flex text-gray-600 text-sm font-bold tracking-wider'>Role Title</label>
            <input
                type='text'
                id='role'
                name='title'
                value={values.title}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline'
                placeholder='Role Title'
                required
            />
            </div>

            {/* Administer Level */}
            <div className='mb-4'>
            <label htmlFor='administer' className='flex text-gray-600 text-sm font-bold tracking-wider'>Admin Level</label>
            <select
                name='administer'
                id='administer'
                onChange={handleInputChange}
                value={values.administer}
                required
                className='shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline'
            >
                <option value='' disabled>Select Admin Level</option>
                <option value='1'>Level 1</option>
                <option value='2'>Level 2</option>
                <option value='3'>Level 3</option>
            </select>
            </div>

            <div className='flex items-center justify-center mt-6'>
            <button type='submit' className='bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full'>
                Add Role
            </button>
            </div>
        </form>
        </div>
    </div>
    );
}

export default AddRole;
