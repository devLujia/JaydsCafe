import React, { useEffect, useState } from 'react'
import user from '../../image/UserAcc.svg'
import notif from '../../image/notif.svg'
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import riderLogo from '../../../components/image/logoRider.svg'
import bike from '../../image/bike.svg';
import pending from '../../image/pending.svg';
import dollarSign from '../../image/dollarSign.svg';
import loc from '../../image/locationrider.svg';
import clock from '../../image/clock.svg';
import msg from '../../image/messagerider.svg';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardRider() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState([]);
    const [role, setRole] = useState(null);
    const [totalOrder, setTotalOrder] = useState([]);
    const [weeklytotalOrder, setWeeklyTotalOrder] = useState([]);

    const [cmsName,setCmsName] = useState('');

    const navigate = useNavigate();

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

        fetchNameData();
    })

    const toggleSideNav = () => {
        setSidebarOpen (!isSidebarOpen);
    };


    useEffect(() => {
        const fetchData = async () => {
        try {
           const res = await axios.get('http://localhost:8081/admin');
           if (res.data.valid) {
           setAuthenticated(true);
           setUserId(res.data.userId);
           setRole(res.data.role);
           } 
           
           else {
           navigate('/riderLogin');
           }
        } 
        
        
        catch (err) {
           console.log(err);
        }
        };
  
        fetchData();
        }, [navigate]);

        useEffect(() => {
            const fetchProfile = async () => {
              try {
                const response = await axios.post('http://localhost:8081/profile', { userId });
                setProfile(response.data);
              } catch (error) {
                console.error('Error fetching profile details:', error);
              }
            };
          
            if (userId) {
                fetchProfile()};
          }, [userId]);
      
        useEffect(() => {
            const fetchTotalOrder = async () => {
                try {
                const response = await axios.post('http://localhost:8081/ridertotalOrder', { userId });
                setTotalOrder(response.data);
                } catch (error) {
                console.error('Error fetching total order details:', error);
                }
            };
        
            if (userId) {
                fetchTotalOrder()};
        }, [userId]);

        useEffect(() => {
            const fetchWeeklyTotalOrder = async () => {
              try {
                const response = await axios.post('http://localhost:8081/weeklyridertotalOrder', { userId });
                setWeeklyTotalOrder(response.data);
              } catch (error) {
                console.error('Error fetching weekly total order details:', error);
              }
            };
          
            if (userId) {
                fetchWeeklyTotalOrder()};
          }, [userId]);
          

    const handleLogout = async () => {
        try {
          const res = await axios.post('http://localhost:8081/logout');
          if (res.data.success) {
            // eslint-disable-next-line no-restricted-globals
            location.reload();
            navigate('/riderLogin');
          } else {
            console.log('Logout Failed');
          }
        } catch (error) {
          console.error('Error during logout:', error);
        }
    };

  return (
    <div className='bg-slate-100 dark:bg-gray-700'>
        <nav class="sticky top-0 bg-slate-100 z-20 shadow-none flex justify-between dark:bg-gray-900 ">
            
            <div className='block sm:hidden'>
                <button onClick={toggleSideNav}>
                    <img src={riderLogo}></img>
                </button>
            </div>

            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center ">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif}></img>
                </button>
                <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end dark:text-white">
                    <div class="font-bold">{profile.name}</div>
                    <div class="items-center justify-center">{profile.role}</div>
                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
            </div>
        </nav>


        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
             aria-label="Sidebar">            
            <div class="h-full px-3 pb-4 overflow-y-auto dark:bg-gray-800 flex justify-between flex-col">
                <div>
                    <button class="flex items-center ps-2.5 mb-5" onClick={toggleSideNav}>
                        <img src={riderLogo} alt="Logo"/>
                        <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">{cmsName}</span>
                    </button>
                    <ul class="space-y-2 font-medium">
                        <li> {/* <!--Dashboard  -->  text-gray-600 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white */}
                            <a href="#" class="flex items-center p-2  rounded-lg bg-greenColor group text-white">
                                <svg class="w-5 h-5 transition duration-75 dark:text-gray-600  group text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li> {/* <!-- Order Management --> */}
                            <a href="/RiderOrder" class="flex items-center p-2 rounded-lg hover:bg-greenColor group text-gray-600  hover:text-white">
                                <svg class="flex-shrink-0 w-5 h-5 hover:text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span class="ms-3">Order</span>
                            </a>
                        </li>
                        <li> {/* <!-- Inbox --> */}
                        <a href="/RiderInbox" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    <li> {/* <!-- Settings --> */}
                        <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                        <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                        </svg>
                            <span class="ms-1">Settings</span>
                        </a>
                    </li>
                    <li> {/* <!-- Sign Out --> */}
                        <a href="/RiderLogin" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                            </svg>
                            <span class="ms-3">Sign Out</span>
                        </a>
                    </li>
                </ul>

            </div>
        </aside>

        <div class="py-4 sm:ml-64 ">
            <div class="p-4 sm:ml-8">

                {/* Cards top container */}
                 <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5'>
                    {/* Cards 1 */}
                    <div className='bg-white rounded-lg p-5 font-semibold shadow-lg dark:bg-gray-400'>
                        <div className='flex justify-between mb-5 dark:text-gray-100'>
                            <h1>Weekly Deliveries</h1>
                            <img src={bike}></img>
                        </div>
                        <p className='text-2xl font-bold dark:text-gray-800'>{weeklytotalorder?.totalOrders}</p>
                    </div>
                    {/* Cards 2 */}
                    <div className='bg-white rounded-lg p-5 font-semibold shadow-lg dark:bg-gray-400'>
                        <div className='flex justify-between mb-5 dark:text-gray-100'>
                            <h1>Weekly Earnings</h1>
                            <img src={dollarSign}></img>
                        </div>
                        <p className='text-2xl font-bold dark:text-gray-800'>₱5000.00 </p>
                    </div>
                    {/* Cards 3 */}
                    <div className='bg-white rounded-lg p-5 font-semibold shadow-lg dark:bg-gray-400'>
                        <div className='flex justify-between mb-5 dark:text-gray-100'>
                            <h1>Pending Orders</h1>
                            <img src={pending}></img>
                        </div>
                        <p className='text-2xl font-bold dark:text-gray-800'>{totalorder?.totalOrders}</p>
                    </div>
                 </div>

                {/* Pending & Chats*/}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Pening order */}
                    <div class="p-4 bg-white rounded-xl shadow-lg h-screen w-full dark:bg-gray-900 dark:text-gray-300 overflow-hidden overflow-y-auto ">
                        <div class="flex relative justify-between">
                            <h1 class="font-bold text-3xl tracking-wide mb-3">Pending Orders</h1>
                            <Link to='/RiderOrder'>
                                <button class="py-2 px-4 border-2 border-gray-500 rounded-lg text-sm font-semibold">
                                    View All Orders
                                </button>
                            </Link>
                        </div>
                        
                        {/* main container of pending order */}
                        <div className='w-full h-fit mt-4 space-y-5 '>
                            {/* pending 1 */}
                            <div class="group w-full bg-white border-2 border-solid border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-600 dark:bg-gray-500 dark:border-gray-800 dark:hover:border-indigo-300">
                                <div class="relative flex items-center gap-5 mb-6">
                                    <img src={user} alt="Jane avatar"></img>
                                    <div class="grid gap-1"> 
                                        <h5 class="text-gray-900 font-semibold transition-all duration-500 dark:text-gray-100 text-2xl ">Dimbo</h5>
                                        <div className='flex flex-row shrink-0 gap-2'>
                                            <img src={loc} className='dark:filter dark:invert'></img>
                                            <span class="text-sm leading-6 text-gray-500 dark:text-gray-100"> Dasmariñas, Salawag </span>
                                        </div>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-amber-200 font-semibold '> {/* 1st na indication */}
                                        <h1 className='text-amber-500'>Pending</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-blue-200 font-semibold hidden'> {/* 2st na indication */}
                                        <h1 className='text-violet-500'>accepted</h1>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-violet-200 font-semibold hidden'> {/* 3st na indication */}
                                        <h1 className='text-violet-500'>Picked up</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-slate-200 font-semibold hidden'> {/* 4st na indication */}
                                        <h1 className='text-slate-500'>On The Way</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-textgreenColor font-semibold hidden'> {/* 5st na indication */}
                                        <h1 className='text-white'>Delivered</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-red-200 font-semibold hidden'>
                                        <h1 className='text-red-500'>Cancelled</h1>
                                    </div>
                                </div>

                                <div class="flex items-center mb-1 gap-2 text-amber-500 transition-all duration-500 ">
                                    <p class="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800 dark:text-white"> <span className='font-semibold text-black dark:text-white'>Items: </span> Bubble Milk Tea, Taro Milk Tea</p>
                                </div>
                                <div className='flex flex-row shrink-0 gap-2'>
                                    <img src={clock}></img>
                                    <span class="text-sm leading-6 text-gray-500"> Accepted at: 09:42 AM </span>
                                </div>

                                <div className='mt-5 flex justify-between flex-wrap gap-y-4'>
                                    <button className='font-semibold inline-flex justify-center items-center border border-solid border-slate-300 py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                        <img src={msg} className='dark:filter dark:invert'></img>
                                        <p className='dark:text-white'>Message</p>
                                    </button>

                                    {/* Pangalawang lalabas */}
                                    <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as Picked up</p>
                                        </button>
                                    </div>

                                    {/* pangatlo lalabas */}
                                    {/* <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as On The Way</p>
                                        </button>
                                    </div> */}

                                    {/* pang apat lalabas */}
                                    {/* <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as Delivered</p>
                                        </button>
                                    </div> */}
                                    
                                </div>

                            </div>

                             {/* accepted 2 */}
                            <div class="group w-full bg-white border-2 border-solid border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-600">
                                <div class="relative flex items-center gap-5 mb-6">
                                    <img src={user} alt="Jane avatar"></img>
                                    <div class="grid gap-1">
                                        <h5 class="text-gray-900 font-medium transition-all duration-500  ">Dimbo</h5>
                                        <div className='flex flex-row shrink-0 gap-2'>
                                            <img src={loc}></img>
                                            <span class="text-sm leading-6 text-gray-500"> Dasmariñas, Salawag </span>
                                        </div>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-amber-200 font-semibold hidden'>
                                        <h1 className='text-amber-500'>Pending</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-blue-200 font-semibold '>
                                        <h1 className='text-violet-500'>accepted</h1>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-violet-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>Picked up</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-slate-200 font-semibold hidden'>
                                        <h1 className='text-slate-500'>On The Way</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-red-200 font-semibold hidden'>
                                        <h1 className='text-red-500'>Cancelled</h1>
                                    </div>
                                </div>

                                <div class="flex items-center mb-1 gap-2 text-amber-500 transition-all duration-500  ">
                                    <p class="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800"> <span className='font-semibold text-black'>Items: </span> Bubble Milk Tea, Taro Milk Tea</p>
                                </div>
                                <div className='flex flex-row shrink-0 gap-2'>
                                    <img src={clock}></img>
                                    <span class="text-sm leading-6 text-gray-500"> Dasmariñas, Salawag </span>
                                </div>

                                <div className='mt-5 flex justify-between'>
                                    <button className='font-semibold inline-flex justify-center items-center border border-solid border-slate-300 py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                        <img src={msg}></img>
                                        <p>Message</p>
                                    </button>

                                    {/* ito yung unang lalabas */}
                                    {/* <div className='flex justify-between gap-4'>
                                        <button className='font-normal hover:bg-red-700 transition-all duration-300 bg-red-500 py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Decline</p>
                                        </button>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-10 rounded-lg gap-2 text-white'>
                                            <p>Accept</p>
                                        </button>
                                    </div> */}

                                    {/* Pangalawang lalabas */}
                                    <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as Picked up</p>
                                        </button>
                                    </div>
                                    
                                </div>

                            </div>

                            {/* picked up 3 */}
                            <div class="group w-full bg-white border-2 gap-y-5 border-solid border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-600">
                                <div class="relative flex items-center gap-5 mb-6">
                                    <img src={user} alt="Jane avatar"></img>
                                    <div class="grid gap-1">
                                        <h5 class="text-gray-900 font-medium transition-all duration-500  ">Bryden</h5>
                                        <div className='flex flex-row shrink-0 gap-2'>
                                            <img src={loc}></img>
                                            <span class="text-sm leading-6 text-gray-500"> Imus, Buhay na patay </span>
                                        </div>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-blue-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>accepted</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-amber-200 font-semibold hidden'>
                                        <h1 className='text-amber-500'>Pending</h1>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-violet-200 font-semibold '>
                                        <h1 className='text-violet-500'>Picked up</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-slate-200 font-semibold hidden'>
                                        <h1 className='text-slate-500'>On The Way</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-red-200 font-semibold hidden'>
                                        <h1 className='text-red-500'>Cancelled</h1>
                                    </div>
                                </div>

                                <div class="flex items-center mb-1 gap-2 text-amber-500 transition-all duration-500  ">
                                    <p class="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800"> <span className='font-semibold text-black'>Items: </span> Bubble Milk Tea, Taro Milk Tea</p>
                                </div>
                                <div className='flex flex-row shrink-0 gap-2'>
                                    <img src={clock}></img>
                                    <span class="text-sm leading-6 text-gray-500"> Dasmariñas, Salawag </span>
                                </div>

                                <div className='mt-5 flex justify-between'>
                                    <button className='font-semibold inline-flex justify-center items-center border border-solid border-slate-300 py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                        <img src={msg}></img>
                                        <p>Message</p>
                                    </button>

                                    {/* <div className='flex justify-between gap-4'>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-red-500 py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Decline</p>
                                        </button>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-10 rounded-lg gap-2 text-white'>
                                            <p>Accept</p>
                                        </button>
                                    </div> */}

                                     {/* pangatlo lalabas */}
                                    <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as On The Way</p>
                                        </button>
                                    </div>

                                    
                                </div>

                            </div>

                            {/* Delivered 4 */}
                            <div class="group w-full bg-white border-2 gap-y-5 border-solid border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-600">
                                <div class="relative flex items-center gap-5 mb-6">
                                    <img src={user} alt="Jane avatar"></img>
                                    <div class="grid gap-1">
                                        <h5 class="text-gray-900 font-medium transition-all duration-500  ">Bryden</h5>
                                        <div className='flex flex-row shrink-0 gap-2'>
                                            <img src={loc}></img>
                                            <span class="text-sm leading-6 text-gray-500"> Imus, Buhay na patay </span>
                                        </div>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-blue-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>accepted</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-amber-200 font-semibold hidden'>
                                        <h1 className='text-amber-500'>Pending</h1>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-violet-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>Picked up</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-slate-200 font-semibold '>
                                        <h1 className='text-slate-500'>On The Way</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-red-200 font-semibold hidden'>
                                        <h1 className='text-red-500'>Cancelled</h1>
                                    </div>
                                </div>

                                <div class="flex items-center mb-1 gap-2 text-amber-500 transition-all duration-500  ">
                                    <p class="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800"> <span className='font-semibold text-black'>Items: </span> Bubble Milk Tea, Taro Milk Tea</p>
                                </div>
                                <div className='flex flex-row shrink-0 gap-2'>
                                    <img src={clock}></img>
                                    <span class="text-sm leading-6 text-gray-500"> Dasmariñas, Salawag </span>
                                </div>

                                <div className='mt-5 flex justify-between'>
                                    <button className='font-semibold inline-flex justify-center items-center border border-solid border-slate-300 py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                        <img src={msg}></img>
                                        <p>Message</p>
                                    </button>

                                    {/* <div className='flex justify-between gap-4'>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-red-500 py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Decline</p>
                                        </button>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-10 rounded-lg gap-2 text-white'>
                                            <p>Accept</p>
                                        </button>
                                    </div> */}

                                     {/* pang apat lalabas */}
                                     <div className=''>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Mark as Delivered</p>
                                        </button>
                                    </div>

                                    
                                </div>

                            </div>

                            {/* Delivered 5 */}
                            <div class="group w-full bg-white border-2 gap-y-5 border-solid border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-indigo-600">
                                <div class="relative flex items-center gap-5 mb-6">
                                    <img src={user} alt="Jane avatar"></img>
                                    <div class="grid gap-1">
                                        <h5 class="text-gray-900 font-medium transition-all duration-500  ">Bryden</h5>
                                        <div className='flex flex-row shrink-0 gap-2'>
                                            <img src={loc}></img>
                                            <span class="text-sm leading-6 text-gray-500"> Imus, Buhay na patay </span>
                                        </div>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-blue-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>accepted</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-amber-200 font-semibold hidden'>
                                        <h1 className='text-amber-500'>Pending</h1>
                                    </div>
                                    
                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-violet-200 font-semibold hidden'>
                                        <h1 className='text-violet-500'>Picked up</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-slate-200 font-semibold hidden'>
                                        <h1 className='text-slate-500'>On The Way</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-textgreenColor font-semibold '>
                                        <h1 className='text-white'>Delivered</h1>
                                    </div>

                                    <div className='absolute top-0 right-0 rounded-full w-fit py-1 px-2 text-sm bg-red-200 font-semibold hidden'>
                                        <h1 className='text-red-500'>Cancelled</h1>
                                    </div>
                                </div>

                                <div class="flex items-center mb-1 gap-2 text-amber-500 transition-all duration-500  ">
                                    <p class="text-sm text-gray-500 leading-6 transition-all duration-500  group-hover:text-gray-800"> <span className='font-semibold text-black'>Items: </span> Bubble Milk Tea, Taro Milk Tea</p>
                                </div>
                                <div className='flex flex-row shrink-0 gap-2'>
                                    <img src={clock}></img>
                                    <span class="text-sm leading-6 text-gray-500"> Dasmariñas, Salawag </span>
                                </div>

                                <div className='mt-5 flex justify-between'>
                                    <button className='font-semibold inline-flex justify-center items-center border border-solid border-slate-300 py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                        <img src={msg}></img>
                                        <p>Message</p>
                                    </button>

                                    {/* <div className='flex justify-between gap-4'>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-red-500 py-2 px-3 rounded-lg gap-2 text-white'>
                                            <p>Decline</p>
                                        </button>
                                        <button className='font-normal hover:bg-blue-700 transition-all duration-300 bg-textgreenColor py-2 px-10 rounded-lg gap-2 text-white'>
                                            <p>Accept</p>
                                        </button>
                                    </div> */}

                                     {/* pang apat lalabas */}
                                     <div className=''>
                                        <button className='font-semibold border-2 border-solid hover:bg-textgreenColor hover:text-white transition-all duration-300 border-textgreenColor py-2 px-3 rounded-lg gap-2 text-slate-700'>
                                            <p>View Order Detials</p>
                                        </button>
                                    </div>

                                    
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Chat */}
                    <div class="bg-white rounded-xl shadow-lg p-4 h-screen overflow-hidden dark:bg-gray-900 dark:text-gray-300">
                        <div class="flex justify-between sticky top-0 bg-white dark:bg-gray-900 dark:text-gray-300">
                            <h1 class="font-bold text-3xl tracking-wide">Recent Messages</h1>
                            <button class="p-2 border-2 border-gray-500 rounded-lg">
                                <Link to='/RiderInbox'>View All Messages</Link>
                            </button>
                        </div>
                        {/* Contacts */}
                        <div class="overflow-y-auto max-h-full pb-2 mt-5">
                            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                    <img src={jaydsLogo} alt="User Avatar" class="w-12 h-12 rounded-full"/>
                                </div>
                                <div class="flex-1">
                                    <h2 class="text-lg font-semibold">Alice</h2>
                                    <p class="text-gray-600">Domat ni lekra</p>
                                </div>
                                
                                <button className='border-2 border-textgreenColor hover:bg-textgreenColor hover:text-white transition-all duration-300 py-2 px-3 font-semibold text-sm text-textgreenColor rounded-lg'>
                                    View
                                </button>
                            </div>
                            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                    <img src={jaydsLogo} alt="User Avatar" class="w-12 h-12 rounded-full"/>
                                </div>
                                <div class="flex-1">
                                    <h2 class="text-lg font-semibold">Megoy</h2>
                                    <p class="text-gray-600">Isang 1 pc Chicken</p>
                                </div>
                                <button className='border-2 border-textgreenColor hover:bg-textgreenColor hover:text-white transition-all duration-300 py-2 px-3 font-semibold text-sm text-textgreenColor rounded-lg'>
                                    View
                                </button>
                            </div>
                            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                                </div>
                                <div class="flex-1">
                                    <h2 class="text-lg font-semibold">Lekra</h2>
                                    <p class="text-gray-600">isang Duk nga po</p>
                                </div>
                                <button className='border-2 border-textgreenColor hover:bg-textgreenColor hover:text-white transition-all duration-300 py-2 px-3 font-semibold text-sm text-textgreenColor rounded-lg'>
                                    View
                                </button>
                            </div>
                            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                                </div>
                                <div class="flex-1">
                                    <h2 class="text-lg font-semibold">Alice</h2>
                                    <p class="text-gray-600">Hoorayy!!</p>
                                </div>
                                <button className='border-2 border-textgreenColor hover:bg-textgreenColor hover:text-white transition-all duration-300 py-2 px-3 font-semibold text-sm text-textgreenColor rounded-lg'>
                                    View
                                </button>
                            </div>
                            <div class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-12 h-12 rounded-full"/>
                                </div>
                                <div class="flex-1">
                                    <h2 class="text-lg font-semibold">Alice</h2>
                                    <p class="text-gray-600">Hoorayy!!</p>
                                </div>
                                <button className='border-2 border-textgreenColor hover:bg-textgreenColor hover:text-white transition-all duration-300 py-2 px-3 font-semibold text-sm text-textgreenColor rounded-lg'>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
  )
}
