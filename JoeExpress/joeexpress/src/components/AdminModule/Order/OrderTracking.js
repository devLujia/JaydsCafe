import React, { useEffect } from 'react'
import eye from '../../image/eye(2).svg'
import trashbin from '../../image/trashbin.svg'
import download from '../../image/download.svg'

export default function OrderTracking() {

    useEffect(()=>{
        
        const button = document.querySelector('[data-collapse-toggle="dropdown-example"]');
        const dropdown = document.getElementById('dropdown-example');

        button.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
        });

        // Dropdown sa Avatar
        const avatarButton = document.getElementById('avatarButton');
        const userDropdown = document.getElementById('userDropdown');

            avatarButton.addEventListener('click', () => {
            userDropdown.classList.toggle('hidden');
        });

    })


  return (
    <div>
        <nav class="z-20 bg-white border-gray-200 dark:bg-gray-900 top-0 sticky flex justify-end shadow-md">
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center">
                <div class="font-bold">Migz Gomez Go</div>
                <div class="items-center justify-center">Admin</div>
            </div>
            <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src="/public/image/UserAcc.png" alt="User dropdown"/>

            {/*  Dropdown menu */}
            <div id="userDropdown" class="top-16 absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                    <li>
                    <a href="/dashboard" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Messages</a>
                    </li>
                </ul>
                <div class="py-1">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
            </div>
        </nav>

        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-footer border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-footer dark:bg-gray-800">
            <a href="#" class="flex items-center ps-2.5 mb-5">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="34" height="34" fill="#333333" fill-opacity="0.2"/>
                    <path d="M13.8122 4.25V3.1875C13.8122 2.34212 14.148 1.53137 14.7458 0.933597C15.3435 0.335825 16.1543 0 16.9997 0L21.2497 0C21.5315 0 21.8017 0.111942 22.001 0.311199C22.2002 0.510456 22.3122 0.780707 22.3122 1.0625C22.3122 1.34429 22.2002 1.61454 22.001 1.8138C21.8017 2.01306 21.5315 2.125 21.2497 2.125H16.9997C16.7179 2.125 16.4476 2.23694 16.2484 2.4362C16.0491 2.63546 15.9372 2.90571 15.9372 3.1875V4.25H26.5622C27.3744 4.24909 28.1564 4.55832 28.7484 5.11452C29.3404 5.67073 29.6977 6.43195 29.7473 7.24271C29.7969 8.05347 29.5352 8.85259 29.0155 9.47686C28.4958 10.1011 27.7574 10.5034 26.951 10.6016L25.6335 29.8945C25.5969 30.4316 25.3579 30.9347 24.9646 31.3024C24.5714 31.67 24.0532 31.8746 23.5149 31.875H10.4844C9.94574 31.8752 9.42709 31.6707 9.03338 31.3031C8.63968 30.9354 8.4003 30.4319 8.36367 29.8945L7.0483 10.6016C6.24198 10.5034 5.50356 10.1011 4.98387 9.47686C4.46418 8.85259 4.20242 8.05347 4.25206 7.24271C4.30169 6.43195 4.65898 5.67073 5.25095 5.11452C5.84292 4.55832 6.6249 4.24909 7.43717 4.25H13.8122ZM9.17967 10.625L10.4844 29.75H23.5149L23.6743 27.3997C21.9867 26.9709 20.5031 25.9638 19.4816 24.5537C18.4602 23.1436 17.9657 21.4199 18.0842 19.6827C18.2028 17.9456 18.9269 16.3051 20.1304 15.0468C21.334 13.7886 22.9408 12.9923 24.6709 12.7968L24.8197 10.625H9.17967ZM7.43717 8.5H26.5622C26.844 8.5 27.1142 8.38806 27.3135 8.1888C27.5127 7.98954 27.6247 7.71929 27.6247 7.4375C27.6247 7.15571 27.5127 6.88546 27.3135 6.6862C27.1142 6.48694 26.844 6.375 26.5622 6.375H7.43717C7.15538 6.375 6.88513 6.48694 6.68587 6.6862C6.48661 6.88546 6.37467 7.15571 6.37467 7.4375C6.37467 7.71929 6.48661 7.98954 6.68587 8.1888C6.88513 8.38806 7.15538 8.5 7.43717 8.5ZM23.8209 25.2301L24.5222 14.9664C23.3644 15.1824 22.3112 15.777 21.5281 16.6568C20.7451 17.5366 20.2766 18.6516 20.1963 19.8267C20.116 21.0017 20.4285 22.1701 21.0846 23.1482C21.7407 24.1263 22.7033 24.8587 23.8209 25.2301Z" fill="#F8F8F8"/>
                    </svg>            
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-white">JoeExpress</span>
            </a>
                <h1 class="font-bold text-gray-500">MENU</h1>
                <ul class="space-y-2 font-medium">
                <li> {/* Dashboard  */}
                    <a href="/Dashboard" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                        <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="ms-3">Dashboard</span>
                    </a>
                </li>
                <li> {/* Order Management */}
                    <button type="button" class="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Order Management</span>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <ul id="dropdown-example" class="hidden py-2 space-y-2">
                        <li>
                            <a href="#" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900">Order Tracking</a>
                        </li>
                        <li>
                            <a href="/OrderHistory" class="flex items-center w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 hover:text-gray-900">Order History</a>
                        </li>
                    </ul>
                </li>
                <li> {/* Product Management */}
                    <a href="/ProductManagement" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                        <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Product Management</span>
                        </a>
                </li>
                <li> {/* Customer Account */}
                    <a href="/CutomerAccount" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                        <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Customer Account</span>
                        </a>
                </li>
                <li> {/* Payment Management */}
                    <a href="/PaymentManagement" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                    <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                    </svg>
                    <span class="flex-1 ms-3 whitespace-nowrap">Payment Management</span>
                    </a>
                </li>
                <li> {/* Content Management */}
                    <a href="/ContentManagement" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group hover:text-gray-900">
                        <svg class="w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                    </a>
                </li>
                </ul>

                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <h1 class="font-bold text-gray-500">SUPPORT</h1>
                <li> {/* Settings */}
                    <a href="#" class="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group hover:text-gray-900">
                    <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" clip-rule="evenodd"/>
                        </svg>
                        
                    <span class="ms-3">Settings</span>
                    </a>
                </li>
                <li> {/* Help */}
                    <a href="#" class="flex items-center p-2 text-white transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group hover:text-gray-900">
                    <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="ms-3">Help</span>
                    </a>
                </li>
            </ul>
            <h1 class="text-md font-semibold text-gray-500 mt-10">Copyright © 2024 • uixLujiaa</h1>
            </div>
        </aside>
        
            <div class="p-4 sm:ml-72 bg-slate-100">
                <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
                    <div class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
                        <h1 class="font-bold text-2xl ps-3 tracking-wider">Track Orders</h1>
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                        </div>
                    </div>

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
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
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">#Order-12</div> {/* transaction */}
                                    <div class="text-base font-normal text-gray-500">₱0.00</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4"> {/* date / time */}
                                Jan 13,2023/12:00:00pm
                            </td>
                            <td class="px-6 py-4"> {/* status */}
                                <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl ">Paid</div>
                                <div class="bg-red-100 text-red-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Unpaid</div>
                                <div class="bg-yellow-100 text-yellow-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Pending</div>
                            </td>
                            <td class="px-6 py-4"> {/* actions */}
                                <div class="inline-flex space-x-4">
                                    <div><button><img src={eye} alt='eye'/></button></div>
                                    <div><button><img src={trashbin} alt='trashbin'/></button></div>
                                    <div><button><img src={download} alt='download'/></button></div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">#Order-13</div> {/* transaction */}
                                    <div class="text-base font-normal text-gray-500">₱39.00</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4"> {/* date / time */}
                            Jan 13,2023/1:00:00pm
                            </td>
                            <td class="px-6 py-4"> {/* status */}
                            <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Paid</div>
                            <div class="bg-red-100 text-red-500 font-semibold w-fit py-2 px-4 rounded-3xl ">Unpaid</div>
                            <div class="bg-yellow-100 text-yellow-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Pending</div>
                            </td>
                            <td class="px-6 py-4"> {/* actions */}
                                <div class="inline-flex space-x-4">
                                    <div><button><img src={eye} alt='eye'/></button></div>
                                    <div><button><img src={trashbin} alt='trashbin'/></button></div>
                                    <div><button><img src={download} alt='download'/></button></div>
                                </div>
                            </td>
                        </tr>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="ps-3">
                                    <div class="text-base font-semibold">#Order-14</div> {/* transaction */}
                                    <div class="text-base font-normal text-gray-500">₱49.00</div>
                                </div>  
                            </th>
                            <td class="px-6 py-4"> {/* date / time */}
                            Jan 13,2023/1:30:00pm
                            </td>
                            <td class="px-6 py-4"> {/* status */}
                            <div class="bg-green-100 text-green-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Paid</div>
                            <div class="bg-red-100 text-red-500 font-semibold w-fit py-2 px-4 rounded-3xl hidden">Unpaid</div>
                            <div class="bg-yellow-100 text-yellow-500 font-semibold w-fit py-2 px-4 rounded-3xl ">Pending</div>
                            </td>
                            <td class="px-6 py-4"> {/* actions */}
                                <div class="inline-flex space-x-4">
                                    <div><button><img src={eye} alt='eye'/></button></div>
                                    <div><button><img src={trashbin} alt='trashbin'/></button></div>
                                    <div><button><img src={download} alt='download'/></button></div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
    </div>
  )
}
