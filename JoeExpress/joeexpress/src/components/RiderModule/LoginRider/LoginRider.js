import React, { useEffect, useState } from 'react'
import helmet from '../../image/helmet.svg';
import email from '../../image/email.svg';
import lock from '../../image/lock(2).svg';
import Validation from '../../Login/LoginValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginRider() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigate();
    const [cmsName,setCmsName] = useState('');

    useEffect(()=>{

        const fetchNameData = async () => {
          try {
            const response = await axios.post('http://localhost:8081/cms', {title: 'Business Name'});
            setCmsName(response.data.content || '');
          } 
          catch (error) {
            console.error('Error fetching data:', error);
          }
    
        };

        fetchNameData();
    })

    axios.defaults.withCredentials = true;

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const err = Validation(values);
        setErrors(err);
    
        // Check if there are validation errors
        if (err.email || err.password) {
            alert("Please fix the validation errors before submitting.");
            return;
        }
    
        try {
            // Await the result of the axios call
            const res = await axios.post('http://localhost:8081/adminlogin', values);
    
            if (res.data.Login === 4) {
                navigation('/riderDashboard');
            } else {
                alert("No record existed");
            }
        } catch (err) {
            // Handle the error
            console.error("Login request failed:", err);
            alert("An error occurred. Please try again later.");
        }
    };
    

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const res = await axios.get('http://localhost:8081/');
                
                if (res.data.valid) {
                    navigation('/riderDashboard');
                } else {
                    navigation('/riderLogin');
                }
            } catch (err) {
                
                navigation('/riderLogin');
            }
        };
    
        checkAuthentication();
    }, [navigation]);


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


  return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
                <div className="bg-white flex w-full max-w-5xl mx-auto my-4 rounded-lg flex-col lg:flex-row shadow-xl">
                    {/* left-side */}
                    <div className="flex justify-center items-center flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 flex-1 px-5 py-10">
                        <h2
                            className="text-3xl font-bold text-center mb-5 lg:mb-10"
                            dangerouslySetInnerHTML={{
                                __html: `${cmsName || "Business Name"} Rider Account` ,
                            }}
                        ></h2>
                        <p className="text-gray-600 text-center max-w-md mb-5 lg:mb-10">Manage your rides efficiently and stay updated with your account information.</p>
                        <img src={helmet} alt="Helmet" className="w-full max-w-xs h-auto object-contain" />
                    </div>

                    {/* right-side */}
                    <div className="flex-1 p-10">
                        <form onSubmit={handleSubmit}>
                            <h1 className="font-bold text-2xl mb-10 tracking-wide text-gray-800">
                                <span className="">Sign In</span>
                            </h1>
                            <div className="mb-6 relative">
                                {/* Email */}
                                <label htmlFor="email" className="text-gray-600 text-md font-bold tracking-wider">Email</label>
                                <input 
                                    className="mt-2 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    id="email" type="email" name="email" placeholder="Ex. Juan Dela Cruz" 
                                    value={values.email}
                                    onChange={handleInput}
                                    required
                                />
                                <img src={email} alt="Email Icon" className="absolute right-4 top-12 hidden md:block w-5 h-5" />
                            </div>

                            <div className="mb-6 relative">
                                {/* Password */}
                                <label htmlFor="password" className="text-gray-600 text-md font-bold tracking-wider">Password</label>
                                <input 
                                    className="mt-2 shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                                    id="password" type="password" name="password" 
                                    value={values.password}
                                    onChange={handleInput} 
                                    placeholder="Enter your password" required
                                />
                                <img src={lock} alt="Lock Icon" className="absolute right-4 top-12 hidden md:block w-5 h-5" />
                            </div>

                            <input 
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full leading-8 transition duration-300 ease-in-out cursor-pointer"
                                type="submit"
                                value="Sign In"
                            />

                            {/* Forgot password and Signup links */}
                            <div className="text-center mt-12 space-y-6">
                                {/* <p className="mb-4">
                                    Forgot password? 
                                    <span className="text-blue-500 cursor-pointer font-semibold">
                                        <a href="/RiderForgot"> Click Here</a>
                                    </span>
                                </p> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  )
}
