import React, { useEffect, useState } from 'react'
import edit from '../../image/edit.svg'
import notif from '../../image/notif.svg'
import fb from '../../image/fb.svg'
import ig from '../../image/ig.svg'
import location from '../../image/location.svg'
import user from '../../image/UserAcc.svg'
import links from '../../image/links.svg'
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import EditCms from '../AdminModal/EditCms/EditCms'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom';

export default function ContentManagement() {

    const [cmsContent ,setCms] = useState([]);
    const [editCms,setEditCms] = useState(false);
    const [cmsID, setCmsId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState([]);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    axios.defaults.withCredentials = true;

    const [cmsName,setCmsName] = useState('');

    const [tier1,setTier1] = useState([])
    const [tier2,setTier2] = useState([])
    const [tier3,setTier3] = useState([])
    const [tier,setTier] = useState([])

    useEffect(() => {
        const fetchRoleSetup = async () => {
            try {
                const response = await axios.post('https://jaydscafe.com/api/roleSetup');
                setTier(response.data);
            } catch (error) {
                console.error('Error fetching food details:', error);
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

    useEffect(() => {
        const fetchNameData = async () => {
            try {
                const response = await axios.post('https://jaydscafe.com/api/cms', { title: 'Business Name' });
                setCmsName(response.data.content || '');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchNameData();
    }, []); // Adding the empty dependency array to run this effect only once when the component mounts
    

    useEffect(() => {
        const fetchData = async () => {
        try {
           const res = await axios.get('https://jaydscafe.com/api/admin');
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
            const fetchProfileData = async () => {
                try {
                    const response = await axios.post('https://jaydscafe.com/api/profile', { userId });
                    setProfile(response.data);
                } catch (error) {
                    console.error('Error fetching profile details:', error);
                }
            };
        
            if(userId){fetchProfileData();}
        }, [userId]);
        


    const handleEditCms = (id) => {
        setCmsId(id); 
        setEditCms(!editCms);
    };
     
    
    //for dropdown user
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
        const res = await axios.post('https://jaydscafe.com/api/logout');
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
        const fetchCmsData = async () => {
            try {
                const response = await axios.post('https://jaydscafe.com/api/cms_backend');
                setCms(response.data);
            } catch (error) {
                console.error('Error fetching CMS data:', error);
            }
        };
    
        fetchCmsData();
    }, [editCms]);
    
  return (
    <div>
        {editCms && cmsID !== null && (
            <EditCms closeModal={() => setEditCms(false)} id={cmsID} />
        )}

        <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-between dark:bg-[#282828]">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide"></a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif}></img>
                </button>
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
                <span 
                    className="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2" 
                    dangerouslySetInnerHTML={{ __html: cmsName }}>
                </span>
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
                </React.Fragment>
                :''}

               {tier3.includes(profile?.role|| 0) ?
               <><li> {/* <!-- Sales Report --> */}
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
                    <a href="/CustomerAccount" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Admin Account</span>
                    </a>
                </li>

                <li> {/* <!-- Content Management --> */}
                    <a href="/ContentManagement" class="flex items-center p-2 rounded-lg bg-greenColor group text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
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
                        <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                            <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                            </svg>
                            <span class="ms-1">Settings</span>
                        </a>
                    </li>

                    <li onClick={handleLogout} > {/* <!-- Sign Out --> */}
                        <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                            <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                            </svg>
                            <span class="ms-3">Sign Out</span>
                        </a>
                    </li>
                </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5 dark:text-white">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
        </aside>
        
        <div class="p-4 sm:ml-72 bg-slate-100 hidden sm:block dark:bg-[#3f3f3f] dark:text-white">
            <div class="relative  sm:rounded-lg">
            <div className="flex flex-wrap justify-evenly gap-y-3">
                    {cmsContent.filter(cms => cms.category === "About Us" || cms.category === "Header").map(cms => (
                        <div key={cms.id} className='relative border-2 border-gray-500 rounded-xl text-center shadow-xl min-w-[220px] max-w-[220px] p-2'>
                        <h1 className='mt-2 text-xl text-left font-semibold mb-2'>{cms.title}</h1>

                            <h1 className='mt-5 text-md font-normal mb-2'>
                                <span className='block'>Date Updated:</span>
                                {new Date(cms.updated_at).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                                })}
                            </h1>

                        {/* Render the content as raw HTML, styled like an input */}
                        <div
                            className="w-full max-w-[220px] max-h-[40px] px-2 rounded-lg bg-jaydsBg overflow-hidden text-center text-nowrap"
                            dangerouslySetInnerHTML={{ __html: cms.content }}
                            style={{ border: '1px solid #ddd', padding: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        ></div>
                        
                        <button onClick={() => handleEditCms(cms.id)} className='absolute top-3 right-3 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                            <img src={edit} className='filter invert' alt="Edit" />
                        </button>
                        </div>
                    ))}
                </div>

                {/* Second Row */}
                <div className="grid mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cmsContent.filter(cms => cms.category === "Price").map(cms => (
                        <div key={cms.category} className='relative border-2 border-gray-500 rounded-xl text-center shadow-xl min-w-fit p-4'>
                            <h1 className='mt-2 text-xl font-semibold mb-2'>{cms.title}</h1>
                            <h1 className='mt-5 text-lg font-normal mb-2'><span className='block'>Date Updated:</span> {new Date(cms.updated_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                            </h1>
                            <input
                                type="text"
                                id="disabled-input"
                                value={cms.content}
                                aria-label="disabled input"
                                className="w-full h-12 px-2 rounded-lg bg-jaydsBg overflow-hidden text-center"
                                disabled
                            />
                            <button onClick={() => handleEditCms(cms.id)} className='absolute top-2 right-2 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                                <img src={edit} className='filter invert' alt="Edit" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    {cmsContent.filter(cms => cms.category === "image").map(cms => (
                        <div key={cms.category} className='relative border-2 border-gray-500 rounded-xl w-full flex flex-col items-center text-center justify-center p-4 shadow-xl'>
                            <h1 className='mt-2 text-lg font-semibold mb-2'>{cms.title}</h1>
                            <h1 className='mt-7 text-lg font-normal mb-2'><span className='block'>Date Updated: </span>{new Date(cms.updated_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                            </h1>
                            <div className='w-full h-48 px-2 rounded-lg bg-textgreenColor overflow-hidden'>
                                <img src={cms.content} className='object-contain h-full w-full' alt={cms.title} />
                            </div>
                            <button onClick={() => handleEditCms(cms.id)} className='absolute top-2 right-2 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                                <img src={edit} className='filter invert' alt="Edit" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-10">
                    {cmsContent.filter(cms => cms.category === "contact").map(cms => (
                        
                        <div key={cms.category} className='relative border-2 border-gray-500 rounded-xl w-full flex flex-col items-center justify-center p-4 shadow-xl text-center'>
                            <h1 className='mt-5 text-lg font-semibold mb-2'>{cms.title}</h1>
                            <h1 className='mt-7 text-lg font-normal mb-2'><span className='block'>Date Updated:</span> {new Date(cms.updated_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                            </h1>
                            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" value={cms.content} disabled />
                            <button onClick={() => handleEditCms(cms.id)} className='absolute top-2 right-2 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                                <img src={edit} className='filter invert' alt="Edit" />
                            </button>
                        </div>
                    
                    ))}

                    
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {cmsContent.filter(cms => cms.category === "footer").map(cms => (
                        
                        <div key={cms.category} className='relative border-2 border-gray-500 rounded-xl w-full flex flex-col items-center justify-center p-4 shadow-xl text-center'>
                            <h1 className='mt-5 text-lg font-semibold mb-2'>{cms.title}</h1>
                            <h1 className='mt-7 text-lg font-normal mb-2'><span className='block'>Date Updated:</span> {new Date(cms.updated_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                            </h1>
                            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" value={cms.content} disabled />
                            {cms.title === 'Instagram' ?  <a href='#' className='bg-gradient-to-bl from-pink-600 to-yellow-400 absolute top-2 left-2 px-2 py-1 rounded-full'>
                                <img src={ig} alt="Instagram" /> 
                            </a>
                            : cms.title === 'Facebook' ?  <a href='#' className='bg-blue-600 absolute top-2 left-2 px-2 py-1 rounded-full'>
                                    <img src={fb} alt="Facebook" /> 
                            </a>
                            : cms.title === 'Link' ?  <a href='#' className='bg-blue-600 absolute top-2 left-2 px-2 py-1 rounded-full'>
                                    <img src={links} alt="Link" /> 
                            </a>: null
                            }
                            

                            <button onClick={() => handleEditCms(cms.id)} className='absolute top-2 right-2 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                                <img src={edit} className='filter invert' alt="Edit" />
                            </button>
                        </div>
                    
                    ))}

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                    {cmsContent.filter(cms => cms.category === "Terms").map(cms => (
                        
                        <div key={cms.category} className='relative border-2 border-gray-500 rounded-xl w-full flex flex-col items-center justify-center p-4 shadow-xl text-center'>
                            <h1 className='mt-5 text-lg font-semibold mb-2'>{cms.title}</h1>
                            <h1 className='mt-7 text-lg font-normal mb-2'><span className='block'>Date Updated:</span> {new Date(cms.updated_at).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                            </h1>
                            <input type="text" id="disabled-input" aria-label="disabled input" className="mb-6 bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed" value={cms.content} disabled />

                            <button onClick={() => handleEditCms(cms.id)} className='absolute top-2 right-2 p-1 bg-textgreenColor rounded-lg' title={`Edit ${cms.title}`}>
                                <img src={edit} className='filter invert' alt="Edit" />
                            </button>
                        </div>
                    
                    ))}

                </div>
            </div> 

        </div>
    </div>
  )
}
