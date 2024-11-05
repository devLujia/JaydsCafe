import React, { useEffect, useState } from 'react';
import arrowLeft from '../image/arrow left.png';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import del from '../image/delete.svg';
import motor from '../image/motor.svg';
import store from '../image/store.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Del from '../UserModal/Delete/DeleteModal';

function Cart() {

    const [TermsModal,setTermsModal] = useState(false); //modal

    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [totalBill, setTotalBill] = useState(0);

    const [DeleteModal,setDeleteModal] = useState(false); //modal
    const [selectedProductId, setProductId] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false); //For tooltip
    const [riderNote, setRiderNote] = useState({ option: 'pickup', instruction: '' });

    
    const [cmsName,setCmsName] = useState('');
    const [cmsFacebook,setCmsFacebook] = useState('');
    const [cmsInstagram,setCmsInstagram] = useState('');
    const [mapModal, setMapModal] = useState(false);

    const handleMapModal = () => {
        setMapModal(!mapModal);
      };

      const toggleTermsAndCondiotion = () =>{
        setTermsModal(!TermsModal)
      }

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRiderNote(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    

    // modal
    const toggleDeleteModal = (id) =>{
        setProductId(id)
        setDeleteModal(!DeleteModal)
      }
    
    const [quantity, setQuantity] = useState(
        items?.reduce((acc, item) => {
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
            
    }, [userId, DeleteModal]);

    const decrement = async (itemId,itemQuantity) => {
        // Update the quantity in the local state
        setQuantity((prevQuantity) => {
            // Calculate the new quantity, ensuring it doesn't go below 1
            const newQuantity = Math.max((prevQuantity[itemId] || itemQuantity) - 1, 1);

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

    const increment = async (itemId,itemQuantity) => {
        // Update the quantity in the local state
        setQuantity((prevQuantity) => {
            const newQuantity = (prevQuantity[itemId] || itemQuantity) + 1;

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

    const handleCheckout = async () => {

        navigate('/checkout');
        try {
            const res = await axios.post('http://localhost:8081/order', { userId, totalBill });
            if (res.data.success) {
                navigate('/checkout');
            }
            else {
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
            const res = await axios.post('http://localhost:8081/update_items', { quantity: value, id: itemId });
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
        
        const total = items?.reduce((sum, item) => sum + item?.food_price * (quantity[item?.id] || item.quantity), 0);
        
        setTotalBill(total);

    },[items,quantity]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [terms, setTerms] = useState("")

    useEffect(()=>{

        const fetchTerms = async () => {
          try {
            const response = await axios.post('http://localhost:8081/cms', {title: 'Terms'});
            setTerms(response.data.content || '');
          } 
          catch (error) {
            console.error('Error fetching data:', error);
          }
    
        };

        fetchTerms()

    })

    return (
        <div class="bg-white">
            
            {DeleteModal && selectedProductId !== null &&
            (<Del closeModal={() => setDeleteModal(false)} id={selectedProductId}/>
            )}

            <nav class="sticky top-0 bg-white z-20">
                <div class="font-extrabold text-xl flex items-center py-1">
                    <a href="/menu" class="flex items-center h-10 hover:cursor-pointer hover:scale-110 hover:brightness-110 transition duration-20 text-black w-fit"> 
                        <img src={arrowLeft} alt="Arrow Back" class=" w-10 h-10 mx-4 " />
                        Back to Menu
                    </a>
                </div>
            </nav>

            <section className="grid grid-cols-1 gap-8 md:grid-cols-3 w-full h-auto lg:h-screen">
      {/* Left side cards */}
      <div className="col-span-2 px-4 md:px-8 lg:px-16 overflow-y-auto min-h-[400px] bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 mt-5 text-lg font-semibold border-b pb-4">
          <div className="flex justify-start w-full md:w-auto mb-2 md:mb-0">
            <input
              id="select-all-checkbox"
              type="checkbox"
              value=""
              className="w-5 h-5 text-green-700 border-gray-300 rounded"
              title="Select all products in Cart"
            />
          </div>
          <h1 className="hidden md:block">Product</h1>
          <h1 className="hidden md:block">Quantity</h1>
          <h1 className="hidden md:block">Total</h1>
        </div>

        {/* Items listing */}
        <div className="space-y-6 mt-4">
          {items?.length > 0 &&
            items?.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-center md:items-center p-4 bg-white border rounded-lg shadow-sm text-center md:text-left"
              >
                {/* Checkbox */}
                <div className="absolute top-0 left-0 mt-4 ml-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-green-700 border-gray-300 rounded"
                    title={`Select ${item.food_name || 'No Name Available'}`}
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col md:flex-row items-center md:items-center w-full ml-10 md:ml-6 mt-2 md:mt-0">
                  <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg mb-4 md:mb-0">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-lg transition-transform hover:scale-110"
                      />
                    ) : (
                      <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="50" cy="50" r="50" fill="#ECE8DD" />
                        <path d="M42.8439...Z" fill="black" />
                      </svg>
                    )}
                  </div>

                  <div className="ml-0 md:ml-6 mt-2 md:mt-0">
                    <h5 className="text-xl md:text-2xl font-bold text-gray-900 truncate">
                      {item.food_name}
                    </h5>
                    <p className="text-lg text-green-600 font-semibold">₱{item.price}.00</p>
                    <p className="text-sm text-gray-500">
                      Size: <span className="font-normal">{item.size}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Addons: <span className="font-normal">{item.addons || 'No addons'}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Sugar level: <span className="font-normal">{item.sugar_level}%</span>
                    </p>
                  </div>
                </div>


                {/* Quantity Control */}
                <div className="flex items-center justify-center w-full mt-4 md:mt-0">
                  <div className="flex items-center justify-center gap-1 border border-green-700 rounded-full px-2 py-1">
                    <button
                      onClick={() => decrement(item.id, quantity[item.id] || item.quantity)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full focus:outline-none hover:bg-gray-200 transition"
                    >
                      −
                    </button>
                    <input id="input-number" 
                                            class="p-1 w-8 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white" 
                                            disabled
                                            type="number" 
                                            aria-roledescription="Number field" 
                                            onChange={(e) => handleInput(e, item.id)} 
                                            value={(quantity[item.id]||item.quantity)} 
                                            data-hs-input-number-input="" />
                    <button
                      onClick={() => increment(item.id, quantity[item.id] || item.quantity)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full focus:outline-none hover:bg-gray-200 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-3 text-red-600 focus:outline-none hover:text-red-800"
                    onClick={() => openModal()}
                  >
                    <img src={del} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(16%) sepia(83%) saturate(7479%) hue-rotate(0deg) brightness(97%) contrast(116%)' }} />
                  </button>
                </div>

                {/* Item Total */}
                <div className="ml-0 md:ml-6 mt-4 md:mt-0 text-xl font-semibold">
                  ₱{item.food_price * (quantity[item.id] || item.quantity)}.00
                </div>
              </div>
            ))}


          {items?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-8">
              <h1 className="text-2xl font-semibold text-gray-600">No items in cart</h1>
              <button
                onClick={() => navigate('/menu')}
                className="px-6 py-3 mt-4 text-white bg-green-600 rounded-full hover:bg-green-700 transition"
              >
                Browse Our Menu
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side Infos */}
      {items?.length > 0 && (
        <div className="p-4 lg:p-6 rounded-lg shadow-md bg-white mt-6 lg:mt-12 max-w-md mx-auto flex flex-col items-center">
          <div className="border border-gray-200 rounded-lg p-4 w-full">
            <h1 className="text-lg font-semibold mb-4 text-center text-gray-800">Select Your Delivery Method</h1>
            <form>
              <ul className="grid grid-cols-2 gap-3">
                <li>
                  <input
                    type="radio"
                    id="pickup"
                    name="option"
                    value="pickup"
                    className="hidden peer"
                    defaultChecked
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="pickup"
                    className="block w-full p-3 border border-gray-300 rounded-lg cursor-pointer text-center peer-checked:bg-green-100 peer-checked:border-green-700 transition hover:shadow-sm"
                  >
                    <img src={store} alt="Pickup" className="mx-auto mb-1 h-8" />
                    <span className="text-sm font-medium">Pick Up</span>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="delivery"
                    name="option"
                    value="delivery"
                    className="hidden peer"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="delivery"
                    className="block w-full p-3 border border-gray-300 rounded-lg cursor-pointer text-center peer-checked:bg-green-100 peer-checked:border-green-700 transition hover:shadow-sm"
                  >
                    <img src={motor} alt="Delivery" className="mx-auto mb-1 h-8" />
                    <span className="text-sm font-medium">Local Delivery</span>
                  </label>
                </li>
              </ul>

              {/* Dropoff Instructions */}
              <div className="mt-6 w-full">
                <label htmlFor="instruction" className="block mb-1 text-sm font-medium text-gray-700">
                  Dropoff Instructions (Optional)
                </label>
                <textarea
                  name="instruction"
                  id="instruction"
                  value={riderNote.instruction}
                  onChange={handleChange}
                  placeholder="Add instructions for the rider"
                  className="w-full rounded-md p-2 border border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700 transition resize-none text-sm"
                  rows="3"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Estimated Total and Payment Button */}
          <div className="flex items-center justify-between mt-6 w-full">
            <h1 className="text-md font-semibold text-gray-700">Estimated Total:</h1>
            <h1 className="text-xl font-bold text-gray-900">₱{totalBill}.00</h1>
          </div>

          {/* Proceed to Payment Button */}
          <button onClick={openModal}
            // onClick={() => navigate('/checkout', { state: { riderNote } })}
            className="block w-full mt-6 mb-6 py-2 bg-green-700 text-white rounded-full font-bold text-md hover:bg-green-800 transition"
          >
            Proceed to Payment
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
              <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
              <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Terms And Condition
                      </h3>
                      <button
                        type="button"
                        className="text-gray-700 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={closeModal}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {terms}
                      </p>
                    </div>

                    {/* Modal footer */}
                    <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={() => {
                          closeModal();
                          navigate('/checkout', { state: { riderNote } });
                        }}
                      >
                        I Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
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
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                            <p class="text-gray-500">By placing your order, you agree to our company <span class="font-semibold text-black cursor-pointer hover:text-yellow-900" data-modal-target="TAC-modal" data-modal-toggle="TAC-modal">Privacy policy and Conditions of use.</span></p>
                        </div>

                        {/* <!-- Modal for term and condition--> */}
                        <div id="TAC-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div class="relative p-4 w-full max-w-md max-h-full">
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                    <div class="p-4 md:p-5 text-center">
                                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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

            
            {/* <!-- Contact Us on Footer --> */}
            <footer class="bg-[#1A1A1A] w-full h-1/4  py-7 flex flex-col justify-center items-center" id="footer">

                <div class="border-y-2 border-gray-400 w-4/5 p-10">
                {/* <!-- container footer--> */}
                <div class="flex justify-between w-full">
                <h1 class="text-white text-3xl sm:text-4xl font-bold">
                    Jayd's Cafe
                    </h1>
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


                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Copyright © 2024. Capstone Inc.</span >

                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0" >
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

export default Cart
