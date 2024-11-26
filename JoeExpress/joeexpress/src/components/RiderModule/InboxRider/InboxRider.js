import React, { useEffect, useState } from 'react'
import user from '../../image/UserAcc.svg'
import notif from '../../image/notif.svg'
import riderLogo from '../../../components/image/logoRider.svg'
import send from '../../image/send.svg'
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Profile from '../../Profile/Profile';
import socket from '../../AdminModule/Message/socketService';
import axios from 'axios'


export default function InboxRider() {


   const [currentMessage, setCurrentMessage] = useState('');
   const [messageList, setMessageList] = useState([]);
   const [specificOrderId, setSpecificOrderId] = useState(null);
   const [isSidebarOpen, setSidebarOpen] = useState(false);
   const [orderId, setOrderId] = useState([]);
   const [profile, setProfile] = useState([]);
   const [authenticated, setAuthenticated] = useState(false);
   const [userId, setUserId] = useState(null);
   const navigate = useNavigate();
   const [role, setRole] = useState([]);
   const [messages, setMessages] = useState([]);

   axios.defaults.withCredentials = true;

   const toggleSideNav = () => {
      setSidebarOpen (!isSidebarOpen);
   };

   const sendMessage = async (e) => {
      if (currentMessage.trim() !== '') {
         e.preventDefault();

         const messageData = {
            author: `Rider`,
            room: specificOrderId,
            userId: userId,
            message: currentMessage,
            time: new Date(Date.now()).toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
             }),
         };

         // Emit message to the server
         await socket.emit('send_message_rider', messageData);
         setMessageList((prevChat) => [...prevChat, messageData]);
         setCurrentMessage('');
      }
   };


   const handleKeyDown = async (e) => {
      if (e.key === 'Enter' && currentMessage.trim() !== '') {
         e.preventDefault();

         const messageData = {
            author: `Rider`,
            room: specificOrderId,
            role: 'Rider',
            userId: userId,
            message: currentMessage,
            time: new Date(Date.now()).toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
             }),
         };

         // Emit message to the server
         await socket.emit('send_message_rider', messageData);
         setMessageList((prevChat) => [...prevChat, messageData]);
         setCurrentMessage('');
      }
   };

   useEffect(() => {
      // Listen for incoming messages from the server
      socket.on('receive_message', (messageData) => {
         // Only add message if it was sent by someone else
         if (messageData.userId !== userId) {
            setMessageList((prevChat) => [...prevChat, messageData]);
         }
      });

      // Cleanup the socket listener when the component unmounts
      return () => {
         socket.off('receive_message');
      };

   }, [userId]);

   useEffect(() => {
      const getOrderId = async () => {
          try {
              const response = await axios.post('http://localhost:8081/getOrderId', { userId });
            setOrderId(response.data);
              
          } catch (error) {
              console.error('Error fetching order ID:', error);
          }
      };
  
      if(userId){
         getOrderId();
      }
      
  }, [userId]);

   const fetchMessages = async (order) => {
      
      if (specificOrderId) {
         socket.emit('leave_Room', specificOrderId);
         socket.on('leave_Room', () => {
            setMessageList([]);
         });
      }

      if (order) {
         try {
            setSpecificOrderId(order);

            const response = await axios.post('http://localhost:8081/getRiderMessages', { ticketId: order });
            setMessages(response.data);

            socket.emit('join_room_rider', order);
         } catch (error) { 
            console.error('Error fetching messages:', error);
         }
      }
   };

   useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await axios.post('http://localhost:8081/profile', { userId });
          setProfile(response.data);
        } catch (error) {
          console.error('Error fetching profile details:', error);
        }
      };
    
      if(userId){
         fetchProfile();
      }
      
    }, [userId]);

