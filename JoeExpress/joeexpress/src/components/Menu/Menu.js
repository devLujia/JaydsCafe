import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './menuPage.css'
import logo from '../image/logo.png'
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
import AddOrder from '../UserModal/AddOrder'

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

// modal
const [addAddorderModal,setAddAddorderModal] = useState(false);

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

    fetchSmallLogo();
    fetchNameData();
  },[])

 useEffect(() => {
    axios.get('http://localhost:8081/menu')
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
          setUserId(res.data.userId);
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

  const handleNav = (foodId) =>{
    navigate(`/editpage/${foodId}`);
  }

  const addToCartApi = async (food, userId) => {
    try {
      const response = await axios.post('http://localhost:8081/cart_items', {
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


  useEffect(() => {
    
    axios.post('http://localhost:8081/orderNotif', { userId })
      .then(response => {
        setOrderNotif(response.data);
      })
      .catch(error => {
        console.error('Error fetching orderNotif details:', error);
      });

  });
  
  useEffect(() => {
    
    axios.post('http://localhost:8081/fetchCategory')
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('Error fetching orderNotif details:', error);
      });

  }, [userId]);

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
            
            // State for pagination
            const [currentPage, setCurrentPage] = useState(1);
            const itemsPerPage = 8; // Adjust the number of items per page as needed
          
            // Filtered food items based on category search
            const filteredFoods = foods.filter((food) => {
              return categorySearch === 0 ? food : food.category_id === categorySearch;
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
          
  return (
    <div>
      
      {addAddorderModal && <AddOrder closeModal={setAddAddorderModal} foodId={selectedFoodId} />}

      {/* <!-- Navbar --> */}
      <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-between">
        <div class="font-extrabold text-2xl flex items-center">
          {/* <!-- Logo/Title in Navbar --> */}
          <a href="/" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">{cmsName}</a>
        </div>

        <div class="inline-flex items-center justify-center me-2">
          {/* <!-- Button for Login or Sign Up --> */}

          {authenticated ? 
          (
            <div class="inline-flex w-fit h-fit space-x-2">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img src={userIcon} alt="user" className="mr-3" />
            </button>

            {isOpen && (
              <div className="absolute right-24 mt-8 w-48 bg-white border rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li onClick={()=>navigate('/profile')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile
                  </li>
                  <li onClick={()=>navigate('#')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
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
              class="btn mr-3 w-40 h-12 text-greenColor text-sm tracking-widest shadow-md cursor-pointer hover:shadow-lg outline  hover:shadow-gray-400 hover:bg-greenColor hover:text-white hover:outline-none ease-in-out transition background-color 0.3s, color 0.3s duration-300">
              Order Now!
            </button>)
          }
          
    
          
        </div>
      </nav>

      <div class="w-full relative flex justify-center items-center"> {/* <!-- Top Section --> */}
        <img src={topBG} alt="" class="w-full h-full object-cover"/>
          <div class="absolute top-0 left-0 w-full h-full"> {/* <!-- buttons and title -->*/}
            <h1 class="text-2xl md:text-5xl font-bold my-10 text-center"><span class="text-textgreenColor pe-3">Explore our</span>Menu</h1>

              <div class="justify-center items-center mx-auto px-52 flex-wrap space-x-3 space-y-2 hidden lg:flex">
              <button  class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
                onClick={() => setCategorySearch(0)}
                >
                All Items
              </button>
              {/* <!-- buttons will be hidden on medium and below screens --> */}
              {category.map(cat =>(
                <button key={cat.id} class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
                onClick={() => setCategorySearch(cat.id)}
                >
                {cat.title}
              </button>
              ))}
              {/* <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('fm-series');">
                Fresh Milk Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('mc-series');">
                Macchiato Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('cf-series');">
                Coffee Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('fp-series');">
                Frappe Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('ft-series');">
                Fruity Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('ml-series');">
                Milo Series
              </button>
              <button class="bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300"
              onclick="toggleVisibility('bt-series');">
                Brewed Tea Series
              </button> */}
            </div>
            
            {/* <!-- dropdown category button --> */}
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="flex justify-center items-center mx-auto bg-white text-black text-xl rounded-full py-3 px-5 hover:bg-greenColor hover:text-white duration-300 lg:hidden md:block">
              Category Menu
            </button>
              
              {/* <!-- category menu --> */}
              <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    
                      <li >
                      <button class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('mt-series');">MilkTea Series</button>
                    </li>

                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('fm-series');">Fresh Milk Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('mc-series');">Macchiato Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('cf-series');">Coffee Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('fp-series');">Frappe Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('ft-series');">Fruity Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('ml-series');">Milo Series</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onclick="toggleVisibility('bt-series');">Brewed Tea Series</a>
                    </li>
                  </ul>
              </div>
          
          </div>
      </div>

      <div class="flex flex-col w-3/4 h-screen mx-auto md:items-center"> {/* <!-- Main Container-->*/}
        <div id="mt-series"> 
          <div className="container mx-auto p-4 mt-4"> 
            <h1 className="text-5xl font-bold text-center mb-10">
              <span className="text-textgreenColor">Milk Tea</span> Series
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {currentFoods.map((food) => (
                <div key={food.id} className="rounded-lg p-2 shadow-md relative outline outline-slate-300 hover:scale-95 duration-300 hover:bg-jaydsBg">
                  <div className="rounded-lg bg-darkgreen p-4 aspect-square overflow-hidden">
                    <img src={food.image_url} alt="Milk Tea" className="w-full h-full object-contain min-h-52 min-w-52"/>
                  </div>
                  <h3 className="text-xl font-semibold mt-4 min-h-10">{food.name}</h3>
                  <p className="text-gray-400 mt-4 text-sm font-semibold">Starts at</p>
                  <p className="text-2xl font-bold mb-1">₱{food.price}</p>

                  {authenticated ? (
                    <button
                      onClick={() => toggleAddAddorderModal(food.id)}
                      title="Add to cart"
                      id="btn-cart"
                      className="bg-slate-200 p-2 w-fit rounded-full absolute right-7 top-[52%] hover:scale-125 duration-300"
                    >
                      <img src={cart2} alt="" className="grayscale md:grayscale-0"/>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/login')}
                      id="btn-cart"
                      className="bg-gray-300 p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300"
                    >
                      <img src={cartMenu} alt=""/>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center space-x-4 mt-10 text-sm">
              <div className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 inline-flex gap-2'onClick={goToPreviousPage}>
                <img src={left}></img>
                <button className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === 1}>
                  Previous
                </button>
              </div>

              <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>

              <div className='px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 inline-flex gap-2' onClick={goToNextPage}>
                <button className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={currentPage === totalPages} >
                  Next
                </button>
                <img src={right}></img>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>{/* <!-- AOS Animation--> */}
    </div>
  )
}
export default Menu
