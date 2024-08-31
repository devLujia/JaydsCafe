import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import image1 from '../image/bg_bean.png';
import image2 from '../image/bg_bean2.png';
import image3 from '../image/milktea.png';
import image8 from '../image/logo.png';
import image9 from '../image/UserAcc.png';
import image10 from '../image/bag.png';
import image11 from '../image/menu.png';
import aboutUsImage from '../image/AboutUs.png';
import beansImage from '../image/coffe_bean.png';
import milkteaoffer from '../image/milktea_offer.png';
import splash from '../image/splash.png';
import coffee from '../image/coffee.png';
import snacks from '../image/snacks.png';
import chat from '../image/live-chat.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {

  const [cmsName,setCmsName] = useState('');
  const [cmsBigLogo,setBigLogo] = useState(null);
  const [cmsSmallLogo,setSmallLogo] = useState(null);
  const [cmsAboutUsImage,setAboutUsImage] = useState(null);
  const [cmsAboutUs,setAboutUs] = useState('');
  const [cmsOperationHour,setOperationHour] = useState('');
  const [cmsOperationDays,setOperationDays] = useState('');
  const [cmsLocation,setLocation] = useState('');
  const [cmsFacebook,setCmsFacebook] = useState('');
  const [cmsInstagram,setCmsInstagram] = useState('');
  const [cmsLink,setCmsLink] = useState('');
  const [cmsPhone,setCmsPhone] = useState('');
  const [cmsTel,setCmsTel] = useState('');
  const [cmsMilkTeaPrice,setCmsMilkTeaPrice] = useState('');
  const [cmsCoffeePrice,setCmsCoffeePrice] = useState('');
  const [cmsSnackPrice,setCmsSnackPrice] = useState('');
 
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
    const fetchMilkTeaPriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Milktea Price'});
        setCmsMilkTeaPrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const fetchCoffeePriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Coffee Price'});
        setCmsCoffeePrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    const fetchSnackPriceData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Snack Price'});
        setCmsSnackPrice(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    
    const fetchaboutusData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'About Us'});
        setAboutUs(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchOperationHoursData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Operation hours'});
        setOperationHour(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchOperationDaysData = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Operation Days'});
        setOperationDays(response.data.content || '')
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
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Big Logo'});
        setBigLogo(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchAboutUsImage = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Store Image'});
        setAboutUsImage(response.data.content || '');
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

    const fetchLocation = async () => {

      try{
        const response = await axios.post ('http://localhost:8081/cms', {title: 'Location'});
        setLocation(response.data.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    }

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

      fetchPhoneData();
      fetchTelData();
      fetchNameData();
      fetchLocation();
      fetchaboutusData();
      fetchLinkData();
      fetchInstagramLinkData();
      fetchFacebookLinkData();
      fetchBigLogo();
      fetchSmallLogo();
      fetchAboutUsImage();
      fetchSnackPriceData();
      fetchCoffeePriceData();
      fetchMilkTeaPriceData();
      fetchOperationHoursData();
      fetchOperationDaysData();


  },[])


  useEffect(() => {
    // Burger menu functionality
    const burgerBtn = document.getElementById('burger-btn');
    const navLinks = document.querySelector('.nav_links');
    if (burgerBtn && navLinks) {
      burgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('hidden');
      });
    }

    // Double click functionality
    let clickCount = 0;
    let lastClickTime = 0;
    const menuLink = document.getElementById('menu-link');
    if (menuLink) {
      menuLink.addEventListener('click', (event) => {
        event.preventDefault();
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;

        if (timeDiff < 500) { // 500ms threshold for double click
          clickCount++;
        } else {
          clickCount = 1;
        }

        lastClickTime = currentTime;

        if (clickCount % 2 === 1) {
          window.location.href = '#Menu';
        } else {
          window.location.href = '#offer';
        }
      });
    }

    // Scroll functionality for review tab
    const scrollContainer = document.querySelector('.gallery');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
      });

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          scrollContainer.scrollLeft += 900;
        });
      }

      if (backBtn) {
        backBtn.addEventListener('click', () => {
          scrollContainer.scrollLeft -= 900;
        });
      }
    }

    // Chatbot functionality
    const chatbox = document.getElementById('chatbox');
    const chatContainer = document.getElementById('chat-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const openChatButton = document.getElementById('open-chat');
    const closeChatButton = document.getElementById('close-chat');

    let isChatboxOpen = true; // Set the initial state to open

    function toggleChatbox() {
      if (chatContainer) {
        chatContainer.classList.toggle('hidden');
        isChatboxOpen = !isChatboxOpen; // Toggle the state
      }
    }

    if (openChatButton) {
      openChatButton.addEventListener('click', toggleChatbox);
    }

    if (closeChatButton) {
      closeChatButton.addEventListener('click', toggleChatbox);
    }

    if (sendButton) {
      sendButton.addEventListener('click', function () {
        const userMessage = userInput.value;
        if (userMessage.trim() !== '') {
          addUserMessage(userMessage);
          respondToUser(userMessage);
          userInput.value = '';
        }
      });
    }

    if (userInput) {
      userInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          const userMessage = userInput.value;
          addUserMessage(userMessage);
          respondToUser(userMessage);
          userInput.value = '';
        }
      });
    }

    function addUserMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2', 'text-right');
      messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
      chatbox.appendChild(messageElement);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function addBotMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('mb-2');
      messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
      chatbox.appendChild(messageElement);
      chatbox.scrollTop = chatbox.scrollHeight;
    }

    function respondToUser(userMessage) {
      // Replace this with your chatbot logic
      setTimeout(() => {
        addBotMessage('Burat!');
      }, 500);
    }

    // Automatically open the chatbox on page load
    toggleChatbox();

    // Initialize AOS
    AOS.init();

    // Cleanup event listeners on component unmount
    return () => {
      if (burgerBtn) {
        burgerBtn.removeEventListener('click', () => {
          navLinks.classList.toggle('hidden');
        });
      }

      if (menuLink) {
        menuLink.removeEventListener('click', (event) => {
          event.preventDefault();
          // Your click event logic
        });
      }

      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', (evt) => {
          evt.preventDefault();
          scrollContainer.scrollLeft += evt.deltaY;
        });

        if (nextBtn) {
          nextBtn.removeEventListener('click', () => {
            scrollContainer.scrollLeft += 900;
          });
        }

        if (backBtn) {
          backBtn.removeEventListener('click', () => {
            scrollContainer.scrollLeft -= 900;
          });
        }
      }

      if (openChatButton) {
        openChatButton.removeEventListener('click', toggleChatbox);
      }

      if (closeChatButton) {
        closeChatButton.removeEventListener('click', toggleChatbox);
      }

      if (sendButton) {
        sendButton.removeEventListener('click', () => {
          const userMessage = userInput.value;
          if (userMessage.trim() !== '') {
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInput.value = '';
          }
        });
      }

      if (userInput) {
        userInput.removeEventListener('keyup', (event) => {
          if (event.key === 'Enter') {
            const userMessage = userInput.value;
            addUserMessage(userMessage);
            respondToUser(userMessage);
            userInput.value = '';
          }
        });
      }
    };
  }, []);

  const [authenticated, setAuthenticated] = useState(false);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/menu')
  }
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        if (res.data.valid) {
          setAuthenticated(true);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:8081/logout');
      if (res.data.success) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        navigate('/');
      } else {
        console.log('Logout Failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const navLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 bg-gradient-to-tr from-white via-orange-100 to-amber-200 z-20 shadow-md">
        <div className="font-extrabold text-3xl flex items-center">

          <a href="#" className="flex items-center">
            
            {/* Dynamic Image */}
            <div className="w-16 h-16 overflow-hidden flex justify-center items-center border border-gray-300 rounded-md">
          <img src={cmsSmallLogo} alt="logo" className="object-cover w-full h-full logo" />
            </div>{cmsName}</a>
            
        </div>
        <span class="menu">

          <ul class="nav_links md:hidden sm:hidden lg:flex lg:flex-row lg:justify-between" >
            <li className="link"><a href="#Landing1">Home</a></li>
            <li className="link"><a id="menu-link" href="#Menu" >Menu</a></li>
            <li className="link"><a href="#about">About Us</a></li>
            <li className="link"><a href="#footer">Contact Us</a></li>
          </ul>

        </span>

        <div className="flex items-center">
          <button className="burger lg:hidden mr-3" id="burger-btn"><img src={image11} alt="" /></button>
          {authenticated ? (
            <>
              <div className="flex space-x-2 mr-2">
                <a href="#"><img src={image9} alt="user" className="mr-3" /> </a>
                <Link to={'/cart'}><img src={image10} alt="bag"/></Link>
              </div>
              <button
                onClick={handleLogout}
                className="btn w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest lg:bg-green-600 md:bg-yellow-500 sm:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={navLogin} className="btn mr-3 w-48 h-14 bg-gradient-to-tr from-orange-500 via-orange-400 to-amber-200 hover:bg-gradient-to-bl hover:from-orange-500 hover:via-orange-400 hover:to-amber-200 text-gray-100 text-base tracking-widest">
              Login/Sign Up
            </button>
          )}
        </div>
      </nav>

      <div class="fixed bottom-0 right-0 mb-4 mr-4 z-50 w-16 h-16">
        <button id="open-chat" class="bg-amber-600 text-white py-2 px-4 rounded-full hover:bg-amber-700 transition duration-300 flex items-center w-16 h-16">
            <img src={chat} alt="chat"/>
        </button>
    </div>
    <div id="chat-container" class="hidden fixed bottom-16 right-4 w-96 z-50">
        <div class="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
            <div class="p-4 border-b bg-amber-600 text-white rounded-t-lg flex justify-between items-center">
                <p class="text-lg font-semibold">{cmsName} Admin</p>
                <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatbox" class="p-4 h-80 overflow-y-auto">
                
              {/* <!-- Chat messages will be displayed here --> */}
              <div class="mb-2">
                <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Hi! Welcome to {cmsName}. How can I help you?</p>
              </div>
            </div>
            <div class="p-4 border-t flex">
                <input id="user-input" type="text" placeholder="Type a message" class="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button id="send-button" class="bg-amber-600 text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition duration-300">Send</button>
            </div>
        </div>
    </div>

      {/* Landing section */}
      <div className="pt-10 pb-52" id="Landing1">
        <div className="relative">

        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-right"  data-aos-duration="1500"/>
        
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/>
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" data-aos="fade-down-left" data-aos-duration="1500"/> 
        <img src={beansImage} alt="Coffee Bean" class="coffee-bean" /> 


            <div class="beans object-center">
                <img src={image1} alt="bean" class="w-60 h-56 block" data-aos="fade-down-right" data-aos-duration="1500"/>
                <img src={image2} alt="bean" class="w-60 h-56 block" data-aos="fade-down-right" data-aos-duration="1500"/>
            </div>

          <div className="pt-11 absolute bottom-0 m-auto top-0 left-0 right-0">
            <p className="text-center font-semibold text-2xl">WELCOME TO <br />
              <span className="text-yellow-950 font-bold text-8xl">{cmsName}</span> <br />
              <span className="font-light text-xl">Embrace The Harmony Of Milk Tea And Pure Bliss.</span></p>
          </div>
        </div>

        <div className="flex flex-row w-full top-[700px] lg:absolute md:mt-10 mb-10 overflow-hidden h-full">
          <div class="pl-40 w-full" data-aos="fade-down-left" data-aos-duration="1500">
            <p className="text-2xl absolute left-0 pl-20">
              <span className="font-semibold">OPERATION HOURS</span><br />
              {cmsOperationDays} <br />
              {cmsOperationHour}
            </p>
          </div>

          
          <div className="p-4">
            <p className="text-2xl absolute right-0 pr-20" data-aos="fade-down-right" data-aos-duration="1500">
              <span className="font-semibold">LOCATED AT</span><br />
              {cmsLocation}
            </p>
          </div>
        </div>

        <div className="relative w-full h-auto">
          <div className="object-center flex justify-center items-center pt-12">

          <div
        className="overflow-hidden flex justify-center items-center rounded-md w-[717px] h-[527px]">
        <img src={cmsBigLogo} alt="display1" className="object-cover w-full h-full" data-aos="fade-up" data-aos-duration="1500" />
      </div>
            
          </div>
          <div className="flex flex-col justify-center items-center top-[550px] absolute bottom-0 right-0 w-[100%]">
            <button onClick={handleNavigate} type="button" className="text-yellow-950 bg-orange-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 tracking-wide font-bold rounded-full italic text-3xl px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[258px] h-80 shadow-xl items-center">Order Now!</button>
          </div>
        </div>
      </div>

      {/* Menu section */}
      <div id="Menu">
        <h1 className="font-bold text-stone-800 text-7xl text-center pb-10">Best Sellers</h1>
        <h2 className="font-bold text-orange-900 text-center text-3xl tracking-wider pb-10">Enjoy a new blend of Milk Tea and Coffee style!</h2>
        <h3 className="text-center text-xl tracking-wider pb-10">Explore all flavours of coffee with us. There is always a new cup worth experiencing</h3>

        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-20 right-0 p-14 rotate--90 z-[-1]" />
        </div>

        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-14 z-[-1]" />
        </div>

        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold text-center mb-8">Our Coffee Menu</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {foods.map(food => (
              <div key={food.id} class="bg-cards rounded-3xl p-4 z-10">
                <img src={food.image_url} alt={food.name} class="w-full h-48 object-cover rounded-md mb-4" />
                <h2 className="text-4xl font-semibold text-center mb-2 text-yellow-950">{food.name}</h2>
                <p className="text-black mb-4">{food.description}</p>
                <div className="flex items-center justify-between">
                         
                    <span key={food.size} className="text-gray-500">
                      Price starts at P{food.price}
                    </span>
            
                  <button onClick={handleNavigate} class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4">BUY NOW</button>
                </div>
              </div>
            ))}

              {/* <!-- Background Coffee --> */}

          <div class="relative bg-cover">
                      <img src={image1} alt="beans" class="absolute bottom-0 left-0 p-14 z-0"/>
                  </div>
          </div>

        <div class="bg-exportColor h-screen w-full mb-10 relative" id="offer"> 

        <h2 class="text-4xl font-semibold text-center mb-20 pt-10 text-yellow-950">Menu Offering</h2>

        <div class="splash">
            <img src={splash} alt="splash" class="absolute top-0 right-0 rotate-180 z--0"/>
            <img src={splash} alt="splash" class="absolute bottom-0 left-0 z-0"/>
            </div>

        <div class="flex flex-col justify-center items-center">

            <div class="flex flex-row text-right pr-64">
                <img src={milkteaoffer} alt="Milktea" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1500"/>
                <h1 class="font-extrabold text-left self-center" data-aos="fade-right" data-aos-duration="1500">MILK TEA <br/>
                    <span class="font-normal">{cmsMilkTeaPrice}</span>
                </h1>
            </div>
            <div class="flex flex-row text-left pl-96">
                <h1 class="font-extrabold text-left self-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">COFFEE <br/>
                    <span class="font-normal">{cmsCoffeePrice}</span>
                </h1>
                <img src={coffee} alt="Coffee" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="500"/>
            </div>
            <div class="flex flex-row text-right pr-56 mb-11">
                <img src={snacks} alt="Snacks" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="700"/>
                <h1 class="font-extrabold text-left self-center" data-aos="fade-right" data-aos-duration="1500">SNACKS <br/>
                    <span class="font-normal">{cmsSnackPrice}</span>
                </h1>
            </div>
        </div>

        <button onClick={handleNavigate} class="py-3 px-6 bg-orange-950 hover:bg-orange-900 text-white font-bold rounded-full shadow-md transition duration-300 ease-in-out flex justify-center mx-auto">
            View All Products
            <svg class="rtl:rotate-180 text-lg w-6 h-6 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>

    </div>
        </div>

        {/* <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute bottom-0 left-0 p-14 z-[-1]" />
        </div> */}
      </div>

      {/* About Us section */}
      <div className="flex lg:flex-row md:flex-col" id="about">
        <div className="p-32 md:text-center lg:text-left" data-aos="fade-right" data-aos-offset="300"data-aos-easing="ease-in-sine" data-aos-duration="1500">
          <h3 className="font-extrabold text-6xl mb-10">Our Story</h3>
          <h2 className="font-extrabold text-4xl mb-10">Let Us Introduce Ourselves</h2>
          <p className="max-w-lg md:m-auto">{cmsAboutUs}</p>
          <button type="button" className="mt-12 text-orange-950 hover:text-white border border-orange-950 hover:bg-orange-950 focus:ring-4 focus:outline-none focus:ring-orange-950 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-950 dark:text-orange-950 dark:hover:text-white dark:hover:bg-orange-950 dark:focus:ring-orange-950">Order Now!</button>
        </div>
        <img src={cmsAboutUsImage} alt="About Us" id="aboutUsPic" className="w-[550px] h-[591px] md:m-auto" data-aos="fade-down-left" data-aos-duration="1500"/>
      </div>

      {/* Reviews section */}
      <div className="mt-20 h-screen">
        <h2 className="font-extrabold text-4xl mb-10 text-yellow-950 text-center">Reviews</h2>
        <div className="relative bg-cover">
          <img src={image1} alt="beans" className="absolute top-20 right-96 p-14 rotate--90 z-[-1]" />
        </div>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.css" rel="stylesheet" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
      </div>

      {/* <!-- FAQ --> */}
    <div class="h-screen pt-10">
      <h2 class="text-4xl font-extrabold text-white mb-10 flex flex-col justify-center items-center tracking-widest"> Frequently Asked Questions </h2>

      <div class="flex justify-center items-center">
        <div
          id="accordion-color"
          data-accordion="collapse"
          data-active-classes="bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-white"
          class="w-4/5"
        >
          <h2 id="accordion-color-heading-1">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 hover:text-gray-600 gap-3"
              data-accordion-target="#accordion-color-body-1"
              aria-expanded="true"
              aria-controls="accordion-color-body-1"
            >
              <span class="text-lg">How do I place an order on JoeExpress?</span>
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-1"
            class="hidden"
            aria-labelledby="accordion-color-heading-1"
          >
            <div
              class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                To place an order, simply browse our menu, select your favorite
                items, and add them to your cart. Once you're ready, proceed to
                checkout, where you can review your order and provide your
                delivery details. Finally, choose your preferred payment method
                and confirm your order.
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-2">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-b-0 border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 hover:text-gray-600 gap-3"
              data-accordion-target="#accordion-color-body-2"
              aria-expanded="false"
              aria-controls="accordion-color-body-2"
            >
              <span class="text-lg">What payment methods do you accept?</span>
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-2"
            class="hidden"
            aria-labelledby="accordion-color-heading-2"
          >
            <div
              class="p-5 border border-b-0 border-gray-200 dark:border-gray-700"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                We accept only Cash on delivery or Gcash payment method.
              </p>
            </div>
          </div>
          <h2 id="accordion-color-heading-3">
            <button
              type="button"
              class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-white border border-gray-200 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 dark:border-gray-700 dark:text-gray-400 hover:bg-blue-100 hover:text-gray-600 gap-3"
              data-accordion-target="#accordion-color-body-3"
              aria-expanded="false"
              aria-controls="accordion-color-body-3"
            >
              <span class="text-lg">Do you charge for delivery?</span>
              <svg
                data-accordion-icon
                class="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id="accordion-color-body-3"
            class="hidden"
            aria-labelledby="accordion-color-heading-3"
          >
            <div
              class="p-5 border border-t-0 border-gray-200 dark:border-gray-700"
            >
              <p class="mb-2 text-gray-500 dark:text-gray-400">
                We offer free delivery for orders over a certain amount. For
                orders below this amount, a small delivery fee may apply.
                Details will be provided during checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Footer */}
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
                            </svg><span class="text-white mr-4">{cmsPhone}</span>

                            <svg width="29" height="23" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <path
                                fill="#fff"
                                fillRule="evenodd"
                                d="M8.973 3.039h11.78c.649 0 1.179.416 1.179.924V5.81c0 .508-.53.923-1.178.923H8.973c-.648 0-1.178-.415-1.178-.923V3.963c0-.508.53-.924 1.178-.924zM6.617 7.657H23.11c1.956 0 3.534 1.237 3.534 2.77v3.695c0 1.016-1.06 1.847-2.356 1.847h-2.356v1.847c0 1.016-1.06 1.847-2.356 1.847H10.15c-1.296 0-2.356-.831-2.356-1.847V15.97H5.439c-1.296 0-2.356-.831-2.356-1.847v-3.694c0-1.534 1.578-2.771 3.534-2.771zm4.712 10.16h7.068c.648 0 1.178-.416 1.178-.925v-3.694h-9.424v3.694c0 .509.53.924 1.178.924zm11.78-6.466c-.647 0-1.178-.416-1.178-.924 0-.507.53-.923 1.178-.923.648 0 1.179.416 1.179.924 0 .507-.53.923-1.178.923z"
                                clipRule="evenodd"
                            ></path>
                            </svg><span class="text-white">{cmsTel}</span>
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
}

export default Home;
