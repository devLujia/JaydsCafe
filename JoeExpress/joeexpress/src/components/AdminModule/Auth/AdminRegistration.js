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

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);

        if (!err.fullnamename && !err.email && !err.password) {
            axios.post('http://localhost:8081/adminsignup', values)
                .then(res => {
                    navigation('/admin');
                })
                .catch(err => console.error(err));
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

      
  return (
    <div>
      
      <div class="bg-white flex w-4/5 mx-auto my-10 rounded-lg flex-col lg:flex-row shadow-xl">

<div class="flex justify-center items-center flex-col border-r-2 border-gray-300 flex-1 px-5">
    <h2 class="text-2xl font-bold flex justify-center mb-5">JoeExpressAdmin</h2>
    <p class="flex justify-center mb-14 max-w-96 text-center">Lorem ipsum dolor sit amet, consectetur
        adipiscing elit suspendisse.</p>

    <img src={logo} alt="Logo" class="w-40 h-40"/>
</div>

<div class="my-5 flex-1 p-10">
    
    <form onSubmit={handleSubmit}>
        <h1 class="font-bold text-3xl my-5">Sign Up to JoeExpress <span class="underline">Admin</span></h1>
        <div class="mb-4">
            <label>Fullname</label>
            <input class="shadow appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
            id="fullname" 
            type="text"
            name="fullname" 
            placeholder="Enter your Fullname" 
            value={values.fullname}
            onChange={handleInput} 
            required
            />
            {errors.fullname && <span className='text-red-900'> {errors.fullname}</span>}
        </div>
        
        <div class="mb-4">
            <label>Email</label>
            <input class="shadow appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
            id= "email" 
            type= "email" 
            name= "email" 
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleInput}  
            required
            />
            {errors.email && <span className='text-red-900'> {errors.email}</span>}
        </div>

        <div class="bg-white w-full max-w-full rounded-md mx-auto mt-300 flex items-center" required>
            <div class="relative w-full">
            <label class="">Password</label>
            <input 
            type= {passwordVisible ? 'text' : 'password'} 
            placeholder= "Password" 
            class= "w-full outline-0 text-gray-600 shadow appearance-none border rounded py-3 px-3 mb-10 mt-2 leading-10 focus:outline-none focus:shadow-outline" 
            id = "password"
            name = "password"
            value = {values.password}
            onChange={handleInput} 
            />
            {errors.password && <span className='text-red-900'> {errors.password}</span>}

            <img src={hidden} onClick={togglePasswordVisibility} alt="Eye" class="absolute right-3 top-10 w-8 cursor-pointer" id="hide"/> 
            </div>
        </div>

        <button className = "bg-amber-950 hover:bg-amber-900 text-white font-semibold py-4 px-6 rounded-lg w-full leading-10 mb-10" type="submit">Sign In</button>

        <a href="https://www.google.com/"><button class="flex items-center justify-center p-2 w-full leading-10 border-2 border-gray-300 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none focus:shadow-outline mb-5"><img src={Google} alt="Google Icon" class="w-16 px-5"/>Google</button></a>

        <p>
            Already have an account? 
            <span class="text-blue-500 cursor-pointer font-semibold hover:underline">
                <a href="/admin">
                    Click Here
                </a>
            </span>
        </p>
        </form>
</div>
</div>

    </div>
  )
}

export default AdminRegistration
