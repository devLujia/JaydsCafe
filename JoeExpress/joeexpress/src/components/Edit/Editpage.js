import React, { useEffect, useState } from 'react';
import arrowLeft from '../image/arrow left.svg';
import bagIcon from '../image/bag.svg';
import cupsmall from '../image/cup(small).svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Editpage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const { foodId } = useParams();
    const [food, setFood] = useState(null);
    const [addons, setAddons] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [orderNotif, setOrderNotif] = useState(0);
    const [selectedAddons, setSelectedAddons] = useState([]);

    // Fetch the food item details
    useEffect(() => {
        const fetchFood = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/items/${foodId}`);
                setFood(res.data.data);
            } catch (err) {
                console.log('Error fetching food details:', err);
            }
        };
    
        if (foodId) {  // Ensure the request is only made when foodId is available
            fetchFood();
        }
    }, [foodId]);  // Runs whenever foodId changes
    
    
    useEffect(() => {
        const fetchOrderNotif = async () => {
            try {
                const response = await axios.post('http://localhost:8081/orderNotif', { userId });
                setOrderNotif(response.data);
            } catch (error) {
                console.error('Error fetching orderNotif details:', error);
            }
        };
    
        if (userId) {  // Ensure the request is only made when userId is available
            fetchOrderNotif();
        }
    }, [userId]);  // Runs when userId changes
    

    // Handle size selection
    const handleInput = (event, size, price) => {
        setSelectedSize(size);
        setSelectedPrice(price);
    };

    // Handle addons selection
    const handleAddons = (event, addon) => {
        const isChecked = event.target.checked;
        setSelectedAddons(prev => isChecked
            ? [...prev, addon]
            : prev.filter(a => a.id !== addon.id));
    };

    // Calculate total price including addons
    const totalAddonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = selectedPrice + totalAddonsPrice;

    // Fetch food sizes
    useEffect(() => {
        const fetchSizes = async () => {
            if (foodId) {
                try {
                    const res = await axios.post('http://localhost:8081/sizes', { foodId });
                    setSizes(res.data);
                } catch (err) {
                    console.error('Error fetching sizes:', err);
                }
            }
        };
    
        fetchSizes();  // Call the async function
    
    }, [foodId]);  // Runs when foodId changes
    

    // Fetch addons
    useEffect(() => {
        const fetchAddons = async () => {
            try {
                const res = await axios.post('http://localhost:8081/Addons');
                setAddons(res.data);
            } catch (error) {
                console.error('Error fetching addons details:', error);
            }
        };
    
        fetchAddons(); 
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (userId) {
                try {
                    const res = await axios.post('http://localhost:8081/itemGetter', { userId });
                    setCart(res.data.items);
    
                    // Calculate the total price
                    const total = res.data.items?.reduce((sum, item) => sum + item.price, 0);
                    setTotalBill(total);
                } catch (error) {
                    console.error('Error fetching item details:', error);
                }
            }
        };
    
        if (userId) {
            fetchCartItems()
        };  // Call the async function
    
    }, [userId]);  // Runs whenever userId changes
    

    // Add item to cart
    const addToCartApi = async (food, userId) => {
        try {
            // Create a string with add-on names and their prices
            const addonsDetails = selectedAddons.map(addon => `${addon.name} (₱${addon.price})`).join(',');
    
            const response = await axios.post('http://localhost:8081/cart_items', {
                userId,
                foodId: food?.id,
                size: selectedSize,
                price: totalPrice,
                addons: addonsDetails,
                // quantity: quantity,
                // sugar: sugar, // Send names and prices of add-ons
            });
            
            return response.data;

        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };
    

    const handleAddToCart = async (food) => {
        try {
            await addToCartApi(food, userId);
            setCart(prevCart => [...prevCart, food]);
            alert('Item added to cart!');
        } catch (error) {
            alert('Failed to add item to cart. Please try again.');
        }
    };

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Nav */}
            <nav className="sticky top-0 bg-white z-20 shadow-lg flex justify-evenly">
                <div className="font-extrabold text-2xl flex items-center">
                    <a href="index.html" className="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
                </div>
                <div></div>
                <button>
                    <Link to={'/cart'} className="relative inline-block">
                    <img src={bagIcon} alt="bag" className="w-8 h-8" /> {/* Adjust size as needed */}
                    {orderNotif.totalOrders > 0 && (

                      <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-base rounded-full px-2.5">
                        {orderNotif.totalOrders}
                      </span>
                    )}
                  </Link>
                </button>
            </nav>

            <section>
                <div className=" bg-jaydsBg">
                    <div className="p-6">
                        <a href="/menu" className="text-2xl font-bold hover:underline">
                            <img src={arrowLeft} alt="Back Arrow" className="inline-block w-4 h-4 me-2" />Back to Menu
                        </a>
                        <div className="flex justify-center items-center flex-col space-x-10 md:flex-row">
                            <div className="rounded-lg bg-menuCirclebg aspect-square w-96 h-96 shadow-xl">
                                <img src={`/${food?.image_url}`} alt={food?.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-5xl font-bold pb-3">{food?.name}</h1>
                                <p className="text-gray-500 font-semibold pb-2">Price:</p>
                                <p className="text-3xl font-semibold pb-2">₱{totalPrice}</p>

                                <p className="text-lg font-semibold pb-2">Select Size:</p>
                                <div className="bg-white border-2 border-slate-300 rounded-lg p-4 flex items-center justify-between w-72 mb-6">
                                    {/* <!-- Small Size --> */}
                                    {sizes.map(size => (
                                                <label key={size?.id} className="flex flex-col items-center">
                                                <input
                                                    type="radio"
                                                    name="size"
                                                    value={size?.size}
                                                    checked={selectedSize === size?.size}
                                                    onChange={(e) => handleInput(e, size?.size, size?.price)}
                                                    className="hidden"
                                                />
                                                <div className={`p-1 ${selectedSize === size?.size ? 'border-2 border-textgreenColor bg-[#d4e9e2] rounded-full' : ''}`}>
                                                    <img src={cupsmall} alt="Medium" className="h-8 w-8" />
                                                </div>
                                                <p className={`text-sm font-semibold ${selectedSize === size?.size ? 'text-green-500' : ''}`}>{size?.size}</p>
                                                {/* <p className="text-xs text-gray-500">473 ml</p> */}
                                            </label>
                                    ))}
                                </div>

                                <h3 className="mb-2 font-semibold text-gray-900">Add-ons:</h3>
                                <div className="text-gray-600 text-sm mb-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {/* <div>
                                        <input
                                            type="checkbox"
                                            name="addons"
                                            id="no-addons"
                                            className="w-4 h-4 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"
                                            onChange={() => setSelectedAddons([])}
                                        />
                                        <label htmlFor="no-addons">NONE</label>
                                    </div> */}
                                    {addons.map(addon => (
                                        <div key={addon.id} className='w-full'>
                                            <input
                                                type="checkbox"
                                                name="addons"
                                                id={`addon-${addon.id}`}
                                                className="w-4 h-4 me-2 text-green-700 bg-jaydsBg border-gray-500 focus:ring-green-800 focus:ring-2 rounded-md"
                                                onChange={(e) => handleAddons(e, addon)}
                                            />
                                            <label htmlFor={`addon-${addon.id}`}>
                                                {addon.name} (₱{addon.price})
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className='mb-2'>
                                    {selectedAddons.length > 0 && (
                                        <div className="mt-5">
                                            <h4 className="text-lg font-semibold">Selected Add-ons:</h4>
                                            <ul className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center'>
                                                {selectedAddons.map(addon => (
                                                    <li key={addon?.id} className="text-gray-600">{addon.name} (₱{addon.price})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                    onClick={() => handleAddToCart(food)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
