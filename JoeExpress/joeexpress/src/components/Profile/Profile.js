import React, { useEffect, useState } from 'react'
import bagIcon from '../image/bag.svg';
import gwen from '../image/Gwen.png';
import camera from '../image/camera.svg';
import bg_pic from '../image/36733336252.png';
import edit from '../image/edit.svg';
import fb from '../image/fb.svg';
import ig from '../image/ig.svg';
import yt from '../image/yt.svg';
import lock from '../image/lock.svg';
import jaydsLogo from '../image/jayds cafe Logo.svg';
import eye from '../image/eye(2).svg'
import chat from '../image/chatWithRider.svg'
import mail from '../image/mail.svg'
import key from '../image/key.svg'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import socket from '../AdminModule/Message/socketService';
import ChatWithRider from '../UserModal/ChatWithRider/ChatWithRider';

export default function Profile() {

  const [authenticated, setAuthenticated] = useState(false);
  const [orders,setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState([]);
  const [orderNotif, setOrderNotif] = useState(0);
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
 };

 axios.defaults.withCredentials = true;

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
    axios.post('http://localhost:8081/personalOrder', { userId })
      .then(res => {
        setOrders(res.data);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);
 
  useEffect(() => {
    axios.post('http://localhost:8081/profile',  { userId})
      .then(res => {
        setProfile(res.data);
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
      });
  }, [userId]);

  //for switch tabs
  const [activeTab, setActiveTab] = useState('order');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const addAddress = () =>{
    axios.post('http://localhost:8081/addAddress',  {address})
    .then(res => {
      res.data.success && alert("Update Successfully");
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }
 
  useEffect(() => { 
    if (userId) { 
        socket.emit('notif', userId);

        socket.on('orderNotif', (data) => {
            setOrderNotif(data); 
        });

        return () => {
          socket.off('orderNotif');  
        };
    }
}, [userId]); 

    // chat with rider
    const [isChatOpen, setIsChatOpen] = useState(false);

    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);


  return (

    
    <div className='bg-jaydsBg'>
    {/* <!-- Nav --> */}
    <nav class="sticky top-0 bg-white z-20 shadow-lg flex justify-between">
      <div class="font-extrabold text-2xl items-center">
        {/* <!-- Logo/Title in Navbar --> */}
        <a href="/" class="flex items-center text-greenColor ms-5 text-2xl tracking-wide">Jayd's Cafe</a>
      </div>

        <div>
                  <Link to={'/cart'} className="relative inline-block">
                    <img src={bagIcon} alt="bag" className="w-8 h-8" /> {/* Adjust size as needed */}
                    {orderNotif.totalOrders > 0 && (

                      <span className="absolute top-[-5px] right-[-10px] bg-red-500 text-white text-base rounded-full px-2.5">
                        {orderNotif.totalOrders}
                      </span>
                    )}
                  </Link>
        </div>
    </nav>

    {/* <!-- Main body --> */}
     <div class=" w-full h-full mt-10 flex flex-col justify-center items-center"> 
        <div class="h-64 rounded-t-2xl lg:px-20 w-full relative drop-shadow-sm">
        <div class="w-full h-full rounded-t-2xl bg-[#067741]"> 
          </div>


      <div class="flex flex-col items-center overflow-x-hidden mb-6 ml-16 absolute bottom-0 gap-3 md:items-start md:flex-row"> {/* <!-- container ng profile pic --> */}
        <div class="object-contain w-24 h-24 md:w-36 md:h-36 rounded-full" data-popover-target="popover-user-profile" type="button">
          <img src={`data:image/svg+xml,${encodeURIComponent(`
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#E2E8F0"/>
                  <circle cx="24" cy="19" r="8" fill="#94A3B8"/>
                  <path d="M11 40C11 40 15 32 24 32C33 32 37 40 37 40" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
                </svg>
              `)}`} alt="Anonymous Avatar" class="w-full h-full object-fill max-w-full max-h-full rounded-full"/>
        </div>

        <div class="flex flex-col items-center justify-center space-y-2 text-center w-full mt-6 md:mt-8 lg:mt-6">
          <h1 class="text-white text-2xl md:text-3xl lg:text-4xl tracking-wider font-extrabold">{profile.name}</h1>
          <p class="text-white text-sm md:text-base tracking-wider">{profile.email}</p>
        </div>
      </div>


        </div>
        <div class="w-full lg:px-20"> {/* <!-- main container of tabs--> */}
          <div class="mb-4 border-b-2 border-gray-300"> {/* <!-- Tabs below--> */}
          <ul class="flex flex-wrap -mb-px text-md font-semibold text-center justify-center md:justify-center lg:justify-start" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">    
              <li class="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-greenColor hover:border-textgreenColor ${
                    activeTab === 'order' ? 'border-textgreenColor text-greenColor' : 'border-gray-300'
                  }`}
                  onClick={() => handleTabClick('order')}
                  type="button"
                  role="tab">
                  My Orders
                </button>
              </li>

        <li class="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-greenColor hover:border-textgreenColor ${
              activeTab === 'address' ? 'border-textgreenColor text-greenColor' : 'border-gray-300'
            }`}
            onClick={() => handleTabClick('address')}
            type="button"
            role="tab">
            My Address
          </button>                
        </li>

        <li role="presentation">
        <button
          className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-greenColor hover:border-textgreenColor ${
            activeTab === 'account' ? 'border-textgreenColor text-greenColor' : 'border-gray-300'}`}
          onClick={() => handleTabClick('account')}
          type="button"
          role="tab">
          Account
        </button>
        </li>
    </ul>
  </div>

  <div id="default-tab-content"> {/* <!-- Content of every tabs --> */}


{/* <!-- Order Tab--> */}
{activeTab === 'order' && (
  <div className="p-4 rounded-lg my-7 bg-gray-50 dark:bg-gray-800 min-h-[500px] md:mx-8 lg:mx-16" id="order" role="tabpanel" aria-labelledby="Order-tab">
    <div>
      <div className="mb-10 py-5 lg:px-6 md:px-4 px-2 overflow-hidden overflow-x-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-5 text-center text-gray-900 dark:text-white">My Orders</h1>
        <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse border-spacing-0">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">ID</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Name</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Address</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Contact Number</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Date / Time</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Price</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Status</th>
              <th scope="col" className="px-2 md:px-4 py-2 md:py-3 border-b dark:border-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <React.Fragment key={order.order_id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center px-2 md:px-4 py-2 md:py-4 text-gray-900 whitespace-nowrap dark:text-white text-center">
                      <div className="text-base font-semibold">ORDR#{order.order_id}</div>
                    </th>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center">{order.name}</td>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center">{order.address}</td>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center">{order.pnum}</td>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center">{new Date(order.order_date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}</td>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center text-green-600 font-semibold">₱{order.totalPrice.toFixed(2)}</td>
                    <td className="px-2 md:px-4 py-2 md:py-4 text-center">
                      {order.status === 'paid' && (
                        <div className="bg-green-100 text-green-600 font-semibold w-fit py-1 px-3 rounded-full">
                          Paid - on queue
                        </div>
                      )}
                      {order.status === 'on process' && (
                        <div className="bg-yellow-100 text-yellow-600 font-semibold w-fit py-1 px-3 rounded-full">
                          On process
                        </div>
                      )}
                      {order.status === 'pending rider' && (
                        <div className="bg-red-100 text-red-600 font-semibold w-fit py-1 px-3 rounded-full">
                          Waiting for your Rider
                        </div>
                      )}
                      {order.status === 'on delivery' && (
                        <div className="bg-blue-100 text-blue-600 font-semibold w-fit py-1 px-3 rounded-full">
                          On delivery
                        </div>
                      )}
                      {order.status === 'completed' && (
                        <div className="bg-green-200 text-green-800 font-semibold w-fit py-1 px-3 rounded-full">
                          Completed
                        </div>
                      )}
                      {order.status === 'canceled' && (
                        <div className="bg-red-200 text-red-800 font-semibold w-fit py-1 px-3 rounded-full">
                          Canceled
                        </div>
                      )}
                    </td>
                    <td className="flex items-center px-2 md:px-4 py-2 md:py-4 space-x-2 justify-center gap-2">
                      <button onClick={() => toggleOrderDetails(order.order_id)} title='View Orders'>
                        <img src={eye} alt="View Order" className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                      <button onClick={openChat} title='Chat with Rider'>
                        <img src={chat} alt="Chat" className="w-5 h-5 md:w-6 md:h-6" />
                      </button>
                       {isChatOpen && <ChatWithRider onClose={closeChat} />}
                    </td>
                  </tr>

                  {expandedOrderId === order.order_id && (
                    <tr>
                      <td colSpan="8" className="bg-gray-100 dark:bg-gray-700">
                        <div className="px-4 md:px-6 py-3 md:py-4">
                          <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
                            <strong>Order Items:</strong>
                            <ul className="mt-2 space-y-1 md:space-y-2">
                              <li className="py-1 w-full text-left">
                                {order.food_details}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
                          <div className="border-t border-gray-300 py-10 px-4 md:px-16 w-full flex flex-col justify-center items-center">
                            <h1 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">You haven't placed any orders yet.</h1>
                            <a href="/menu" className="hover:underline text-blue-600 dark:text-blue-400 mt-4">Start Browsing</a>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            
        {/* <!-- Address Tab--> */}
        {activeTab === 'address' && (
          <div className="container mx-auto py-12 px-4 md:px-8 flex justify-center" id="address" role="tabpanel" aria-labelledby="Address-tab">
            <div className="p-6 md:p-10 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg w-full max-w-3xl">
              {/* Address Section */}
              <div className="border-b border-gray-300 dark:border-gray-700 pb-6 mb-8 text-center">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">My Address(es)</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3">Add and manage the addresses you use often.</p>
              </div>

            {/* Address Information */}
            <div className=" pb-8 mb-8">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Address:</label>
                  <div className="flex flex-col space-y-2">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{profile.address}</p>
                    <div className="flex justify-between items-center mt-3">
                      <div className="space-x-3">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Edit</button>
                        <button className="text-sm text-red-600 dark:text-red-400 hover:underline">Remove</button>
                      </div>
                      <div className="flex items-center">
                        <input id="green-radio" type="radio" value="" name="colored-radio" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="green-radio" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default Address</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add New Address Button */}
            <div className="flex justify-end mb-8">
              <button onClick={addAddress} className="bg-green-700 rounded-lg px-6 text-sm text-white py-3 mt-3 hover:bg-green-800 transition duration-300">
                Add New Address
              </button>
            </div>

      {/* Add New Address Modal */}
      <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Address</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="fname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                  <input type="text" name="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Juan" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="lname" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                  <input type="text" name="lname" id="lname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Dela Cruz" required />
                </div>
                <div className="col-span-2">
                  <label htmlFor="company" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                  <input type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Sample" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                  <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Test" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="country" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                  <select id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                    <option value="">Japan</option>
                    <option value="">Philippines</option>
                    <option value="">Hong Kong</option>
                    <option value="">New Zealand</option>
                    <option value="">Australia</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="postal" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">ZIP / Postal Code</label>
                  <input type="number" name="postal" id="postal" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="4114" required />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                  <input type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="09123456789" required />
                </div>
              </div>
              <div className="flex items-center my-4">
                <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Set as default address</label>
              </div>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 grid-cols-1">
                <button className="bg-green-700 rounded-lg px-6 text-sm w-full text-white py-3 mt-3 hover:bg-green-800 transition duration-300" data-modal-target="crud-modal" data-modal-toggle="crud-modal">Add New Address</button>
                <button className="bg-gray-400 rounded-lg px-6 text-sm w-full text-white py-3 mt-3 hover:bg-gray-500 transition duration-300" data-modal-target="crud-modal" data-modal-toggle="crud-modal">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


      {/* <!-- Account Tab--> */}
      {activeTab === 'account' && (
        <div className="container mx-auto py-12 px-4 md:px-8 flex justify-center" id="account" role="tabpanel" aria-labelledby="Account-tab">
          <div className="p-6 md:p-10 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg w-full max-w-3xl">
            {/* Account Section */}
            <div className="border-b border-gray-300 dark:border-gray-700 pb-6 mb-8 text-center">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-3">Manage your account settings below.</p>
            </div>

            {/* Personal Information Form */}
            <div className="border-b border-gray-300 dark:border-gray-700 pb-8 mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">Update your personal information.</p>
              <form>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white">Full Name <span className="text-red-600">*</span></label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        id="name"
                        name="fname"
                        className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2 outline-none placeholder-gray-500"
                        placeholder={profile.name}
                        required
                      />
                      <img src={lock} alt="Lock Icon" className="w-auto h-7" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-green-700 text-white px-5 py-2 text-sm rounded-md hover:bg-blue-700 transition duration-300">
                    Update Info
                  </button>
                </div>
              </form>
            </div>

      {/* Login Information Section */}
      <div className="pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3">Login Information</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">View and modify your login email and password.</p>
        <div className="space-y-6">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Login Email:</label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={profile.email}
                readOnly
                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 w-full outline-none"
              />
              <img src={mail} alt="Mail Icon" className="w-5 h-5 text-gray-500" />
            </div>
            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">Change Email</a>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Password:</label>
            <div className="flex items-center space-x-3">
              <input
                type="password"
                value="●●●●●●●●"
                readOnly
                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-lg p-3 w-full outline-none"
              />
              <img src={key} alt="Key Icon" className="w-5 h-5 text-gray-500" />
            </div>
            <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">Change Password</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}


          </div>
        </div>
     </div>

    {/* <!-- Contact Us --> */}
    <footer class="bg-[#1A1A1A] w-full h-1/4 mt-5 py-7 flex flex-col justify-center items-center" id="footer">

      <div class="border-y-2 border-gray-400 w-4/5 p-10">
        {/* <!-- container footer--> */}
        <div class="flex justify-between w-full">
        <h1 class="text-white text-3xl sm:text-4xl font-bold">
          Jayd's Cafe
        </h1>

          <div class="flex gap-2">
            <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
              <img src={fb} alt=""/>
            </button>
            <button type='button' class='w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500  hover:bg-green-700' id="viewloc">
              <img src={ig} alt=""/>
            </button>
          </div>
        </div>
        
      <button type="button" class="rounded-full text-white w-fit px-6 py-2 mt-7" id="viewloc">View Location</button>
      </div>


      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between text-center md:text-left">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400 block md:inline-block mb-2 md:mb-0">
        Copyright © 2024. Capstone Inc.
      </span>

      <ul class="flex flex-wrap justify-center md:justify-end items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li class="footer-links">
          <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal" data-modal-toggle="default-modal">Refund Policy</a>
        </li>
        <li class="footer-links">
          <a href="#footer" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
          <li class="footer-links">
            <a href="#footer" class="hover:underline me-4 md:me-6" data-modal-target="default-modal3" data-modal-toggle="default-modal3">Terms and Conditions</a>
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

    {/* <script src="https://cdn.jsdelivr.net/npm/flowbite@2.4.1/dist/flowbite.min.js"></script> */}
    </div>
  )
}
