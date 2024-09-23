import React from 'react'
import trashbin2 from '../../image/trashbin(2).svg'
import notif from '../../image/notif.svg'
import plus from '../../image/plus.svg'
import axios from 'axios'
import eye from '../../image/eye(2).svg'
import download from '../../image/download.svg'
import user from '../../image/UserAcc.svg';
import jaydsLogo from '../../image/jayds cafe Logo.svg';

import { Link, useNavigate } from 'react-router-dom';

export default function Order_New() {
  return (
    <div className=''>
         {/* <!-- nav --> */}
         <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-betwee">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif}></img>
                </button>
                <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end">
                    <div class="font-bold">Migz Gomez Go</div>
                    <div class="items-center justify-center">Admin</div>
                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
            </div>
        </nav>

        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
            <a href="#" class="flex items-center ps-2.5 mb-5">
                <img src={jaydsLogo} alt="Logo"/>           
                <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">Jayd's Cafe</span>
            </a>
                <ul class="space-y-2 font-medium">
                    <li> {/* <!-- Dashboard --> */}
                    <Link to="/dashboard">
                        <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                            <svg class="w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span class="ms-3">Dashboard</span>
                        </a>
                    </Link>
                    </li>
                    <li> {/* <!-- Order Management --> */}
                        <a href="#" class="flex items-center p-2  rounded-lg bg-greenColor group text-white">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        <span class="ms-3">Order</span>
                        </a>
                    </li>
                    <li> {/* <!-- Product Management --> */}
                        <Link to="/ProductManagement">
                            <a href="/public/Html_Admin/productManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg  hover:bg-greenColor group hover:text-white">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                                </svg>
                                <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                            </a>
                        </Link>
                    </li>
                    <li> {/* <!-- Sales Report --> */}
                    <a href="/Sales" class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-greenColor  group hover:text-white">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Sales Report</span>
                    </a>
                    </li>
                    <li> {/* <!-- Customer Account --> */}
                        <a href="/CustomerAccount" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Customer Account</span>
                        </a>
                    </li>
                    <li> {/* <!-- Content Management --> */}
                    <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                    </a>
                    </li>
                    <li> {/* <!-- Inbox --> */}
                    <a href="/Message" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                        <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                    </a>
                    </li>
                </ul>
        
                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <li> {/* <!-- Settings --> */}
                  <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                  <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                  </svg>
                     <span class="ms-1">Settings</span>
                  </a>
               </li>
                <li>{/* <!-- Sign Out --> */}
                    <a href="/public/Html_Admin/adminLogin.html" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span class="ms-3">Sign Out</span>
                    </a>
                </li>
            </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
        </aside>
        
        <div class="p-4 sm:ml-72 bg-jaydsBg">
            <div class="relative shadow-xl sm:rounded-lg bg-white">
                {/* track order */}
                <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900 rounded-t-xl">
                
                    <div class="text-center">
                        <h1 class="text-xl font-bold tracking-wide">Track Orders</h1>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Product"/>
                    </div>
                    
                </div>

                <div class="w-4/5 mx-auto rounded-lg py-2 mb-16">
                        <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs tracking-widest text-white uppercase bg-textgreenColor dark:bg-gray-700 dark:text-gray-400">
                                            <tr class="text-center">
                                                <th scope="col" class="px-6 py-3 ">
                                                    TRANSACTION
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    DATE / TIME
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    STATUS
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    ACTIONS
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
                                                    <div class="ps-3 mx-auto">
                                                        <div class="text-base font-semibold">#Order-12</div>
                                                        <div class="font-normal text-gray-500">₱39.00</div>
                                                    </div>  
                                                </th>
                                                <td class="px-6 py-4 text-center">
                                                    Jan 13,2023/12:00:00pm
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl mx-auto">Paid</div>
                                                </td>
                                                <td class="px-6 py-4 space-x-2">
                                                    <div class="h-fit items-center justify-center flex space-x-3 ps-4 mx-auto">
                                                        <button>
                                                            <img src={eye} alt="eye" class="w-6 h-6"/>
                                                        </button>
                                                        <button class="hover:underline hover:decoration-blue-500">
                                                            <img src={trashbin2} alt="trash"/>
                                                        </button>
                                                        <button>
                                                            <img src={download} alt="download"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
                                                    <div class="ps-3 mx-auto">
                                                        <div class="text-base font-semibold">#Order-12</div>
                                                        <div class="font-normal text-gray-500">₱39.00</div>
                                                    </div>  
                                                </th>
                                                <td class="px-6 py-4 text-center">
                                                    Jan 13,2023/12:00:00pm
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl mx-auto">Paid</div>
                                                </td>
                                                <td class="px-6 py-4 space-x-2">
                                                    <div class="h-fit items-center justify-center flex space-x-3 ps-4 mx-auto">
                                                        <button>
                                                            <img src={eye} alt="eye" class="w-6 h-6"/>
                                                        </button>
                                                        <button class="hover:underline hover:decoration-blue-500">
                                                            <img src={trashbin2} alt="trash"/>
                                                        </button>
                                                        <button>
                                                            <img src={download} alt="download"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white ">
                                                    <div class="ps-3 mx-auto">
                                                        <div class="text-base font-semibold">#Order-12</div>
                                                        <div class="font-normal text-gray-500">₱39.00</div>
                                                    </div>  
                                                </th>
                                                <td class="px-6 py-4 text-center">
                                                    Jan 13,2023/12:00:00pm
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl mx-auto">Paid</div>
                                                </td>
                                                <td class="px-6 py-4 space-x-2">
                                                    <div class="h-fit items-center justify-center flex space-x-3 ps-4 mx-auto">
                                                        <button>
                                                            <img src={eye} alt="eye" class="w-6 h-6"/>
                                                        </button>
                                                        <button class="hover:underline hover:decoration-blue-500">
                                                            <img src={trashbin2} alt="trash"/>
                                                        </button>
                                                        <button>
                                                            <img src={download} alt="download"/>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                </div>
                {/* end of track order */}
                
                {/* order history */}
                <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900 rounded-t-xl">
                
                    <div class="text-center">
                        <h1 class="text-xl font-bold tracking-wide">Order History</h1>
                    </div>
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Product"/>
                    </div>
                    
                </div>

                <div class="w-full px-10 mx-auto rounded-lg py-4 mb-2">
                        <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs tracking-widest text-white uppercase bg-textgreenColor dark:bg-gray-700 dark:text-gray-400">
                                            <tr class="text-center">
                                                <th scope="col" class="px-6 py-3 ">
                                                    TRANSACTION
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Order ID
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    DATE / TIME
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Amount
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td class="px-6 py-4 text-center">
                                                    Payment from <span className='font-semibold'>Brony James</span>
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    #Order-12
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    Jan 13,2023/12:00:00pm
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <span className='font-semibold'> + </span> ₱ 218.00
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <p className='font-semibold text-textgreenColor'>Complete</p>
                                                    <p className='font-semibold text-red-600 hidden'>Cancelled</p>
                                                </td>
                                            </tr>

                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td class="px-6 py-4 text-center">
                                                    Payment from <span className='font-semibold'>Brony James</span>
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    #Order-12
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    Jan 13,2023/12:00:00pm
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <span className='font-semibold'> + </span> ₱ 218.00
                                                </td>
                                                <td class="px-6 py-4 text-center">
                                                    <p className='font-semibold text-textgreenColor hidden'>Complete</p>
                                                    <p className='font-semibold text-red-600 '>Cancelled</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    
                </div>
                {/* end of order history */}
            </div>
        </div> 
    </div>
  )
}
