import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './menuPage.css'
import logo from '../image/logo.png'
import topBG from '../image/top-bg.svg';
import cartMenu from '../image/cart.svg';
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

        <div id="mt-series"> {/* <!-- milk tea series div -->*/}
          <div class="container mx-auto p-4 mt-4"> 
          <h1 className='text-5xl font-bold text-center mb-10'> <span className='text-textgreenColor'>Milk Tea</span> Series</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">

                {foods.filter((food) => {
                return categorySearch === 0 ? food : food.category_id === categorySearch;
                }).map((food)=>(
                  <div key={food.id} className="rounded-lg p-4 shadow-md relative outline outline-slate-300 hover:scale-95 duration-300 hover:bg-jaydsBg"> {/*<!-- card 1 -->*/}
                    <div className="rounded-full bg-menuCirclebg p-4 aspect-square overflow-hidden">
                        <img src={food.image_url} alt="Milk Tea" className="w-full h-full object-contain"/>
                    </div>
                    <h3 className="text-xl font-semibold mt-4 min-h-20">{food.name}</h3>
                    <p className="text-gray-600 mt-2">Starts at</p>
                    <p className="text-2xl font-bold mt-1">₱{food.Medium}</p>
                  
                  {
                    authenticated ? 
                    (<button onClick={() => toggleAddAddorderModal(food.id)} 
                    title='Add to cart'
                    id="btn-cart" 
                    className="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" 
                    data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                    </button> ):
                    (<button onClick={() => navigate('/login')} id="btn-cart" className="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                      <img src={cartMenu} alt=""/>
                    </button>)
                  }
                    
                </div>
              ))}
                  {/*<!-- card 2 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/fruit.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}
    

                  {/*<!-- card 3 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/expresso.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                     <img src={cartMenu} alt=""/>
                  </button>
                </div> */}
    
                   {/*<!-- card 4 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/americano.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}

                  {/*<!-- card 1.2 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                    <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                        <img src="/Images(Export)/fruit.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                    </div>
                    <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                    <p class="text-gray-600 mt-2">Starts at</p>
                    <p class="text-2xl font-bold mt-1">P 65.00</p>
                    
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}
    
                   {/*<!-- card 2.2 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/fruit.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}
                   {/*<!-- card 3.2 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/expresso.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}

                    {/*<!-- card 4.2 -->*/}
                {/* <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/americano.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src={cartMenu} alt=""/>
                  </button>
                </div> */}
            </div> 
          </div>
        </div>

      {/* <!-- fresh milk series div -->*/}
        {/* <div id="mt-series"> 
          <div class="container mx-auto p-4 mt-4 bg-red-400"> 
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">
                    <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                        <img src="/Images(Export)/caramel.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                    </div>
                    <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                    <p class="text-gray-600 mt-2">Starts at</p>
                    <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                    <button id="btn-cart" class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                      <img src="/public/image/cart.svg" alt=""/>
                    </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/fruit.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/expresso.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">   
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/americano.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>

                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">
                    <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                        <img src="/Images(Export)/caramel.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                    </div>
                    <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                    <p class="text-gray-600 mt-2">Starts at</p>
                    <p class="text-2xl font-bold mt-1">P 65.00</p>
                    
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg">
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/fruit.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/expresso.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
    
                <div class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> 
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                      <img src="/Images(Export)/americano.png" alt="Milk Tea" class="w-full h-full object-contain"/>
                  </div>
                  <h3 class="text-xl font-semibold mt-4 min-h-20">Signature Milk Tea</h3>
                  <p class="text-gray-600 mt-2">Starts at</p>
                  <p class="text-2xl font-bold mt-1">P 65.00</p>
                  
                  <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%]" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                    <img src="/public/image/cart.svg" alt=""/>
                  </button>
                </div>
            </div> 
          </div>
        </div> */}

      </div>

      {/* <!-- Right drawer --> */}
      {/* <!-- drawer component --> */}
      
      {isOpenRightNav && (
        <div id="drawer-right-example" className="fixed top-0 right-0 z-40 h-screen overflow-hidden transition-transform translate-x-full bg-orange-50 w-80 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-right-label" style={rightDrawer}>
          <div class="w-full h-16 bg-greenColor"></div>

          <div class="p-4">
            <button type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md w-fit h-8 absolute top-[70px] start-2.5 inline-flex items-center justify-center px-2" >
              <span><img src="/public/image/arrow left.svg" alt="arrow" class="me-2"/></span>
              <h1 class="text-textgreenColor">Continue Shopping</h1>
              <span class="sr-only">Close menu</span>
            </button>

            <div class="h-56 text-black">
              <div class="flex justify-between items-baseline">
                <h1 class="font-bold text-lg mt-10">Your Order(s)</h1>
                <a href="#" class="hover:underline">View Cart</a>
              </div>

              {/* <!-- if the cart is empty--> */}
              {/* <!-- <div> 
                <p class="mt-12">You have no items in your cart</p>
              </div> --> */}

              <div> {/* <!-- if the cart have items --> */}
                <div class="mt-8 flex justify-between text-black px-4">
                  <h1 class="text-lg font-semibold">Subtotal: </h1>
                  <p>₱178.00</p>
                </div>
                <div class="mt-7 space-y-5">
                  <button type="button" class="text-white bg-green-700 rounded-lg w-full h-10 font-bold tracking-widest hover:bg-greenColor py-1" onclick={()=>(navigate('/cart'))}>
                    Checkout
                  </button>
                  <button type="button" class="text-white bg-blue-600 hover:bg-blue-500 font-bold tracking-widest rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center justify-center me-2 mb-2 w-full">
                    <img src="/public/image/gcash.svg" alt="Gcash" class="me-2"/>
                      GCash
                  </button>
                </div>
              </div>
            </div>
            
            {/* <!-- Drop down items --> */}
            <div class="mt-16"> {/* <!-- Main container --> */}
              <div class="flex justify-between">
                <div class="flex text-black ">
                  <h1 class="me-5 font-semibold">Products</h1>
                  <p>(3 Items)</p>
                </div>
                <button type="button" id="dropdownUsersButton" data-dropdown-toggle="dropdownUsers" data-dropdown-placement="bottom"><img src="/public/image/arrow down.svg" alt="drop down"/></button>
              </div>
              
              <div id="dropdownUsers" class="z-10 hidden divide-y divide-gray-100 h-screen"> {/* <!-- drop down menu --> */}
                {/* <!-- TAKE NOTE!! Everytime na nag dadagdag ng item dapat iba yung id. ex. quantity-input1--> */}
                <div> {/* <!-- item 1 --> */}
                  <a href="#" class="flex px-4 py-3 hover:bg-gray-100"> 
                    <div class="flex-shrink-0">
                      <img class="rounded-lg w-11 h-11" src="/public/image/americano.png" alt="image"/>
                    </div>
                    <div class="w-full ps-3">
                        <h1 class="text-black font-semibold">Cappucino Frappe</h1>
                        <p class="font-normal text-black text-sm">Large</p>
                        <h1 class="text-black font-semibold">₱59.00</h1>
      
                        <div class="pt-2 flex">
                          <form class="max-w-xs mx-auto">
                            <div class="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input1" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input1" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="quantity-input1" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                          </form>
                          <button type="button" class="ms-2 hover:underline">Remove</button>
                        </div>
                    </div>
                    <div class="relative top-2 ">
                      <button type="button" class="w-5 h-5 hover:bg-yellow-500 hover:rounded-lg focus:ring-gray-100 focus:ring-2 focus:outline-none" onclick={()=>(navigate('/orderPage'))}>
                        <img src="/public/image/edit.svg" alt="Edit"/>
                      </button>
                    </div>
                  </a>
                </div>
                <div> {/* <!-- item 2 --> */}
                  <a href="#" class="flex px-4 py-3 hover:bg-gray-100"> 
                    <div class="flex-shrink-0">
                      <img class="rounded-lg w-11 h-11" src="/public/image/americano.png" alt="image"/>
                    </div>
                    <div class="w-full ps-3">
                        <h1 class="text-yellow-800 font-semibold">Cold Brew</h1>
                        <p class="font-normal text-yellow-700 text-sm">Medium</p>
                        <h1 class="text-yellow-800 font-semibold">₱39.00</h1>
      
                        <div class="pt-2 flex">
                          <form class="max-w-xs mx-auto">
                            <div class="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input2" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input2" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="quantity-input2" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                          </form>
                          <button type="button" class="ms-2 hover:underline">Remove</button>
                        </div>
                    </div>
                    <div class="relative top-2 ">
                      <button type="button" class="w-5 h-5 hover:bg-yellow-500 hover:rounded-lg focus:ring-gray-100 focus:ring-2 focus:outline-none" onclick={()=>(navigate('/orderPage'))}>
                        <img src="/public/image/edit.svg" alt="Edit"/>
                      </button>
                    </div>
                  </a>
                </div>
                <div> {/* <!-- item 3 --> */}
                  <a href="#" class="flex px-4 py-3 hover:bg-gray-100"> 
                    <div class="flex-shrink-0">
                      <img class="rounded-lg w-11 h-11" src="/public/image/americano.png" alt="image"/>
                    </div>
                    <div class="w-full ps-3">
                        <h1 class="text-yellow-800 font-semibold">Cappucino Frappe</h1>
                        <p class="font-normal text-yellow-700 text-sm">Large</p>
                        <h1 class="text-yellow-800 font-semibold">₱59.00</h1>
      
                        <div class="pt-2 flex">
                          <form class="max-w-xs mx-auto">
                            <div class="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input3" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input3" data-input-counter aria-describedby="helper-text-explanation" class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="quantity-input3" class="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                    <svg class="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                          </form>
                          <button type="button" class="ms-2 hover:underline">Remove</button>
                        </div>
                    </div>
                    <div class="relative top-2">
                      <button type="button" class="w-5 h-5 hover:bg-yellow-500 hover:rounded-lg focus:ring-gray-100 focus:ring-2 focus:outline-none" onclick={()=>(navigate('/orderPage'))}>
                        <img src="/public/image/edit.svg" alt="Edit"/>
                      </button>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div> {/* <!-- You might like--> */}
              <h1 class="font-bold text-lg mt-10 text-black mb-2">You might like</h1>
                <div>
                  <a href="#" class="flex px-4 py-3 hover:bg-gray-100"> 
                    <div class="flex-shrink-0">
                      <img class="rounded-lg w-11 h-11" src="/public/image/americano.png" alt="image"/>
                    </div>
                    <div class="w-full ps-3 text-black">
                        <h1 class=" font-normal">Taro</h1>
                        <h1 class=" font-normal">₱59.00</h1>
      
                        <div class="pt-2 flex">
                          <button type="button" class="w-full py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-greenColor">Add to Cart</button>
                        </div>
                    </div>
                  </a>
                </div>
            </div>

          </div>
        </div>
      )}
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>{/* <!-- AOS Animation--> */}
    </div>
  )
}

export default Menu
