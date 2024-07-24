import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './menuPage.css'
import logo from '../image/logo.png'
import americano from '../image/americano.png'
import bag from '../image/bag.png'
import user from '../image/UserAcc.png'
import axios from 'axios'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom'


function Menu() {

const [authenticated, setAuthenticated] = useState(false);
const navigate = useNavigate();
const [foods, setFoods] = useState([]);
const [cart,setCart] = useState([]);
const [userId, setUserId] = useState(null);

 axios.defaults.withCredentials = true;

 useEffect(() => {
    axios.get('http://localhost:5051/menu')
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
          setUserId(res.data.userId);
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const handleSizeChange = (foodId, newSize) => {
    setFoods(prevFoods => prevFoods.map(food => {
      if (food.id === foodId) {
        return { ...food, getSize: newSize }; // Update only the selected food's getSize
      }
      return food;
    }));
  };

  const handleNav = (foodId) =>{
    navigate(`/items/${foodId}`);
  }

  const addToCartApi = async (food, userId) => {
    try {
      const response = await axios.post('http://localhost:5051/cart_items', {
        userId,
        foodId: food.id,
        size: food.getSize,
        price: food.getSize === 'Medium' ? food.Medium: food.Large,
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const handleAddToCart = async (food) => {
    try {
      await addToCartApi(food, userId);
      setCart(prevCart => [...prevCart, food]);
      alert('Item added to cart!');
    } catch (error) {

      alert('Failed to add item to cart. Please try again.');
    }
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
          
  return (
    <div>
        
    <nav class="sticky top-0 bg-white z-20">
      <div class="font-extrabold text-3xl flex items-center">
          <Link to={'/'} class="flex items-center"><img src={logo} alt="logo" class="logo"/>JoeExpress</Link>
      </div>
      
      <div class="flex items-center">

          <button class="burger lg:hidden mr-3" id="burger-btn" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" type="button"><img src="/public/image/menu.png" alt=""/></button>


              <div id="dropdownHover" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="burger-btn">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Home</a>
                    </li>
                    <li>
                      <a href="#Menu" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Menu</a>
                    </li>
                    <li>
                      <a href="#about" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">About Us</a>
                    </li>
                    <li>
                      <a href="#footer" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Contact Us</a>
                    </li>
                  </ul>
              </div>
              
          
          <Link to="/cart">
              <button class="btn mr-3 w-48 h-14 text-gray-100 text-base tracking-widest bg-footer">Order Now</button>
          </Link>
          <div class="flex space-x-2 mr-2">
              <a href="#"><img src={user} alt="user" class="mr-3"/></a>
              <a href="#"><img src={bag} alt="bag"/></a>
          </div>
      </div>
  </nav>
  
  <div class="flex flex-col w-4/5 h-screen mx-auto md:items-center">
      
      <div class="w-full mb-12 ml-10 pt-10 md:ml-5 sm:ml-2 mt-0 space-x-8 rtl:space-x-reverse text-sm md:flex-col sm:flex-col"> 
          <span class="">
              <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                  <li>
                      <a href="#" class="text-gray-900 dark:text-white hover:underline font-medium text-xl md:text-lg sm:text-base">Home</a>
                  </li>
                  <li>
                      <a href="#" class="text-gray-900 dark:text-white hover:underline font-medium text-xl md:text-lg sm:text-base">Featured</a>
                  </li>
                  <li>
                      <a href="#" class="text-gray-900 dark:text-white hover:underline font-medium text-xl md:text-lg sm:text-base">Previous</a>
                  </li>
                  <li>
                      <a href="#" class="text-gray-900 dark:text-white hover:underline font-medium text-xl md:text-lg sm:text-base">Favorites</a>
                  </li>
              </ul>
          </span>
      
      </div>

      <div class="flex flex-row">
      
          <div class="side-nav min-w-[25%]">
              <h2 class="mb-5 text-lg"> 
                  <span class="font-semibold pr-1"><a href=""> Iced Coffee </a> </span>
                  M - 39 L - 49
              </h2>
              <ul class="text-left mb-10">
                  <li><a href=""> Vanilla </a></li>
                  <li><a href=""> Caramel </a></li>
                  <li><a href=""> Hazelnut </a></li>
                  <li><a href=""> Mocha </a></li>
                  <li><a href=""> Salted Caramel </a></li>
                  <li><a href=""> White Chocolate </a></li>
                  <li><a href=""> Almond </a></li>
              </ul>
  
              <h2 class="mb-5 text-lg">
                  <span class="font-semibold pr-1"> Milk Tea </span> M - 29 L - 39
              </h2>
              <ul class="text-left mb-10">
                  <li><a href=""> Classic Milktea </a></li>
                  <li><a href=""> Wintermelon </a></li>
                  <li><a href=""> okinawa </a></li>
                  <li><a href=""> Hokkaido </a></li>
                  <li><a href=""> Mocha </a></li>
                  <li><a href=""> Cookies & Cream </a></li>
                  <li><a href=""> Caramel </a></li>
                  <li><a href=""> Brown Sugar </a></li>
                  <li><a href=""> Strawberry </a></li>
                  <li><a href=""> Taro </a></li>
                  <li><a href=""> Red Velvet </a></li>
                  <li><a href=""> Dark Chocolate </a></li>
              </ul>
  
              <h2 class="mb-5 text-lg">
                  <span class="font-semibold pr-1"> Non-Coffee </span>M - 49 L - 59
              </h2>
              <ul class="text-left mb-10">
                  <li><a href=""> Matcha Latte </a></li>
                  <li><a href=""> Strawberry Milk </a></li>
                  <li><a href=""> Taro Milk </a></li>
                  <li><a href=""> Melon Milk </a></li>
                  <li><a href=""> Chocolate Milk </a></li>
                  <li><a href=""> White Chocolate </a></li>
              </ul>
  
              <h2 class="mb-5 text-lg">
                  <span class="font-semibold pr-1"> Snacks </span>    
              </h2>
              <ul class="text-left mb-10">
                  <li class="pb-3 text-gray-600"><a href=""> Fries </a></li>
                  <li class="pb-3 text-gray-600"><a href=""> Burger </a></li>
                  <li class="pb-3 text-gray-600"><a href=""> Homemade Siomai </a></li>
              </ul>
          </div>
          
          <div class=" flex flex-wrap justify-content: space-between">

              {/* container */}
              {foods.map(food =>(
              
              <div key={food.id} class="w-100 h-120 max-w-sm border border-gray-200 rounded-xl shadow-xl dark:bg-gray-800 dark:border-gray-700 mt-5 mx-5" data-aos="zoom-in" data-aos-duration="500" data-aos-delay="0">
                  <div class="flex justify-center bg-gray-200 m-4 rounded-xl">
                      <div class=" flex items-center mb-5 bg-white px-1 w-fit rounded-full absolute mr-[190px]">
                          <div class="flex items-center rtl:space-x-reverse">
                              <span class=" text-yellow-950 text-md font-bold py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3 me-1">4.8</span>
                              <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                          </div>
                      </div>
                      <a href="#">
                          <img class="rounded-t-lg w-60 h-60" src={food.image_url} onClick={() => handleNav(food.id)} alt="product image"/>
                      </a>
                  </div>
                  <div class="px-5 pb-5 ">
                      <a href="#">
                          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white pl-2">{food.name}</h5>
                      </a>
                      <div class="flex items-center justify-between ">
                        <select className='mx-2' name="option" id="option" 
                        value={food.getSize} onChange={(e) => handleSizeChange(food.id, e.target.value)
                        }
                        required
                        >
                          <option value=""></option>
                          <option value="Large">Large</option>
                          <option value="Medium">Medium</option>
                          
                        </select> 
                        <span className="text-gray-500 mx-2">
                           {food.getSize === 'Medium' ? food.Medium : (food.getSize === 'Large' ? food.Large : 0)} php
                          </span>
                          
                          <button
                              type='button'
                              onClick={() => handleAddToCart(food)}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Add to cart
                            </button>
                      </div>
                  </div>

              </div>
                        
                  ))}
              {/* container */}

              </div>

          </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
     
    </div>
    
    
  )
}

export default Menu
