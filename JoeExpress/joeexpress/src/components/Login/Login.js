import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import hidden from '../image/hidden.png'
import './login.css'

import Terms from '../UserModal/TermsAndCondition/Terms'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const hide = ()=>{

        let hide = document.getElementById("hide");
        let password = document.getElementById("password");

        if(password.type === "password"){
            password.type = "text";
        }else{
            password.type = "password";
        }
    }

    const navigation = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    axios.defaults.withCredentials = true;

    const [cmsName,setCmsName] = useState('');
    const [cmsLocation,setCmsLocation] = useState('');
    const [cmsFacebook,setCmsFacebook] = useState('');
    const [cmsInstagram,setCmsInstagram] = useState('');
    const [cmsLink,setCmsLink] = useState('');
    const [cmsSmallLogo,setSmallLogo] = useState(null);
    const [cmsBigLogo,setBigLogo] = useState(null);
    const [TermsModal,setTermsModal] = useState(false); //modal
    const [passwordVisible, setPasswordVisible] = useState(false);

    // modal
    const toggleTermsAndCondiotion = () =>{
      setTermsModal(!TermsModal)
    }

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };


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

          const fetchSmallLogo = async () => {

            try{
              const response = await axios.post ('http://localhost:8081/cms', {title: 'Small Logo'});
              setSmallLogo(response.data.content || '')
            }
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };
          const fetchBigLogo = async () => {

            try{
              const response = await axios.post ('http://localhost:8081/cms', {title: 'Big Logo'});
              setBigLogo(response.data.content || '')
            }
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          const fetchLocationData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Location'});
              setCmsLocation(response.data.content || '');
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          const fetchFacebookLinkData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Facebook'});
              setCmsFacebook(response.data.content || '');
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          const fetchInstagramLinkData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Instagram'});
              setCmsInstagram(response.data.content || '');
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          const fetchLinkData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Link'});
              setCmsLink(response.data.content || '');
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          fetchNameData();
          fetchLocationData();
          fetchFacebookLinkData();
          fetchInstagramLinkData();
          fetchLinkData();
          fetchSmallLogo();
          fetchBigLogo();
    })

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const res = await axios.get('http://localhost:8081/');
                if (res.data.valid) {
                    navigation('/');
                } else {
                    navigation('/login');
                }
            } catch (err) {
                console.error('Error during authentication check:', err);
            }
        };
    
        checkAuthentication();  // Call the async function
    }, [navigation]);  // Runs when `navigation` changes
  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);
    
        if (err.email === "" && err.password === "") {
            try {
                const res = await axios.post('http://localhost:8081/login', values);
                if (res.data.Login) {
                    navigation('/');
                } else {
                    setErrors(res.data.Message || 'Login failed.');
                }
            } catch (err) {
                console.error('Error during login:', err);
            }
        }
    };
  
    return (
    <div className="bg-background">
      
    {TermsModal && <Terms closeModal={setTermsModal}/>}

     {/* <!-- Navbar --> */}
      <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-between">
        <div class="font-extrabold text-2xl flex items-center">
          {/* <!-- Logo/Title in Navbar --> */}
          <a href="/" class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">{cmsName}</a>
        </div>
      </nav>

    {/* Redesigned Form container */}
    <div className="max-w-xs mx-auto p-10 mt-10 mb-12 bg-white rounded-xl shadow-lg md:max-w-sm lg:max-w-md lg:p-12">
      {/* Image and Welcome Text */}
      <div className="flex flex-col items-center mb-8">
        <p className="text-lg md:text-xl font-semibold tracking-wide text-gray-700 mb-2">WELCOME TO</p>
        <h1 className="font-extrabold text-4xl md:text-5xl text-green-700 text-center animate-text-focus-in">{cmsName}</h1>
      </div>

      {/* Login Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700">Login</h2>


      {/* Form fields */}
      <form onSubmit={handleSubmit} action="/menu">
        {/* Email Input */}
        <div className="mb-6">
          <input
            className={`w-full shadow-md border rounded-lg py-4 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent ${errors.email ? 'border-red-500' : ''}`}
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleInput}
            required
          />
          {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="relative mb-8">
          <input
            className={`w-full shadow-md border rounded-lg py-4 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent ${errors.password ? 'border-red-500' : ''}`}
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleInput}
            required
          />
          <img
            onClick={togglePasswordVisibility}
            src={hidden}
            alt="Toggle Visibility"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 cursor-pointer"
            id="hide"
          />
          {errors.password && <p className="text-sm text-red-600 mt-2">{errors.password}</p>}
        </div>

          {/* General Error Message */}
          {errors.general && <p className="text-sm text-red-600 mb-6">{errors.general}</p>}

          {/* Submit Button */}
          <button
            className="w-full bg-green-700 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-700"
            type="submit"
          >
            Sign In
          </button>

          {/* Sign-up Redirect */}
          <p className="text-center text-sm text-gray-700 mt-8">
            Don't have an account?
            <a href="/signup" className="text-blue-500 font-semibold hover:underline ml-1">Click Here</a>
          </p>
  </form>
