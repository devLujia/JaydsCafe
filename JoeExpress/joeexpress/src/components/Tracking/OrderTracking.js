import React, { useEffect, useState } from 'react'
import track1 from '../image/track1.png';
import track2 from '../image/track2.png';
import track3 from '../image/track3.png';
import track4 from '../image/track4.png';
import arrowL from '../image/arrow left.png'
import logo from '../image/logo.png'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function OrderTracking() {

    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const { OrdrId } = useParams();
    const [Ordr,setOrdr] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/tracking/${OrdrId}`)
            .then(res => setOrdr(res.data.data))
            .catch(err => console.log(err));
    }, [OrdrId]);

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
    <section>

<nav class="sticky top-0 bg-white z-20">
        <div class="font-extrabold text-xl flex items-center py-1">
            <img src={logo}alt="logo" class="logo w-14 ml-5"/><a href="/cart" class="flex items-center w-96 h-10 hover:scale-110 hover:cursor-pointer hover:brightness-110 transition duration-200 hover:text-yellow-950"> <img src={arrowL} alt="Arrow Back" class=" w-14 h-14 mx-4"/>Back to Menu</a>
        </div>  
    </nav>
    {/* <!-- Main Container --> */}
<section class=" mt-10">
        <div class="flex justify-center items-center mb-10">
            <h2 class="font-extrabold text-4xl">Track Order</h2>
        </div>
        
        <div class="flex justify-evenly items-center mb-20">
            <div>
                <p class="font-bold text-xl">
                 Estimated Time: 
                 <span class="font-normal ps-2">30 minutes</span>
                </p>
             </div>
             <div>
                 <p class="font-bold text-xl">
                  Order Number: 
                  <span class="font-normal ps-2">30 minutes</span>
                 </p>
             </div>
            </div>
       
        {/* <!-- Description --> */}
        <div class="flex justify-evenly items-center mb-32">
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
                <li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                    <span class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                        <svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                        {/* <!-- <img src="/public/image/track1.png" alt="" class="w-6 h-6"> --> */}
                    </span>
                </li>
                <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                    <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                        </svg> --> */}
                        <img src={track2} alt="" class="w-6 h-6"/>
                    </span>
                </li>
                <li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                    <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                        </svg> --> */}
                        <img src={track3} alt="" class="w-6 h-6"/>
                    </span>
                </li>
                <li class="flex items-center">
                    <span class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        {/* <!-- <svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                        </svg> --> */}
                        <img src={track4} alt="" class="w-6 h-6"/>
                    </span>
                </li>
            </ol>
        </div>
    </section>

    </section>
  )
}

export default OrderTracking
