import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnnMarfega from '../image/AnnMarfega.svg'
import IaMae from '../image/IaMae.svg'
import Angelou from '../image/Angelou.svg'
import image1 from '../image/bg_bean.png';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import userIcon from '../image/UserAcc.svg';
import bagIcon from '../image/bag.svg';
import image11 from '../image/menu.png';
import chat from '../image/chat.svg';
import MapModal from '../Map/Map';
import AOS from 'aos';
import 'aos/dist/aos.css';
//import { io } from 'socket.io-client';
import Terms from '../UserModal/TermsAndCondition/Terms'
import ChatComponent from '../UserModal/ChatService/ChatComponent'
import socket from '../AdminModule/Message/socketService';

function Home() {

  const reviews = [
    {
      name: "John",
      date: "September 12, 2024",
      comment: "highly recommended ,very affordable and quality Ng drinks very generous Ng serving."
    },
    {
      name: "Jia",
      date: "September 10, 2024",
      comment: "A must try coffee shop! 💯 Thank you sa masarap at affordable na kape, Jayd’s Cafe! 🤎."
    },
    {
      name: "Anne",
      date: "April 9, 2024",
      comment: "It's my first time to order with them, and I'm so glad I did! The best yung halo halo, ganito yung way nang paggawa ng halohalo for personal consumption, walang sahog na tinipid, bawat sangkap may lasa at masarap! Magiging suki nyo po ako for sure! Thanks again Jayd's cafe!"
    },
    {
      name: "Ia Mae",
      date: "February 23, 2024",
      comment: "Jayd's has been our go-to for our coffee and non-coffee drink cravings kaya naman paulit-ulit parin kami na dito bumibili ng iced drinks. Lahat ng drinks na na-try namin sa kanila, nagustuhan namin."
    },
    {
      name: "Angelou",
      date: "February 15, 2024",
      comment: "You know it's good if you're already a repeat customer. I love the coffee here, it's consistently delicious and the shop delivers in a timely manner which makes it the best choice for coffee delivery. Convenient location ·Good for working ·Best iced coffee"
    },
    {
      name: "Ems",
      date: "August 23, 2023",
      comment: "Affordable and delicious milk tea 😊 thanks for the fast response and delivery"
    }
  ]

  const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including cash, and popular mobile wallet like GCash for your convenience.",
        },
        {
            question: "What are your operating hours?",
            answer: "Our coffee shop is open from 3pm to 9pm daily. Please check our website or social media for any updates on holiday hours or special events.",
        },
        {
            question: "Do you offer takeout and delivery services?",
            answer: "Yes, we offer both takeout and delivery services. You can place your order in-store or through our website and popular delivery apps for your convenience.",
        },
        {
            question: "Do you offer loyalty programs or discounts?",
            answer: "Yes, we have a loyalty program that rewards our customers with points for every purchase. You can redeem these points for discounts or free items. Check with our staff for details on how to avail!",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
  
  const [categoryId, setCategoryId] = useState('');

  //styles inside the element
  const styleCard = {
    transform: 'scale(1.5)', 
    opacity: '0.1',
  };

  const styleCard2 = {
    background: 'radial-gradient(black, transparent 0.6)', 
    transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', 
    opacity: '0.2',
  }
  
  const cardContainers = {
    display: 'none',
  }
  

  const [visibleCategory, setVisibleCategory] = useState('all'); // Default visible category

  // Function to toggle visibility
  

  const [FAQ1, setFAQ1] = useState(false);
  const [FAQ2, setFAQ2] = useState(false);
  const [FAQ3, setFAQ3] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const [cmsName,setCmsName] = useState('');
  const [cmsReview1,setReview1] = useState(null);
  const [cmsReview2,setReview2] = useState(null);
  const [cmsReview3,setReview3] = useState(null);
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
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [orderNotif, setOrderNotif] = useState(0);
  const [TermsModal,setTermsModal] = useState(false); //modal
  const [ChatModal,setChatModal] = useState(false); //modal

  // modal
  const toggleTermsAndCondiotion = () =>{
    setTermsModal(!TermsModal)
  }
  const toggleChatModal = () =>{
    setChatModal(!ChatModal)
  }

  const toggleVisibility = (category) => {
    setVisibleCategory(category);
  };

  // scrollable review
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const toggleFAQ1 = () => {
    setFAQ1(!FAQ1);
  };

  const toggleFAQ2 = () => {
    setFAQ2(!FAQ2);
  };

  const toggleFAQ3 = () => {
    setFAQ3(!FAQ3);
  };


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
 
  useEffect(()=>{


    console.log(orderNotif)

    const fetchNameData = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Business Name'});
        setCmsName(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchReview1Data = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Review1'});
        setReview1(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchReview2Data = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Review2'});
        setReview2(response.data.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    
    const fetchReview3Data = async () => {
      try {
        const response = await axios.post('http://localhost:8081/cms', {title: 'Review3'});
        setReview3(response.data.content || '');
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


  // Toggle dropdown visibility
    
      fetchReview1Data()
      fetchReview2Data()
      fetchReview3Data()
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

  const handleMapModal = () => {
    setMapModal(!mapModal);
  };


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
      setTimeout(() => {
        addBotMessage('Burat!');
      }, 500);
    }

    toggleChatbox();

    AOS.init();

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
  const [category, setCategory] = useState([]);
  const [menu, setMenu] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    navigate('/menu')
  }
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post('http://localhost:8081/profile', { userId });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile details:', error);
      }
    };
  
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    axios.get('http://localhost:8081/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food details:', error);
      });
  }, []);

  useEffect(()=>{

    axios.post('http://localhost:8081/fetchCategory')
    .then(response => {
      setCategory(response.data);
    })
    .catch(error => {
      console.error('Error fetching category details:', error);
    });

  },[])

  useEffect(()=>{
    axios.get('http://localhost:8081/menu')
      .then(response => {
        setMenu(response.data);
      })
      .catch(error => {
        console.error('Error fetching menu details:', error);
      });
  },[])
  
  useEffect(() => { 
    if (userId) { 
        socket.emit('notif', userId);

        socket.on('orderNotif', (data) => {
            setOrderNotif(data); 
        });

        return () => {
            socket.off('orderNotif');  
        };
    }
}, [userId]); 

