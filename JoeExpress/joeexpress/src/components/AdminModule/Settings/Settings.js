import React from 'react'
import bagIcon from '../../image/bag.svg';
import gwen from '../../image/Gwen.png';
import camera from '../../image/camera.svg';
import bg_pic from '../../image/36733336252.png';
import lock from '../../image/lock.svg';
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div>
        {/* <!-- Nav --> */}
        <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-evenly ">
            <div class="font-extrabold text-2xl items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="/public/index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
            </div>
            <div>
                <img src={bagIcon} alt=""/>
            </div>
        </nav>

        {/* Aside */}
        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
            <a href="#" class="flex items-center ps-2.5 mb-5">
               <img src={jaydsLogo} alt="Logo"/>           
               <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">Jayd's Cafe</span>
            </a>
               <ul class="space-y-2 font-medium">
                  <li> {/* <!-- Dashboard --> */}
                     <a href="/dashboard" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                     <svg class="w-5 h-5 transition duration-75 text-gray-600 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                     </svg>
                        <span class="ms-3">Dashboard</span>
                     </a>
                  </li>
                  <li> {/* <!-- Order Management --> */}
                     <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
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
                  <a href="/public/Html_Admin/paymentManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-greenColor  group hover:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                     </svg>
                     <span class="flex-1 ms-3 whitespace-nowrap">Sales Report</span>
                  </a>
                  </li>
                  <li> {/* <!-- Customer Account --> */}
                     <a href="/public/Html_Admin/customerManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
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
                  <a href="/Settings" class="flex items-center p-2 transition duration-75 rounded-lg bg-greenColor  group text-white">
                  <svg class="flex-shrink-0 w-7 h-7 transition duration-75  text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                  </svg>
                     <span class="ms-1">Settings</span>
                  </a>
               </li>
               <li> {/* <!-- Sign Out --> */}
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

        {/* <!-- Main body --> */}
        <div class=" w-4/5 h-full mt-10 flex flex-col float-right"> 
            <div class="h-64 rounded-t-2xl px-20 w-full relative drop-shadow-sm">
                <div class="object-contain w-full h-full rounded-t-2xl"> {/* <!-- container ng cover photo --> */}
                    <img src={bg_pic} alt="" class="w-full h-full object-fill max-w-full max-h-full rounded-t-2xl"/>
                </div>

                <button class="rounded-full bg-greenColor hover:bg-slate-700 top-0 absolute ml-6 mt-6 p-4">
                    <img src={camera} alt=""/>
                </button>

                <div class="flex overflow-x-hidden mb-6 ml-16 items-center absolute bottom-0"> {/* <!-- container ng profile pic --> */}
                    <div class="object-contain w-36 h-36 rounded-full bottom-0"data-popover-target="popover-user-profile" type="button">
                    <img src={gwen} alt="" class="w-full h-full object-fill max-w-full max-h-full rounded-full"/>
                    </div>

                    <h1 class="text-white text-2xl ml-2 tracking-wider">AkoSiLekraAklab</h1>
                </div>
            </div>

        <div class="w-full px-20 "> {/* <!-- main container of tabs--> */}
          <div class="mb-4 border-b-2  border-gray-300"> {/* <!-- Tabs below--> */}
            <ul class="flex flex-wrap -mb-px text-md font-semibold text-center " id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li class="me-2" role="presentation">
                    <button class="inline-block p-4 border-t-4  text-greenColor border-textgreenColor" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">My Account</button>
                </li>
            </ul>
          </div>
  
          <div id="default-tab-content"> {/* <!-- Content of every tabs --> */}
          <div class="p-4 px-16 rounded-lg my-7 bg-gray-50 dark:bg-gray-800" id="Account" role="tabpanel" aria-labelledby="Account-tab"> {/* <!-- Account Tab--> */}
                  <div class="border-b-2 "> {/* <!-- Account --> */}
                      <div class="flex justify-between items-center" >
                        <h1 class="text-3xl py-5">Account</h1>
                        <div class="space-y-3">
                          <button class="me-3 outline outline-2 outline-greenColor text-textgreenColor px-6 py-2 text-md rounded-xl inline-flex justify-center items-center hover:scale-110 duration-300">
                            Discard
                          </button> 
                          <button class="outline outline-2 outline-greenColor bg-greenColor text-white px-6 py-2 text-md rounded-xl inline-flex justify-center items-center hover:scale-110 duration-300">
                            Update Info
                          </button> 
                        </div>
                      </div>
                      <p class="pb-5">View and edit your personal info below.</p>
                  </div>
    
                  <div class="border-b-2 mt-3 pb-5"> {/* <!-- Display Info --> */}
                    <div class="flex justify-between items-center" >
                      <h1 class="text-2xl py-5">Display info</h1>
                    </div>
                    <p class="pb-10">This information will be visible to all members of this site.</p>

                    <form action="#">
                      <div class="grid gap-4 mb-6 grid-cols-2">
                        <div class="col-span-2 sm:col-span-1">
                          <label for="postal" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white ps-2">Display name <span class="text-red-600">*</span></label>
                          <input type="text" name="postal" id="postal" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[95%] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="4114" required=""/>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label for="title" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white ps-2">Title</label>
                          <input type="text" name="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[95%] p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                        </div>
                      </div>
                    </form>
                    
                  </div> 

                  <div class="border-b-2 mt-3"> {/* <!-- Personal Info --> */}
                    <div class="flex justify-between items-center">
                      <h1 class="text-2xl py-5">Personal info</h1>
                    </div>
                    <p class="pb-10">Update your personal information.</p>

                    <form action="#">
                      <div class="grid gap-4 mb-6 grid-cols-2">
                        <div class="col-span-2 sm:col-span-1">
                          <label for="fname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white ps-2">First name <span class="text-red-600">*</span></label>
                          <div class="inline-flex w-full">
                            <input type="text" name="fname" id="fname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 me-2" placeholder="Lekra" required=""/>
                            <img src={lock} alt=""/>
                          </div>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label for="lname" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white ps-2">Last name <span class="text-red-600">*</span></label>
                          <div class="inline-flex w-full">
                            <input type="text" name="lname" id="lname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 me-2" placeholder="Lekra" required=""/>
                            <img src={lock} alt=""/>
                          </div>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label for="phone" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white ps-2">Phone <span class="text-red-600">*</span></label>
                          <div class="inline-flex w-full">
                            <input type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 me-2" placeholder="Lekra" required=""/>
                            <img src={lock} alt=""/>
                          </div>
                        </div>
                      </div>

                      <div class="space-x-3 mb-5 grid grid-flow-col justify-end">
                        <button class="outline outline-2 outline-greenColor text-textgreenColor px-8 py-2 text-lg rounded-xl inline-flex justify-center items-center hover:scale-110 duration-300">
                          Discard
                        </button> 
                        <button class="outline outline-2 outline-greenColor bg-greenColor text-white px-8 py-2 text-lg rounded-xl inline-flex justify-center items-center hover:scale-110 duration-300">
                          Update Info
                        </button> 
                      </div>
                    </form>
                  </div> 

                  <div class="flex flex-col justify-start items-start space-y-2 border-b-2 mt-3"> {/* <!-- information details--> */}
                    <h1 class="text-2xl py-3">Login info</h1>
                    <p class="pb-10">View and update your login email and password.</p>

                    <div>
                      <div class="mb-4">
                        <p class="text-md">Login Email:</p>
                        <p class="text-md">MabangisSiMamAnna@gmail.com</p>
                        <a href="#" class="text-md hover:underline">Change Email</a>
                      </div>
  
                      <div class="pt-10 mb-4">
                        <p class="text-md">Password:</p>
                        <p class="text-md">● ● ● ● ● ●</p>
                        <a href="#" class="text-md hover:underline">Change Password</a>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        </div>
    </div>
  )
}
