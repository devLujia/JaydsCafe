import React, { useEffect, useState } from 'react'
import notif from '../../image/notif.svg';
import user from '../../image/UserAcc.svg';
import gwen from '../../image/Gwen.png';
import camera from '../../image/camera.svg';
import bg_pic from '../../image/36733336252.png';
import lock from '../../image/lock.svg';
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Settings() {
  
   const [authenticated, setAuthenticated] = useState(false);
   const [userId, setUserId] = useState(null);
   const [role, setRole] = useState(null);
   const [profile, setProfile] = useState([]);
   const [value, setValue] = useState([]);
   const [news, setNew] = useState(false);



   const [cmsName,setCmsName] = useState('');

   const [tier1,setTier1] = useState([])
   const [tier2,setTier2] = useState([])
   const [tier3,setTier3] = useState([])
   const [tier,setTier] = useState([])

   const navigate = useNavigate();
   axios.defaults.withCredentials = true;

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

  const handlePersonalInfo = (e) => {
   const { name, value } = e.target;
   setValue((prevState) => ({
       ...prevState,
       [name]: value,
   }));
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
   if (userId) {
       fetchProfile()
   };
}, [userId]);

const submitPersonalInfo = async () => {

   if (!value.fullName && !profile.name) {
      alert("Full name is required.");
      return;
    }
    
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if ((value.email || profile.email) && !emailRegex.test(value.email || profile.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    
   if (value.password && value.password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return;
    }
    
   if (value.password !== value.oldPassword) {
      alert("Old Password and New Password not match");
      return;
   }


   try {
     const response = await axios.post('http://localhost:8081/updateAdminInfo', {
       value: {
         fullName: value.fullName || profile?.name,
         email: value.email || profile?.email,
         password: value.password || '',

       },
       userId: userId
     });
 
         if (response?.data?.success) {
            toast.success("Update successfully!", {
                autoClose: 3000, 
                hideProgressBar: true, 
                closeOnClick: true, 
                pauseOnHover: true, 
                draggable: false, 
            });
           setNew(true);
         } else {
           alert("Failed to update. Please try again.");
         }
       } catch (error) {
         alert("An error occurred. Please try again later.");
         console.error("Error updating personal info:", error);
       }
 };
  
 function stripHtmlTags(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

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
    <div>
      <ToastContainer position="top-center" autoClose={3000} />

        {/* <!-- Nav --> */}
        <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-between dark:bg-[#282828]">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="/admin" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">{stripHtmlTags(cmsName)}</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif}></img>
                </button>
                <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end dark:text-white">
                    <div class="font-bold">{profile.name}</div>
                    <div class="items-center justify-center">{profile.role}</div>
                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
            </div>
        </nav>

        <div class="bg-white h-screen flex justify-center items-center sm:hidden z-10">
          <p class="text-black text-xl">Only for desktop use!</p>
        </div>
        
         <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-white dark:border-gray-600 sm:translate-x-0 dark:bg-[#282828]" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#282828]">
                <a href="#" class="flex items-center ps-2.5 mb-5">
                    <img src={jaydsLogo} alt="Logo"/>   
                    <span 
                        className="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2" 
                        dangerouslySetInnerHTML={{ __html: cmsName }}>
                    </span>        
                </a>
                    <ul class="space-y-2 font-medium ">



                {tier3.includes(profile?.role|| 0) ?
                
                <li> {/* <!-- Dashboard --> */}
                        <Link to="/dashboard">
                            <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                                <svg class="w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                                </svg>
                                <span class="ms-3">Dashboard</span>
                            </a>
                        </Link>
                    </li> : 
                    ''}

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
                        <a href="/ProductManagement" class="flex items-center p-2 text-gray-600 rounded-lg  hover:bg-greenColor group hover:text-white dark:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                        </a>               
                    </li>

                    <li> {/* <!-- Sales Report --> */}
                    <a href="/Sales" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                      <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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
                        <a href="/CustomerAccount" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap">Admin Account</span>
                        </a>
                    </li>

                <li> {/* <!-- Content Management --> */}
                    <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                    </a>
                </li></>
                :
                ''}

                

                </ul>
    
                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                {tier3.includes(profile?.role|| 0) || tier2.includes(profile?.role|| 0) || tier1.includes(profile?.role|| 0) ? 
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
                  <a href="#" class="flex items-center p-2 transition duration-75 rounded-lg bg-greenColor  group text-white">
                  <svg class="flex-shrink-0 w-7 h-7 transition duration-75  text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                  </svg>
                     <span class="ms-1">Settings</span>
                  </a>
               </li>
                <li> {/* <!-- Sign Out --> */}
                    <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span onClick={handleLogout} class="ms-3">Sign Out</span>
                    </a>
                </li>



                </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5 dark:text-white">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
        </aside>

        {/* <!-- Main body --> */}
        <div class=" w-4/5 h-full mt-10 sm:flex flex-col float-right dark:text-gray-300 hidden sm:block"> 
            <div class="h-64 rounded-t-2xl px-20 w-full relative drop-shadow-sm">
                <div class="object-contain w-full h-full rounded-t-2xl"> {/* <!-- container ng cover photo --> */}
                    <img src={bg_pic} alt="" class="w-full h-full object-fill max-w-full max-h-full rounded-t-2xl"/>
                </div>

                <div class="flex overflow-x-hidden mb-6 ml-16 items-center absolute bottom-0"> {/* <!-- container ng profile pic --> */}
                    <div class="object-contain w-36 h-36 rounded-full bottom-0"data-popover-target="popover-user-profile" type="button">
                    <img src={gwen} alt="" class="w-full h-full object-fill max-w-full max-h-full rounded-full"/>
                    </div>

                    <h1 class="text-white text-2xl ml-2 tracking-wider">{profile.name}</h1>
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

  
        <div id="default-tab-content">
       <div class="p-6 md:px-16 rounded-lg my-7 bg-white dark:bg-gray-900 shadow-md" id="Account" role="tabpanel" aria-labelledby="Account-tab">
     <form id="account-update-form" onSubmit={submitPersonalInfo} class="space-y-10">
    {/* <!-- Personal Info Section --> */}
    <div class="">
      <h2 class="text-3xl font-semibold py-4 border-b border-gray-200 dark:border-gray-700">Personal Information</h2>
      <div class="grid gap-8 grid-cols-1 md:grid-cols-2 mt-6">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name <span class="text-red-600">*</span></label>
          <input type="text" onChange={handlePersonalInfo} value={value.fullName} id="fullName" name="fullName" placeholder={profile?.name} class="mt-2 bg-white border border-gray-300 text-gray-800 text-base rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200"  />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email <span class="text-red-600">*</span></label>
          <input type="email" onChange={handlePersonalInfo} id="email" name="email" placeholder={profile?.email} class="mt-2 bg-white border border-gray-300 text-gray-800 text-base rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200"  />
        </div>
      </div>
    </div>

    {/* <!-- Password Section --> */}
    <div>
      <h2 class="text-3xl font-semibold py-4 border-b border-gray-200 dark:border-gray-700">Update Password</h2>
      <div class="grid gap-8 grid-cols-1 md:grid-cols-2 mt-6">
        <div>
          <label for="oldPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Old Password <span class="text-red-600">*</span></label>
          <input type="password" id="oldPassword" onChange={handlePersonalInfo} name="oldPassword" placeholder="Old Password" class="mt-2 bg-white border border-gray-300 text-gray-800 text-base rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200"  />
        </div>
        <div> 
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password <span class="text-red-600">*</span></label>
          <input type="password" id="password" onChange={handlePersonalInfo} name="password" placeholder="New Password" class="mt-2 bg-white border border-gray-300 text-gray-800 text-base rounded-md focus:ring-primary-500 focus:border-primary-500 block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200"  />
        </div>
      </div>
    </div>

    {/* <!-- Action Buttons --> */}
    <div class="flex justify-end space-x-4 mt-8">
      <button type="button" class="py-3 px-6 text-base font-semibold text-gray-700 border border-gray-400 rounded-md hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 transition ease-in-out duration-200">
        Discard Changes
      </button>
      <button type="submit" form="account-update-form" class="py-3 px-6 text-base font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 transition ease-in-out duration-200">
        Save Changes
      </button>
    </div>
  </form>
        </div>
        </div>
    </div>
    </div>
        </div>
  )
}
