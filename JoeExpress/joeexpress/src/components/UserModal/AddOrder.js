import axios from 'axios';
import React, { useEffect, useState } from 'react'
import americano from '../image/americano.png'
import caramel from '../image/milktea.png'
import cupsmall from '../image/cup(small).svg'
import { Link, useNavigate, useParams } from 'react-router-dom';

function AddOrder({closeModal}) {
    const [sizes, setSizes] = useState([]);
    const [sweetness, setSweetness] = useState(false);
    const [addons, setAddons] = useState(false);

    const { foodId } = useParams();
    const [selectedSize, setSelectedSize] = useState('medium');
    
    const [values, setValues] = useState({
        name: '',
        price: ''
      });
    
    const handleInput = (e) => {
    setValues({
        ...values,
        [e.target.name]: e.target.value
    });
    };
    
    const handleSubmit = () =>{
        axios.post('http://localhost:8081/menu', values)
            .then(res =>{
                closeModal(false);
            });
    
    }
    const toggleSweetness = () => {
        setSweetness(!sweetness);
    };
    
    const toggleAddons = () => {
        setAddons(!addons);
    };
    // Fetch the food item details
    useEffect(() => {
        axios.get(`http://localhost:8081/items/${foodId}`)
            .then(res => setFood(res.data.data))
            .catch(err => console.log(err));
    }, [foodId]);

     // Fetch food sizes
     useEffect(() => {
        if (foodId) {
            axios.post(`http://localhost:8081/sizes`, { foodId })
                .then(res => setSizes(res.data))
                .catch(err => console.error('Error fetching sizes:', err));
        }
    }, [foodId]);

return(
    <div>
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
            <div className='bg-white w-full max-w-fit md:max-w-4xl max-h-full rounded-xl shadow-lg flex flex-col'>

                {/* Main Container */}
                <div className='grid grid-cols-1 md:grid-cols-2 rounded-lg max-h-screen '>
                    {/* Left side */}
                    <div className='flex flex-col rounded-lg gap-y-5'>
                        <div className='bg-background rounded-tl-xl'>
                            <div className="p-4  w-56 mx-auto aspect-square">
                                <img src={caramel} alt="Milk Tea" className="w-full h-full object-contain"/>
                            </div>
                        </div>
                        
                        <div className='text-center p-2 flex justify-center flex-col items-center'>
                            <h1 className='text-3xl font-bold mb-2'>
                                Taro Milk Tea
                            </h1>
                            <p className='text-lg font-semibold text-slate-300 mb-1'>
                                Starts at
                            </p>
                            <h2 className='text-2xl mb-4'>
                                ₱ 59.00
                            </h2>

                            <div className="bg-white border-2 border-slate-300 rounded-lg p-4 flex items-center justify-between w-72 mb-6">
                                {/* <!-- Small Size --> */}
                                <label className="flex flex-col items-center">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="small"
                                        checked={selectedSize === 'small'}
                                        onChange={() => setSelectedSize('small')}
                                        className="hidden"
                                    />
                                    <div className={`p-1 ${selectedSize === 'small' ? 'border-2 border-textgreenColor bg-[#d4e9e2] rounded-full fill-white' : ''}`}>
                                        <img src={cupsmall} alt="Small" className="h-8 w-8 mb-1" />
                                    </div>
                                    <p className={`text-sm font-semibold ${selectedSize === 'small' ? 'text-green-500' : ''}`}>Small</p>
                                    <p className="text-xs text-gray-500">354 ml</p>
                                </label>

                                {/* <!-- Medium Size --> */}
                                <label className="flex flex-col items-center">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="medium"
                                        checked={selectedSize === 'medium'}
                                        onChange={() => setSelectedSize('medium')}
                                        className="hidden"
                                    />
                                    <div className={`p-1 ${selectedSize === 'medium' ? 'border-2 border-textgreenColor bg-[#d4e9e2] rounded-full' : ''}`}>
                                        <img src={cupsmall} alt="Medium" className="h-8 w-8" />
                                    </div>
                                    <p className={`text-sm font-semibold ${selectedSize === 'medium' ? 'text-green-500' : ''}`}>Medium</p>
                                    <p className="text-xs text-gray-500">473 ml</p>
                                </label>

                                {/* <!-- Large Size --> */}
                                <label className="flex flex-col items-center">
                                    <input
                                        type="radio"
                                        name="size"
                                        value="large"
                                        checked={selectedSize === 'large'}
                                        onChange={() => setSelectedSize('large')}
                                        className="hidden"
                                    />
                                    <div className={`p-1 ${selectedSize === 'large' ? 'border-2 border-textgreenColor bg-[#d4e9e2] rounded-full' : ''}`}>
                                        <img src={cupsmall} alt="Large" className="h-8 w-8 mb-1" />
                                    </div>
                                    <p className={`text-sm font-semibold ${selectedSize === 'large' ? 'text-green-500' : ''}`}>Large</p>
                                    <p className="text-xs text-gray-500">709 ml</p>
                                </label>
                            </div>

                            <div class="my-4 py-3 px-6 inline-block bg-white border-2 border-textgreenColor rounded-full dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
                                <div class="flex items-center gap-x-2">
                                <button type="button" id="decrement-btn" class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
                                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                    </svg>
                                </button>
                                <input id="input-number" class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" type="number" aria-roledescription="Number field" value="0" data-hs-input-number-input=""/>
                                <button type="button" id="increment-btn" class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
                                    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5v14"></path>
                                    </svg>
                                </button>
                                </div> {/* <!-- npm i @preline/input-number --> */}
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className='rounded-r-xl p-3'>
                        {/* Sweetness Dropdown */}
                        <h2 id="accordion-color-heading-1">
                            <button
                            type="button"
                            class="flex items-center justify-between w-full font-medium rtl:text-right text-gray-500 hover:bg-slate-300 rounded-t-lg px-2 gap-3"
                            onClick={toggleSweetness}
                            data-accordion-target="#accordion-color-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-color-body-1"
                            >
                            <span class="text-md">Sweetness </span>
                            <div className='inline-flex items-center gap-2'>
                                <p>optional</p>
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
                            <div id="accordion-color-body-1" className="w-full px-5">
                            <div class="flex items-center mb-4 border-b-2 border-gray-200 py-3">
                                <input id="radio-1" type="radio" name="sugar-level" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-textgreenColor dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No Sugar (0%)</label>
                            </div> 
                            <div class="flex items-center mb-4 border-b-2 border-gray-200 py-3">
                                <input id="radio-2" type="radio" name="sugar-level" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-textgreenColor dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="radio-2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quarter (25%)</label>
                            </div>
                            <div class="flex items-center mb-4 border-b-2 border-gray-200 py-3">
                                <input id="radio-3" type="radio" name="sugar-level" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-textgreenColor dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="radio-3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Half (50%)</label>
                            </div>
                            <div class="flex items-center mb-4 border-b-2 border-gray-200 py-3">
                                <input id="radio-4" type="radio" name="sugar-level" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-textgreenColor dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="radio-4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lite (75%)</label>
                            </div>
                            <div class="flex items-center mb-4 border-b-2 border-gray-200 py-3">
                                <input id="radio-5" type="radio" name="sugar-level" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-textgreenColor dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="radio-5" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Normal (100%)</label>
                            </div>
                        </div>
                        )}

                        {/* addons Dropdown */}
                        <h2 id="accordion-color-heading-1">
                            <button
                            type="button"
                            class="flex items-center justify-between w-full mt-3 font-medium rtl:text-right text-gray-500 hover:bg-slate-300 rounded-t-lg px-2 gap-3"
                            onClick={toggleAddons}
                            data-accordion-target="#accordion-color-body-1"
                            aria-expanded="true"
                            aria-controls="accordion-color-body-1"
                            >
                            <span class="text-md">Add-ons (Choose up to 2) </span>
                            <div className='inline-flex items-center gap-2'>
                                <p>optional</p>
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
                                <div class="flex justify-between items-center mb-4 border-b-2 border-gray-200 py-3">
                                    <div>
                                        <input id="addons1" type="checkbox" value="" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label for="addons1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>
                                    <div>
                                        <p>₱ 10.00</p>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mb-4 border-b-2 border-gray-200 py-3">
                                    <div>
                                        <input id="addons2" type="checkbox" value="" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label for="addons2" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>
                                    <div>
                                        <p>₱ 10.00</p>
                                    </div>
                                </div> 
                                <div class="flex justify-between items-center mb-4 border-b-2 border-gray-200 py-3">
                                    <div>
                                        <input id="addons3" type="checkbox" value="" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label for="addons3" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>
                                    <div>
                                        <p>₱ 10.00</p>
                                    </div>
                                </div> 
                                <div class="flex justify-between items-center mb-4 border-b-2 border-gray-200 py-3">
                                    <div>
                                        <input id="addons4" type="checkbox" value="" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label for="addons4" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>
                                    <div>
                                        <p>₱ 10.00</p>
                                    </div>
                                </div> 
                                <div class="flex justify-between items-center mb-4 border-b-2 border-gray-200 py-3">
                                    <div>
                                        <input id="addons5" type="checkbox" value="" class="w-4 h-4 text-textgreenColor bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <label for="addons5" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>
                                    <div>
                                        <p>₱ 10.00</p>
                                    </div>
                                </div>  
                            </div>
                        )}
                        <div className='flex justify-end items-center mb-4 gap-2 mt-4'>
                            <button onClick={()=> closeModal(false)} className='text-white w-full bg-red-500 px-4 py-2 hover:bg-red-600 rounded-lg'>
                                Cancel
                            </button>
                            <button className='bg-textgreenColor text-white rounded-lg py-2 px-3 w-full'>
                                Add to order <span className='text-gray-400'>₱ 59.00</span>
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