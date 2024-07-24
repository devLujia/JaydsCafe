import React from 'react'
import arrowRight from '../image/arrow right.png'
import arrowLeft from '../image/arrow left.png'
import logo from '../image/logo.png'

function Cart() {


  return (
    <div>
    <nav class="sticky top-0 bg-white z-20">
        <div class="font-extrabold text-xl flex items-center py-1">
            <img src={logo} alt="logo" class="logo w-14 ml-5"/><a href={'/menu'} class="flex items-center w-96 h-10 hover:scale-110 hover:cursor-pointer hover:brightness-110 transition duration-200 hover:text-yellow-950"> <img src={arrowLeft} alt="Arrow Back" class=" w-14 h-14 mx-4"/>Back to Menu</a>
        </div>
    </nav>
    
    <section class="grid lg:grid-cols-2 sm:grid-cols-1 w-full h-screen">
    {/* <!-- left side Infos--> */}

        <div class="bg-background flex justify-center p-20">
            <div class="min-w-full sticky top-0">
                <h1 class="text-3xl font-extrabold mb-2 tracking-wider">Review Order</h1>
                <p class=" tracking-wider mb-6">Preparation Time: <span class="font-semibold">10 mins - 15 mins</span></p>
                <br/>

                <h1 class="text-xl font-medium mb-5"> Shipping Address</h1>

                <form action="">
                    <div class="w-80 mb-4">
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-700">Name</label>
                      <input type="text" placeholder="Ex. Juan Dela Cruz" id="name" class="peer h-full w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-lg font-normal text-gray-700 shadow-lg shadow-gray-900/5 outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900/10 disabled:border-0 disabled:bg-gray-50" />
                    </div>
                  
                    <div class="min-w-full mb-10 pr-5">
                      <label for="address" class="block mb-2 text-sm font-medium text-gray-700">Street Address</label>
                      <input type="text" placeholder="Ex. Blk 12, Lot 34 Buhay na tubig, Bacoor Cavite." id="address" class="peer h-full w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-lg font-normal text-gray-700 shadow-lg shadow-gray-900/5 outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900/10 disabled:border-0 disabled:bg-gray-50" />
                    </div>

                    <div class="grid sm:grid-cols-2 gap-2 pr-5">
                        <label for="hs-radio-in-form" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                          <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 shadow-gray-900/5" id="hs-radio-in-form"/>
                          <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">Pick Up</span>
                        </label>
                      
                        <label for="hs-radio-checked-in-form" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                          <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 shadow-gray-900/5" id="hs-radio-checked-in-form" checked=""/>
                          <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">GCash</span>
                        </label>
                      </div>
                  </form>

                <h1 class="text-3xl font-extrabold mb-2 tracking-wider pt-10">₱150.00</h1>
            </div>
        </div>
        {/* <!-- Right side cards--> */}
        <div class=" px-20"> 
            <div class="mt-5 w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center">
                {/* <!-- Eto yung bilog, hindi pa goods to kung papalitan ng image ng product talaga--> */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <circle cx="50" cy="50" r="50" fill="#ECE8DD"/>
                        <path d="M42.8439 20.125V17.5938C42.8439 15.5798 43.5452 13.6483 44.7935 12.2242C46.0418 10.8001 47.7348 10 49.5001 10H58.3751C58.9636 10 59.5279 10.2667 59.944 10.7414C60.3601 11.2161 60.5939 11.8599 60.5939 12.5312C60.5939 13.2026 60.3601 13.8464 59.944 14.3211C59.5279 14.7958 58.9636 15.0625 58.3751 15.0625H49.5001C48.9117 15.0625 48.3474 15.3292 47.9313 15.8039C47.5152 16.2786 47.2814 16.9224 47.2814 17.5938V20.125H69.4689C71.1651 20.1228 72.7981 20.8595 74.0342 22.1846C75.2704 23.5097 76.0165 25.3232 76.1202 27.2547C76.2238 29.1862 75.6772 31.09 74.592 32.5772C73.5067 34.0644 71.9647 35.0229 70.281 35.2568L67.5297 81.2192C67.4533 82.4987 66.954 83.6975 66.1328 84.5733C65.3116 85.449 64.2297 85.9366 63.1055 85.9375H35.8948C34.7699 85.9379 33.6868 85.4509 32.8647 84.575C32.0425 83.6991 31.5426 82.4996 31.4662 81.2192L28.7193 35.2568C27.0356 35.0229 25.4936 34.0644 24.4083 32.5772C23.3231 31.09 22.7765 29.1862 22.8801 27.2547C22.9838 25.3232 23.7299 23.5097 24.9661 22.1846C26.2022 20.8595 27.8352 20.1228 29.5314 20.125H42.8439ZM33.1701 35.3125L35.8948 80.875H63.1055L63.4383 75.2759C59.9143 74.2542 56.8161 71.8548 54.683 68.4955C52.55 65.1362 51.5174 61.0297 51.765 56.8912C52.0125 52.7527 53.5246 48.8444 56.0379 45.8468C58.5512 42.8492 61.9065 40.9523 65.5195 40.4864L65.8302 35.3125H33.1701ZM29.5314 30.25H69.4689C70.0574 30.25 70.6217 29.9833 71.0378 29.5086C71.4539 29.0339 71.6876 28.3901 71.6876 27.7188C71.6876 27.0474 71.4539 26.4036 71.0378 25.9289C70.6217 25.4542 70.0574 25.1875 69.4689 25.1875H29.5314C28.943 25.1875 28.3786 25.4542 27.9625 25.9289C27.5464 26.4036 27.3126 27.0474 27.3126 27.7188C27.3126 28.3901 27.5464 29.0339 27.9625 29.5086C28.3786 29.9833 28.943 30.25 29.5314 30.25ZM63.7445 70.1071L65.2089 45.6552C62.7911 46.1698 60.5918 47.5864 58.9566 49.6823C57.3214 51.7783 56.3431 54.4347 56.1755 57.2341C56.0078 60.0334 56.6604 62.817 58.0305 65.1472C59.4006 67.4774 61.4106 69.2221 63.7445 70.1071Z" fill="black"/>
                        </svg>
                    <div class="flex flex-col justify-center ml-6">
                         {/* <!-- Title ng product--> */}
                        <h5 class=" text-3xl font-bold text-gray-900 dark:text-white">Taro Milk Tea</h5>
                        {/* <!-- Size ng product--> */}
                        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">L</p>
                    </div>
                </div>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6559 4.75518L16.9034 7.49596L12.4923 3.08484L15.2448 0.344067C15.7036 -0.114689 16.4682 -0.114689 16.9034 0.344067L19.6559 3.0966C20.1147 3.53183 20.1147 4.29643 19.6559 4.75518ZM0 15.5889L11.8336 3.74357L16.2447 8.15468L4.41112 20H0V15.5889ZM16.0212 1.22629L14.2097 3.03779L16.9622 5.79032L18.7737 3.97883L16.0212 1.22629ZM14.539 8.23702L11.763 5.46096L1.1763 16.0712V18.8237H3.92883L14.539 8.23702Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41187H15.2933V10.5883H4.70508V9.41187Z" fill="#7D7D7D"/>
                            </svg>    
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41177H15.2933V10.5882H4.70508V9.41177Z" fill="#7D7D7D"/>
                            <path d="M9.41211 4.70589H10.5886V15.2941H9.41211V4.70589Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="mt-5 w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center">
                {/* <!-- Eto yung bilog, hindi pa goods to kung papalitan ng image ng product talaga--> */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <circle cx="50" cy="50" r="50" fill="#ECE8DD"/>
                        <path d="M42.8439 20.125V17.5938C42.8439 15.5798 43.5452 13.6483 44.7935 12.2242C46.0418 10.8001 47.7348 10 49.5001 10H58.3751C58.9636 10 59.5279 10.2667 59.944 10.7414C60.3601 11.2161 60.5939 11.8599 60.5939 12.5312C60.5939 13.2026 60.3601 13.8464 59.944 14.3211C59.5279 14.7958 58.9636 15.0625 58.3751 15.0625H49.5001C48.9117 15.0625 48.3474 15.3292 47.9313 15.8039C47.5152 16.2786 47.2814 16.9224 47.2814 17.5938V20.125H69.4689C71.1651 20.1228 72.7981 20.8595 74.0342 22.1846C75.2704 23.5097 76.0165 25.3232 76.1202 27.2547C76.2238 29.1862 75.6772 31.09 74.592 32.5772C73.5067 34.0644 71.9647 35.0229 70.281 35.2568L67.5297 81.2192C67.4533 82.4987 66.954 83.6975 66.1328 84.5733C65.3116 85.449 64.2297 85.9366 63.1055 85.9375H35.8948C34.7699 85.9379 33.6868 85.4509 32.8647 84.575C32.0425 83.6991 31.5426 82.4996 31.4662 81.2192L28.7193 35.2568C27.0356 35.0229 25.4936 34.0644 24.4083 32.5772C23.3231 31.09 22.7765 29.1862 22.8801 27.2547C22.9838 25.3232 23.7299 23.5097 24.9661 22.1846C26.2022 20.8595 27.8352 20.1228 29.5314 20.125H42.8439ZM33.1701 35.3125L35.8948 80.875H63.1055L63.4383 75.2759C59.9143 74.2542 56.8161 71.8548 54.683 68.4955C52.55 65.1362 51.5174 61.0297 51.765 56.8912C52.0125 52.7527 53.5246 48.8444 56.0379 45.8468C58.5512 42.8492 61.9065 40.9523 65.5195 40.4864L65.8302 35.3125H33.1701ZM29.5314 30.25H69.4689C70.0574 30.25 70.6217 29.9833 71.0378 29.5086C71.4539 29.0339 71.6876 28.3901 71.6876 27.7188C71.6876 27.0474 71.4539 26.4036 71.0378 25.9289C70.6217 25.4542 70.0574 25.1875 69.4689 25.1875H29.5314C28.943 25.1875 28.3786 25.4542 27.9625 25.9289C27.5464 26.4036 27.3126 27.0474 27.3126 27.7188C27.3126 28.3901 27.5464 29.0339 27.9625 29.5086C28.3786 29.9833 28.943 30.25 29.5314 30.25ZM63.7445 70.1071L65.2089 45.6552C62.7911 46.1698 60.5918 47.5864 58.9566 49.6823C57.3214 51.7783 56.3431 54.4347 56.1755 57.2341C56.0078 60.0334 56.6604 62.817 58.0305 65.1472C59.4006 67.4774 61.4106 69.2221 63.7445 70.1071Z" fill="black"/>
                        </svg>
                    <div class="flex flex-col justify-center ml-6">
                    {/* <!-- Title ng product--> */}
                        <h5 class="text-3xl font-bold text-gray-900 dark:text-white">Cookies N' Cream Milk Tea</h5> 
                        {/* <!-- Size ng product--> */}
                        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">M</p> 
                    </div>
                </div>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6559 4.75518L16.9034 7.49596L12.4923 3.08484L15.2448 0.344067C15.7036 -0.114689 16.4682 -0.114689 16.9034 0.344067L19.6559 3.0966C20.1147 3.53183 20.1147 4.29643 19.6559 4.75518ZM0 15.5889L11.8336 3.74357L16.2447 8.15468L4.41112 20H0V15.5889ZM16.0212 1.22629L14.2097 3.03779L16.9622 5.79032L18.7737 3.97883L16.0212 1.22629ZM14.539 8.23702L11.763 5.46096L1.1763 16.0712V18.8237H3.92883L14.539 8.23702Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41187H15.2933V10.5883H4.70508V9.41187Z" fill="#7D7D7D"/>
                            </svg>    
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41177H15.2933V10.5882H4.70508V9.41177Z" fill="#7D7D7D"/>
                            <path d="M9.41211 4.70589H10.5886V15.2941H9.41211V4.70589Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                </div>
            </div>

            <div class="mt-5 w-full p-4 text-left bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center">
                {/* <!-- Eto yung bilog, hindi pa goods to kung papalitan ng image ng product talaga--> */}
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                        <circle cx="50" cy="50" r="50" fill="#ECE8DD"/>
                        <path d="M42.8439 20.125V17.5938C42.8439 15.5798 43.5452 13.6483 44.7935 12.2242C46.0418 10.8001 47.7348 10 49.5001 10H58.3751C58.9636 10 59.5279 10.2667 59.944 10.7414C60.3601 11.2161 60.5939 11.8599 60.5939 12.5312C60.5939 13.2026 60.3601 13.8464 59.944 14.3211C59.5279 14.7958 58.9636 15.0625 58.3751 15.0625H49.5001C48.9117 15.0625 48.3474 15.3292 47.9313 15.8039C47.5152 16.2786 47.2814 16.9224 47.2814 17.5938V20.125H69.4689C71.1651 20.1228 72.7981 20.8595 74.0342 22.1846C75.2704 23.5097 76.0165 25.3232 76.1202 27.2547C76.2238 29.1862 75.6772 31.09 74.592 32.5772C73.5067 34.0644 71.9647 35.0229 70.281 35.2568L67.5297 81.2192C67.4533 82.4987 66.954 83.6975 66.1328 84.5733C65.3116 85.449 64.2297 85.9366 63.1055 85.9375H35.8948C34.7699 85.9379 33.6868 85.4509 32.8647 84.575C32.0425 83.6991 31.5426 82.4996 31.4662 81.2192L28.7193 35.2568C27.0356 35.0229 25.4936 34.0644 24.4083 32.5772C23.3231 31.09 22.7765 29.1862 22.8801 27.2547C22.9838 25.3232 23.7299 23.5097 24.9661 22.1846C26.2022 20.8595 27.8352 20.1228 29.5314 20.125H42.8439ZM33.1701 35.3125L35.8948 80.875H63.1055L63.4383 75.2759C59.9143 74.2542 56.8161 71.8548 54.683 68.4955C52.55 65.1362 51.5174 61.0297 51.765 56.8912C52.0125 52.7527 53.5246 48.8444 56.0379 45.8468C58.5512 42.8492 61.9065 40.9523 65.5195 40.4864L65.8302 35.3125H33.1701ZM29.5314 30.25H69.4689C70.0574 30.25 70.6217 29.9833 71.0378 29.5086C71.4539 29.0339 71.6876 28.3901 71.6876 27.7188C71.6876 27.0474 71.4539 26.4036 71.0378 25.9289C70.6217 25.4542 70.0574 25.1875 69.4689 25.1875H29.5314C28.943 25.1875 28.3786 25.4542 27.9625 25.9289C27.5464 26.4036 27.3126 27.0474 27.3126 27.7188C27.3126 28.3901 27.5464 29.0339 27.9625 29.5086C28.3786 29.9833 28.943 30.25 29.5314 30.25ZM63.7445 70.1071L65.2089 45.6552C62.7911 46.1698 60.5918 47.5864 58.9566 49.6823C57.3214 51.7783 56.3431 54.4347 56.1755 57.2341C56.0078 60.0334 56.6604 62.817 58.0305 65.1472C59.4006 67.4774 61.4106 69.2221 63.7445 70.1071Z" fill="black"/>
                        </svg>
                    <div class="flex flex-col justify-center ml-6">
                    {/* <!-- Title ng product--> */}
                        <h5 class="text-3xl font-bold text-gray-900 dark:text-white">Iced Mocha</h5> 
                        {/* <!-- Size ng product--> */}
                        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">L</p>
                    </div>
                </div>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.6559 4.75518L16.9034 7.49596L12.4923 3.08484L15.2448 0.344067C15.7036 -0.114689 16.4682 -0.114689 16.9034 0.344067L19.6559 3.0966C20.1147 3.53183 20.1147 4.29643 19.6559 4.75518ZM0 15.5889L11.8336 3.74357L16.2447 8.15468L4.41112 20H0V15.5889ZM16.0212 1.22629L14.2097 3.03779L16.9622 5.79032L18.7737 3.97883L16.0212 1.22629ZM14.539 8.23702L11.763 5.46096L1.1763 16.0712V18.8237H3.92883L14.539 8.23702Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41187H15.2933V10.5883H4.70508V9.41187Z" fill="#7D7D7D"/>
                            </svg>    
                    </a>
                    <a href="#" class="w-full sm:w-auto bg-yellow-950 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full inline-flex items-center justify-center px-4 py-2.5 dark:bg-yellow-800 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 20C4.47059 20 0 15.5294 0 10C0 4.47059 4.47059 0 10 0C15.5294 0 20 4.47059 20 10C20 15.5294 15.5294 20 10 20ZM10 1.17647C5.11765 1.17647 1.17647 5.11765 1.17647 10C1.17647 14.8824 5.11765 18.8235 10 18.8235C14.8824 18.8235 18.8235 14.8824 18.8235 10C18.8235 5.11765 14.8824 1.17647 10 1.17647Z" fill="#7D7D7D"/>
                            <path d="M4.70508 9.41177H15.2933V10.5882H4.70508V9.41177Z" fill="#7D7D7D"/>
                            <path d="M9.41211 4.70589H10.5886V15.2941H9.41211V4.70589Z" fill="#7D7D7D"/>
                        </svg>
                    </a>
                </div>
            </div>
            {/* <!-- button --> */}
            <div class="w-80 py-10 mx-auto">
                <a class="bg-yellow-900 text-white font-medium rounded-full py-3 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow-lg" href="/public/Html/cart.html">Checkout</a>
            </div>
        </div>
    </section>

    </div>
  )
}

export default Cart
