import React, { useState } from 'react'
import Validation from '../../Signup/SignupValidation';
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
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    closeModal(false)
                })
                .catch(err => console.error(err));
        }
    };

  return (

    <div className='modalBackground z-50' >
      <div className='modalContainer'>
                
            <div className='title flex'><h1>Add Customer</h1> <button className='text-white text-center bg-red-500 px-2 hover:bg-red-600 rounded-sm' onClick={()=> closeModal(false)}> X </button> </div>
            <div className='body'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                        <div className='mb-4'>

                                <label htmlFor="name" className="text-gray-600 text-lg font-bold tracking-wider">Your Name</label>
                                <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                onChange={handleInput} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                placeholder="Your Name" 
                                required
                                />
                        </div>

                        <div class="mb-4">

                                <label htmlFor="email" className="text-gray-600 text-lg font-bold tracking-wider">Your email</label>
                                <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={handleInput} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                placeholder="name@company.com" 
                                required/>
                                
                        </div>

                        <div class="mb-4">

                                <label htmlFor="password" className="text-gray-600 text-lg font-bold tracking-wider">Password</label>
                                <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                placeholder="••••••••" 
                                onChange={handleInput} 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                required/>

                        </div>

                        <div class="mb-4">

                                <label htmlFor="address" className="text-gray-600 text-lg font-bold tracking-wider">Address</label>
                                <input 
                                type="text" 
                                name="address" 
                                id="address"
                                value={values.address}
                                onChange={handleInput}  
                                placeholder="Location" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline"
                                style={{ zIndex: 10, position: 'relative' }} // Adjusting to ensure no overlaps
                                required/>
                                
                        </div>

                        
                        
                        <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 mb-10">
                        Register an account</button>

                </form>


            </div>
            <div className='footer'></div>
      </div>
    </div>
  )
}

export default AddCustomerAcc
