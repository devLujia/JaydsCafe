import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import notif from '../../image/notif.svg'
import jaydsLogo from '../../image/jayds cafe Logo.svg'
import sales from '../../image/sales(dashboard).svg'
import order from '../../image/order(dashboard).svg'
import product from '../../image/product(dashboard).svg'
import customer from '../../image/customer(dashboard).svg'
import user from '../../image/UserAcc.svg'

import { Link, useNavigate } from 'react-router-dom';

function AdminDashboard() {

   const [totalOrder,setTotalOrder] = useState(0);
   const [totalRevenue,setTotalRevenue] = useState(0);
   const [totalCustomer,setTotalCustomer] = useState(0);
   const [foods,setFoods] = useState([]);
   const [orders, setOrders] = useState([])
   const [expandedOrderId, setExpandedOrderId] = useState(null);
   const [authenticated, setAuthenticated] = useState(false);
   const [userId, setUserId] = useState(null);
   const [profile, setProfile] = useState([]);
   const [cmsContent ,setCms] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [isNotif, setIsNotif] = useState(false);
   const [role, setRole] = useState(null);
   const [ticketId, setTicketId] = useState([]);
   const [tier1,setTier1] = useState([])
   const [tier2,setTier2] = useState([])
   const [tier3,setTier3] = useState([])
   const [tier,setTier] = useState([])

   useEffect(() => {
      const fetchRoleSetup = async () => {
          try {
              const response = await axios.post('http://localhost:8081/roleSetup');
              setTier(response.data);
          } catch (error) {
              console.error('Error fetching role setup details:', error);
          }
      };
  
      fetchRoleSetup();
  }, []);
  

   useEffect(() => {

      setTier3([]);
      setTier2([]);
      setTier1([]);
  
      tier.forEach(tiers => {
        if (tiers.administer === 3) {
          setTier3(prev => [...prev, tiers.title]);
        } else if (tiers.administer === 2) {
          setTier2(prev => [...prev, tiers.title]);
        } else {
          setTier1(prev => [...prev, tiers.title]);
        }
      });

    }, [tier]);


   const navigate = useNavigate();
   axios.defaults.withCredentials = true;
   
   const [showTooltip, setShowTooltip] = useState(false); //For tooltip
   const [cmsName,setCmsName] = useState('');

    useEffect(()=>{

        const fetchNameData = async () => {
          try {
            const response = await axios.post('http://localhost:8081/cms', {title: 'Business Name'});
            setCmsName(response.data.content || '');
          } 
          catch (error) {
            console.error('Error fetching data:', error);
          }
    
        };

        fetchNameData();
    },[])
   
   const [updateOrder, setUpdateOrder] = useState([
      {
         order_id:'',
         status: '',
      }

   ]);

   useEffect(() => {
      const fetchAdminTable = async () => {
          try {
              const response = await axios.post('http://localhost:8081/adminTable');
              setFoods(response.data);
          } catch (error) {
              console.error('Error fetching food details:', error);
          }
      };
  
      fetchAdminTable();
  }, []);

  useEffect(() => {
   const fetchTotalOrder = async () => {
       try {
           const response = await axios.post('http://localhost:8081/totalOrder');
           setTotalOrder(response.data.totalOrders);
       } catch (error) {
           console.error('Error fetching totalOrder details:', error);
       }
   };

   fetchTotalOrder();
}, []);

   
   //For notif dropdown
   // Sample notifications
   const notifications = [
      'Notification 1',
      'Notification 2',
      'Notification 3',
      'Notification 1',
      'Notification 2',
      'Notification 3',
      'Notification 1',
      'Notification 2',
      'Notification 3'
   ];

   useEffect(() => {
      const getTicketNumber = async () => {
        try {
          const response = await axios.post('http://localhost:8081/getTicketId');
          setTicketId(response.data); 
          
        } 
        catch (error) {
          console.error('Error fetching ticket ID:', error);
        }

      };
    
      getTicketNumber();
    }, []);

   // Function to toggle dropdown
   const toggleNotif = () => {
      setIsNotif(!isNotif);
   };


   //for dropdown user
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

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

    useEffect(() => {
      const fetchTotalRevenue = async () => {
          try {
              const response = await axios.post('http://localhost:8081/totalRevenue');
              setTotalRevenue(response.data.total_revenue);
          } catch (error) {
              console.error('Error fetching total revenue details:', error);
          }
      };
  
      fetchTotalRevenue();
  }, []);
  
    
   useEffect(() => {
      const fetchCustomerCount = async () => {
         try {
            const response = await axios.post('http://localhost:8081/users');
            setTotalCustomer(response.data.customer_count);
         } catch (error) {
            console.error('Error fetching customer count details:', error);
         }
      };

      fetchCustomerCount();
   }, []);


    useEffect(() =>{
      
      AOS.init();

    },[])

    useEffect(() => {
      const fetchCmsData = async () => {
          try {
              const response = await axios.post('http://localhost:8081/cms_backend');
              setCms(response.data);
          } catch (error) {
              console.error('Error fetching CMS data:', error);
          }
      };
  
      fetchCmsData();
  }, []);
  

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
         navigate('/admin');
         }
      } 
      
      
      catch (err) {
         console.log(err);
      }
      };

      fetchData();
      }, [navigate]);
    
      useEffect(() => {
         const fetchProfile = async () => {
             try {
                 if (userId) {
                     const response = await axios.post('http://localhost:8081/profile', { userId: userId });
                     
                     if (response.data) {
                         setProfile(response.data);
                     } else {
                         console.warn('No profile data returned');
                     }
                 }
             } catch (error) {
                 console.error('Error fetching profile details:', error);
             }
         };
     
         if (userId) {
             fetchProfile();
         }
     }, [userId]);
     

   useEffect(() => {
      const fetchOrders = async () => {
          try {
              const res = await axios.post('http://localhost:8081/orderTracking');
              setOrders(res.data);
          } catch (error) {
              console.error('Error fetching orders:', error);
          }
      };
  
      fetchOrders();
  }, []);
  

   const toggleOrderDetails = (orderId) => {
      setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
   };


   const getTheOrder = async (id, stats) => {
      let newStatus = ''; 
  
      if (stats === 'paid') {
          newStatus = 'pending';
      } else if (stats === 'pending') {
          newStatus = 'completed';
      }
  
      // Optimistically update the state
      setUpdateOrder(prevState => 
          prevState.map(order =>
              order.order_id === id ? { ...order, status: newStatus } : order
          )
      );
  
      try {
          const res = await axios.post('http://localhost:8081/updateOrders', {
              order_id: id,
              status: newStatus
          });
          console.log('Order updated successfully:', res.data);
      } catch (err) {
          console.error('Error updating the order:', err);
      }
  };
  
    
    
  return (
    <div class="bg-jaydsBg dark:bg-gray-700"> 
      <nav class="sticky top-0 bg-jaydsBg z-20 shadow-none flex justify-between dark:bg-[#282828] dark:text-white">
         <div class="font-extrabold text-2xl flex items-center">
               {/* <!-- Logo/Title in Navbar --> */}
               <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">{cmsName}</a>
         </div>
         <div></div>
         {/* <!-- Button for Login or Sign Up --> */}
         <div class="flex justify-end items-center ">
               <button className='rounded-full p-2 bg-white border border-gray-400' onClick={toggleNotif}>
                     <img src={notif} title='Notification'></img>
               </button>

               {isNotif &&(
                   <div className="absolute top-8 right-40 mt-2 w-72 bg-white border border-gray-300 rounded-md shadow-lg max-h-52 overflow-hidden overflow-y-auto">
                    <h1 className='sticky top-0 w-full bg-white ps-5 text-gray-400 py-2 font-semibold'>Notification</h1>
                     <ul className="pb-4 gap-y-2">
                        {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                           <li key={index} className=" ps-4 py-4 border-b w-full last:border-none hover:bg-slate-100">
                              {notification}
                           </li>
                        ))
                        ) : (
                        <li>No new notifications</li>
                        )}
                     </ul>
                 </div>
               )}
               
               <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end dark:text-white">
                  <div class="font-bold">{profile.name}</div>
                  <div class="items-center justify-center">{(profile?.role?.toUpperCase() || '')}</div>
               </div>

               <button onClick={toggleDropdown}>
                  <img id="avatarButton" type="button" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
               </button>

               {isOpen && (
               <div className="absolute top-5 right-10 mt-8 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                     <li onClick={()=>navigate('/settings')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                     Profile
                     </li>
                     <li
                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                     onClick={handleLogout}
                     >
                     Logout
                     </li>
                  </ul>
               </div>
               )}
         </div>
      </nav>

      <div class="bg-white h-screen flex justify-center items-center sm:hidden z-10">
         <p class="text-black text-xl">Only for desktop use!</p>
      </div>
      
      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-white dark:border-gray-600 sm:translate-x-0 dark:bg-[#282828]" aria-label="Sidebar">
         <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#282828]">
         <a href="#" class="flex items-center ps-2.5 mb-5">
            <img src={jaydsLogo} alt="Logo"/>           
            <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">{cmsName}</span>
         </a>
            <ul class="space-y-2 font-medium ">



               {tier3.includes(profile?.role|| 0) ? <li> {/* <!-- Dashboard --> */}
                  <a href="#" class={`flex items-center p-2 rounded-lg bg-greenColor group text-white`}>
                  <svg class="w-5 h-5 transition duration-75 text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                     <span class="ms-3">Dashboard</span>
                  </a>
               </li> : ''}

               {tier3.includes(profile?.role|| 0) || tier2.includes(profile?.role|| 0) ?
                  
                  <React.Fragment>
                  
                  <li> {/* <!-- Order Management --> */}
                  <a href="/Order" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                        <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                     </svg>
                     <span class="ms-3">Order</span>
                  </a>
               </li>

               <li> {/* <!-- Product Management --> */}
                  <Link to="/ProductManagement">
                     <a href="/public/Html_Admin/productManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                           </svg>
                           <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                     </a>
                  </Link>
               </li>

               <li> {/* <!-- Sales Report --> */}
               <a href="/Sales" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-white group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                     <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                     <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                  </svg>
                  <span class="flex-1 ms-3 whitespace-nowrap">Sales Report</span>
               </a>
               </li>
               </React.Fragment>
               :''}

               {tier3.includes(profile?.role|| 0) ?
               <>

               <li> {/* <!-- Customer Account --> */}
                  <a href="/CustomerAccount" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group dark:text-white hover:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                     </svg>
                     <span class="flex-1 ms-3 whitespace-nowrap">Admin Account</span>
                  </a>
               </li>

               <li> {/* <!-- Content Management --> */}
                  <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-greenColor group hover:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-white group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                     </svg>
                     <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                  </a>
               </li></>
               :
               ''}
            </ul>
   
            <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">

            {tier3.includes(profile?.role|| 0) || tier2.includes(profile?.role|| 0) ? 
               <li> {/* <!-- Inbox --> */}
                  <a href="/Message" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                     </svg>
                     <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                     <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                  </a>
               </li> : ''}

               <li> {/* <!-- Settings --> */}
                  <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                  <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75 dark:text-white group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                  </svg>
                     <span class="ms-1">Settings</span>
                  </a>
               </li>

               <li> {/* <!-- Sign Out --> */}
                  <a href="/public/Html_Admin/adminLogin.html" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-white group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                     </svg>
                     <span class="ms-3">Sign Out</span>
                  </a>
               </li>
            </ul>
         <h1 class="text-md font-semibold text-gray-500 fixed bottom-5 dark:text-white">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
         </div>
      </aside>

      <div class="p-4 sm:ml-64 pt-5 hidden sm:block dark:bg-[#3f3f3f]">
      {tier3.includes(profile?.role|| 0) ?
         <div class="p-4 ml-8">

            {/* Overview & Chats*/}
            <div class="grid grid-cols-1 md:grid-cols-[65%_34%] gap-4 mb-6">

               {/* Overview */}
               <div class="p-4 bg-white rounded-xl h-full w-full dark:bg-[#282828] dark:text-white">
                  <div class="flex relative justify-between">
                     <h1 class="font-bold text-3xl tracking-wide mb-3">Overview</h1>
                     <button className="px-4 py-2 bg-transparent text-black border border-black rounded-lg hover:bg-green-800 hover:text-white transition ease-in-out duration-300 shadow-md">
                  View Statistics
                  </button>
                  </div>
                  <p class="mb-16">Sales Summary</p>

                  <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
                     <div class="px-4 py-4 flex flex-col rounded-xl bg-red-200 shadow-lg h-fit" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="100">
                        <div class= "w-10 h-10 mb-6 bg-red-400 rounded-full justify-center flex items-center flex-shrink-0">
                           <img src={sales}></img>
                        </div>
                        <h1 class="font-bold text-lg text-gray-700 mb-1"><span>₱</span>134</h1>
                        <div class="inline-flex justify-between font-normal text-gray-600 mb-1">
                           <p>Total Sales</p>
                        </div>
                        <p className='font-semibold text-blue-500 pb-2'>Per Month</p>
                     </div>

                     <div class="px-4 py-4 flex flex-col h-fit rounded-xl bg-yellow-100 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="200">
                        <div class= "w-10 h-10 mb-6 bg-yellow-400 rounded-full justify-center flex items-center flex-shrink-0 ">
                           <img src={order}></img>
                        </div>
                        <h1 class="font-bold text-lg text-gray-700 mb-1">{totalOrder} </h1>
                        <div class="inline-flex justify-between font-normal text-gray-600 mb-1">
                           <p>Total Order</p>
                        </div>
                        <p className='font-semibold text-blue-500 pb-2'>This Week</p>
                     </div>

                     <div class="px-4 py-4 flex flex-col h-fit rounded-xl bg-green-100 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="300">
                        <div class= "w-10 h-10 mb-6 bg-green-400 rounded-full justify-center flex items-center flex-shrink-0">
                           <img src={product}></img>
                        </div>
                        <h1 class="font-bold text-lg text-gray-700 mb-1">{totalRevenue} </h1>
                        <div class="font-normal text-gray-600 mb-1">
                           <p>Product Sold</p>
                        </div>
                        <p className='font-semibold text-blue-500 pb-2'>Per Month</p>
                     </div>

                     <div class="px-4 py-4 flex flex-col h-fit rounded-xl bg-violet-100 shadow-lg" data-aos="flip-right" data-aos-duration="1000" data-aos-delay="400">
                        <div class= "w-10 h-10 mb-6 bg-violet-400 rounded-full justify-center flex items-center flex-shrink-0 ">
                           <img src={customer}></img>
                        </div>
                        <h1 class="font-bold text-lg text-gray-700 mb-1">{totalCustomer} </h1>
                        <div class="inline-flex justify-between font-normal text-gray-600 mb-1">
                           <p>New Customer</p>
                        </div>
                        <p className='font-semibold text-blue-500 pb-2'>Per Week</p>
                     </div>

                  </div>
               </div>

               {/* Chat */}
               <div class="bg-white rounded-xl p-4 h-96 overflow-hidden dark:bg-[#282828] dark:text-white">
                  <div class="flex justify-between sticky top-0 bg-white dark:bg-[#282828] dark:text-white">
                     <h1 class="font-bold text-3xl tracking-wide">Chats</h1>
                     <button class="p-2 bg-transparent text-black border border-black rounded-lg hover:bg-green-800 hover:text-white transition ease-in-out duration-300 shadow-md">
                        <a href='/Message'>View All Messages</a>
                     </button>
                  </div>
                  {/* Contacts */}
                  <div class="overflow-y-auto max-h-full pb-2">
                  {ticketId.map((ticket) => (
                     <div key={ticket.ticket_id} class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
                        <img
  src={`data:image/svg+xml,${encodeURIComponent(
    `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#047857"/>
      <circle cx="24" cy="19" r="8" fill="white"/>
      <path d="M11 40C11 40 15 32 24 32C33 32 37 40 37 40" stroke="white" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  )}`} 
  alt="Anonymous user"
  className="w-full h-full object-cover rounded-full"
/>

                        </div>
                        <div class="flex-1">
                           <h2 class="text-lg font-semibold">{ticket?.ticket_id || 'NO TICKET ID'}</h2>
                           <p class="text-gray-600">{ticket?.subject || "No Subject"}</p>
                        </div>
                     </div> ))}
 
                  </div>
               </div>
            </div>

            {/* Pending Orders */}
            <div class="relative overflow-hidden shadow-lg rounded-lg col-span-2 mb-8">
                  <div class="relative bg-white dark:bg-[#2a2a2a]">
                        <div class="flex justify-between items-center sticky top-0 bg-white p-5 dark:bg-[#282828] dark:text-white shadow">
                           <h1 class="font-bold text-3xl tracking-wide">Pending Orders</h1>
                           <button class="px-4 py-2 bg-transparent text-black border border-black rounded-lg hover:bg-green-800 hover:text-white transition ease-in-out duration-300 shadow-md">
                              <a href='/ProductManagement'>View All Orders</a>
                           </button>
                        </div>

                        <div class="overflow-x-auto">
                              <table class="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                                    <thead class="text-xs uppercase bg-gray-100 dark:bg-[#3f3f3f] dark:text-gray-300">
                                       <tr class="text-center">
                                          <th scope="col" class="px-6 py-4">
                                                ID
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Name
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Address
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Contact Number
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Date / Time
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Price
                                          </th>
                                          <th scope="col" class="px-6 py-4">
                                                Status
                                          </th>
                                       </tr>
                                    </thead>

                                    <tbody>
                                    {orders.slice(0, 2).map(order => (
                                       <React.Fragment key={order.order_id}>
                                          <tr className="bg-white border-b hover:bg-gray-100 dark:bg-[#3a3a3a] dark:border-[#4a4a4a] dark:hover:bg-[#5b5b5b]">
                                             <th scope="row" className="text-center px-6 py-6 font-semibold text-gray-900 whitespace-nowrap dark:text-gray-300">
                                                <div className="text-base font-semibold">ORDR#{order.order_id}</div>
                                             </th>
                                             <td className="px-6 py-6 text-center">
                                                {order.name}
                                             </td>
                                             <td className="px-6 py-6 text-center">
                                                {order.address}
                                             </td>
                                             <td className="px-6 py-6 text-center">
                                                {order.pnum}
                                             </td>
                                             <td className="px-6 py-6 text-center">
                                                {new Date(order.order_date).toLocaleString('en-US', {
                                                   year: 'numeric',
                                                   month: 'long',
                                                   day: 'numeric',
                                                   hour: '2-digit',
                                                   minute: '2-digit',
                                                   second: '2-digit',
                                                })}
                                             </td>
                                             <td className="px-6 py-6 text-center text-green-600 dark:text-green-400 font-bold">
                                                ₱ {order.totalPrice}.00
                                             </td>
                                             <td className="px-6 py-6">
                                                <div className={`w-fit py-2 px-6 mx-auto rounded-3xl text-sm font-semibold ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{order.status}</div>
                                             </td>
                                          </tr>

                                          {expandedOrderId === order.order_id && (
                                             <tr>
                                                <td colSpan="8" className="bg-gray-50 dark:bg-[#4a4a4a]">
                                                   <div className="p-6">
                                                      <div className="text-sm text-gray-600 dark:text-gray-300">
                                                         <strong>Order Items:</strong>
                                                         <ul className="mt-3 space-y-2">
                                                            {order.food_details.split(';').map((detail, index) => (
                                                            <li key={index} className="py-1 w-full text-left text-gray-800 dark:text-gray-200">
                                                               {detail.trim()}
                                                            </li>
                                                            ))}
                                                         </ul>
                                                      </div>
                                                   </div>
                                                </td>
                                             </tr>
                                             )}
                                       </React.Fragment>
                                    ))}

                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>



            {/* products & Content */}
            <div class="grid grid-cols-1 md:grid-cols-[65%_34%] gap-4 mb-6">
               {/* Table of products */}
               <div className="relative overflow-hidden shadow-2xl rounded-2xl col-span-1">
               <div className="flex items-center justify-between p-6 bg-white text-black rounded-t-2xl">
                  <h1 className="font-bold text-3xl tracking-wide">Top Products</h1>
                  <div className="relative w-full max-w-xs">
                        <input 
                           type="text" 
                           id="table-search-users" 
                           className="block w-full p-3 pl-12 text-sm text-gray-900 border border-black rounded-full bg-white focus:ring-green-700 focus:border-green-700 placeholder-gray-500" 
                           placeholder="Search for products..." 
                        />
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                           <svg 
                              className="w-5 h-5 text-gray-400" 
                              aria-hidden="true" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 20 20"
                           >
                              <path 
                                    stroke="currentColor" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                              />
                           </svg>
                        </div>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-green-700 dark:text-gray-300">
                           <tr>
                              <th scope="col" className="px-6 py-4">Product Name</th>
                              <th scope="col" className="px-6 py-4">Category</th>
                              <th scope="col" className="px-6 py-4">Price</th>
                              <th scope="col" className="px-6 py-4">Sold</th>
                              <th scope="col" className="px-6 py-4">Profit</th>
                           </tr>
                        </thead>
                        <tbody>
                           {foods.slice(0,4).map(food => (
                              <tr 
                                    key={food.id} 
                                    className="bg-white border-b transition-colors hover:bg-gray-50 dark:bg-green-800 dark:hover:bg-green-700 dark:text-gray-300"
                              >
                                    <th 
                                       scope="row" 
                                       className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-gray-200"
                                    >
                                       <img 
                                          className="w-12 h-12 rounded-full shadow-lg" 
                                          src={food.image_url} 
                                          alt={food.name}
                                       />
                                       <div className="pl-4">
                                          <div className="text-base font-semibold">{food.name}</div>
                                       </div>  
                                    </th>
                                    <td className="px-6 py-4">
                                       {food.title}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-100">
                                       ₱ {food.price}.00
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                       {food.sold} pc(s)
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-green-700 dark:text-green-400">
                                       ₱ {food.price * food.sold}.00
                                    </td>
                              </tr>
                           ))}
                        </tbody>
                  </table>
               </div>
            </div>

               {/* Content */}
               <div class="bg-white rounded-2xl p-4 h-auto max-h-[465px] overflow-hidden shadow-md dark:bg-[#1e1e1e] dark:text-gray-300">
               <div class="flex justify-between items-center sticky top-0 bg-white mb-2 py-2 px-4 rounded-lg shadow-sm z-10 dark:bg-[#1e1e1e]">
                  <h1 class="font-bold text-xl tracking-tight">Website Content</h1>
                  <button class="p-1.5 px-3 bg-transparent text-black border border-black rounded-lg hover:bg-green-800 hover:text-white transition ease-in-out duration-300 shadow-md">
                     <a href='/ContentManagement'>View All Content</a>
                  </button>
               </div>
               <div class="flex flex-col items-center overflow-y-auto max-h-[400px] pt-3 pb-2">
                  {cmsContent.map(cms => (
                     <div key={cms.id} class="relative border border-gray-200 rounded-lg w-full text-left p-4 shadow-md mb-4 dark:bg-[#2c2c2c] dark:border-gray-700">
                     <h2 class="text-lg font-semibold text-black mb-2 dark:text-blue-400 truncate">{cms.title}</h2>
                     <p class="text-xs font-light text-gray-500 dark:text-gray-400 mb-2 truncate">
                        <span class="font-medium text-gray-800 dark:text-gray-300">Date Updated:</span> <span class="italic">{new Date(cms.updated_at).toLocaleString('en-US', {
                           year: 'numeric',
                           month: 'short',
                           day: 'numeric'
                        })}</span>
                     </p>
                     <textarea id="disabled-input" aria-label="content preview" 
                        class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 cursor-not-allowed resize-none dark:bg-[#444] dark:text-gray-300" 
                        rows="1" disabled>{cms.content}</textarea>
                     </div>
                  ))}
               </div>
               </div>
            </div>
         </div>
         : <h1 className='ml-24'>You aren't authorize in this section</h1>}
      </div> 
      
    </div>
  )
}

export default AdminDashboard
