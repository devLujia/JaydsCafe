import React, { useEffect, useState } from 'react'
import Google from '../../image/google.png'
import hidden from '../../image/hidden.png'
import Validation from '../../Login/LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();

    axios.defaults.withCredentials = true;

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.email === "" && err.password === "") {
            axios.post('http://localhost:8081/adminlogin', values)
                .then(res => {
                    if (res.data.Login === 1) {
                        navigation('/dashboard');
                    } 
                    else if (res.data.Login === 2){
                        navigation('/order');
                    }
                    else {
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err));
        }
     
    };

    useEffect(() => {
        axios.get('http://localhost:8081/admin')
            .then(res => {
                if (res.data.valid) {
                    navigation('/dashboard');
                } else {
                    navigation('/admin');
                }
            })
            .catch(err => console.log(err));
    }, [navigation]);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
 
    <div>
       <div class="bg-white flex w-4/5 mx-auto my-10 rounded-lg flex-col lg:flex-row shadow-xl">

        <div class="flex justify-center items-center flex-col border-r-2 border-gray-300 flex-1 px-5">
            <h2 class="text-2xl font-bold flex justify-center mb-5">Jayd's Admin</h2>
            <p class="flex justify-center mb-14 max-w-96 text-center">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit suspendisse.</p>
        </div>

<div class="my-5 flex-1 p-10">
    <form onSubmit={handleSubmit}>
        <h1 class="font-bold text-3xl my-5">Sign In to Jayd's Express <span class="underline">Admin</span></h1>
        <div class="mb-4">
            <label>Email</label>
            <input class="shadow appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleInput} 
            required/>
            {errors.email && <span className='text-red-900'> {errors.email}</span>}

        </div>

        <div class="bg-white w-full max-w-full rounded-md mx-auto mt-300 flex items-center" required>
            <div class="relative w-full">
            <label class="">Password</label>
            <input 
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password" 
            class="w-full outline-0 text-gray-600 shadow appearance-none border rounded py-3 px-3 mb-10 mt-2 leading-10 focus:outline-none focus:shadow-outline" 
            value={values.password}
            onChange={handleInput} 
            id="password"
            name="password"
            />
            {errors.password && <span className='text-red-900'> {errors.password}</span>}

            <img src={hidden} onClick={togglePasswordVisibility} alt="Eye" class="absolute right-5 top-12 w-8 cursor-pointer" id="hide"/> 
            </div>
        </div>

        <button class="bg-yellow-900 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 mb-5" type="submit">Sign In</button>

        <a href="https://www.google.com/">
        <button class="flex items-center justify-center p-2 w-full leading-10 border-2 border-gray-300 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none focus:shadow-outline mb-5"><img src={Google} alt="Google Icon" class="w-16 px-5"/>Google</button></a>

        <p >
            Forgot Password?
            <span class="text-blue-500 cursor-pointer font-semibold hover:underline ml-1">
                <a href="/public/Html_Admin/adminForgotPass.html">
                    Click Here
                </a>
            </span>
        </p>

        <p >
            Don't have an account? 
            <span class="text-blue-500 cursor-pointer font-semibold hover:underline ml -1">
                <a href="/adminregistration">
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

export default AdminLogin
