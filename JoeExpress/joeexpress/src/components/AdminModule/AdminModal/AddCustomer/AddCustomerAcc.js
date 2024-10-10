import React, { useState } from 'react'
import Validation from '../../../Signup/SignupValidation';
import './addCustomerAcc.css'
import axios from 'axios';

function AddCustomerAcc({ closeModal }) {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (!err.name && !err.email && !err.password && !err.address) {
            axios.post('http://localhost:8081/addAdmin', values)
                .then(res => {
                    closeModal(false)
                })
                .catch(err => console.error(err));
        }
    };

  return (

    <div className='modalBackground h-fit'>
        <div className='modalContainer h-fit'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-2xl font-bold'>Add Admin</h1> 
                <button className='text-white text-center bg-red-500 px-3 hover:bg-red-600 rounded-md' onClick={()=> closeModal(false)}> X </button> 
            </div>

            <form class="max-w-lg mx-10 className='grid grid-cols-1' onSubmit={handleSubmit}">
                <div class="mb-5">
                    <label for="napnumme" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                    <input 
                        type="tel" 
                        id="pnum" 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. 09123459678" 
                        required 
                        onChange={handleInput} />
                </div>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. Juan Dela Cruz" 
                        required 
                        onChange={handleInput} />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. JuanDelaCruz@gmail.com" 
                        required 
                        onChange={handleInput}/>
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder='Enter a Password' 
                        required
                        onChange={handleInput}/>
                </div>
               {/* address */}
               <div class="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input 
                    type="text" 
                    name="address" 
                    id="address"
                    value={values.address}
                    onChange={handleInput}  
                    placeholder="Location" 
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                    style={{ zIndex: 10, position: 'relative' }} // Adjusting to ensure no overlaps
                    required/>
                </div>

                <div className='flex justify-center'>
                    <button type="submit" class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddCustomerAcc
