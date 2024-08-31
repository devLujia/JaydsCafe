import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import logo from '../image/logo.png';
import menuIcon from '../image/menu.png';
import userIcon from '../image/UserAcc.png';
import bagIcon from '../image/bag.png';
import google from '../image/google.png'
import hidden from '../image/hidden.png'
import './login.css'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const hide = ()=>{

        let hide = document.getElementById("hide");
        let password = document.getElementById("password");

        if(password.type == "password"){
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
        axios.get('http://localhost:8081/')
            .then(res => {
                if (res.data.valid) {
                    navigation('/');
                } else {
                    navigation('/login');
                }
            })
            .catch(err => console.log(err));

    }, [navigation]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.email === "" && err.password === "") {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data.Login) {
                        navigation('/');
                    } else {
                        alert("No record existed");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="bg-background">
            <nav className="sticky top-0 bg-white z-20 flex justify-between items-center px-4">
            <div className="font-extrabold text-3xl flex items-center">

                    <a href="/" className="flex items-center">
                    
                    {/* Dynamic Image */}
                    <div className="w-16 h-16 overflow-hidden flex justify-center items-center border border-gray-300 rounded-md">
                    <img src={cmsSmallLogo} alt="logo" className="object-cover w-full h-full logo" />
                    </div>{cmsName}</a>
                    
                    </div>
                <span className="menu">
                    <ul className="nav_links md:hidden sm:hidden lg:flex lg:flex-row lg:justify-between">
                        <li className="link"><Link to={'/'}>Home</Link></li>
                        <li className="link"><a id="menu-link" href="#">Menu</a></li>
                        <li className="link"><a href="#about">About Us</a></li>
                        <li className="link"><a href="#footer">Contact Us</a></li>
                    </ul>
                </span>
                <div className="flex items-center">
                    <button className="burger lg:hidden mr-3" id="burger-btn">
                        <img src={menuIcon} alt="menu" />
                    </button>
                    <a href="#">
                        <button className="btn mr-3 w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest">
                            Order Now!
                        </button>
                    </a>
                    <div className="flex space-x-2 mr-2">
                        <a href="#"><img src={userIcon} alt="user" className="mr-3" /></a>
                        <a href="#"><img src={bagIcon} alt="bag" /></a>
                    </div>
                </div>
            </nav>

            {/* Form container */}
            
            <div className="max-w-md mx-auto p-4 mt-2 mb-4 bg-white rounded-xl shadow-md md:max-w-lg md:p-6 md:pt-4 md:mb-6 lg:max-w-xl lg:p-8 lg:pt-6 lg:mb-8">
                
                {/* Image for login */}
                <div className="flex justify-center items-center mb-10">
                    <div
                        className="overflow-hidden flex justify-center items-center rounded-md 
                        w-52 h-36 sm:w-60 sm:h-40 md:w-72 md:h-48 lg:w-80 lg:h-56"
                        >
                        <img src={cmsBigLogo} alt="logo" className="object-cover w-full h-full" />
                    </div> 
                </div>

                <h2 class="text-2xl font-semibold mb-4 text-gray-600">Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        
                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={handleInput}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                    </div>
                    <div className="relative w-full">
                        
                        <input
                            className="w-full outline-0 text-gray-600 shadow appearance-none border rounded py-2 px-3 mb-10 leading-10 focus:outline-none focus:shadow-outline" 
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"    
                            value={values.password}
                            onChange={handleInput}
                            
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        <img src={hidden} alt="Eye" class="absolute right-3 top-3 w-8 cursor-pointer" onClick={hide}/> 
                    </div>
                    
                        <button class="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 mb-10" type="submit">Sign In</button>
                        <p class="mb-10">Don't have an account? <span class="text-blue-500 cursor-pointer font-semibold"><Link to="/signup">Click Here</Link></span></p>
                    
                        <div class="flex items-center mb-4">
                            <hr class="w-full border-t border-gray-300"/>
                            <span class="px-4 text-gray-400 w-full">or sign in with</span>
                            <hr class="w-full border-t border-gray-300"/>
                        </div> 

                        <button class="flex items-center justify-center p-2 mt-10 w-full leading-10 border border-gray-400 rounded-lg hover:bg-gray-200 font-semibold focus:outline-none focus:shadow-outline"><img src={google} alt="Google Icon" class="w-16 px-5"/>Google</button>

                </form>
            </div>

            <footer class="bg-footer w-full h-1/4 py-7 flex flex-col justify-center items-center" id="footer">
                        {/* <!-- container footer--> */}
        <div class="border-y-2 border-gray-400 w-4/5 p-10 flex justify-between">
        
        {/* <!-- logo / soc med--> */}
            <div class="md:flex">
            <div
              className="overflow-hidden flex justify-center items-center rounded-md 
              w-52 h-36 sm:w-60 sm:h-40 md:w-72 md:h-48 lg:w-80 lg:h-56"
            >
              <img src={cmsSmallLogo} alt="logo" className="object-cover w-full h-full" />
            </div>

                {/* <!-- Div for informations--> */}
                <div class="md:flex w-full md:items-center md:flex-wrap" >
                {/* <!-- location--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end">
                        <svg width="27" height="22" viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M5.496 8.174c0-3.515 3.44-6.357 7.695-6.357 4.254 0 7.694 2.842 7.694 6.357 0 3.788-4.858 9.01-6.848 11-.44.435-1.242.435-1.682 0-2-1.99-6.859-7.212-6.859-11zm4.947 0c0 1.254 1.23 2.271 2.748 2.271 1.517 0 2.748-1.017 2.748-2.27 0-1.254-1.231-2.271-2.748-2.271-1.517 0-2.748 1.017-2.748 2.27z"
                            clipRule="evenodd"
                        ></path>
                            </svg>
                            <span class="flex text-white">{cmsLocation}</span>
                    </div>
                    {/* <!-- phone--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end">
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M19.349 14.846l-2.512-.268a2.054 2.054 0 00-1.622.527l-1.82 1.699c-2.799-1.33-5.093-3.463-6.517-6.086l1.83-1.709c.425-.397.632-.951.563-1.515l-.287-2.327c-.118-.933-.959-1.635-1.968-1.635h-1.71c-1.118 0-2.048.869-1.979 1.912.525 7.887 7.28 14.186 15.715 14.676 1.118.064 2.047-.804 2.047-1.848v-1.597c.01-.933-.741-1.718-1.74-1.829z"
                                clipRule="evenodd"
                            ></path>
                            </svg><span class="text-white mr-4">(+63) 908-729-012</span>

                            <svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M8.973 3.039h11.78c.649 0 1.179.416 1.179.924V5.81c0 .508-.53.923-1.178.923H8.973c-.648 0-1.178-.415-1.178-.923V3.963c0-.508.53-.924 1.178-.924zM6.617 7.657H23.11c1.956 0 3.534 1.237 3.534 2.77v3.695c0 1.016-1.06 1.847-2.356 1.847h-2.356v1.847c0 1.016-1.06 1.847-2.356 1.847H10.15c-1.296 0-2.356-.831-2.356-1.847V15.97H5.439c-1.296 0-2.356-.831-2.356-1.847v-3.694c0-1.534 1.578-2.771 3.534-2.771zm4.712 10.16h7.068c.648 0 1.178-.416 1.178-.925v-3.694h-9.424v3.694c0 .509.53.924 1.178.924zm11.78-6.466c-.647 0-1.178-.416-1.178-.924 0-.507.53-.923 1.178-.923.648 0 1.179.416 1.179.924 0 .507-.53.923-1.178.923z"
                                clipRule="evenodd"
                            ></path>
                            </svg><span class="text-white">(+63) 908-729-012</span>
                    </div>
                    {/* <!-- social media--> */}
                    <div class="flex items-center w-full flex-wrap mt-4 justify-end mr-36"> 
                        <span class="text-white pr-3">Social Media</span>
                        {/* <!-- facebook link --> */}
                        <button class="mr-4">
                            <a href={cmsFacebook} class=""><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9841 17.395H1.88631C1.30711 17.395 0.837891 16.9841 0.837891 16.4774V1.68828C0.837891 1.18146 1.30719 0.770752 1.88631 0.770752H18.7853C19.3642 0.770752 19.8336 1.18146 19.8336 1.68828V16.4774C19.8336 16.9842 19.3642 17.395 18.7853 17.395H13.9447V10.9572H16.4138L16.7835 8.44824H13.9447V6.84645C13.9447 6.12005 14.1752 5.62504 15.3654 5.62504L16.8835 5.62446V3.38044C16.6209 3.34987 15.7198 3.28156 14.6714 3.28156C12.4826 3.28156 10.9841 4.45078 10.9841 6.59797V8.44824H8.50865V10.9572H10.9841V17.395Z" fill="white"/>
                            </svg>
                            </a>
                        </button>
                        {/* <!-- Instagram link --> */}
                        <button class="mr-4">
                            <a href={cmsInstagram} class="" ><svg width="20" height="18" viewBox="4 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M14.723 2.77c-2.909 0-3.273.01-4.416.05-1.14.041-1.918.182-2.599.387-.704.213-1.301.497-1.897.959-.595.462-.961.926-1.235 1.472-.264.529-.445 1.133-.497 2.018-.053.886-.065 1.17-.065 3.427s.012 2.54.065 3.427c.052.885.233 1.489.497 2.018.274.546.64 1.01 1.235 1.472.596.462 1.193.746 1.897.959.681.205 1.46.346 2.6.386 1.142.04 1.506.05 4.415.05 2.908 0 3.272-.01 4.415-.05 1.14-.04 1.918-.18 2.599-.386.704-.213 1.301-.497 1.897-.96.595-.461.961-.925 1.235-1.471.264-.53.445-1.133.497-2.018.053-.887.065-1.17.065-3.427 0-2.258-.012-2.54-.065-3.427-.052-.885-.233-1.49-.497-2.018-.274-.546-.64-1.01-1.235-1.472-.596-.462-1.193-.746-1.897-.959-.681-.205-1.46-.346-2.6-.386-1.142-.04-1.506-.05-4.414-.05zm0 1.498c2.858 0 3.197.009 4.326.049 1.044.037 1.611.172 1.989.286.5.15.856.331 1.23.622.376.29.608.568.802.956.147.293.321.733.369 1.543.051.877.062 1.14.062 3.359 0 2.22-.01 2.482-.062 3.359-.048.81-.222 1.25-.369 1.543a2.62 2.62 0 01-.801.956c-.375.29-.731.47-1.231.622-.378.114-.945.249-1.989.286-1.129.04-1.467.048-4.327.048s-3.198-.008-4.327-.048c-1.044-.037-1.611-.172-1.988-.286-.5-.151-.857-.331-1.232-.622a2.62 2.62 0 01-.8-.956c-.147-.293-.322-.733-.37-1.543-.05-.877-.062-1.14-.062-3.36 0-2.219.011-2.481.063-3.358.047-.81.222-1.25.368-1.543.195-.388.427-.665.801-.956.375-.291.732-.471 1.232-.622.377-.114.944-.25 1.988-.286 1.13-.04 1.468-.049 4.327-.049zm-5.5 6.815c0-2.358 2.462-4.269 5.5-4.269 3.036 0 5.498 1.911 5.498 4.269 0 2.357-2.462 4.268-5.499 4.268-3.037 0-5.499-1.91-5.499-4.268zm5.5 2.77c-1.972 0-3.57-1.24-3.57-2.77s1.598-2.77 3.57-2.77c1.97 0 3.569 1.24 3.569 2.77s-1.599 2.77-3.57 2.77zm5.716-6.21c.71 0 1.285-.446 1.285-.997 0-.551-.576-.998-1.285-.998-.71 0-1.285.447-1.285.998 0 .55.575.997 1.285.997z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                            </a>
                        </button>
                        {/* <!-- RSS link --> */}
                         <button><a href={cmsLink}><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M20 17.395h-3.768c0-7.42-7.184-13.458-16.015-13.458V.771C11.125.77 20 8.229 20 17.395zM.217 15.02c0-1.311 1.266-2.375 2.826-2.375 1.561 0 2.826 1.064 2.826 2.375 0 1.312-1.265 2.375-2.826 2.375-1.56 0-2.826-1.063-2.826-2.375zm9.421 2.375h3.768c0-6.111-5.917-11.083-13.189-11.083v3.167c5.195 0 9.421 3.551 9.421 7.916z"
                                clipRule="evenodd"
                            ></path>
                            </svg>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">About Us</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Contact Us</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Help</a></li>
            <li class="footer-links"><a href="#" class="hover:underline me-4 md:me-6">Private Policy</a></li>
            <li class="footer-links"><a href="#" class="hover:underline">Disclaimer</a></li>
          </ul>
          
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span>
        </div>
    </footer> 
        </div>
    );
};

export default Login;