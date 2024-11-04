import React, { useEffect, useState } from 'react'
import americano from '../image/americano.png';
import jayds from '../image/jaydsCoffee.svg';
import track1 from '../image/track1.png';
import track2 from '../image/track2.png';
import track3 from '../image/track3.png';
import track4 from '../image/track4.png';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import bagIcon from '../image/bag.svg';
import arrowLeft from '../image/arrow left.svg'
import arrowUp from '../image/arrowUp.svg'
import cart from '../image/cart.svg'
import logo from '../image/logoJayds.svg'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function OrderTracking() {

    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);
    const [randomizedFoodsSpecial, setRandomizedFoodsSpecial] = useState([]);
    const [foodsSpecial, setFoodsSpecial] = useState([]);
    const [foods, setFoods] = useState([]);
    const [ordered, setOrdered] = useState(false);


    
    const { OrdrID } = useParams();

    const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };


    useEffect(() => {
        const fetchFoodsSpecial = async () => {
          try {
            const response = await axios.post('http://localhost:8081/foodsSpecial', { userId });
            const { ordered, results } = response.data;
    
            if (ordered) {
              setFoodsSpecial(results);
              setOrdered(true);
            } else {
              setFoodsSpecial(foods)
            }
            
          } catch (error) {
            console.error("Error fetching foods:", error);
          }
        };
    
        fetchFoodsSpecial();
      }, [userId,foods]);


    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/tracking/${OrdrID}`);
                setOrder(response.data);
                
            } catch (err) {
                console.error('Error fetching order details:', err);
            }
        };

        fetchOrderDetails();
    }, [OrdrID]);


    useEffect(() => {
        axios.get('http://localhost:8081/foods')
          .then(response => {
            setFoods(response.data);
          })
          .catch(error => {
            console.error('Error fetching food details:', error.response || error.message);
          });      
      }, []);

    useEffect(() => {

        const shuffled = shuffleArray(foodsSpecial);
        let newRandomized = shuffled.slice(0, 4);
        
        const existingNames = new Set(newRandomized.map(food => food.name));
    
        setRandomizedFoodsSpecial(shuffled)
    
        if (newRandomized.length < 4) {
          foods.forEach(food => {
            if (!existingNames.has(food.name) && newRandomized.length < 4) {
              newRandomized.push(food);
              existingNames.add(food.name); 
            }
          });
          setRandomizedFoodsSpecial(newRandomized);
        }
    
      }, [foodsSpecial, foods]);
    

    // useEffect(() => {
    //     axios.get('http://localhost:8081/')
    //       .then(res => {
    //         if (res.data.valid) {
    //           setAuthenticated(true);
    //           setUserId(res.data.userId);
              
    //         } else {
    //           navigate('/');
    //         }
    //       })
    //       .catch(err => console.log(err));
    //   }, [navigate]);


  return (
    <div>
        {/* <!-- nav --> */}
        <nav class="w-full top-0 fixed bg-white z-20 shadow-lg flex justify-between">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <Link href="/" class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">Jayd's Cafe</Link>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <button>
                <img src={bagIcon} alt=""/>
            </button>
        </nav>

        {/* <!-- Main Container --> */}
        <section class=" mt-20">
            
        <div className='flex justify-start items-center p-6'>
        <Link to="/cart" className='text-base md:text-lg lg:text-xl font-bold text-black hover:underline flex items-center transition-all duration-300 ease-in-out'>
            <img src={arrowLeft} alt="Back to Cart" className='inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-3' />
            Back to Cart
        </Link>
        </div>


            <div class="flex justify-center items-center mb-10 flex-col mt-10">
            <div className='flex justify-center'>
                <div className='relative w-40 h-40 bg-gradient-to-br rounded-full mb-8 overflow-hidden shadow-xl border-4 border-green-700 animate-shining-border'>
                    <img src={logo} alt='Americano' className='absolute inset-0 w-full h-full object-center  p-4 rounded-lg' />
                </div>
            </div>


            {order.status === 'unpaid' ? (
                <h2 className="font-bold text-xl md:text-2xl lg:text-3xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                Thank you for your order! It has been placed and is awaiting payment.
                </h2>
            ) : order.status === 'paid' ? (
                <h2 className="font-bold text-lg md:text-xl lg:text-2xl tracking-wide text-center mb-6 mx-auto px-4">
                <span className="block text-green-700 animate-wave glow-animation">Thank you!</span>
                <span className="block text-gray-700">Your order has been placed and is currently in the queue.</span>
                </h2>
            ) : order.status === 'on process' ? (
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                Thank you! Your order is being prepared.
                </h2>
            ) : order.status === 'pending rider' ? (
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                Thank you! Your order is in the queue, waiting for a rider.
                </h2>
            ) : order.status === 'on delivery' ? (
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                Thank you! Your order is on its way.
                </h2>
            ) : order.status === 'completed' ? (
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                Thank you! Your order has been successfully completed.
                </h2>
            ) : (
                <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide text-center max-w-3xl mb-6 mx-auto px-4">
                We're sorry! Your order has been cancelled.
                </h2>
            )}
            </div>
            
            <div className='flex flex-col lg:flex-row justify-evenly items-center mb-10 p-6 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-md w-full max-w-4xl mx-auto'>
                <div className='mb-6 lg:mb-0'>
                    <p className='text-xl md:text-2xl text-center font-semibold text-gray-800'>
                    Order Number:
                    <span className='block text-center text-green-700 text-lg md:text-xl font-bold mt-2'>#{OrdrID}</span>
                    </p>
                </div>
                <div>
                    <p className='text-xl md:text-2xl text-center font-semibold text-gray-800'>
                    Current Status:
                    <span className='block text-center text-blue-700 text-lg md:text-xl font-bold mt-2'>{order.status?.toUpperCase()}</span>
                    </p>
                </div>
            </div>
        
            <div className='w-full max-w-5xl mx-auto p-8 mb-8 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-xl'>
            {/* Progress Bar */}
            <div className='w-full bg-gray-300 rounded-full h-4 mb-8'>
                <div className={`h-4 rounded-full ${order.status === 'unpaid' ? 'w-1/5 bg-textgreenColor' : ''} ${order.status === 'paid' ? 'w-2/5 bg-textgreenColor' : ''} ${order.status === 'on process' ? 'w-3/5 bg-textgreenColor' : ''} ${order.status === 'on delivery' ? 'w-4/5 bg-textgreenColor' : ''} ${order.status === 'completed' ? 'w-full bg-textgreenColor' : ''}`}></div>
            </div>

            <div className='flex flex-row flex-wrap justify-between items-center gap-4 md:flex-nowrap md:justify-around md:items-start text-center'>
                <div className={`flex flex-col items-center gap-4 w-full md:w-auto ${order.status === 'unpaid' || order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'opacity-100' : 'opacity-50'}`}> 
                <span className={`flex items-center justify-center w-12 h-12 rounded-full ${order.status === 'unpaid' ? 'bg-gray-200 text-gray-600' : 'bg-textgreenColor text-white'}`}> 
                    <svg className={`w-6 h-6 ${order.status === 'unpaid' ? 'text-gray-600' : 'text-white'}`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 12'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5.917 5.724 10.5 15 1.5' />
                    </svg>
                </span>
                <div>
                    <h4 className='font-bold text-lg md:text-xl text-gray-800'>Order Placed</h4>
                    <p className='text-gray-600'>We received your order.</p>
                </div>
                </div>
                <div className={`flex flex-col items-center gap-4 w-full md:w-auto ${order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'opacity-100' : 'opacity-50'}`}> 
                <span className={`flex items-center justify-center w-12 h-12 rounded-full ${order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor text-white' : 'bg-gray-200 text-gray-600'}`}> 
                    <img src={track2} alt='Order Confirmed' className={`w-8 h-8 object-contain ${order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'filter invert' : ''}`} />
                </span>
                <div>
                    <h4 className='font-bold text-lg md:text-xl text-gray-800'>Order Confirmed</h4>
                    <p className='text-gray-600'>Your order has been confirmed.</p>
                </div>
                </div>
                <div className={`flex flex-col items-center gap-4 w-full md:w-auto ${order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'opacity-100' : 'opacity-50'}`}> 
                <span className={`flex items-center justify-center w-12 h-12 rounded-full ${order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor text-white' : 'bg-gray-200 text-gray-600'}`}> 
                    <img src={track3} alt='Order Processed' className={`w-8 h-8 object-contain ${order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'filter invert' : ''}`} />
                </span>
                <div>
                    <h4 className='font-bold text-lg md:text-xl text-gray-800'>Order Processed</h4>
                    <p className='text-gray-600'>We are preparing your order.</p>
                </div>
                </div>
                <div className={`flex flex-col items-center gap-4 w-full md:w-auto ${order.status === 'on delivery' || order.status === 'completed' ? 'opacity-100' : 'opacity-50'}`}> 
                <span className={`flex items-center justify-center w-12 h-12 rounded-full ${order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor text-white' : 'bg-gray-200 text-gray-600'}`}> 
                    <img src={track4} alt='Ready to Pickup/Deliver' className={`w-8 h-8 object-contain ${order.status === 'on delivery' || order.status === 'completed' ? 'filter invert' : ''}`} />
                </span>
                <div>
                    <h4 className='font-bold text-lg md:text-xl text-gray-800'>Ready to Pickup/Deliver</h4>
                    <p className='text-gray-600'>Your order is ready to pickup/deliver.</p>
                </div>
                </div>
            </div>
            </div>


            {/* <!-- You might like --> */}
            <div className="w-full bg-jaydsBg mt-16">
            <div className="text-center py-10">
                <h1 className="text-4xl font-extrabold tracking-wide">
                    <span className="text-green-700">You </span> might like
                </h1>
            </div>

            <div id="fm-series">
    <div className="container p-4 mt-4 pb-10 grid items-center justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {randomizedFoodsSpecial.slice(0, 4).map((foods) => (
                <div
                    key={foods.id}
                    className="relative overflow-hidden bg-gradient-to-b from-[#E5F5EE] to-white border-2 border-[#067741] rounded-3xl w-full max-w-[370px] shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                    {/* Image Container with 3D Effect */}
                    <div className="relative bg-gradient-to-t from-[#ece0c8] to-[#f5f2e4] p-6 rounded-t-xl">
                        <div className="w-full h-[160px] flex justify-center items-center">
                            <div className="p-2 overflow-hidden transform hover:rotate-2 hover:scale-105 transition-transform duration-300">
                                <img
                                    className="max-w-none max-h-full object-contain"
                                    src={foods.image_url}
                                    alt={foods.name}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="relative text-gray-800 px-4 pb-4 mt-2 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-lg text-gray-900 w-3/4 overflow-hidden text-ellipsis whitespace-normal">
                                {foods.name}
                            </span>
                            <span className="bg-gray-200 rounded-full text--800 text-md font-semibold px-2 py-1 shadow-sm transform transition-transform duration-300 hover:shadow-md hover:scale-105 whitespace-nowrap">
                                <strong>₱ </strong>{foods.price}.00
                            </span>
                        </div>
                        <span className="block text-sm opacity-75 text-gray-700 mb-3">
                            Medium (22oz)
                        </span>

                        {/* Add to Cart Button */}
                        <div className="mt-auto">
                            <button
                                onClick={() => navigate('/cart')}
                                className="relative overflow-hidden text-white p-3 rounded-lg w-full text-center bg-gradient-to-r from-[#067741] via-[#45A64B] to-[#067741] shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-[#1f4d29] via-[#2b6b36] to-[#1f4d29] transition-transform duration-500 transform group-hover:scale-150 group-hover:rotate-45 opacity-25"></span>
                                <span className="relative">Add to Cart</span>
                            </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </section>

        
        {/* <!-- Contact Us --> */} 
        <footer class="bg-[#1A1A1A] w-full h-1/4 py-7 flex flex-col justify-center items-center bottom-0" id="footer">

            <div class="border-y-2 border-gray-400 w-4/5 p-10">
            {/* <!-- container footer--> */}
            <div class="flex justify-between w-full">
                <h1 class="text-white text-3xl sm:text-4xl font-bold">Jayd's Cafe</h1>
                <div class="flex gap-2">
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={fb} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={ig} alt=""></img>
                </button>
                </div>
            </div>
            
            <button type="button" class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
            </div>

            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-center md:text-left">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

            <ul class="flex flex-wrap justify-center md:justify-end items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal" data-modal-toggle="default-modal">Refund Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal3" data-modal-toggle="default-modal3">Terms and Conditions</a>
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
    </div>
  )
}

export default OrderTracking
