import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './menuPage.css'
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import topBG from '../image/top-bg.svg';
import left from '../image/arrow left2.svg';
import right from '../image/arrow right.svg';
import cartMenu from '../image/cart.svg';
import cart2 from '../image/cart2.svg';
import userIcon from '../image/UserAcc.svg';
import bagIcon from '../image/bag.svg';
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom'
import Terms from '../UserModal/TermsAndCondition/Terms'
import MapModal from '../Map/Map';
import AddOrder from '../UserModal/AddOrder'
import socket from '../AdminModule/Message/socketService';

function Menu() {
  //styles ng right drawer
  const rightDrawer = {
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    overflowX: 'hidden',
  };

const [authenticated, setAuthenticated] = useState(false);
const navigate = useNavigate();
const [foods, setFoods] = useState([]);
const [cart,setCart] = useState([]);
const [userId, setUserId] = useState(null);
const [cmsName,setCmsName] = useState('');
const [cmsSmallLogo,setSmallLogo] = useState(null);
const [orderNotif, setOrderNotif] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [isOpenRightNav, setIsOpenRightNav] = useState(false);
const [categorySearch, setCategorySearch] = useState(0);
const [selectedFoodId, setSelectedFoodId] = useState(null);
const [category,setCategory] = useState([]);

const [mapModal, setMapModal] = useState(false);
const [cmsLocation,setLocation] = useState('');
const [cmsFacebook,setCmsFacebook] = useState('');
const [cmsInstagram,setCmsInstagram] = useState('');
const [cmsLink,setCmsLink] = useState('');
const [TermsModal,setTermsModal] = useState(false); //modal

// modal
const [addAddorderModal,setAddAddorderModal] = useState(false);
const toggleTermsAndCondiotion = () =>{
  setTermsModal(!TermsModal)
}

// modal
const toggleAddAddorderModal = (foodId = null) => {
  // Set the selected foodId when opening the modal
  if (foodId) {
    setSelectedFoodId(foodId);
  }

  // Toggle the modal visibility
  setAddAddorderModal(!addAddorderModal);
};

const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

const rightNav = () => {
  setIsOpenRightNav(!isOpenRightNav);
};


 axios.defaults.withCredentials = true;

  useEffect(()=>{

    const fetchNameData = async () => {
      try {
        const response = await axios.post('https://jaydscafe.com/api/cms', {title: 'Business Name'});
        setCmsName(response.data?.content || '');
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    const fetchSmallLogo = async () => {

      try{
        const response = await axios.post ('https://jaydscafe.com/api/cms', {title: 'Small Logo'});
        setSmallLogo(response.data?.content || '')
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    fetchSmallLogo();
    fetchNameData();
  },[])

  useEffect(() => {
    const fetchMenu = async () => {
        try {
            const response = await axios.get('https://jaydscafe.com/api/menu');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching food details:', error);
        }
    };

    fetchMenu();  // Call the async function
}, []);

useEffect(() => {
  const checkAuthentication = async () => {
      try {
          const res = await axios.get('https://jaydscafe.com/api/');
          if (res.data.valid) {
              setAuthenticated(true);
              setUserId(res.data.userId);
          }
      } catch (err) {
          console.error('Error checking authentication:', err);
      }
  };

  checkAuthentication();  // Call the async function
}, [navigate]);  // Runs when `navigate` changes


  const handleSizeChange = (foodId, newSize) => {
    setFoods(prevFoods => prevFoods.map(food => {
      if (food?.id === foodId) {
        return { ...food, getSize: newSize }; // Update only the selected food's getSize
      }
      return food;
    }));
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post('https://jaydscafe.com/api/logout');
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

  const handleNav = (foodId) =>{
    navigate(`/editpage/${foodId}`);
  }

  const addToCartApi = async (food, userId) => {
    try {
      const response = await axios.post('https://jaydscafe.com/api/cart_items', {
        userId,
        foodId: food?.id,
        size: food?.getSize,
        price: food?.getSize === 'Medium' ? food?.Medium: food?.Large,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
        try {
            const response = await axios.post('https://jaydscafe.com/api/fetchCategory');
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching category details:', error);
        }
    };

    fetchCategory();  // Call the async function
}, [userId]);  // Runs whenever `userId` changes


  const handleAddToCart = async (food) => {
    try {
      await addToCartApi(food, userId);
      setCart(prevCart => [...prevCart, food]);
      alert('Item added to cart!');
    } catch (error) {

      alert('Failed to add item to cart. Please try again.');
    }
  };

  //CMS FB/IG/LOC
  const fetchFacebookLinkData = async () => {
    try {
      const response = await axios.post('https://jaydscafe.com/api/cms', {title: 'Facebook'});
      setCmsFacebook(response.data?.content || '');
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchInstagramLinkData = async () => {
    try {
      const response = await axios.post('https://jaydscafe.com/api/cms', {title: 'Instagram'});
      setCmsInstagram(response.data?.content || '');
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchLinkData = async () => {
    try {
      const response = await axios.post('https://jaydscafe.com/api/cms', {title: 'Link'});
      setCmsLink(response.data?.content || '');
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const fetchLocation = async () => {

    try{
      const response = await axios.post ('https://jaydscafe.com/api/cms', {title: 'Location'});
      setLocation(response.data?.content || '')
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  
  const handleMapModal = () => {
    setMapModal(!mapModal);
  };


        //burger
        useEffect(() => {
            const burgerBtn = document.getElementById('burger-btn');
            const navLinks = document.querySelector('.nav_links');
            
            if (burgerBtn) {
              burgerBtn.addEventListener('click', () => {
                navLinks.classList.toggle('hidden');
              });
            }
        
            AOS.init();
        
            // Cleanup event listener on component unmount
            return () => {
              if (burgerBtn) {
                burgerBtn.removeEventListener('click', () => {
                  navLinks.classList.toggle('hidden');
                });
              }
            };
          }, []);
            
            // State for pagination
            const [currentPage, setCurrentPage] = useState(1);
            const itemsPerPage = 8; // kung ilang cards lang makikita per page
          
            // Filtered food items based on category search
            const filteredFoods = foods.filter((food) => {
              return categorySearch === 0 ? food : food?.category_id === categorySearch;
              
            });
          
            // Calculate total pages
            const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
          
            // Get the current page's items
            const currentFoods = filteredFoods.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            );
          
            // Handle page change
            const goToNextPage = () => {
              if (currentPage < totalPages) {
                setCurrentPage((prevPage) => prevPage + 1);
              }
            };
          
            const goToPreviousPage = () => {
              if (currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1);
              }
            };


            useEffect(() => { 

              if (userId) { 
                  socket.emit('notif', userId);
          
                  socket.on('orderNotif', (data) => {
                      setOrderNotif(data); 
                  });
          
                  return () => {
          
                      socket.off('orderNotif');
                      socket.off('notif');
                      
                  };
              }

          }, [userId,addAddorderModal]); 

          const [isDropdownOpenCategory, setDropdownOpenCategory] = useState(false);

          // Function to toggle the dropdown
          const toggleDropdownCategory = () => {
            setDropdownOpenCategory(!isDropdownOpenCategory);
          };
        
          // Function to handle category selection (optional)
          const handleCategoryClick = (categoryId) => {
            console.log(`${categoryId} selected`);
            // Optionally, close the dropdown after selection
            setDropdownOpenCategory(false);
          };

          function stripHtmlTags(html) {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || "";
          }
        
          
  return (
    <div className='dark:bg-white'>
      
      {mapModal && <MapModal closeModal ={() => setMapModal(!mapModal)} />}
      {TermsModal && <Terms closeModal={setTermsModal}/>}
      {TermsModal && <Terms closeModal={setTermsModal}/>}
      
      {addAddorderModal && <AddOrder closeModal={setAddAddorderModal} foodId={selectedFoodId} />}

      {/* <!-- Navbar --> */}
      <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-between">
        <div class="font-extrabold text-2xl flex items-center">
          {/* <!-- Logo/Title in Navbar --> */}
          <a href="/" class="flex items-center text-greenColor ms-2 sm:ms-5 text-lg sm:text-2xl tracking-wide" dangerouslySetInnerHTML={{ __html: cmsName }}>
        </a>

        </div>

        <div class="inline-flex items-center justify-center me-2">
          {/* <!-- Button for Login or Sign Up --> */}

          {authenticated ? 
          (
            <div class="inline-flex w-fit h-fit space-x-2 ">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img src={userIcon} alt="user" className="mr-3" />
            </button>

            {isOpen && (
              <div className="absolute right-24 mt-8 w-48 bg-white border rounded-lg shadow-lg z-50">
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
            <Link to={'/cart'} className="relative inline-block"onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src={bagIcon} alt="bag" className="w-8 h-8" /> {/* Adjust size as needed */}
              {orderNotif.totalOrders > 0 && (

                <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-base rounded-full px-2.5">
                  {orderNotif.totalOrders}
                </span>
              )}
            </Link>
          </div>
            ) : (<button
              onClick={()=> navigate('/login')}
              class="flex items-center justify-center bg-[#ffffff] 
              hover:bg-[#056e3d] 
              text-[#067741] 
              font-semibold 
              py-2 px-4 sm:py-3 sm:px-6 
              rounded-full 
              border-2 
              border-[#067741] 
              shadow-md 
              transition-all 
              duration-300 
              ease-in-out 
              transform hover:scale-105 
              focus:outline-none 
              focus:ring-2 
              hover:text-white  
              focus:ring-[#067741]/50 
              focus:ring-opacity-50 
              text-sm sm:text-base">
              Order Now!
            </button>)
          }
        </div>


      </nav>

      <div class="w-full relative flex justify-center items-center"> {/* <!-- Top Section --> */}
    <img src={topBG} alt="" class="w-full h-full object-cover" />
    <div class="absolute top-0 left-0 w-full h-full"> {/* <!-- buttons and title --> */}

        {/* Categories Navs */}
        <div class="justify-center items-center mx-auto px-52 flex-wrap space-x-3 space-y-2 hidden lg:flex mt-10">
            <button 
                className={`${
                    categorySearch === 0 ? 'bg-greenColor text-white' : 'bg-white text-black'
                } text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300`}
                onClick={() => {
                  setCategorySearch(0);   
                  setCurrentPage(1);           
                }}
            >
                All Items
            </button>

            {category.map(cat => (
                <button 
                    key={cat?.id} 
                    className={`${
                        categorySearch === cat?.id ? 'bg-greenColor text-white' : 'bg-white text-black'
                    } text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300`}
                    onClick={() => {
                      setCategorySearch(cat?.id);   
                      setCurrentPage(1);           
                    }}
                >
                    {cat?.title}
                </button>
                ))}
            </div>
            
          {/* <!-- dropdown category button --> */}
          <button 
              id="dropdownDefaultButton" 
              onClick={toggleDropdownCategory}
              class="relative flex justify-center items-center mx-auto bg-white text-black text-xl rounded-full top-3 py-3 px-5 hover:bg-greenColor hover:text-white duration-300 lg:hidden md:block">
                Browse the Menu
          </button>
            
          {/* <!-- category menu --> */}
          {isDropdownOpenCategory && (
              <div
                id="dropdown"
                className="z-10 absolute left-1/2 transform -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                  <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                      {category.map((cat) => (
                          <li key={cat?.id}>
                              <button
                                  className={`block px-4 py-2 w-full rounded-full ${
                                      categorySearch === cat?.id
                                          ? 'bg-greenColor text-white'
                                          : 'hover:bg-gray-100 text-gray-700'
                                  }`}
                                  onClick={() => {
                                      setCategorySearch(cat?.id); // Set the selected category ID
                                      setCurrentPage(1); // Reset to first page if applicable
                                      handleCategoryClick(cat?.id); // Call function with selected category ID
                                  }}
                              >
                                  {cat?.title}
                              </button>
                          </li>
                      ))}
                  </ul>
              </div>
          )}
          
        </div>
      </div>

      <div class="flex flex-col md:w-3/4 sm:mx-auto w-full md:items-center"> {/* <!-- Main Container--> */}
        <div id="mt-series"> 
          <div className="container mx-auto p-4 mt-4"> 

              {/* Dynamically update the heading based on selected category */}
              <h1 className="text-5xl font-bold text-center mb-10">
                  {categorySearch === 0 ? (
                      // If "All Items" is selected, it will display "Explore Our Menu"
                      <span>
                          <span className="text-textgreenColor">Explore</span> Our Menu!
                      </span>
                  ) : (
                      // If another category is selected, style the first word with green and the rest as normal
                      <span>
                          {(() => {
                              const selectedCategory = category.find(cat => cat?.id === categorySearch)?.title;
                              if (selectedCategory) {
                                  const [firstWord, ...restOfTitle] = selectedCategory.split(' '); // Split the category title
                                  return (
                                      <>
                                          <span className="text-textgreenColor">{firstWord}</span> {/* First word in green */}
                                          {" "}
                                          {restOfTitle.join(' ')} {/* Rest of the title */}
                                          {" "}
                                      </>
                                  );
                              }
                          })()}
                      </span>
                  )}
              </h1>


            {/* Card Menu Page */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
              {currentFoods.map((food) => (
                <div
                  key={food?.id}
                  className="relative overflow-hidden bg-gradient-to-b from-[#E5F5EE] to-white border-2 border-[#067741] rounded-3xl w-[270px] h-auto max-w-[370px] shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col mx-auto">
                  {/* Image Container with 3D Effect */}
                  <div className="relative bg-gradient-to-t from-[#ece0c8] to-[#f5f2e4] p-6 rounded-t-xl">
                    <div className="w-full h-[160px] flex justify-center items-center">
                      <div className="p-2 overflow-hidden transform hover:rotate-2 hover:scale-105 transition-transform duration-300">
                        <img
                          className="max-w-none max-h-full object-contain"
                          src={food?.image_url}
                          alt={food?.name}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="relative text-gray-800 px-4 pb-4 mt-2 flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-lg text-gray-900 w-3/4 overflow-hidden text-ellipsis whitespace-normal">
                        {food?.name}
                      </span>
                      <span className="bg-gray-200 rounded-full text--800 text-md font-semibold px-2 py-1 shadow-sm transform transition-transform duration-300 hover:shadow-md hover:scale-105 whitespace-nowrap">

                        <strong>₱ </strong>{food?.price}.00
                      </span>
                    </div>
                    <span className="block text-sm opacity-75 text-gray-700 mb-3">
                      Medium (22oz)
                    </span>

                    {/* Add to Cart Button */}
                    <div className="mt-auto">
                      {authenticated ? (
                        <button
                          onClick={() => toggleAddAddorderModal(food?.id)}
                          className="relative overflow-hidden text-white p-3 rounded-lg w-full text-center bg-gradient-to-r from-[#067741] via-[#45A64B] to-[#067741] shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#1f4d29] via-[#2b6b36] to-[#1f4d29] transition-transform duration-500 transform group-hover:scale-150 group-hover:rotate-45 opacity-25"></span>
                          <span className="relative">Add to Cart</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate("/login")}
                          className="relative overflow-hidden text-white p-3 rounded-lg w-full text-center bg-[#067741] shadow-lg transform transition-transform duration-300 hover:shadow-xl hover:scale-105 group"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#1f4d29] to-[#3b7c4a] transition-transform duration-500 transform group-hover:scale-150 group-hover:rotate-45 opacity-25"></span>
                          <span className="relative">Add to Cart</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Pagination controls */}
            <div className="flex justify-center items-center space-x-4 mt-10 text-sm">
              <div
                className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 inline-flex gap-2 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                  if (currentPage > 1) {
                    goToPreviousPage();
                    window.scrollTo({ top: 200, behavior: 'smooth' });
                  }
                }}
              >
                <img src={left} alt="Previous" />
                <button disabled={currentPage === 1}>
                  Previous
                </button>
              </div>

              <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>

              <div
                className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 inline-flex gap-2 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => {
                  if (currentPage < totalPages) {
                    goToNextPage();
                    window.scrollTo({ top: 200, behavior: 'smooth' });
                  }
                }}
              >
                <button disabled={currentPage === totalPages}>
                  Next
                </button>
                <img src={right} alt="Next" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Contact Us --> */}
      <footer class="bg-[#1A1A1A] w-full  h-1/4 mt-5 py-7 flex flex-col justify-center items-center" id="footer">


      <div class="border-y-2 border-gray-400 w-4/5 p-10">
        {/* <!-- container footer--> */}
        <div class="flex justify-between w-full">
        <h1 class="text-white text-3xl sm:text-4xl font-bold"dangerouslySetInnerHTML={{ __html: cmsName }}>
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
    
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>{/* <!-- AOS Animation--> */}
    </div>
  )
}
export default Menu
