import React, { useState, useEffect, useRef } from 'react';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import bagIcon from '../image/bag.svg';
import check from '../image/greenCheck.svg';

import MapModal from '../Map/Map';
import Terms from '../UserModal/TermsAndCondition/Terms'

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccess() {

  const [mapModal, setMapModal] = useState(false);
  const [cmsName,setCmsName] = useState('');
  const [cmsFacebook,setCmsFacebook] = useState('');
  const [cmsInstagram,setCmsInstagram] = useState('');
  const [cmsLink,setCmsLink] = useState('');
  const [TermsModal,setTermsModal] = useState(false); //modal
  const { OrderId } = useParams();

useEffect(() => {
    if (OrderId) {
        axios.post('http://localhost:8081/setTopaid', { OrderId })
            .then(res => {
                // alert(res.data.message);
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    }
}, [OrderId]);



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

      fetchNameData()
      fetchFacebookLinkData()
      fetchInstagramLinkData()
      fetchLinkData()

  },[])

    const handleMapModal = () => {
        setMapModal(!mapModal);
    };

    // modal
    const toggleTermsAndCondiotion = () =>{
      setTermsModal(!TermsModal)
    }

    const navigate= useNavigate();

    const goToMenu = () => {
        navigate('/menu')
    }
    
    const gotoOrders = () => {
        navigate('/cart')
    }

  return (
    <div className=''>
        
        {mapModal && <MapModal closeModal ={() => setMapModal(!mapModal)} />}
        {TermsModal && <Terms closeModal={setTermsModal}/>}

        {/* <!-- nav --> */}
        <nav class="w-full top-0 fixed bg-white z-20 shadow-lg flex justify-between">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href={'/menu'} class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">{cmsName}</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <button>
                <img src={bagIcon} alt=""/>
            </button>
        </nav>

        <div className=' flex justify-center items-center my-auto h-screen' >
            <div className='bg-white w-4/5 lg:w-1/3 mt-20 flex flex-col justify-center items-center rounded-t-lg py-2 px-7 shadow-2xl  border-b-4 border-[#29a645]'>
                <div className='mb-2'>
                    <img src={check}></img>
                </div>
                <div className='text-4xl text-center'>
                    <h1>
                        Your payment was
                        successful!
                    </h1>
                    <p className='text-sm my-4'>
                    Thank you for your payment. We will
                    be in contact with more details shortly.
                    </p>
                </div>
                <div className='flex flex-col w-full gap-y-4 font-bold tracking-wide mb-2 px-3'>
                {OrderId ? (
                        <button onClick={() => navigate(`/tracking/${OrderId    }`)} className='bg-textgreenColor hover:bg-green-500 transition duration-500 w-full rounded-full text-center text-lg text-white py-3 '>
                        View Order Status
                    </button>
                    ) : (
                        <p>Order ID not found</p>
                    )}
                    
                    
                    <button className='w-full hover:underline' onClick={goToMenu}>
                        Back to menu
                    </button>
                </div>
            </div>
        </div>

         {/* <!-- Contact Us --> */}
        <footer class="bg-[#1A1A1A] w-full h-1/4 mt-5 py-7 flex flex-col justify-center items-center"  id="footer">
            <div class="border-y-2 border-gray-400 w-4/5 p-10">
            {/* <!-- container footer--> */}
            <div class="flex justify-between flex-wrap gap-y-3 w-full">
                <h1 class="text-white text-3xl sm:text-4xl font-bold">{cmsName}</h1>
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
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

            <ul class="flex flex-wrap justify-center md:justify-end items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal" data-modal-toggle="default-modal">Refund Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li class="footer-links">
                <a href="#footer" class="hover:underline me-4 md:me-6"  onClick={toggleTermsAndCondiotion}>Terms and Conditions</a>
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