useEffect(() => {
   const fetchData = async () => {
   try {
      const res = await axios.get('http://localhost:8081/admin');
      if (res.data.valid) {
      setAuthenticated(true);
      setUserId(res.data.userId);
      setRole(res.data.role);
      } 
      
      else {
      navigate('/riderLogin');
      }
   } 
   
   
   catch (err) {
      console.log(err);
   }
   };

   fetchData();
   }, [navigate]);

   useEffect(() => {
      if (specificOrderId) {
        fetchMessages(specificOrderId);
      }
    }, [specificOrderId]);  

    const handleLogout = async () => {
      try {
      const res = await axios.post('http://localhost:8081/logout');
      if (res.data.success) {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
          navigate('/');
      } else {
          console.log('Logout Failed');
      }
      } catch (error) {
      console.error('Error during logout:', error);
      }
  };


  return (
    <div className='bg-slate-100 h-screen'>
        <nav class="sticky top-0 bg-slate-100 z-20 shadow-none flex justify-between dark:bg-gray-900 ">
            
            <div className='block sm:hidden'>
                <button onClick={toggleSideNav}>
                    <img src={riderLogo}></img>
                </button>
            </div>

            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center ">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif}></img>
                </button>
                <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end dark:text-white">
                    <div class="font-bold">{profile?.name}</div>
                    <div class="items-center justify-center">Rider</div>
                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
            </div>
        </nav>

        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">             
             <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 flex flex-col justify-between">
                <div>
                    <button onClick={toggleSideNav} class="flex items-center ps-2.5 mb-5" >
                        <img src={riderLogo} alt="Logo"/>
                        <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">Jayd's Cafe</span>
                    </button>
                    <ul class="space-y-2 font-medium">
                        <li> {/* <!--Dashboard  -->  text-gray-600 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white */}
                            <a href="/RiderDashboard" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                                <svg class="w-5 h-5 transition duration-75 dark:text-gray-600 text-gray-600 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </li>
                        <li> {/* <!-- Order Management --> */}
                            <a href="/RiderOrder" class="flex items-center p-2 rounded-lg text-gray-600 hover:bg-greenColor group hover:text-white">
                                <svg class="flex-shrink-0 w-5 h-5 text-gray-600 hover:text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                                </svg>
                                <span class="ms-3">Order</span>
                            </a>
                        </li>
                        <li> {/* <!-- Inbox --> */}
                        <a href="#" class="flex items-center p-2  rounded-lg bg-greenColor group text-white">
                            <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                            <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                            </a>
                        </li>
                    </ul>
                </div>
    
                <ul class="pt-5 mt-10 bottom-0  space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    <li> {/* <!-- Settings --> */}
                        <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                        <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                        </svg>
                            <span class="ms-1">Settings</span>
                        </a>
                    </li>
                    <li> {/* <!-- Sign Out --> */}
                        <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                            </svg>
                            <span onClick={handleLogout} class="ms-3">Sign Out</span>
                        </a>
                    </li>
                </ul>
           </div>
        </aside>

        <div class="p-4 sm:ml-64 md:pl-14 py-2 mb-0 h-fit">
            {/* This is chat */}
            <div class="container mx-auto shadow-lg rounded-lg overflow-auto">
                  {/* <!-- headaer --> */}
               <div class="px-5 py-3 flex justify-between items-center bg-white border-b-2 rounded-t-xl dark:bg-gray-900 dark:text-white">
                  <div class="font-semibold text-2xl">Active Conversation</div>
                  <div class="flex flex-row">
                     <div class="text-center me-1">
                        <h1 class="font-semibold">Lek Ra</h1>
                        <span class="text-sm">Reply to message</span>
                     </div>
                     <div class="h-12 w-12 p-2 bg-greenColor rounded-full text-white font-semibold flex items-center justify-center">
                        <h1>LR</h1>
                     </div>
                  </div>
               </div>

               {/* <!-- Chatting --> */}
               <div class="flex flex-row justify-between bg-white dark:bg-gray-800">
                  {/* <!-- chat list --> */}
                  <div class="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                  {/* <!-- search compt --> */}
                  <div class="border-b-2 py-4 px-2">
                     <input
                        type="text"
                        placeholder="search chatting"
                        class="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full dark:bg-gray-800"
                     />
                  </div>
                  {/* <!-- end search compt --> */}
                  {/* <!-- user list --> */}
                  
                  {orderId.map((order) =>( 
                     
                     <div onClick={() => fetchMessages(order?.order_id || '')} class="flex flex-row py-3 px-5 justify-center items-center hover:bg-gray-200">
                     <div class="w-1/4">
                        <img
                        src={user}
                        class="object-cover h-12 w-12 rounded-full"
                        alt=""
                        />
                     </div>
                     <div class="w-full">
                        <span class="text-gray-900 text-sm">Customer name : {order?.name}</span>
                        <div class="text-sm tracking-wider dark:text-white hover:text-gray-900">Order No. {order?.order_id}</div>
                        
                     </div>
                  </div> ))}
                  
                  {/* <!-- end user list --> */}
                  </div>
                  {/* <!-- end chat list --> */}

                  {/* <!-- message --> */}
                  <div class="w-full px-5 flex flex-col justify-between overflow-auto">
                     <div class="flex flex-col mt-5 ">
                        {/* <div class="flex justify-start mb-4">
                           <div class="ml-2 py-3 px-4 bg-blue-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white max-w-[50%]">
                              Tara kila migz! 9:00 pm. sagot ko na hapunan natin!
                           </div>
                        </div>
                        <div class="flex justify-end mb-4">
                           <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-[50%]">
                              Welcome to group everyone !
                           </div>
                        </div>
                        <div class="flex justify-start mb-4"> 
                           <div class="ml-2 py-3 px-4 bg-blue-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white max-w-[50%]">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                              at praesentium, aut ullam delectus odio error sit rem. Architecto
                              nulla doloribus laborum illo rem enim dolor odio saepe,
                              consequatur quas?
                           </div>
                        </div>
                        <div class="flex justify-end mb-4">
                           <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-[50%]">
                              Edi wow pukinang ngina ina ka!
                           </div>
                        </div>
                        <div class="flex justify-start mb-4"> 
                           <div class="ml-2 py-3 px-4 bg-blue-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white max-w-[50%]">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                              at praesentium.
                           </div>
                        </div> */}
                         {messages.map((messageContent) => (
                           <div
                              key={messageContent.id}
                              className={`mb-2 flex ${messageContent.sender_id === userId ? 'justify-end' : 'justify-start'}`}
                           >
                              <div className="flex flex-col">
                                 <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
                                 {messageContent.sender_id !== userId
                                    ? `${messageContent.name}: ${messageContent.content}`
                                    : `${messageContent.content}`}
                                 </p>
                                 {/* Formatted created_at time */}
                                 <p className={`text-xs text-gray-600 mt-1 ${messageContent.sender_id === userId ? `text-right`: `text-left`}`}>
                                 {new Date(messageContent.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                 })}
                                 </p>
                              </div>
                           </div>
                           ))}

                           {messageList.map((messageContent) => {
                           return (
                              <div
                                 key={messageContent.id || messageContent.timestamp}
                                 className={`mb-2 flex ${messageContent.userId === userId ? 'justify-end' : 'justify-start'}`}
                              >
                                 <div className="flex flex-col">
                                 <p className={`bg-blue-500 text-white rounded-lg py-2 px-4 inline-block`}>
                                    {messageContent.author === "Rider" 
                                       ? `${messageContent.message}` 
                                       : `${messageContent.author}: ${messageContent.message}`}
                                 </p>
                                 {/* Time placed below the message */}
                                 <p className={`text-xs text-gray-600 mt-1 ${messageContent.userId === userId ? `text-right`: `text-left`}`}>
                                    {messageContent.time}
                                 </p>
                                 </div>
                              </div>
                           );
                           })}
                        
                     </div>

                     <label for="search" class="text-sm font-medium text-gray-900 sr-only dark:text-white">Type Something here.</label>
                     <div class="relative ">
                     <form onSubmit={sendMessage}>
            <input
               type="text"
               value={currentMessage}
               onChange={(e) => setCurrentMessage(e.target.value)}
               onKeyDown={handleKeyDown}
               placeholder="Type your message..."
               class="mb-2 block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            />
            <button type="submit">Send</button>
         </form>
                        {/* <input type="text" value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        id="search" 
                        class="mb-2 block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        />
                        <button onClick={sendMessage} class="text-white absolute end-2.5 bottom-3 bg-textgreenColor hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><img src={send}></img></button>
                      */}
                     
                     </div>
                  </div>
                  {/* <!-- end message --> */}
                 
                  </div>
            </div>
         </div>
    </div>
  )
}