useEffect(() => {
  const handleCartUpdate = (data) => {
      if (data.success) {
          setOrderNotif(prevCount => prevCount + 1);
      }
  };

  socket.on('cartUpdate', handleCartUpdate);

  return () => {
      socket.off('cartUpdate', handleCartUpdate);
  };
}, [socket]);

  // tagabalik

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        if (res.data.valid) {
          setAuthenticated(true);
          setUserId(res.data.userId);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const handleCategory = (id) => {
    setCategoryId(id);
  }

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

  const [isOpenBurger, setIsOpenBurger] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdownBurger = () => {
    setIsOpenBurger(!isOpenBurger);
  };

  return (
  
    <div class="bg-jaydsBg">

    {mapModal && <MapModal closeModal ={() => setMapModal(!mapModal)} />}
    {TermsModal && <Terms closeModal={setTermsModal}/>}
    {TermsModal && <Terms closeModal={setTermsModal}/>}

    {/* <!-- nav --> */}
    <nav class="sticky top-0 bg-white z-20 shadow-lg">
      <div class="font-extrabold text-2xl flex items-center">
        {/* <!-- Logo/Title in Navbar --> */}
        <a href="#" class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">{cmsName}</a>
      </div>
      
      <span className="menu">
        <div class="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="#" class="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:p-0 " aria-current="page">Home</a>
            </li>
            <li>
              <a onClick={handleNavigate} class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Menu</a>
            </li>
            <li>
              <a href="#aboutus" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</a>
            </li>
            <li>
              <a href="#contactUs" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact Us</a>
            </li>
          </ul>
        </div>
      </span>

      <div class="flex items-center relative">
        {/* <!-- drawer Burger and show --> */}
        <button
          class="burger lg:hidden mr-3"
          id="burger-btn"
          onClick={toggleDropdownBurger}
          type="button"
        >
          <img src={image11} alt="" />
        </button>

        {/* <!-- Dropdown menu --> */}
        {isOpenBurger && (
        <div id="dropdownHover" className="absolute bg-white divide-y z-50 top-7 right-10 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="burger-btn">
            <li>
              <a href="#Home" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/Menu" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Menu
              </a>
            </li>
            <li>
              <a href="#about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#footer" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <button onClick={navLogin}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                Login / Sign Up
              </button>
            </li>
            
          </ul>
        </div>
      )}

        {/* <!-- Button for Login or Sign Up --> */}

        {authenticated ? (
          
            <>
              <div className="flex space-x-2 mr-2">
                <button onClick={toggleDropdown} 
                title='Profile'
                  className="focus:outline-none">
                  <img src={userIcon} alt="user" className="mr-3" />
                </button>

                {isOpen && (
                  <div className="absolute right-24 mt-8 w-48 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li onClick={()=>navigate('/profile')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Profile
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}

                  <Link to={'/cart'} className="relative inline-block">
                    <img src={bagIcon} alt="bag" className="w-8 h-8" title='Cart' /> {/* Adjust size as needed */}
                    {orderNotif.totalOrders > 0 && (

                      <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-base rounded-full px-2.5">
                        {orderNotif.totalOrders}
                      </span>
                    )}
                  </Link>
                
              </div>

              {/* <button
                onClick={handleLogout}
                className="btn w-48 h-14 bg-slate-900 text-gray-100 text-base tracking-widest lg:bg-green-600 md:bg-yellow-500 sm:bg-blue-600"
              >
                Logout
              </button> */}

            </>
          ) : (
            <button onClick={navLogin} 
                      class="lg:flex items-center justify-center bg-[#ffffff] 
                            hover:bg-[#056e3d] 
                            text-[#067741] 
                            font-semibold 
                            py-3 
                            px-6 
                            rounded-full 
                            border-2 
                            border-[#067741] 
                            shadow-md 
                            transition-all 
                            duration-300 
                            ease-in-out 
                            transform 
                            hover:scale-105 
                            focus:outline-none  
                            focus:ring-2 
                            hover:text-white  
                            focus:ring-[#067741]/50 
                            focus:ring-opacity-50
                            hidden"
                            
                  >
                      Login / Sign Up
                  </button>

          )}
      </div>
    </nav>
    <div class="scroll-progress "></div> {/* <!-- for scroll effect sa taas --> */}

    {/* <!-- Chat button / chat box / chat bot --> */}
    {authenticated === true ? (
        <ChatComponent name={profile?.name} userId={profile?.id} ticketId={profile?.verification_token} />
      ) : (
        <>
          <div className="fixed bottom-4 right-4 z-50 w-16 h-16">
          <button
            id="open-chat"
            onClick={toggleChatModal}
            className="bg-textgreenColor text-white py-2 px-4 rounded-full hover:bg-green-800 hover:scale-110 transition-transform duration-300 flex justify-center items-center w-16 h-16"
          >
            <img src={chat} alt="chat" className="w-8 h-8" />
          </button>
        </div>


          {ChatModal && (
            <div id="chat-container" className="fixed bottom-16 right-4 w-96 z-50">
              <div className="bg-cards2 shadow-md rounded-lg max-w-lg w-full">
                <div className="p-4 border-b bg-textgreenColor text-white rounded-t-lg flex justify-between items-center">
                  <p className="text-lg font-semibold">JaydsBot</p>
                  <button
                    onClick={toggleChatModal}
                    className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div id="chatbox" className="p-4 h-80 overflow-y-auto">
                  <div className="mb-2">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                      👋 Hi there! I'm JaydsBot!, your friendly virtual assistant here at JoeExpress.
                      I'm here to make your experience as smooth and enjoyable as possible. Whether you need help finding your favorite milk tea flavor, placing an order, or learning about our latest promotions, I'm just a click away!
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
                      Feel free to ask me anything, and I'll do my best to assist you. Let's get started on finding your perfect drink today! 🥤
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t flex">
                  <input
                    id="user-input"
                    type="text"
                    placeholder="Type a message"
                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    id="send-button"
                    className="bg-textgreenColor text-white px-4 py-2 rounded-r-md hover:bg-amber-700 transition duration-300"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    


    {/* <!-- Land upper --> */}
    <div className="relative flex lg:flex-row flex-col overflow-hidden bg-jaydsBg text-white py-16 h-fit top-0 items-center" id="about">

      {/* Animated wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-auto animate-wave" viewBox="0 0 1440 280" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#6B4F4F"
            fillOpacity="0.2"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div class="lg:w-1/2 px-32 pt-4 pb-16 md:text-center lg:text-left"
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1500">
            <p class="text-black font-bold tracking-wider text-3xl pb-1 drop-shadow-2xl text-center md:text-left" id="name">WELCOME TO</p>
            <h1 class="text-textgreenColor text-8xl font-extrabold pb-2 drop-shadow-lg text-center md:text-left" id="name">{cmsName}</h1>
            <p class="max-w-[28rem] mb-5 text-lg text-gray-600 text-center md:text-left">
            Discover the perfect blend of flavors in every cup. From classic milk teas to unique creations, we’ve got something for everyone. Come sip, relax, and enjoy your favorite drink today!
            </p>
        
          {/* Order Now Button */}
              <div class="text-center md:text-left">
              <button
                        onClick={() => navigate('/menu')}
                        className="relative inline-flex h-16 active:scale-95 transition overflow-hidden rounded-tl-3xl rounded-br-3xl p-[2px] focus:outline-none hover:scale-105 hover:shadow-xl hover:shadow-[#34d399]/50 duration-300 ease-in-out"
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#067741_0%,#34d399_50%,#10b981_100%)] rounded-tl-3xl rounded-br-3xl"></span>
                        
                        <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-[#067741] px-10 text-lg font-semibold text-white backdrop-blur-3xl gap-2">
                          Order Now!
                        </span>
                        
                        {/* Shining Effect */}
                        <span className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                          <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-shine"></div>
                        </span>
                      </button>
                </div>  
              </div>

      <div className="w-[400px] h-[500px] md:m-auto relative hover:scale-100">
        <img
        src={cmsBigLogo}
        alt=""
        className="w-[400px] h-[400px] z-10 absolute -top-2 -left-28 float-animation"
        data-aos="fade-down-right"
        data-aos-duration="2000"
        data-aos-easing="ease-in-sine"
        />

        <img
        src={cmsSmallLogo}
        alt=""
        className="w-[400px] h-[400px] absolute top-20 left-16 float-animation"
        data-aos="fade-down-left"
        data-aos-duration="2000"
        data-aos-easing="ease-in-sine"
        />
      </div>
    </div>




        {/* <!-- Best Sellers Section --> */}
        <div class="bg-white min-h-screen pt-14 sm:pt-16 lg:pt-26 flex flex-col items-center" id="Menu">
          <h1 class="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center py-6 md:py-8 text-green-700 animate-wave glow-animation">
            Top Picks of the Day
          </h1>

          {/* <!-- Subheading --> */}
          <div class="flex justify-center mb-6 md:mb-8 px-4">
            <h3 class="text-center text-sm sm:text-base md:text-lg lg:text-xl tracking-wide w-full md:w-[80%] lg:w-[60%] text-black opacity-0 animate-fade-in">
              Discover our most loved milk tea flavors, refreshed daily based on what our customers are raving about!
            </h3>
          </div>

                  {/* <!-- Background Coffee Images --> */}
                  <div class="relative w-full flex justify-center">
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute top-12 left-32 w-[40px] sm:w-[80px] md:w-[120px] lg:w-[170px] rotate-[17deg] z-0 opacity-50"
                    />
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute top-8 right-36 w-[60px] sm:w-[110px] md:w-[140px] lg:w-[210px] rotate-[34deg] z-0 opacity-50"
                    />
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute bottom-16 left-28 w-[30px] sm:w-[70px] md:w-[110px] lg:w-[160px] rotate-[-12deg] z-0 opacity-50"
                    />
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute bottom-10 right-20 w-[80px] sm:w-[120px] md:w-[150px] lg:w-[220px] rotate-[43deg] z-0 opacity-50"
                    />
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute bottom-50 right-1/3 w-[40px] sm:w-[90px] md:w-[130px] lg:w-[180px] rotate-[-38deg] z-0 opacity-50"
                    />
                    <img
                      src={image1}
                      alt="beans"
                      class="absolute top-36 right-1/4 w-[50px] sm:w-[100px] md:w-[140px] lg:w-[200px] rotate-[-11deg] z-0 opacity-50"
                    />
                  </div>

              {/* <!-- Cards Section --> */}
                <div class="container mx-auto p-4 max-w-7xl">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-5 pb-12">
                    {/* Map through the food items */}
                    {foods.map((food) => (
                <div
                  key={food.id}
                  className="relative flex flex-col p-4 rounded-2xl bg-white text-black shadow-lg hover:shadow-2xl hover:scale-105 group border-2 border-[#067741] before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:border-2 before:border-solid before:border-[#E5F5EE] before:-z-10 transition duration-300 overflow-visible"
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                >
                  {/* Image container */}
                  <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md bg-gradient-to-t from-[#ece0c8] to-[#f5f2e4] rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-110">
                    <img src={food.image_url} alt={food.name} className="object-contain w-full h-28 sm:h-36 md:h-40 transition-transform duration-300 " />
                  </div>

                  {/* Food Info */}
                  <div className="mt-4 text-center">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-white">
                      {food.name}
                    </h2>
                    <p className="text-sm text-gray-600 transition-opacity duration-300 group-hover:text-gray-300 group-hover:opacity-75">{food.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm font-bold transition-colors duration-300 group-hover:text-white">16oz</span>
                    </div>
                  </div>

                  {/* Buy Now Button */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-2xl font-bold transition-colors duration-300 group-hover:text-white">₱ {food.price}.00</p>
                    <button
                      onClick={handleNavigate}
                      className="relative bg-[#067741] text-white font-semibold py-2 px-4 rounded-full transition-all duration-500 ease-out transform hover:scale-110 hover:bg-gradient-to-r hover:from-[#067741] hover:to-[#055F32] hover:border-2 hover:border-white hover:shadow-[0_0_15px_rgba(6,119,65,0.5)] hover:rotate-1 group"
                    >
                      <span className="absolute inset-0 rounded-full opacity-0 bg-white blur-sm transition-opacity duration-500 group-hover:opacity-20"></span>
                      <span className="relative z-10">Buy Now!</span>
                    </button>
                  </div>
                </div>
                ))}
            </div>
          </div>
        </div>




    {/* <!-- Menu offering --> */}
    <div class="bg-exportColor w-full mb-10 relative" id="offer">
      <h2 class="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-center py-6 md:py-8 text-green-700 animate-wave glow-animation">
      Menu Offerings
      </h2>

      <p class="text-center text-sm sm:text-base md:text-lg lg:text-xl tracking-wide w-full md:w-[80%] lg:w-[60%] text-black opacity-0 animate-fade-in">Discover a Delightful Mix of Milk Teas, Main Coffees, and Refreshing Drinks!</p>

      <div class="flex flex-col justify-center items-center">
        <div class="justify-center items-center mx-auto px-52 flex-wrap space-x-3 space-y-2 hidden lg:flex">
        <button class="border-2 border-[#067741] bg-white text-black text-xl rounded-full py-3 px-5
         hover:bg-[#067741] hover:text-white
         hover:shadow-lg hover:scale-105
         active:bg-[#067741] active:text-white active:scale-95
         focus:bg-[#067741] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#067741] focus:ring-opacity-50
         transition-transform duration-300" onClick={() => handleCategory()}>All Drinks</button>


          {category.map(categories => (
            <React.Fragment key={categories.id}>
              <button class="border-2 border-[#067741] bg-white text-black text-xl rounded-full py-3 px-5
         hover:bg-[#067741] hover:text-white
         hover:shadow-lg hover:scale-105
         active:bg-[#067741] active:text-white active:scale-95
         focus:bg-[#067741] focus:text-white focus:outline-none focus:ring-2 focus:ring-[#067741] focus:ring-opacity-50
         transition-transform duration-300" onClick={()=>handleCategory(categories.id)}>{categories.title}</button>
            </React.Fragment>
          ))}
        </div>

           {/* Div For All Items */}
            <div id="all">
              <div className="px-4 py-6 md:px-12 md:py-8 lg:px-24 lg:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Redesigned 3D Card with Enhanced Color Scheme */}
                {menu
                  .filter((menus) => !categoryId || menus.category_id === categoryId)
                  .slice(0, 8)
                  .map((menus) => (
                    <div
                      key={menus.id}
                      className="flex-shrink-0 relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-50 border-2 border-[#067741] rounded-3xl max-w-xs shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300"
                    >
                      {/* Image Container with 3D Effect */}
                      <div className="relative bg-gradient-to-t from-[#ece0c8] to-[#f5f2e4] p-6 rounded-t-3xl">
                        <div className="w-full h-40 flex justify-center items-center">
                          <div className="p-3 overflow-hidden transform hover:rotate-2 hover:scale-110 transition-transform duration-300">
                            <img className="max-w-none max-h-full" src={menus.image_url} alt={menus.name} />
                          </div>
                        </div>
                      </div>

                      {/* Info Section with Enhanced Color Scheme */}
                      <div className="relative text-gray-800 px-4 pb-6 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg text-gray-900">{menus.name}</span>
                          <span className="bg-gray-200 rounded-full text-gray-900 text-md font-extrabold px-3 py-1 shadow-md transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
                            ₱{menus.price}.00
                          </span>
                        </div>
                        <span className="block text-sm opacity-75 text-gray-700">{menus.size}</span>

                        {/* Add to Cart Button with 3D Effect */}
                        <button className="mt-6 text-white p-3 rounded-lg w-full text-center shadow-lg wave-effect">
                          <Link to="/Login">Add to Cart</Link>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

        <div id="mt" style={cardContainers}>
          <div class="flex-shrink-0 m-6 relative overflow-hidden bg-jaydsBg outline outline-greenColor rounded-lg max-w-xs shadow-lg hover:scale-110 duration-500">
            <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={styleCard}>
              <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="brown"/>
              <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="red"/>
            </svg>
            <div class="relative flex flex-col h-full">
              <div class="flex-1">
                <div class="relative pt-5 px-10 flex items-center justify-center">
                  <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={styleCard2}></div> {/* <!-- Shadow Effect-->*/}
                  <img class="relative w-40" src="/public/image/caramel.png" alt=""></img>
                </div>
              </div>
              <div class="relative text-white px-3 pb-6 mt-1 align-baseline">
                <span class="block opacity-75 -mb-1">Large</span>
                <div class="flex justify-between">
                  <span class="block font-semibold text-xl">Caramel</span>
                  <span class="bg-white rounded-full text-textgreenColor text-md font-bold px-3 py-2 leading-none flex items-center">$36.00</span>
                </div>
                <button class="flex justify-center items-center mx-auto mt-6 bg-greenColor p-2 rounded-lg hover:scale-110 duration-300">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <div id="ft" style={cardContainers}>I'm container Fruity</div>
        <div id="ic" style={cardContainers}>I'm container ice Coffee</div>
        <div id="ao" style={cardContainers}>I'm container Add Ons</div>
        <div id="tea" style={cardContainers}>I'm container Tea</div>
        <div id="sk" style={cardContainers}>I'm container Snacks</div>

        {/* <!-- Add button here --> */}
        <button 
          onClick={() => navigate('/menu')}
          className="py-4 px-6 bg-greenColor outline outline-white 
                    text-white font-bold text-lg rounded-full shadow-lg 
                    transition duration-300 ease-in-out flex justify-center mx-auto mt-4 mb-5 hover:outline-greenColor hover:bg-white hover:text-textgreenColor"
          style={{
              animation: 'shake 1.5s ease-in-out infinite',
          }}>
          View All Products
      </button>
      </div>
    </div>
    

    {/* <!-- About Us --> */}
    <div className="flex flex-col lg:flex-row overflow-hidden bg-white text-greenColor py-10" id="aboutus">
      <div
        className="lg:w-1/2 p-10 md:text-center lg:text-left flex flex-col justify-center items-center lg:items-start"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1500"
      >
        <h3 className="font-extrabold text-5xl mb-8 text-center animate-wave glow-animation">Our Story</h3>
        <h2 className="font-extrabold text-4xl mb-6 text-center text-black">Let Us Introduce Ourselves</h2>
        <p className="max-w-lg mb-6 text-lg md:text-left leading-relaxed text-center text-black italic">
          {cmsAboutUs}
        </p>
        <div className="pt-4 text-center md:text-left">
        <button 
          onClick={() => navigate('/menu')} 
          className="relative inline-flex h-16 active:scale-95 transition overflow-hidden rounded-tl-3xl rounded-br-3xl p-[2px] focus:outline-none hover:scale-105 hover:shadow-xl hover:shadow-[#34d399]/50 duration-300 ease-in-out"
        >
          <span
            className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#067741_0%,#34d399_50%,#10b981_100%)] rounded-tl-3xl rounded-br-3xl"
          />
          <span
            className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-tl-3xl rounded-br-3xl bg-[#067741] px-10 text-lg font-semibold text-white backdrop-blur-3xl gap-2"
          >
            Order Now!
          </span>
        </button>
      </div>

      </div>
      <div className="lg:w-1/2 p-10 flex justify-center items-center">
        <img
          src={cmsAboutUsImage}
          alt="About Us"
          id="aboutUsPic"
          className="w-[450px] max-h-[591px] h-auto hover:scale-105 transition-transform duration-300 rounded-lg"  
          data-aos="fade-down-left"
          data-aos-duration="1500"
        />
      </div>
    </div>

    {/* Reviews Section */}
    <div className="container mx-auto px-4 py-8 bg-[#F5F5F0]">
    <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mt-4 mb-3 glow-animation animate-wave">Reviews</h1>
          <p className="max-w-xl mx-auto mt-4 mb-4 text-base leading-relaxed text-gray-600">
                    What Customer Says
                </p>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col h-full">
            <div className="flex flex-row items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(`
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="24" fill="#E2E8F0"/>
                      <circle cx="24" cy="19" r="8" fill="#94A3B8"/>
                      <path d="M11 40C11 40 15 32 24 32C33 32 37 40 37 40" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                  `)}`}
                  alt="Anonymous user"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="hidden">{review.name.split(' ').map(n => n[0]).join('')}</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-sm">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>


    {/* New FAQS */}
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl animate-wave glow-animation">
                    Frequently Asked Questions
                </h2>
                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                    Discover answers to the most common inquiries from our users.
                </p>
            </div>

            <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 rounded-md ${openIndex === index ? 'border-green-500' : ''}`}
                    >
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="flex text-lg font-semibold text-black">{faq.question}</span>
                            <svg
                                className={`w-6 h-6 text-gray-400 ${openIndex === index ? 'rotate-0' : 'rotate-180'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`px-4 pb-5 sm:px-6 sm:pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
                            <p>
                                {faq.answer}{' '}
                              {' '}
                                
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-center text-gray-600 text-base mt-9">
                  Didn’t find the answer you are looking for? {' '}
                <a href="#contactUs" title="" className="font-medium text-[#067741] transition-all duration-200 hover:[#067741] focus:text-[#067741] hover:underline">
                    Contact our support
                </a>
            </p>
        </div>
    </section>




    {/* Contact Us Section on Landing Page */}
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 " id="contactUs">
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-x-0 -top-32 sm:-top-48 transform-gpu blur-3xl" style={{ zIndex: '-1' }}>
          <div className="relative left-1/2 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-300 to-green-500 opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 animate-wave glow-animation">Contact Us!</h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">We'd love to hear from you! Reach out for inquiries, feedback, or support.</p>
      </div>
      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
            <div className="mt-2.5">
              <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#067741] sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
            <div className="mt-2.5">
              <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#067741] sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
            <div className="mt-2.5">
              <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#067741] sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
            <div className="mt-2.5">
              <textarea name="message" id="message" rows="4" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#067741] sm:text-sm sm:leading-6"></textarea>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button type="submit" className="block w-full rounded-md bg-[#067741] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#067741]">Submit</button>
        </div>
      </form>
    <div className="px-4 mx-auto sm:px-4 md:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-7xl pt-8 sm:pt-12 md:pt-16 lg:pt-20 mt-6 sm:mt-8 md:mt-12 lg:mt-16 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-8 xl:gap-x-20">
            {/* Call Us */}
            <div className="flex flex-col items-center p-6 bg-white border-2 border-green-700 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <svg className="flex-shrink-0 w-10 h-10 text-[#067741] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <p className="text-xl font-medium text-gray-900">(+63) 926 015 9202</p>
            </div>

            {/* Email Us */}
            <div className="flex flex-col items-center p-6 bg-white  border-2 border-green-700  shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <svg className="flex-shrink-0 w-10 h-10 text-[#067741] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xl font-medium text-gray-900">jaydscoffee@gmail.com</p>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center p-6 bg-white  border-2 border-green-700 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
              <svg className="flex-shrink-0 w-10 h-10 text-[#067741] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-lg font-medium leading-relaxed text-gray-900 text-center">B4 L1 Diamond Village Salawag Dasmariñas, Philippines.</p>
            </div>
          </div>
        </div>
    </div>

    {/* <!-- Contact Us on Footer --> */}
    <footer class="bg-[#1A1A1A] w-full h-1/4  py-7 flex flex-col justify-center items-center" id="footer">

      <div class="border-y-2 border-gray-400 w-4/5 p-10">
        {/* <!-- container footer--> */}
        <div class="flex justify-between w-full">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          {cmsName}
        </h1>
          <div class="flex gap-2">
            <button type='button' 
            class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
            <a href={cmsFacebook} target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="Facebook" />
            </a>
            </button>
            <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
              <a href={cmsInstagram} target="_blank" rel="noopener noreferrer"><img src={ig} alt=""></img></a>
            </button>
          </div>
        </div>

      <button onClick={handleMapModal} class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
      
      </div>


      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-center md:text-left">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 block md:inline-block mb-2 md:mb-0">
        Copyright © 2024. Capstone Inc.
      </span>

      <ul class="flex flex-wrap justify-center md:justify-end items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
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

    <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    {/* <!-- AOS Animation--> */}
    </div>
  );
}

export default Home;
