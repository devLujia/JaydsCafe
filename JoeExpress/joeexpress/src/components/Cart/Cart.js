import React, { useEffect, useState } from 'react'
import arrowRight from '../image/arrow right.png'
import arrowLeft from '../image/arrow left.png'
import edit from '../image/edit.svg'
import del from '../image/delete.svg'
import motor from '../image/motor.svg'
import store from '../image/store.svg'
import logo from '../image/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [totalBill, setTotalBill] = useState(0);
    
    const [quantity, setQuantity] = useState(
        items.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {})
      );

    useEffect(() => {
        axios.get('http://localhost:8081/')
          .then(res => {
            if (res.data.valid) {
              setAuthenticated(true);
              setUserId(res.data.userId);
              
            } else {
              navigate('/');
            }
          })
          .catch(err => console.log(err));
      }, [navigate]);


      useEffect(() => {
        
    
        axios.post('http://localhost:8081/itemGetter', { userId })
            .then(res => {
                setItems(res.data.items);
            
            })
            .catch(error => {
                console.error('Error fetching item details:', error);
            });
        },[userId]);

        const decrement = async (itemId) => {
            // Update the quantity in the local state
            setQuantity((prevQuantity) => {
                // Calculate the new quantity, ensuring it doesn't go below 1
                const newQuantity = Math.max((prevQuantity[itemId] || 1) - 1, 1);
        
                // Send the updated quantity to the server
                axios.post('http://localhost:8081/update_items', { quantity: newQuantity, id: itemId })
                    .then(res => {
                        if (res.data.success) {
                            console.log('Quantity updated successfully');
                        } else {
                            console.log('Update failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error during quantity update:', error);
                    });
        
                // Return the updated state
                return {
                    ...prevQuantity,
                    [itemId]: newQuantity,
                };
            });
        };
      
        const increment = async (itemId) => {
            // Update the quantity in the local state
            setQuantity((prevQuantity) => {
                const newQuantity = (prevQuantity[itemId] || 0) + 1;
        
                // Send the updated quantity to the server
                axios.post('http://localhost:8081/update_items', {  quantity: newQuantity, id: itemId })
                    .then(res => {
                        if (res.data.success) {
                            console.log('Quantity updated successfully');
                        } else {
                            console.log('Update failed');
                        }
                    })
                    .catch(error => {
                        console.error('Error during quantity update:', error);
                    });
        
                // Return the updated state
                return {
                    ...prevQuantity,
                    [itemId]: newQuantity,
                };
            });
        };

      const handleCheckout = async () =>{

        navigate('/checkout');
         try{
          const res = await axios.post('http://localhost:8081/order',{userId, totalBill});
          if (res.data.success){
            navigate('/checkout');
          }
          else{
            console.log('Checkout Failed')
          }
         } catch (error) {
          console.error('Error during checkout:', error);
        }
      } 

      const handleInput = async (e, itemId) => {
        const value = parseInt(e.target.value, 10);
    
            setQuantity((prevQuantity) => ({
                ...prevQuantity,
                [itemId]: value > 0 ? value : 1,
            }));
        

            try {
                const res = await axios.post('http://localhost:8081/update_items', {  quantity: value, id: itemId });
                if (res.data.success) {
                    console.log('Quantity updated successfully');
                    
                } else {
                    console.log('Update failed');
                }
            } 
            catch (error) {
                console.error('Error during quantity update:', error);
            }

      };
      

    //   const handlePayment = async (id, quantity)=>{

    //     try{
    //         const res = await axios.post('http://localhost:8081/update_items',{id, quantity});
    //         if (res.data.success){
    //           navigate('/checkout');
    //         }
    //         else{
    //           console.log('Checkout Failed')
    //         }
    //        } catch (error) {
    //         console.error('Error during checkout:', error);
    //       }
    //   }

      useEffect(() => {
        
        const total = items.reduce((sum, item) => {
          return sum + item.food_price * (quantity[item.id] || 1);
        }, 0);
      
        setTotalBill(total);
      
      });

  return (
  <div class="bg-white">
    <nav class="sticky top-0 bg-white z-20">
        <div class="font-extrabold text-xl flex items-center py-1">
            <a href="/menu" class="flex items-center w-96 h-10 hover:scale-110 hover:cursor-pointer hover:brightness-110 transition duration-200 hover:text-yellow-950"> <img src={arrowLeft} alt="Arrow Back" class=" w-14 h-14 mx-4"/>Back to Menu</a>
        </div>
    </nav>
    
    <section class="grid grid-cols-1 lg:grid-cols-[70%_30%] w-full h-full"> {/* this let the 2 div 70/30 ratio */}
        <div class=" px-16"> {/* <!-- Left side cards--> */}
            <div className='md:flex justify-between px-14 mt-5 text-xl font-semibold hidden'>
                <h1>
                    Product
                </h1>
                <h1>
                    Quality
                </h1>
                <h1>
                    Total
                </h1>
            </div>
        {items.map(item =>(
            <div key={item.id} class="mt-8 w-full p-4 text-left bg-white border-b-4 border-gray-200 rounded-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                
                <div class="flex items-center">
                    <div className='inline-flex '>
                        <div>
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">{/* <!-- Eto yung bilog, hindi pa goods to kung papalitan ng image ng product talaga--> */}
                                <circle cx="50" cy="50" r="50" fill="#ECE8DD"/>
                                <path d="M42.8439 20.125V17.5938C42.8439 15.5798 43.5452 13.6483 44.7935 12.2242C46.0418 10.8001 47.7348 10 49.5001 10H58.3751C58.9636 10 59.5279 10.2667 59.944 10.7414C60.3601 11.2161 60.5939 11.8599 60.5939 12.5312C60.5939 13.2026 60.3601 13.8464 59.944 14.3211C59.5279 14.7958 58.9636 15.0625 58.3751 15.0625H49.5001C48.9117 15.0625 48.3474 15.3292 47.9313 15.8039C47.5152 16.2786 47.2814 16.9224 47.2814 17.5938V20.125H69.4689C71.1651 20.1228 72.7981 20.8595 74.0342 22.1846C75.2704 23.5097 76.0165 25.3232 76.1202 27.2547C76.2238 29.1862 75.6772 31.09 74.592 32.5772C73.5067 34.0644 71.9647 35.0229 70.281 35.2568L67.5297 81.2192C67.4533 82.4987 66.954 83.6975 66.1328 84.5733C65.3116 85.449 64.2297 85.9366 63.1055 85.9375H35.8948C34.7699 85.9379 33.6868 85.4509 32.8647 84.575C32.0425 83.6991 31.5426 82.4996 31.4662 81.2192L28.7193 35.2568C27.0356 35.0229 25.4936 34.0644 24.4083 32.5772C23.3231 31.09 22.7765 29.1862 22.8801 27.2547C22.9838 25.3232 23.7299 23.5097 24.9661 22.1846C26.2022 20.8595 27.8352 20.1228 29.5314 20.125H42.8439ZM33.1701 35.3125L35.8948 80.875H63.1055L63.4383 75.2759C59.9143 74.2542 56.8161 71.8548 54.683 68.4955C52.55 65.1362 51.5174 61.0297 51.765 56.8912C52.0125 52.7527 53.5246 48.8444 56.0379 45.8468C58.5512 42.8492 61.9065 40.9523 65.5195 40.4864L65.8302 35.3125H33.1701ZM29.5314 30.25H69.4689C70.0574 30.25 70.6217 29.9833 71.0378 29.5086C71.4539 29.0339 71.6876 28.3901 71.6876 27.7188C71.6876 27.0474 71.4539 26.4036 71.0378 25.9289C70.6217 25.4542 70.0574 25.1875 69.4689 25.1875H29.5314C28.943 25.1875 28.3786 25.4542 27.9625 25.9289C27.5464 26.4036 27.3126 27.0474 27.3126 27.7188C27.3126 28.3901 27.5464 29.0339 27.9625 29.5086C28.3786 29.9833 28.943 30.25 29.5314 30.25ZM63.7445 70.1071L65.2089 45.6552C62.7911 46.1698 60.5918 47.5864 58.9566 49.6823C57.3214 51.7783 56.3431 54.4347 56.1755 57.2341C56.0078 60.0334 56.6604 62.817 58.0305 65.1472C59.4006 67.4774 61.4106 69.2221 63.7445 70.1071Z" fill="black"/>
                            </svg>
                        </div>
                        <div class="flex flex-col justify-center ml-6 min-w-64 max-w-64">
                            <h5 class="text-3xl font-bold text-gray-900 dark:text-white max-w-64">{item.food_name}</h5> {/*<!-- Title ng product-->*/}
                            <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400 font-semibold">₱{item.food_price}</p> {/*<!-- price ng product-->*/}
                            <p class="text-base text-gray-500 sm:text-lg dark:text-gray-400 font-semibold">Size: <span class="font-normal">{item.size}</span></p> {/*<!-- Size ng product-->*/}
                            <p class="text-base text-gray-500 sm:text-sm mb-2 dark:text-gray-400 font-semibold pr-5">Addons: <span className='font-normal'>{item.addons}</span></p> {/*<!-- addons ng product-->*/}
                        </div>
                    </div>

                    <div class=" items-center justify-center space-y-4 flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                        {/* <!-- numper input --> */}
                        <div class="py-2 px-3 inline-block bg-white border-2 border-textgreenColor rounded-full dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
                            <div class="flex items-center gap-x-1.5">
                            <button onClick={()=> decrement(item.id)} type="button" id="decrement-btn" class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Decrease" data-hs-input-number-decrement="">
                                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                </svg>
                            </button>
                            
                            <input id="input-number" class="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" type="number" aria-roledescription="Number field" onChange={(e) => handleInput(e, item.id)} value={quantity[item.id] || item.quantity} data-hs-input-number-input=""/>
                            
                            <button onClick={()=> increment(item.id)} type="button" id={`input-number-${item.id}`} class="size-7 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" tabindex="-1" aria-label="Increase" data-hs-input-number-increment="">
                                <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                                </svg>
                            </button>
                            </div> {/* <!-- npm i @preline/input-number --> */}
                        </div>

                        <div className='min-w-fit '>
                            <button class="py-3 me-3 px-3 inline-block bg-white dark:bg-neutral-900 dark:border-neutral-700" >
                                <img src={del} alt=""/>
                            </button>
                            <button class="py-3 px-3 inline-block bg-white dark:bg-neutral-900 dark:border-neutral-700" >
                                <img src={edit} alt=""/>
                            </button>
                        </div>
                    </div>

                    <div className='text-xl font-semibold min-w-fit ml-auto'>
                        <h1>₱ 6712 </h1>
                    </div>
                </div>
                
            </div>
            ))}
            

        </div>

         {/* <!-- Right side Infos--> */}
        <div class=" flex justify-center mx-auto py-20">
            <div class="min-w-full sticky top-0 bg-white">
                
                <div className='outline outline-slate-300 rounded-lg py-4'>
                    <h1 class="text-xl font-bold mb-6 tracking-wider  text-center">Select your delivery method</h1>
                    
                    <form action="">
                        <ul class="grid gap-2 md:grid-cols-2 px-14 text-center">
                            <li>
                                <input type="radio" id="delivery" name="hosting" value="delivery" class="hidden peer" required />
                                <label for="delivery" class="inline-block items-center justify-center py-3 w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-textgreenColor peer-checked:border-textgreenColor peer-checked:text-textgreenColor hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img src={motor} alt="" class="mx-auto mb-2"/>
                                    <div class="block">
                                        <div class="w-full text-md font-semibold">Local Delivery</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input type="radio" id="store" name="hosting" value="store" class="hidden peer"/>
                                <label for="store" class="inline-block items-center justify-center py-3 w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-textgreenColor peer-checked:border-textgreenColor peer-checked:text-textgreenColor hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img src={store} alt="" class="mx-auto mb-2"/>
                                    <div class="block">
                                        <div class="w-full text- font-semibold">Pick Up</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                        {/* <div class="min-w-full my-4 pr-5">
                          <label for="date" class="block mb-2 pl-1 text-lg font-medium text-gray-700">Pick a Date</label>
                          <input type="text" placeholder="September 24,2024" id="date" class="peer h-full w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-lg font-normal text-gray-700 shadow-lg shadow-gray-900/5 outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900/10 disabled:border-0 disabled:bg-gray-50" />
                        </div> */}
                        {/* <label for="date" class="block mb-2 pl-1 text-lg my-4 font-medium text-gray-700">Pick a Time</label>
                        <div class="grid sm:grid-cols-2 gap-4 pr-5 mb-4">
                          <label for="time1" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input id="time1" type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500"/>
                            <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">2:30 PM – 4:30 PM</span>
                          </label>
                    
                          <label for="time2" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-500" id="time2"/>
                               <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">4:30 PM – 6:30 PM</span>
                          </label>
                          <label for="time3" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 bg-gray-100 focus:ring-green-500 dark:focus:ring-green-500"  id="time3"/>
                              <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">2:30 PM – 4:30 PM</span>
                          </label>
                    
                          <label for="time4" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 bg-gray-100 focus:ring-green-500 dark:focus:ring-green-500" id="time4"/>
                              <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">4:30 PM – 6:30 PM</span>
                          </label>
                    
                          <label for="time5" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 bg-gray-100 focus:ring-green-500 dark:focus:ring-green-500" id="time5"/>
                              <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">6:30 PM – 8:30 PM</span>
                          </label>
                    
                          <label for="time6" class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                            <input type="radio" name="hs-radio-in-form" class="shrink-0 mt-0.5 border-gray-200 rounded-full text-green-500 bg-gray-100 focus:ring-green-500 dark:focus:ring-green-500" id="time6"/>
                              <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">ASAP</span>
                          </label>
                        </div>
                        <label for="instruction" class="block mb-2 pl-1 text-lg font-medium text-gray-700 mt-8">Instructions (Option)</label>
                        <textarea name="txt-area" id="instruction" placeholder="Add Instruction for the rider" class="w-full min-h-32 rounded-lg p-2"></textarea>
                            */}
                    </form>
                </div>

                <div class="flex items-center justify-end pt-5">
                    <h1 class="text-3xl font-extrabold tracking-wider">₱{totalBill}</h1>
                    <span class="inline-flex items-center justify-center w-6 h-6 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full" data-tooltip-target="tooltip-default">
                        i
                    </span>
                </div>
                

                <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Taxes, discounts and shipping calculated at checkout
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
                
                {/* <!--button --> */}
                <div class="w-full py-5 mt-5"> 
                    <button 
                    // onClick={() => handlePayment(item.id, quantity[item.id])}
                    onClick={()=>navigate('/checkout')}
                    data-modal-target="default-modal" 
                    data-modal-toggle="default-modal"
                    class="w-full px-10 bg-greenColor text-white font-bold text-lg rounded-full py-3 flex items-center justify-center hover:bg-green-600 transition duration-300 ease-in-out shadow-lg">
                        Review payment and address
                    </button>
                </div>
            </div>
        </div>
    </section>

    {/* <!-- List or reciept -->
    <!-- Modal for Receipt --> */}
    <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-lg max-h-full">

            {/* <!-- Modal content --> */}
            <div class="relative bg-stone-300 rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div class="flex items-center justify-between p-4 md:p-5">
                    <h3 class="text-3xl font-bold text-gray-900 dark:text-white">
                        Order Summary
                    </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                {/* <!-- Modal body --> */}
                <div class="p-4 md:p-5 space-y-1">
                    <div class="w-full pr-10">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                            Items (3) 
                            <span class="float-right">150.00</span>
                        </p>
                    </div>
                    
                    <div class="w-full pr-10">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                            Shipping fee:
                            <span class="float-right">50.00</span>
                        </p>
                    </div>
                    
                    <div class="w-full pr-8 pt-10"> {/* <!-- total amount --> */}
                        <p class="text-2xl leading-relaxed text-gray-500 dark:text-gray-400 text-left">
                            Order Total: 
                            <span class="float-right">₱200.00</span>
                        </p>
                    </div>
                </div>
    
                <div class="flex flex-col items-center p-4 md:p-5 rounded-b ">
                    <button id="accept-button" data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" class="text-white mb-5 w-full bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Place Order</button>
                    <p class="text-gray-500">By placing your order, you agree to our company <span class="font-semibold text-black cursor-pointer hover:text-yellow-900"data-modal-target="TAC-modal" data-modal-toggle="TAC-modal">Privacy policy and Conditions of use.</span></p>
                </div>

                {/* <!-- Modal for term and condition--> */}
                <div id="TAC-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            
                            <div class="p-4 md:p-5 text-center">
                                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                                <h3 class="mb-5 text-lg font-normal text-justify text-gray-500 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto culpa ipsa odit ab iste quod? Eligendi, sapiente, eos, consequuntur nihil perspiciatis aliquam enim fugiat dolor voluptatem facere explicabo libero. Dignissimos.</h3>
                                <button data-modal-hide="TAC-modal" type="button" class="text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Okiee
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Modal for Placing order --> */}
    <div id="popup-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <h3 class="mb-5 text-lg font-bold text-black dark:text-black">Confirm your Order(s)?</h3>
                    <button data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-red-500 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    <button data-modal-hide="popup-modal" type="button" class="text-white ms-3 bg-green-700 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-yellow-400 dark:focus:ring-yellow-800 font-medium rounded-full text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Yes, I'm sure
                    </button>
                </div>
            </div>
        </div>
    </div>
  </div>
    )
  }

export default Cart
