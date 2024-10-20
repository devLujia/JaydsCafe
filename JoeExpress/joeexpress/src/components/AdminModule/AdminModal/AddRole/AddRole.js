import axios from 'axios';
import React, { useState } from 'react'

function AddRole({ closeModal }) {

    const [values, setValues] = useState({
        title: '',
        administer: ''

    })

    const handleSubmit = (e) => {
        e.preventDefault();

            axios.post('http://localhost:8081/addRole', values)
                .then(res => {
                    alert(res.data)
                    closeModal(false)
                })
                .catch(err => console.error(err));
        
    };

  return (
    <div className='modalBackground h-fit'>
        <div className='modalContainer h-fit'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-2xl font-bold'>Add Admin</h1> 
                <button className='text-white text-center bg-red-500 px-3 hover:bg-red-600 rounded-md' onClick={()=> closeModal(false)}> X </button> 
            </div>

            <form class="max-w-lg mx-10 className='grid grid-cols-1'" onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Title</label>
                    <input 
                        type="text" 
                        id="role"
                        name="role"
                        value={values.title}  
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. 09123459678" 
                        required 
                        onChange={(e) => setValues({...values, title: e.target.value})}/>
                </div>

                <div class="mb-5">
                    <label for="administer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role Administer</label>
                    <select 
                        id="administer" 
                        name="administer"
                        value={values.administer} 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        required 
                        onChange={(e) => setValues({...values, administer: e.target.value})}
                    >
                        <option value="" disabled>Select Level</option>
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                    </select>
                </div>
                

                <div className='flex justify-center'>
                    <button type="submit" class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Role</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddRole
