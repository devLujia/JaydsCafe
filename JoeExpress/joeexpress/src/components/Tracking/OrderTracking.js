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
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function OrderTracking() {

    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [order, setOrder] = useState([])
    
    const { OrdrID } = useParams();


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
        <nav class="w-full top-0 fixed bg-white z-20 shadow-lg flex justify-evenly">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <Link href="/" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</Link>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <button>
                <img src={bagIcon} alt=""/>
            </button>
        </nav>

        {/* <!-- Main Container --> */}
        <section class=" mt-20">
            
            <Link to="/cart" class="text-xl ml-16 font-bold hover:underline"> 
                <img src={arrowLeft} alt="" class="inline-block w-4 h-4 me-4"/>Back to Cart
            </Link>


            <div class="flex justify-center items-center mb-10 flex-col">
                <div className='w-28 h-28 bg-slate-200 rounded-md mb-5'>
                    <img src={americano} className='object-contain h-full w-full'></img>
                </div>
                <h2 class="font-bold text-3xl tracking-wide">Thank you, your order is processing...</h2>
            </div>
            
            <div class="flex justify-evenly items-center mb-24">
                <div>
                    <p class="text-2xl text-center">
                    Order Number: 
                    <span class="block text-center">#{OrdrID}</span>
                    </p>
                </div>
                <div>
                    <p class="text-2xl text-center">
                    Estimated Time: 
                    <span class="block text-center">30 minutes</span>
                    </p>
                </div>
            </div>
        
            {/* <!-- Description --> */}
            <div class="flex justify-evenly items-center mb-20">
                <div class="flex flex-row items-center">
                    <img src={track1} alt="□"/>
                    <div class="ps-3">
                        <h4 class="font-bold text-lg pb-2">Order Placed</h4>
                        <p>We received your order.</p>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src={track2} alt="□"/>
                    <div class="ps-3">
                        <h4 class="font-bold text-lg pb-2">Order Confirmed</h4>
                        <p>Your Order has confirmed.</p>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src={track3} alt="□"/>
                    <div class="ps-3">
                        <h4 class="font-bold text-lg pb-2">Order Processed</h4>
                        <p>We are preparing your order.</p>
                    </div>
                </div>
                <div class="flex flex-row items-center">
                    <img src={track4} alt="□"/>
                    <div class="ps-3">
                        <h4 class="font-bold text-lg pb-2">Ready to Pickup/Deliver</h4>
                        <p>Your order is ready to pickup/deliver.</p>
                    </div>
                </div>
            </div>
            {/* <!-- Stepper --> */}
            <div class=""> 
                <ol class="flex items-center w-[90%] justify-center mx-auto">
                    {/* Eto yung bilog*/}           {/* Yung after:border-textgreenColor eto yung line*/}                                            
                    <li class= {`flex w-full items-center text-textgreenColor dark:text-textgreenColor after:content-[''] after:w-full after:h-1 after:border-b  after:border-4 after:inline-block ${order.status === 'unpaid' ||order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed'   ? 'after:border-textgreenColor dark:after:border-blue-800':'after:border-gray-700'}`}>
                        <span class={`flex items-center justify-center w-10 h-10 bg-textgreenColor rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}>
                            <svg class="w-3.5 h-3.5 text-green-400 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            {/* <!-- <img src="/public/image/track1.png" alt="" class="w-6 h-6"> --> */}
                        </span>
                    </li>
                    
                    {/* Eto yung bilog*/}
                    <li class={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ${order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'after:border-textgreenColor dark:after:border-blue-800':'after:border-gray-500'}`}>
                        <span class={`flex items-center justify-center w-10 h-10 ${order.status === 'paid' || order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor':'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                            {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                            </svg> --> */}
                            <img src={track2} alt="" class="w-6 h-6 filter invert"/>
                        </span>
                    </li>
                    
                    {/* Eto yung bilog*/}
                    <li class={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ${order.status === 'on process' || order.status === 'on delivery' || order.status === 'completed' ? 'after:border-textgreenColor dark:after:border-blue-800':'after:border-gray-500'}`}>
                        <span class={`flex items-center justify-center w-10 h-10 ${order.status === 'on process' ||order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor':'bg-gray-100'} rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                            {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                            </svg> --> */}
                            <img src={track3} alt="" class="w-6 h-6 filter invert"/>
                        </span>
                    </li>
                    
                    {/* Eto yung bilog*/}
                    <li class="flex items-center">
                        <span class={`flex items-center justify-center w-10 h-10 ${order.status === 'on delivery' || order.status === 'completed' ? 'bg-textgreenColor':'bg-gray-100'} rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0 `}>
                            {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                            </svg> --> */}
                            <img src={track4} alt="" class="w-6 h-6 filter invert"/>
                        </span>
                    </li>
                </ol>
            </div>

            {/* <!-- You might like --> */}
            <div className='w-full bg-jaydsBg mt-16'>
                <div className='text-center py-10'>
                    <h1 className='text-6xl font-extrabold tracking-wide'>
                        <span className='text-[#90c63f]'>You </span> might like
                    </h1>
                </div>

                <div id="fm-series">
                    <div class="container p-4 mt-4 pb-10 grid items-center justify-center w-full" > 
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                            <div class="w-full h-fit rounded-lg p-4 min-w-48 max-w-52 shadow-md relative bg-[#fdf8e0] hover:scale-95 duration-300 hover:bg-[#fdf8e0]"> {/* <!-- card 1 --> */}
                                <div class="rounded-full w-full h-full bg-[#fdf8e0] p-4 aspect-square mx-auto">
                                    <img src={jayds} alt="Milk Tea" class="w-full h-full object-contain"/>
                                </div>
                                <h3 class="text-xl font-semibold mt-2 min-h-16">Galunggong</h3>
                                <p class="text-gray-600 mt-2">Starts at</p>
                                <p class="text-2xl font-bold mt-1">₱ 65.00</p>
                                
                                <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[37%] hover:scale-125 duration-300">
                                <img src={cart} alt=""/>
                                </button>
                            </div>
                
                            <div class="w-full h-fit rounded-lg p-4 min-w-48 max-w-52 shadow-md relative bg-[#fdf8e0] hover:scale-95 duration-300 hover:bg-[#fdf8e0]"> {/* <!-- card 1 --> */}
                                <div class="rounded-full w-full h-full bg-[#fdf8e0] p-4 aspect-square mx-auto">
                                    <img src={jayds} alt="Milk Tea" class="w-full h-full object-contain"/>
                                </div>
                                <h3 class="text-xl font-semibold mt-2 min-h-16">Galunggong</h3>
                                <p class="text-gray-600 mt-2">Starts at</p>
                                <p class="text-2xl font-bold mt-1">₱ 65.00</p>
                                
                                <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[37%] hover:scale-125 duration-300">
                                <img src={cart} alt=""/>
                                </button>
                            </div>

                            <div class="w-full h-fit rounded-lg p-4 min-w-48 max-w-52 shadow-md relative bg-[#fdf8e0] hover:scale-95 duration-300 hover:bg-[#fdf8e0]"> {/* <!-- card 1 --> */}
                                <div class="rounded-full w-full h-full bg-[#fdf8e0] p-4 aspect-square mx-auto">
                                    <img src={jayds} alt="Milk Tea" class="w-full h-full object-contain"/>
                                </div>
                                <h3 class="text-xl font-semibold mt-2 min-h-16">Galunggong</h3>
                                <p class="text-gray-600 mt-2">Starts at</p>
                                <p class="text-2xl font-bold mt-1">₱ 65.00</p>
                                
                                <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[37%] hover:scale-125 duration-300">
                                <img src={cart} alt=""/>
                                </button>
                            </div>

                            <div class="w-full h-fit rounded-lg p-4 min-w-48 max-w-52 shadow-md relative bg-[#fdf8e0] hover:scale-95 duration-300 hover:bg-[#fdf8e0]"> {/* <!-- card 1 --> */}
                                <div class="rounded-full w-full h-full bg-[#fdf8e0] p-4 aspect-square mx-auto">
                                    <img src={jayds} alt="Milk Tea" class="w-full h-full object-contain"/>
                                </div>
                                <h3 class="text-xl font-semibold mt-2 min-h-16">Galunggong</h3>
                                <p class="text-gray-600 mt-2">Starts at</p>
                                <p class="text-2xl font-bold mt-1">₱ 65.00</p>
                                
                                <button class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[37%] hover:scale-125 duration-300">
                                <img src={cart} alt=""/>
                                </button>
                            </div>
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
                <h1 class="text-white text-5xl font-bold">Jayd's Cafe</h1>
                <div class="flex gap-2">
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={fb} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={ig} alt=""></img>
                </button>
                <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
                    <img src={yt} alt=""></img>
                </button>
                </div>
            </div>
            
            <button type="button" class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
            </div>

            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

            <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
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
