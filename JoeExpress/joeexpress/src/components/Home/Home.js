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
    axios.get('http://localhost:5051/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5051/')
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
      const res = await axios.post('http://localhost:5051/logout');
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

      <nav className="sticky top-0 bg-white z-20">
        <div className="font-extrabold text-3xl flex items-center">
          <a href="#" className="flex items-center"><img src={image8} alt="logo" className="logo" />JoeExpress</a>
        </div>
        <span class="menu">
          <ul class="nav_links md:hidden sm:hidden lg:flex lg:flex-row lg:justify-between" >
            <li className="link"><a href="#Landing1">Home</a></li>
            <li className="link"><a id="menu-link" href="#Menu" >Menu</a></li>
            <li className="link"><a href="#about">About Us</a></li>
            <li className="link"><a href="#">Contact Us</a></li>
          </ul>
        </span>

        <div className="flex items-center">
          <button className="burger lg:hidden mr-3" id="burger-btn"><img src={image11} alt="" /></button>
          {authenticated ? (
            <>
              <div className="flex space-x-2 mr-2">
                <a href="#"><img src={image9} alt="user" className="mr-3" /></a>
                <Link to={'/menu'}><img src={image10} alt="bag"/></Link>
              </div>
              <button
                onClick={handleLogout}
                className="btn w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest lg:bg-green-600 md:bg-yellow-500 sm:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={navLogin} className="btn mr-3 w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest lg:bg-green-600 md:bg-yellow-500 sm:bg-blue-600">
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
                <p class="text-lg font-semibold">Pouring Joe Admin</p>
                <button id="close-chat" class="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatbox" class="p-4 h-80 overflow-y-auto">
                
              {/* <!-- Chat messages will be displayed here --> */}
              <div class="mb-2">
                <p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">Hi! Welcome to Pouring Joe. How can I help you?</p>
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
              <span className="text-yellow-950 font-bold text-8xl">POURING JOE</span> <br />
              <span className="font-light text-xl">Embrace The Harmony Of Milk Tea And Pure Bliss.</span></p>
          </div>
        </div>

        <div className="flex flex-row w-full top-[700px] lg:absolute md:mt-10 mb-10">
          <div class="pl-40 w-full" data-aos="fade-down-left" data-aos-duration="1500">
            <p className="text-2xl absolute left-0 pl-20">
              <span className="font-semibold">OPERATION HOURS</span><br />
              MONDAY-SATURDAY <br />
              2:00 PM - 9:00 PM
            </p>
          </div>

          
          <div className="p-4">
            <p className="text-2xl absolute right-0 pr-20" data-aos="fade-down-right" data-aos-duration="1500">
              <span className="font-semibold">LOCATED AT</span><br />
              AURORA HOME SALINAS 1 <br />
              BACOOR, CAVITE
            </p>
          </div>
        </div>

        <div className="relative w-full h-auto">
          <div className="object-center flex justify-center items-center pt-12">
            <img src={image3} alt="display1" data-aos="fade-up" data-aos-duration="1500" />
          </div>
          <div className="flex flex-col justify-center items-center top-[550px] absolute bottom-0 right-0 w-[100%]">
            <button type="button" className="text-yellow-950 bg-orange-100 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 tracking-wide font-bold rounded-full italic text-3xl px-5 py-2.5 me-2 mb-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-[258px] h-80 shadow-xl items-center">Order Now!</button>
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

        <div className="container mx-auto p-6">
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
            
                  
                  <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mt-4">BUY NOW</button>
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
                    <span class="font-normal">29 Pesos to 39 Pesos</span>
                </h1>
            </div>
            <div class="flex flex-row text-left pl-96">
                <h1 class="font-extrabold text-left self-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="500">COFFEE <br/>
                    <span class="font-normal"> 29 Pesos to 59 Pesos</span>
                </h1>
                <img src={coffee} alt="Coffee" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="500"/>
            </div>
            <div class="flex flex-row text-right pr-56 mb-11">
                <img src={snacks} alt="Snacks" class="w-36 h-36" data-aos="zoom-out-up" data-aos-duration="1000" data-aos-delay="700"/>
                <h1 class="font-extrabold text-left self-center" data-aos="fade-right" data-aos-duration="1500">SNACKS <br/>
                    <span class="font-normal">49 Pesos to 59 Pesos</span>
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
          <p className="max-w-lg md:m-auto">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non porro rem, quod corrupti eius iure sit nihil similique, et voluptatem possimus tenetur! Eum obcaecati sed odio velit labore quas in!</p>
          <button type="button" className="mt-12 text-orange-950 hover:text-white border border-orange-950 hover:bg-orange-950 focus:ring-4 focus:outline-none focus:ring-orange-950 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-950 dark:text-orange-950 dark:hover:text-white dark:hover:bg-orange-950 dark:focus:ring-orange-950">Order Now!</button>
        </div>
        <img src={aboutUsImage} alt="About Us" id="aboutUsPic" className="w-[550px] h-[591px] md:m-auto" data-aos="fade-down-left" data-aos-duration="1500"/>
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

      {/* Footer */}
      <footer>
        {/* Your footer content here */}
      </footer>

      
    </div>
  );
}

export default Home;
