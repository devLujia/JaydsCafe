import axios from 'axios';
import React, { useEffect, useState } from 'react'
import cupsmall from '../image/cup(small).svg'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';//alert 

function AddOrder({closeModal, foodId}) {
    const [sizes, setSizes] = useState([]);
    const [sweetness, setSweetness] = useState(false);
    const [userId, setUserId] = useState(null);
    const [addons, setAddons] = useState(false);
    const [fetchAddons, setFetchAddons] = useState([]);
    const [food, setFood] = useState([]);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [quantity,setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('medium');
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [sugar, setSugar] = useState('100')
    const [count, setCount] = useState(0);
    
    const [values, setValues] = useState({
        name: '',
        price: ''
    });
    
    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };
      
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1); 
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://jaydscafe.com/api/');
                if (res.data.valid) {
                    setUserId(res.data.userId);
                } else {
                    navigate('/');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
    
        fetchData();
    }, [navigate]);


    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://jaydscafe.com/api/menu', values);
            closeModal(false);
        } catch (error) {
            console.error('Error adding menu:', error);
        }
    };

    useEffect(() => {
        setSweetness(true);
        toggleAddons(true);
    }, []);
    
    const toggleSweetness = () => {
        setSweetness(!sweetness);
    };
    
    const toggleAddons = () => {
        setAddons(!addons);
    };

    const handleAddons = (event, addon) => {
        const isChecked = event.target.checked;
        setSelectedAddons(prev => isChecked
            ? [...prev, addon]
            : prev.filter(a => a.id !== addon.id));
    };

    const handleInput = (e, size, price) => {
        setSelectedSize(size);
        setSelectedPrice(price);
    };

    const totalAddonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    
    const totalPrice = selectedPrice + totalAddonsPrice || 0 * quantity;

  
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const response = await axios.get(`https://jaydscafe.com/api/items/${foodId}`);
                setFood(response.data.data);
            } catch (error) {
                console.error('Error fetching food data:', error);
            }
        };
    
        if (foodId) {
            fetchFoodData();
        }
    }, [foodId]);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                if (foodId) {
                    const response = await axios.post('https://jaydscafe.com/api/sizes', { foodId });
                    const fetchedSizes = response.data;
                    setSizes(fetchedSizes);
    
                    const mediumSize = fetchedSizes.find(size => size.size.toLowerCase() === 'medium');
                    if (mediumSize) {
                        setSelectedSize('medium');
                        setSelectedPrice(mediumSize.price);
                    }
                }
            } catch (error) {
                console.error('Error fetching sizes:', error);
            }
        };
    
        fetchSizes();
    }, [foodId]);
    


    useEffect(() => {

        const fetchAddons = async () => {
            try {
                const res = await axios.post('https://jaydscafe.com/api/Addons');
                setFetchAddons(res.data);
            } catch (error) {
                console.error('Error fetching addons details:', error);
            }
        };
    
        fetchAddons();

    }, []);

    const addToCartApi = async (food, userId) => {
        try {
            // Create a string with add-on names and their prices
            const addonsDetails = selectedAddons.map(addon => `${addon.name} (₱${addon.price})`).join(',');
    
            const response = await axios.post('https://jaydscafe.com/api/cart_items', {
                userId,
                foodId: food?.id,
                size: selectedSize,
                price: totalPrice,
                addons: addonsDetails,
                quantity: quantity,
                sugar: sugar, // Send names and prices of add-ons
            });
            
            return response.data;


        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

//Alert 
    const handleAddToCart = async (food) => {
        try {
            await addToCartApi(food, userId);
            setCart(prevCart => [...prevCart, food]);
            Swal.fire({ 
                title: "Add to Cart Successful",
                text: "Your order placed on the cart!",
                icon: "success"
              });
            closeModal(false)   
        } catch (error) {
            alert('Failed to add item to cart. Please try again.');
        }
    };


return(
    <div>
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 py-4'>
            <div className='bg-white w-full max-w-fit md:max-w-4xl max-h-full mt-4 mb-4 mx-4 rounded-xl shadow-lg flex flex-col'>

                {/* Main Container */}
                <div className='grid grid-cols-1 md:grid-cols-2 rounded-lg lg:max-h-screen overflow-hidden overflow-y-auto'>
                    {/* Left side */}
                    <div className='flex flex-col rounded-lg gap-y-4'>
                        <div className='bg-darkgreen rounded-tl-xl bg-gradient-to-t from-[#ece0c8] to-[#f5f2e4]'>
                            <div className="p-4 w-56 mx-auto aspect-square ">
                                <img src={food?.image_url} alt="Milk Tea" className="w-full h-full object-contain"/>
                            </div>
                        </div>
                        
                        <div className='text-center p-2 flex justify-center flex-col items-center'>
                        <h1 className='text-4xl font-bold mb-2 relative text-transparent glow-text'>
                            {food?.name}
                        </h1>

                            <p className='text-md font-normal text-slate-400'>
                                Starts at
                            </p>
                            <h2 className='text-3xl mb-4 font-bold'>
                            ₱{selectedPrice}.00
                            </h2>

                            <div className="bg-white border-2 border-slate-300 rounded-lg p-4 flex items-center justify-evenly w-72 mb-6">
                                {/* <!-- Small Size --> */}
                                {sizes.map(size => (
                                    <label key={size.id} className="flex flex-col items-center">
                                        <input
                                            type="radio"
                                            name="size"
                                            value={size?.size}
                                            checked={selectedSize === size?.size}
                                            onChange={(e) => handleInput(e, size?.size, size?.price)}
                                            className="hidden"
                                        />
                                        <div className={`p-1 ${selectedSize === size?.size ? 'border-2 border-textgreenColor bg-[#d4e9e2] rounded-full' : ''}`}>
                                            <img src={cupsmall} alt="Medium" className="h-8 w-8" />
                                        </div>
                                        <p className={`text-sm font-semibold ${selectedSize === size?.size ? 'text-green-500' : ''}`}>{size.size}</p>
                                    </label>
                                ))}
                            </div>

                            <div class="my-4 py-3 px-6 inline-block bg-white border-2 border-textgreenColor rounded-full " data-hs-input-number="">
                                <div class="flex items-center gap-x-2">
                                <button type="button"
                                onClick={handleDecrement}
                                 id="decrement-btn" class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full  bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
                                    <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                    </svg>
                                </button>
                                <input id="input-number" class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" type="number" aria-roledescription="Number field" value={quantity } data-hs-input-number-input=""/>
                                <button 
                                onClick={handleIncrement}
                                type="button" 
                                id="increment-btn" 
                                class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
                                    <svg class="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5v14"></path>
                                    </svg>
                                </button>
                                </div> {/* <!-- npm i @preline/input-number --> */}
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className='rounded-r-xl p-3 bg-gray-50'>
                        {/* Sugar level */}
                        <h2 id="accordion-color-heading-1">
                            <button
                            type="button"
                            class="flex items-center justify-between w-full mt-3 font-medium rtl:text-right text-gray-500 hover:bg-slate-300 rounded-t-lg px-2 gap-3"
                            onClick={toggleSweetness}
                            data-accordion-target="#accordion-color-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-color-body-1">
                            <span class="text-md">Sugar Level: </span>
                            <div className='inline-flex items-center gap-2'>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transition-transform duration-300 ${sweetness ? '' : 'rotate-180'}`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6">
                                    <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </div>
                            </button>
                        </h2>

                        {sweetness && (
                               <div id="accordion-color-body-1" className="w-full p-5 max-h-52 overflow-y-auto">
                               <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 ">
                                   <div>
                                       <input
                                           type="radio"
                                           name="sweetness"
                                           id="addon-sweetness-0"
                                           value="0"
                                           checked={sugar === '0'}
                                           onChange={(e) => setSugar(e.target.value)}
                                           className="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                                       />
                                       <label htmlFor="addon-sweetness-0" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">0 % Sweetness</label>
                                   </div>
                               </div>
                               <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 ">
                                   <div>
                                       <input
                                           type="radio"
                                           name="sweetness"
                                           id="addon-sweetness-1"
                                           value="25"
                                           checked={sugar === '25'}
                                           onChange={(e) => setSugar(e.target.value)}
                                           className="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
                                       />
                                       <label htmlFor="addon-sweetness-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">25 % Sweetness</label>
                                   </div>
                               </div>
                               <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 ">
                                   <div>
                                       <input
                                           type="radio"
                                           name="sweetness"
                                           id="addon-sweetness-2"
                                           value="50"
                                           checked={sugar === '50'}
                                           onChange={(e) => setSugar(e.target.value)}
                                           className="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                                       />
                                       <label htmlFor="addon-sweetness-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">50 % Sweetness</label>
                                   </div>
                               </div>
                               <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 ">
                                   <div>
                                       <input
                                           type="radio"
                                           name="sweetness"
                                           id="addon-sweetness-3"
                                           value="75"
                                           checked={sugar === '75'}
                                           onChange={(e) => setSugar(e.target.value)}
                                           className="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                       />
                                       <label htmlFor="addon-sweetness-3" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">75 % Sweetness</label>
                                   </div>
                               </div>
                               <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200 ">
                                   <div>
                                       <input
                                           type="radio"
                                           name="sweetness"
                                           id="addon-sweetness-4"
                                           value="100"
                                           checked={sugar === '100'}
                                           onChange={(e) => setSugar(e.target.value)}
                                           className="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                       />
                                       <label htmlFor="addon-sweetness-4" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">100 % Sweetness</label>
                                   </div>
                               </div>
                           </div>
                            )}



                        {/* Addons Dropdown */}
                        <h2 id="accordion-color-heading-1">
                            <button
                            type="button"
                            class="flex items-center justify-between w-full mt-3 font-medium rtl:text-right text-gray-500 hover:bg-slate-300 rounded-t-lg px-2 gap-3"
                            onClick={toggleAddons}
                            data-accordion-target="#accordion-color-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-color-body-1">
                            <span class="text-md">Add-ons :</span>
                            <div className='inline-flex items-center gap-2'>
                                <p>Optional</p>
                                <svg
                                    data-accordion-icon
                                    className={`w-3 h-3 transition-transform duration-300 ${addons ? '' : 'rotate-180'}`}
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6">
                                    <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 5 5 1 1 5"
                                    />
                                </svg>
                            </div>
                            </button>
                        </h2>

                        {addons && (
                            <div id="accordion-color-body-1" className="w-full p-5 max-h-52 overflow-y-auto">
                                {fetchAddons.filter((addon) => addon.category_id === food?.category_id)
                                .map(addon => (
                                    
                                    <div key={addon.id} class="flex justify-between items-center mb-4 border-b-2 border-gray-200 pb-3">
                                        <div>
                                            <input
                                            type="checkbox" 
                                            name="addons" 
                                            id={`addon-${addon.id}`}
                                            onChange={(e) => handleAddons(e, addon)}
                                            class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                            <label for="addons1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{addon.name}</label>
                                        </div>
                                        <div>
                                            <p>₱{addon.price}.00</p>
                                        </div>
                                    </div>
                            
                                ))}
                                 
                            </div>
                        )}

                        <div className='flex justify-end items-center mb-4 gap-2 mt-4'>
                            <button onClick={()=> closeModal(false)} className='text-white w-[40%] font-semibold tracking-wider bg-red-500 px-4 py-2 hover:bg-red-600 rounded-lg'>
                                Cancel
                            </button>
                            <button
                                onClick={() => handleAddToCart(food)}
                                className='bg-gradient-to-r from-[#1f4d29] via-[#2b6b36] to-[#1f4d29]
                                            font-semibold tracking-wider text-white 
                                            rounded-lg py-2 px-3 w-[60%] 
                                            transition-colors duration-300 
                                            hover:bg-gradient-to-l hover:from-[#2b6b36] hover:to-[#1f4d29] 
                                            '
                                >
                            Add to Order <span className='text-white ms-2'>₱{quantity && (totalPrice * quantity)}.00</span>
                            </button>
                        </div>
                    </div>              
                </div>        
            </div>
        </div>
    </div>
)
}

export default AddOrder