</div>



   {/* <!-- Contact Us --> */}
      <footer class="bg-[#1A1A1A] w-full h-1/4 mt-5 py-7 flex flex-col justify-center items-center" id="footer">

        <div class="border-y-2 border-gray-400 w-4/5 p-10">
          {/* <!-- container footer--> */}
          <div class="flex justify-between w-full">
          <h1 class="text-white text-4xl font-bold">{cmsName}</h1>
          <div class="flex gap-2">
            <button type='button' 
            class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
            <a href={cmsFacebook} target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="Facebook" />
            </a>
            </button>
            <button type='button' 
            class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
              <a href={cmsInstagram} target="_blank" rel="noopener noreferrer"><img src={ig} alt=""></img></a>
            </button>
          </div>
        </div>
          
        <button type="button" class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
        </div>

        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
            <li class="footer-links">
              <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal" data-modal-toggle="default-modal">Refund Policy</a>
            </li>
            <li class="footer-links">
              <a href="#footer" class="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li class="footer-links">
              <a href="#footer" class="hover:underline me-4 md:me-6" onClick={toggleTermsAndCondiotion}>Terms and Conditions</a>
            </li>
          </ul>
        </div>

        {/* <!-- Refund Policy modal --> */}
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-jaydsBg rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                      <h3 class="text-2xl font-bold text-gray-900 ">
                          Refund Policy
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-white hover:text-greenColor rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-4 md:p-5 space-y-4">
                      <p class="text-base leading-relaxed text-gray-500">
                        We do not accept returns or exchanges however, if you are unhappy with your order, kindly give us a call at +639771931022 and
                        let us know how we can better serve you.
                      </p>
                      <p class="text-base leading-relaxed text-gray-500">
                        Refunds We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If
                        approved, you'll be automatically refunded on your original payment method. Please remember it can takes 7-10 days for your
                        bank or credit card company to process and post the refund too.
                      </p>
                  </div>
              </div>
          </div>
        </div>

        {/* <!-- Modal for Terms and Condition --> */}
        <div id="default-modal3" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">

              {/* <!-- Modal content --> */}
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  {/* <!-- Modal header --> */}
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Terms of Service
                      </h3>
                      <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal3">
                          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                          </svg>
                          <span class="sr-only">Close modal</span>
                      </button>
                  </div>
                  {/* <!-- Modal body --> */}
                  <div class="p-4 md:p-5 space-y-4">
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                      </p>
                  </div>
                  {/* <!-- Modal footer --> */}
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button id="accept-button" data-modal-hide="default-modal3" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                      <button data-modal-hide="default-modal3" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
                  </div>
              </div>
          </div>
      </div>

      </footer>

    </div>
    );
};

export default Login;