import React, { useEffect, useState } from 'react'
import trashbin2 from '../../image/trashbin(2).svg'
import trashbin3 from '../../image/trashbin(3).svg'
import settings from '../../image/settings.svg'
import ellipsis from '../../image/ellipsis.svg'
import link from '../../image/Link.svg'
import user from '../../image/UserAcc.svg'
import notif from '../../image/notif.svg'
import edit from '../../image/edit.svg'
import plus from '../../image/plus.svg' 
import picture from '../../image/UserAcc.svg'
import AddCustomerAcc from '../AdminModal/AddCustomer/AddCustomerAcc.js'
import AddRole from '../AdminModal/AddRole/AddRole.js'
import jaydsLogo from '../../image/jayds cafe Logo.svg'
import Areyousure from '../AdminModal/AYS/Areyousure.js'  
import EditCustomerAcc from '../AdminModal/EditCustomer/EditCustomerAcc.js'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export default function CustomerAccount() {

    const [addModal,setaddModal] = useState(false);
    const [addRoleModal,setAddRoleModal] = useState(false);
    const [AYSModal,setAYSModal] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const [userData,setUserData] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('');
    const [getRole, setgetRole] = useState([]);
    

    const [userRoles, setUserRoles] = useState({});

    const [cmsName,setCmsName] = useState('');

    const [tier1,setTier1] = useState([])
    const [tier2,setTier2] = useState([])
    const [tier3,setTier3] = useState([])
    const [tier,setTier] = useState([])

    useEffect(()=>{
        axios.post('http://localhost:8081/roleSetup')
        .then(response=>{
            setTier(response.data)
        })
        .catch(error => {
            console.error('Error fetching food details:', error);
        });
    },[])
    
    useEffect(()=>{
        axios.post('http://localhost:8081/getRole')
        .then(response=>{
            setgetRole(response.data)
        })
        .catch(error => {
            console.error('Error fetching food details:', error);
        });
    },[addRoleModal])

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

    // Handle role change
    const handleRoleChange = async (e, user_Id) => {
        const newRoleId = e.target.value; // This captures the ID of the selected option
        const newRole = getRole.find(gRole => gRole.id === newRoleId)?.title; // Get the corresponding title
    
        // Update state to reflect the selected role title
        setUserRoles(prevState => ({
            ...prevState,
            [user_Id]: newRole // Store the title for display
        }));
    
        try {
            // Make the API call to set the new role for the user
            const response = await axios.post('http://localhost:8081/setRoles', {
                roles: newRoleId, // Send the title as the new role
                user_Id: user_Id // User ID
            });
    
            if (response.data.success) {
                console.log("Role updated successfully");
                alert("Role updated successfully");
            } else {
                console.error("Failed to update role: ", response.data);
                alert("Failed to update role. Please try again.");
            }
        } catch (error) {
            console.error("Error updating role:", error.response ? error.response.data : error);
            alert("An error occurred while updating the role. Please try again.");
        }
    };
    
    
    
    
    

    const toggleModal = () =>{
        setaddModal(!addModal)
    }
    const toggleAddRoleModal = () =>{
        setAddRoleModal(!addRoleModal)
    }

    const toggleAYSModal = () =>{
        setAYSModal(!AYSModal)
    }

    const handleEditClick = (id) => {
        setSelectedUserId(id);
        setEditModal(!editModal);
    };


    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

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

    useEffect(() =>{
      
      axios.post('http://localhost:8081/profile', { userId })
      .then(response=>{
         setProfile(response.data);
      })
      .catch(error => {
         console.error('Error fetching profile details:', error);
       });

    },[userId])

    useEffect(()=>{
        axios.post('http://localhost:8081/fetchUserData')
        .then(result =>{
            setUserData(result.data);
        })
        .catch(error=>{
            console.log("There was an error on fetching the users details! ", error);
        });
    },[])

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
    
    // useEffect(()=>{
    //     const button = document.querySelector('[data-collapse-toggle="dropdown-example"]');
    //     const dropdown = document.getElementById('dropdown-example');
    
    //     button.addEventListener('click', () => {
    //     dropdown.classList.toggle('hidden');
    //     });
    
    //     // Dropdown sa Avatar
    //     const avatarButton = document.getElementById('avatarButton');
    //     const userDropdown = document.getElementById('userDropdown');
    
    //     avatarButton.addEventListener('click', () => {
    //     userDropdown.classList.toggle('hidden');
    //     });

    // })

  return (
    <div>
        {addModal && <AddCustomerAcc closeModal={setaddModal}/>}
        {addRoleModal && <AddRole closeModal={setAddRoleModal}/>}
        {editModal && selectedUserId !== null && (
                <EditCustomerAcc closeModal={() => setEditModal(false)} id={selectedUserId} />
            )}
        
        
        <nav class="z-20 bg-jaydsBg border-gray-200 dark:bg-[#282828] top-0 sticky flex justify-end shadow-md">
            <button className='rounded-full p-2 bg-white border border-gray-400'>
                <img src={notif}></img>
            </button>
            <div class="px-4 py-3 text-sm text-gray-900 dark:text-white flex flex-col items-center">
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



                {tier3.includes(profile?.role) ?
                
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

                {tier3.includes(profile?.role) || tier2.includes(profile?.role) ?
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
                    <a href="/ProductManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                    </a>        
                </li>
                </React.Fragment>
                :''}

                {tier3.includes(profile?.role) || tier2.includes(profile?.role)?
                <>
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

                <li> {/* <!-- Customer Account --> */}
                        <a href="#" class="flex items-center p-2 rounded-lg bg-greenColor dark:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <span class="flex-1 ms-3 whitespace-nowrap text-white">Admin Account</span>
                        </a>
                    </li>

                <li> {/* <!-- Content Management --> */}
                    <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                    </a>
                </li>
                </> :
                ''}
                </ul>
    
                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    {tier3.includes(profile?.role) || tier2.includes(profile?.role) || tier1.includes(profile?.role) ? 
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
                        <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                        </svg>
                            <span class="ms-1">Settings</span>
                        </a>
                    </li>

                    <li> {/* <!-- Sign Out --> */}
                        <a href="/public/Html_Admin/adminLogin.html" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                            </svg>
                            <span class="ms-3">Sign Out</span>
                        </a>
                    </li>
                </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5 dark:text-white">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
        </aside>
    
        <div class="p-4 sm:ml-72 hidden sm:block dark:bg-[#928e97]">
            <h1 class="font-extrabold text-3xl tracking-wider ms-2 p-5 dark:text-white">All users</h1>
            <div class="relative overflow-x-auto shadow-xl sm:rounded-lg">
                <div class="z-10 flex justify-between items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">

                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                        onChange={(e)=> setSearch(e.target.value)}
                        type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Users"/>
                    </div>
                    <div className='space-x-3'>
                        <button onClick={toggleModal} type="button" class="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                            <img src={plus} alt="Plus_Product" class="me-2 md:block"/>
                            <span class="md:block hidden"> Add Admin </span>
                        </button>
                        
                        <button type="button" onClick={toggleAddRoleModal} class="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                            <img src={plus} alt="Plus_Product" class="me-2 md:block"/>
                            <span class="md:block hidden"> Add Role </span>
                        </button>
                    </div>

                </div>

            <div class="relative overflow-x-auto shadow-md">
                    <div class="relative overflow-x-auto shadow-md ">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr class="text-center">
                                    <th scope="col" class="px-6 py-3">
                                        NAME
                                    </th>
                                    <th scope="col" class="px-6 py-3 justify-center flex">
                                        ADDRESS
                                    </th>
                                    <th scope="col" class="px-6 py-3 ">
                                        Role
                                    </th>
                                    {/* <th scope="col" class="px-6 py-3">
                                        STATUS
                                    </th> */}
                                    <th scope="col" class="px-6 py-3 justify-center flex">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            {userData.filter((user)=>{
                                return search.toLowerCase() === '' 
                                ? true 
                                : user.name.toLowerCase().includes(search);    
                            })
                            .map(user => (
                                <tr key= {user?.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                   
                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap justify-start dark:text-white">
                                        <img src={picture} alt="Jese image" class="w-10 h-10 rounded-full"/>
                                        <div class="ps-3">
                                            <div class="text-base font-semibold">{user?.name}</div>
                                        </div>  
                                    </th>
                                    <td class="px-6 py-5 items-center text-center">
                                        <div className='text-base'>{user?.email}</div>
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className="flex items-center font-semibold text-green-600 justify-center">

                                            {/* Dropdown for role selection */}
                                            <select
                                                value={userRoles[user?.id] || user?.role} // Default to current or selected role
                                                onChange={(e) => handleRoleChange(e, user?.id)}
                                                className="bg-transparent text-gray-600 font-semibold p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                {getRole.length > 0 ? (
                                                    getRole.map(gRole => (
                                                        <option key={gRole.id} value={gRole.id}> {/* Use gRole.id as value */}
                                                            {gRole.title} {/* Display the title */}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>
                                                        No roles available
                                                    </option>
                                                )}
                                            </select>

                                        </div>
                                    </td>
                                    <td class="flex items-center px-6 py-4 space-x-2 justify-center">
                                        <button onClick={() => handleEditClick(user?.id)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" title='Edit Account'>
                                            <img src={edit} alt="edit" class="px-2 filter invert"/>
                                        </button>
                                        
                                        <button onClick={toggleAYSModal} type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-400 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" title='Delete Account'>
                                            <img src={trashbin3} alt="trashbin" class="px-2"/>
                                            {AYSModal && <Areyousure closeModal={setAYSModal} id={user?.id}/>}
                                        </button>
                                    </td>
                                    
                                </tr>  
                                
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
