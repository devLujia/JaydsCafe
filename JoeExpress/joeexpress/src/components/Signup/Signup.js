import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import logoImage from '../image/logo.png';
import menuImage from '../image/menu.png';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import userIcon from '../image/UserAcc.svg';
import bagIcon from '../image/bag.svg';
import hidden from '../image/hidden.png';
import google from '../image/google.png';

import Terms from '../UserModal/TermsAndCondition/Terms'

function Signup() {
    const [values, setValues] = useState({
        pnum: '',
        name: '',
        address: '',
        email: '',
        password: ''
        
    });

    const [cmsName,setCmsName] = useState('');
    const [cmsLocation,setCmsLocation] = useState('');
    const [cmsFacebook,setCmsFacebook] = useState('');
    const [cmsInstagram,setCmsInstagram] = useState('');
    const [cmsLink,setCmsLink] = useState('');
    const [cmsPhone,setCmsPhone] = useState('');
    const [cmsTel,setCmsTel] = useState('');
    const [cmsSmallLogo,setSmallLogo] = useState(null);
    const [TermsModal,setTermsModal] = useState(false); //modal
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };

    // modal
    const toggleTermsAndCondiotion = () =>{
      setTermsModal(!TermsModal)
    }

    // const toggleDropdown = () => {
    //   setIsOpen(!isOpen);

    // };

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

          const fetchPhoneData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Phone Number'});
              setCmsPhone(response.data.content || '');
            } 
            catch (error) {
              console.error('Error fetching data:', error);
            }
      
          };

          const fetchTelData = async () => {
            try {
              const response = await axios.post('http://localhost:8081/cms', {title: 'Tel Number'});
              setCmsTel(response.data.content || '');
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
          fetchPhoneData();
          fetchTelData();
          fetchSmallLogo();

    })

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedValues = {
          ...values,
          name: values.name.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
          address: values.address.trim()
        };
        const err = Validation(values);
        setErrors(err);

        if (!err.pnum && !err.name && !err.email && !err.password && !err.address) {
            axios.post('http://localhost:8081/signup', trimmedValues)
                .then(res => {
                    if(res.data.success === true){
                      navigate('/login');
                    }
                })
                .catch(err => console.error(err));
        }
    };

    return (
      <div class="bg-background">

      {TermsModal && <Terms closeModal={setTermsModal}/>}

      {/* <!-- Navbar --> */}
      <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-between">
        <div class="font-extrabold text-2xl flex items-center">
          {/* <!-- Logo/Title in Navbar --> */}
          <a href="/" class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">Jayd's Cafe</a>
        </div>

        <div class="inline-flex items-center justify-center me-2">
        </div>
      </nav>

      {/* <!-- Form container --> */}
<div class="max-w-md lg:mx-auto mx-5 p-4 mt-2 mb-4 bg-white rounded-xl shadow-md md:max-w-lg md:p-6 md:pt-4 md:mb-6 lg:max-w-lg lg:p-8 lg:pt-6 lg:mb-8">
  <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-black tracking-wider">Register</h2>

  {/* <!-- Form fields --> */}
  <form onSubmit={handleSubmit}>
    <div class="mb-4"> {/* <!-- Phone Input--> */}
      <label for="Phone" class="text-gray-600 text-base sm:text-lg font-bold tracking-wider">Phone Number</label>
      <input 
        onChange={handleInput}
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
        id="pnum" 
        name="pnum"
        type="tel" 
        pattern="09[0-9]{9}" 
        placeholder="Ex. 09123456789"
        required/>
      {errors.pnum && <span className='text-sm text-red-700'> {errors.pnum}</span>}
    </div>

    <div class="mb-4"> {/* <!-- Fullname Input--> */}
      <label for="name" class="text-gray-600 text-base sm:text-lg font-bold tracking-wider">Fullname</label>
      <input 
        onChange={handleInput}
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
        id="name" 
        name="name"
        type="text" 
        placeholder="Ex. Juan Dela Cruz"
        required/>
      {errors.name && <span className='text-sm text-red-700'> {errors.name}</span>}
    </div>

    <div class="mb-4"> {/* <!-- Address Input--> */}
      <label for="address" class="text-gray-600 text-base sm:text-lg font-bold tracking-wider">Address</label>
      <input 
        onChange={handleInput}
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
        id="address" 
        name="address"
        type="text" placeholder="Ex. Salawag Diamond village Blk 10 Lot 4" required/>
      {errors.address && <span className='text-sm text-red-700'> {errors.address}</span>}
    </div>

    <div class="mb-4"> {/* <!-- Email Input--> */}
      <label for="email" class="text-gray-600 text-base sm:text-lg font-bold tracking-wider">Email</label>
      <input 
        onChange={handleInput}
        class="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
        id="email" 
        name="email"
        type="email" 
        placeholder="Ex. JuanDelaCruz@gmail.com" required/>
      {errors.email && <span className='text-sm text-red-700'> {errors.email}</span>}
    </div>
    
    <div class="bg-white w-full max-w-full rounded-md mx-auto flex items-center"> {/* <!-- Password Input--> */}
      <div class="relative w-full">
        <label for="password" class="text-gray-600 text-base sm:text-lg font-bold tracking-wider">Create Password</label>
        <input
          onChange={handleInput}
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Password" 
          class="w-full outline-0 text-gray-600 shadow appearance-none border rounded py-2 px-3 mb-10 leading-10 focus:outline-none focus:shadow-outline" 
          id="password" 
          name='password'
          required/>
        {errors.password && <span className='text-sm text-red-700'> {errors.password}</span>}
        <img src={hidden} alt="Eye" class="absolute right-3 top-10 w-6 sm:w-8 cursor-pointer" id="hide" onClick={togglePasswordVisibility}/> 
      </div>
    </div>

    <div class="mb-6 flex items-center"> {/* <!-- Checkbox Input-->*/}
      <input type="checkbox" id="TAC" class="w-4 sm:w-5 h-4 sm:h-5 mr-5" required/>
      <label for="TAC" class="text-gray-500 text-sm sm:text-base font-bold tracking-wider">
        I agree to the
      </label>
      <span class="text-blue-500 text-sm sm:text-lg cursor-pointer font-bold pl-2 hover:underline" onClick={toggleTermsAndCondiotion}>Terms & conditions</span>
    </div>

    <button class="bg-greenColor hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 mb-10" type="submit">Register Account</button>

    <p class="text-center text-sm sm:text-base">
      I already have an account 
      <span class="text-blue-500 cursor-pointer font-semibold">
        <a href="/login"> Sign In</a>
      </span>
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
}

export default Signup;
