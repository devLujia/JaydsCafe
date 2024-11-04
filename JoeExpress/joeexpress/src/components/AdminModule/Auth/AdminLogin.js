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
 
        <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white flex flex-col lg:flex-row w-11/12 lg:w-3/4 max-w-5xl mx-auto my-12 rounded-lg shadow-xl overflow-hidden">
        
    
        <div class="flex justify-center items-center flex-col border-b lg:border-b-0 lg:border-r-2 border-gray-300 flex-1 p-10 bg-green-50">
            <h2 class="text-4xl font-semibold text-gray-800 mb-6 glow-animation animate-wave">Jayd's Admin</h2>
            <p class="text-gray-700 text-center max-w-sm text-lg">
                Sign in to access your admin account and manage cafe operations.
            </p>
        </div>

    
        <div class="flex-1 p-10">
            <form onSubmit={handleSubmit}>
                <h1 class="font-bold text-2xl lg:text-3xl text-gray-800 mb-8">
                    Sign In to <span class="text-black">Jayd's Admin</span>
                </h1>
                
             
                <div class="mb-6">
                    <label for="email" class="block text-gray-700 font-medium text-lg">Email</label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={values.email}
                        onChange={handleInput}
                        required
                    />
                    {errors.email && <span class="text-red-600 text-base">{errors.email}</span>}
                </div>

            
                <div class="mb-6 relative">
                    <label for="password" class="block text-gray-700 font-medium text-lg">Password</label>
                    <input 
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        class="shadow appearance-none border rounded w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={values.password}
                        onChange={handleInput}
                        id="password"
                        name="password"
                        required
                    />
                    <img src={hidden} onClick={togglePasswordVisibility} alt="Toggle Password Visibility" 
                        class="absolute right-4 top-9 w-8 cursor-pointer" id="hide" />
                    {errors.password && <span class="text-red-600 text-base">{errors.password}</span>}
                </div>

               
                <button 
                    class="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-lg transition duration-150 mb-6 text-lg"
                    type="submit">
                    Sign In
                </button>

                <div class="text-center text-base text-gray-700 mt-5">
                    <p>
                        Forgot Password? 
                        <a href="/public/Html_Admin/adminForgotPass.html" 
                            class="text-blue-600 font-semibold hover:underline ml-1">
                            Click Here
                        </a>
                    </p>
                    <p class="mt-3">
                        Don't have an account? 
                        <a href="/adminregistration" 
                            class="text-blue-600 font-semibold hover:underline ml-1">
                            Register Here
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>

    
    
  )
}

export default AdminLogin
