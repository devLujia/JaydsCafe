import React, { useEffect, useState } from 'react'
import helmet from '../../image/helmet.svg';
import email from '../../image/email.svg';
import lock from '../../image/lock(2).svg';
import google from '../../image/google.png';
import Validation from '../../Login/LoginValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegistrationRider() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();
    const [cmsName,setCmsName] = useState('');

    useEffect(() => {
        const fetchNameData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/cms', { title: 'Business Name' });
                setCmsName(response.data.content || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchNameData();
    }, []);

    axios.defaults.withCredentials = true;

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);
    
        // Check if email and password are valid
        if (err.email === "" && err.password === "") {
            try {
                const res = await axios.post('http://localhost:8081/adminlogin', values);
    
                // Check if login is successful and the role is 'rider'
                if (res.data.Login === 'rider') {
                    navigation('/riderDashboard');
                } else {
                    alert("No record existed");
                }
            } catch (err) {
                console.error("Error during login:", err);  // Log the error for debugging
            }
        }
    };

    useEffect(() => {
        const checkUserValidity = async () => {
            try {
                const res = await axios.get('http://localhost:8081/');
                
                if (res.data.valid) {
                    navigation('/riderDashboard');
                } else {
                    navigation('/riderRegistration');
                }
            } catch (err) {
                console.error("Error checking user validity:", err);
            }
        };
    
        checkUserValidity();
    }, [navigation]);
    


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


  return (
    <div>
        <div className='bg-white flex w-4/5 mx-auto my-4 rounded-lg flex-col lg:flex-row shadow-xl'>
            
            {/* left-side */}
            <div className='flex justify-center items-center flex-col border-r-2 border-gray-300 flex-1 px-5'>
                <h2 className='text-2xl font-bold text-center my-5'>{cmsName} Rider Account</h2>
                <p class="flex justify-center mb-2 max-w-96 text-center">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit suspendisse.</p>

                <img src={helmet}></img>
            </div>

            {/* right-side */}
            <div className='my-5 flex-1 p-10'>
                <form onSubmit={handleSubmit}>
                    <h1 className='font-bold text-2xl mb-7 tracking-wide'>
                        <span className='underline'>Sign Up</span> to Jayd's RiderModule 
                    </h1>
                    
                    <div class="mb-4 relative"> {/* <!-- email--> */}
                        <label for="email" class="text-gray-600 text-md font-bold tracking-wider ">Fullname</label>
                        <input 
                        class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                        id="email" type="email" name="email" placeholder="Ex. Juan Dela Cruz" required/>
                    </div>

                    <div class="mb-4 relative"> {/* <!-- email--> */}
                        <label for="email" class="text-gray-600 text-md font-bold tracking-wider ">Email</label>
                        <input 
                        class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                        id="email" type="email" name="email" placeholder="Ex. JuanDCrus@gmail.com" 
                        value={values.email}
                        onChange={handleInput} 
                        required/>
                        <img src={email} className='absolute end-5 top-12 md:block hidden'></img>
                    </div>

                    <div class="mb-4 relative"> {/* <!-- password--> */}
                        <label for="pass" class="text-gray-600 text-md font-bold tracking-wider ">Password</label>
                        <input class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                        name="password"
                        id="password" type='password' 
                        value={values.password}
                        onChange={handleInput} 
                        placeholder="Enter your password" required/>
                        <img src={lock} className='absolute end-5 top-12 md:block hidden'></img>
                    </div>

                    <input class="bg-greenColor hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 "
                            type="submit"
                            value="Sign In"/>

                    {/* <a href="https://www.google.com/">
                        <button class="flex items-center justify-center p-2 my-4 w-full leading-10 border-2 text-gray-600 border-gray-300 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none focus:shadow-outline">
                            <img src={google} alt="Google Icon" class="w-16 px-5 md:block hidden"/> Sign in with Google
                        </button>
                    </a> */}

                    {/* <!-- Don't have an account? --> */}
                    <div className=' text-center'>
                        <p class="my-3">
                            Forgot password?
                            <span class="text-blue-500 cursor-pointer font-semibold">
                                <a href="/RiderForgot"> Click Here </a>
                            </span>
                        </p>

                        <p class="mb-10">
                         Already have an account?
                            <span class="text-blue-500 cursor-pointer font-semibold">
                                <a href="/RiderLogin"> Sign up </a>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
