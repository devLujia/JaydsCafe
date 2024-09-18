import React, { useEffect, useState } from 'react'
import cup1 from '../image/cup(small).svg'
import cup2 from '../image/cup(large).svg'
import arrowLeft from '../image/arrow left.svg'
import jaydscoffee from '../image/jaydsCoffee.svg'
import cart from '../image/cart.svg'
import bagIcon from '../image/bag.svg';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Editpage() {


    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const {foodId} = useParams();
    const [food, setFood] = useState(null);
    const [foods, setFoods] = useState([]);

    useEffect( ()  => {
        axios.get(`http://localhost:8081/items/${foodId}`)
            .then(res => {

            setFood(res.data.data);
            })
            .catch(err => console.log(err));
        
      }, [foodId]);


    useEffect(() => {
    axios.get('http://localhost:8081/foods')
        .then(response => {
        setFoods(response.data);
        })
        .catch(error => {
        console.error('Error fetching food details:', error);
        });
    }, []);

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

      if (!food) {
        return <div>Loading...</div>;
    }

  return (
    <div>
        {/* <!-- nav --> */}
        <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-evenly">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <button>
                <img src={bagIcon} alt=""/>
            </button>
        </nav>

        <section>
            <div class="h-screen bg-jaydsBg">
                <div class="p-6">
                    <a href="/menu" class="text-2xl font-bold hover:underline"> <img src={arrowLeft} alt="" class="inline-block w-4 h-4 me-2"/>Back to Cart</a>
                    <div class="flex justify-center items-center flex-col space-x-10 md:flex-row mt-20">
                        <div class="rounded-lg bg-menuCirclebg aspect-square w-96 h-96 shadow-xl">
                            <img src={`/` + food.image_url} alt={food.name} class="w-full h-full object-contain"/>
                        </div>
                        <div class="">
                            <h1 class="text-5xl font-bold pb-3">{food.name}</h1>
                            <p class="text-gray-500 font-semibold pb-2">Starts at</p>
                            <p class="text-3xl font-semibold pb-2">P {food.Medium}</p>

                            <p class="text-lg font-semibold pb-2">Select Size:</p>
                            <div class="flex justify-start items-center mb-4">
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <input type="radio" id="small" name="size" value="" class="hidden peer" checked/>
                                        <label for="small" class="block p-4 rounded-md border border-gray-300 hover:border-gray-400 peer-checked:bg-green-400 peer-checked:border-green-900 cursor-pointer">
                                            <div class="flex flex-col items-center">
                                                <img src={cup1} alt={food.name}/>
                                                <p class="text-sm font-bold text-gray-900">Small</p>
                                                <p class="text-xs text-gray-500">354 ml</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" id="medium" name="size" value="" class="hidden peer"/>
                                        <label for="medium" class="block p-4 rounded-md border border-gray-300 hover:border-gray-400 peer-checked:bg-green-400 peer-checked:border-green-900 cursor-pointer">
                                            <div class="flex flex-col items-center">
                                                <img src={cup1} alt=""/>
                                                <p class="text-sm font-bold text-gray-900">Medium</p>
                                                <p class="text-xs text-gray-500">473 ml</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <input type="radio" id="large" name="size" value="" class="hidden peer" />
                                        <label for="large" class="block p-4 rounded-md border border-gray-300 hover:border-gray-400 peer-checked:bg-green-400 peer-checked:border-green-900 cursor-pointer">
                                            <div class="flex flex-col items-center">
                                                <img src={cup1} alt=""/>
                                                <p class="text-sm font-bold text-gray-900">Large</p>
                                                <p class="text-xs text-gray-500">709 ml</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <h3 class="mb-2 font-semibold text-gray-900">Add-ons:</h3>
                            <div class="text-gray-600 space-x-2 text-sm mb-7">
                                <input type="radio" name="addons" id="pearls" class="w-4 h-4 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"/>
                                <label for="pearls">Pearls (+ ₱25)</label>

                                <input type="radio" name="addons" id="Coffee" class="w-4 h-4 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"/>
                                <label for="Coffee">Coffee Jelly (+ ₱30)</label>

                                <input type="radio" name="addons" id="Beans" class="w-4 h-4 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"/>
                                <label for="Beans">Red Beans (+ ₱30)</label>

                                <input type="radio" name="addons" id="Coconut" class="w-4 h-4 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"/>
                                <label for="Coconut">Coconut Jelly (+ ₱35)</label>
                            </div>

                            <div class="flex justify-center">
                                <button class="bg-greenColor rounded-full py-3 px-5 text-white text-2xl font-light w-fit hover:outline-greenColor hover:bg-white hover:text-textgreenColor transition duration-300">Update Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="h-screen">
                <div class="p-20 text-center">
                    <h1 class="text-5xl font-extrabold tracking-wide"><span class="text-lime-500">You</span> might like</h1>
                </div>

                <div id="mt-series" class=" w-3/4 mx-auto"> {/* <!-- milk tea series div --> */}
                    <div class="container mx-auto p-4 mt-4"> 
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
                        
                        
                    {foods.slice(0,4).map(food =>(
                        <div key={food.id} class="rounded-lg p-4 shadow-md relative outline outline-greenColor hover:scale-95 duration-300 hover:bg-jaydsBg"> {/* <!-- card 1 --> */}
                            <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                                <img src={`/`+food.image_url} alt="Milk Tea" class="w-full h-full object-contain"/>
                            </div>
                            <h3 class="text-xl font-semibold mt-4 min-h-20">{food.name}</h3>
                            <p class="text-gray-600 mt-2">Starts at</p>
                            <p class="text-2xl font-bold mt-1">P{food.price}</p>
                            
                            <button id="btn-cart" class="bg-greenColor p-2 w-fit rounded-full absolute right-8 top-[50%] hover:scale-125 duration-300" data-drawer-target="drawer-right-example" data-drawer-show="drawer-right-example" data-drawer-placement="right" aria-controls="drawer-right-example">
                                <img src={cart} alt=""/>
                            </button>
                        </div>
                    ))}
            
                    </div> 
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
