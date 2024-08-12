import React, { useEffect, useState } from 'react'
import arrowRight from '../image/arrow right.png'
import arrowLeft from '../image/arrow left.png'
import logo from '../image/logo.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
    
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [totalBill, setTotalBill] = useState(0);

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
          axios.post('http://localhost:8081/itemGetter',  {userId} )
            .then(res => {
              setItems(res.data.items);
              const total = res.data.items.reduce((sum, item) => sum + item.price, 0);
              setTotalBill(total);
            })
            .catch(error => {
              console.error('Error fetching item details:', error);
            });
      });

      const handleCheckout = async () =>{
         try{
          const res = await axios.post('http://localhost:8081/order',{userId,totalBill});
          if (res.data.success){
            navigate('/tracking');
          }
          else{
            console.log('Checkout Failed')
          }
         } catch (error) {
          console.error('Error during checkout:', error);
        }
      } 

  return (
    
    <div>
    <nav class="sticky top-0 bg-white z-20">
        <div class="font-extrabold text-xl flex items-center py-1">
            <img src={logo} alt="logo" class="logo w-14 ml-5"/><a href={'/menu'} class="flex items-center w-96 h-10 hover:scale-110 hover:cursor-pointer hover:brightness-110 transition duration-200 hover:text-yellow-950"> <img src={arrowLeft} alt="Arrow Back" class=" w-14 h-14 mx-4"/>Back to Menu</a>
        </div>
    </nav>

        <section  class="grid lg:grid-cols-2 sm:grid-cols-1 w-full h-screen">
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

            <h1 class="text-3xl font-extrabold mb-2 tracking-wider pt-10">₱{totalBill}.00</h1>
        </div>
    </div>
    {/* <!-- Right side cards--> */}
    
    
            <div  class= "px-20"> 
            {items.map(item =>(
            <div key = {item.id} class="mt-5 w-full p-4  text-left bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center">
                {/* <!-- Eto yung bilog, hindi pa goods to kung papalitan ng image ng product talaga--> */}
                
                <img className='w-10' src = {item.image_url} alt={item.name}>
                        </img>

                    <div class="flex flex-col justify-center ml-6">
                         {/* <!-- Title ng product--> */}
                        <h5 class=" text-3xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
                        {/* <!-- Size ng product--> */}
                        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">{item.size}</p>
                        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">₱{item.price}.00</p>
                    </div>
                </div>
                <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            
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
        ))}
            {/* <!-- button --> */}
            <div class="w-80 py-10 mx-auto">
                <button 
                onClick={handleCheckout} 
                class="w-80 bg-yellow-900 text-white font-medium rounded-full py-3 flex items-center justify-center hover:bg-yellow-600 transition duration-300 ease-in-out shadow-lg">
                  Checkout</button>
            </div>
        </div>

        {/* <!-- chard button --> */}
        
</section>

</div>

  )
}

export default Cart
