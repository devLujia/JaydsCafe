import React, { useEffect, useState } from 'react'
import Google from '../../image/google.png'
import hidden from '../../image/hidden.png'
import logo from '../../image/logo.png'
import { useNavigate } from 'react-router-dom';
import Validation from '../../Signup/SignupValidation';
import axios from 'axios';


function AdminRegistration() {

    

    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (!err.fullname && !err.email && !err.password) {
            await axios.post('http://localhost:8081/adminsignup', values)
                .then(res => {
                    if(res.data.success){
                        alert('Registered Successfully')
                        navigation('/admin');
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

      
  return (
    <div>
      
      <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white flex flex-col lg:flex-row w-11/12 lg:w-3/4 max-w-4xl mx-auto my-10 rounded-lg shadow-xl overflow-hidden">
        
       
        <div class="flex justify-center items-center flex-col border-b lg:border-b-0 lg:border-r-2 border-gray-300 flex-1 p-8 bg-green-50">
            <h2 class="text-3xl font-semibold text-green-700 mb-4">Jayd's Cafe Admin</h2>
            <p class="text-gray-600 text-center max-w-xs">
                 Register for your admin account and get started with cafe management.
            </p>
        </div>

        
        <div class="flex-1 p-8">
            <form onSubmit={handleSubmit}>
                <h1 class="font-bold text-2xl lg:text-3xl text-gray-800 mb-6">
                    Sign Up to <span class=" text-black">Jayd's Admin</span>
                </h1>
                
              
                <div class="mb-5">
                    <label for="fullname" class="block text-gray-700 font-medium">Full Name</label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullname"
                        type="text"
                        name="fullname"
                        placeholder="Enter your Fullname"
                        value={values.fullname}
                        onChange={handleInput}
                        required
                    />
                    {errors.fullname && <span class="text-red-600 text-sm">{errors.fullname}</span>}
                </div>

               
                <div class="mb-5">
                    <label for="email" class="block text-gray-700 font-medium">Email</label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your Email"
                        value={values.email}
                        onChange={handleInput}
                        required
                    />
                    {errors.email && <span class="text-red-600 text-sm">{errors.email}</span>}
                </div>

                
                <div class="mb-5 relative">
                    <label for="password" class="block text-gray-700 font-medium">Password</label>
                    <input 
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleInput}
                        required
                    />
                    <img src={hidden} onClick={togglePasswordVisibility} alt="Toggle Password Visibility" 
                        class="absolute right-4 top-9 w-6 cursor-pointer" id="hide" />
                    {errors.password && <span class="text-red-600 text-sm">{errors.password}</span>}
                </div>

              
                <button 
                    class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition duration-150 mb-5"
                    type="submit">
                    Sign Up
                </button>


                
                <div class="text-center text-sm text-gray-600 mt-4">
                    <p>
                        Already have an account? 
                        <a href="/admin" 
                            class="text-blue-600 font-semibold hover:underline ml-1">
                            Click Here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
</div>

  )
}

export default AdminRegistration
