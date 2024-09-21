import React, { useEffect, useState } from 'react'
import trashbin2 from '../../image/trashbin(2).svg'
import trashbin3 from '../../image/trashbin(3).svg'
import settings from '../../image/settings.svg'
import ellipsis from '../../image/ellipsis.svg'
import link from '../../image/Link.svg'
import edit from '../../image/edit.svg'
import plus from '../../image/plus.svg'
import AddProd from '../AdminModal/AddProd/AddProd'
import AddCategory from '../AdminModal/AddCategory/AddCategory'
import RemoveCategory from '../AdminModal/RemoveCategory/RemoveCategory'
import axios from 'axios'
import EditProd from '../AdminModal/EditProd/EditProd'
import EditAddons from '../AdminModal/EditAddons/EditAddons'
import AddAddons from '../AdminModal/AddAddons/AddAddons'
import AddSize from '../AdminModal/AddSize/AddSize'
import hiddenImage from '../../image/hidden.png';
import user from '../../image/UserAcc.svg';
import jaydsLogo from '../../image/jayds cafe Logo.svg';

import { Link, useNavigate } from 'react-router-dom';

function ProductManagement() {

    
    const navigate = useNavigate();
    const [foods,setFoods] = useState([]);
    const [addons,setAddons] = useState([]);
    const [search, setSearch] = useState('');
    const [addonSearch, setAddonSearch] = useState('');

    const [addProductModal,setAddProductModal] = useState(false);
    const [addCategoryModal,setAddCategoryModal] = useState(false);
    const [removeCategoryModal,setRemoveCategoryModal] = useState(false);
    const [editProductModal,setEditProductModal] = useState(false);
    const [editAddonsModal,setEditAddonsModal] = useState(false);
    const [selectedProductId, setProductId] = useState(null);
    const [selectedAddonsId, setAddonsId] = useState(null);
    const [addAddonsModal,setAddAddonsModal] = useState(false);
    const [addSizeModal,setAddSizeModal] = useState(false);

    const toggleAddAddonsModal = () =>{
        setAddAddonsModal(!addAddonsModal)
    }
    const handleAddSize = (id) =>{
        setProductId(id); 
        setAddSizeModal(!addSizeModal)
    }

    const toggleAddCategoryModal = () =>{
        setAddCategoryModal(!addCategoryModal)
    }
    const toggleRemoveCategoryModal = () =>{
        setRemoveCategoryModal(!removeCategoryModal)
    }

    const toggleAddProductModal = () =>{
        setAddProductModal(!addProductModal)
    }
    const handleEditProduct = (id) => {
        setProductId(id); 
        setEditProductModal(!editProductModal);
    };

    const handleEditAddons = (id) => {
        setAddonsId(id); 
        setEditAddonsModal(true);
    };
    
    useEffect(()=>{
        axios.post('http://localhost:8081/productResult')
        .then(response=>{
            setFoods(response.data)
        })
        .catch(error => {
            console.error('Error fetching food details:', error);
        });
    })
    
    useEffect(()=>{
        axios.post('http://localhost:8081/Addons')
        .then(response =>{
            setAddons(response.data)
        })
        .catch(error => {
            console.error('Error fetching addons details:', error);
        });
    },[])


    // useEffect(()=>{
    //             const button = document.querySelector('[data-collapse-toggle="dropdown-example"]');
    //             const dropdown = document.getElementById('dropdown-example');

    //             button.addEventListener('click', () => {
    //             dropdown.classList.toggle('hidden');
    //             });

    //             // Dropdown sa Avatar
    //         const avatarButton = document.getElementById('avatarButton');
    //         const userDropdown = document.getElementById('userDropdown');

    //         avatarButton.addEventListener('click', () => {
    //         userDropdown.classList.toggle('hidden');
    //         });
    // })

    const handleRemoveProduct = (id) => {

        axios.post('http://localhost:8081/removeProduct', { id });
        const updatedFoods = foods.filter((food) => food.id !== id);
        setFoods(updatedFoods);

    }
    
    const handleRemoveAddons = (id) => {

        axios.post('http://localhost:8081/removeAddons', { id });
        const updatedAddons = addons.filter((addon) => addon.id !== id);
        setAddons(updatedAddons);

    }

    

    const handleHide = (id) =>{
        axios.post('http://localhost:8081/hideProduct', {id})
        
    }

  return (

    <div>
        {addAddonsModal && <AddAddons closeModal={setAddAddonsModal}/>}
        {removeCategoryModal && <RemoveCategory closeModal={setRemoveCategoryModal}/>}
        {addCategoryModal && <AddCategory closeModal={setAddCategoryModal}/>}
        {addProductModal && <AddProd closeModal={setAddProductModal}/>}

        {addSizeModal && selectedProductId !== null &&
        (<AddSize closeModal={() => setAddSizeModal(false)} id={selectedProductId}/>
        )} 
        
        {editProductModal && selectedProductId !== null && (
            <EditProd closeModal={() => setEditProductModal(false)} id={selectedProductId} />
        )}
        
        {editAddonsModal && selectedAddonsId !== null && (
            <EditAddons closeModal={() => setEditAddonsModal(false)} id={selectedAddonsId} />
        )}

        {/* <!-- nav --> */}
        <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-betwee">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">Jayd's Cafe</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center">
                <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end">
                    <div class="font-bold">Migz Gomez Go</div>
                    <div class="items-center justify-center">Admin</div>
                </div>

                <img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
            </div>
        </nav>

        <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
            <a href="#" class="flex items-center ps-2.5 mb-5">
                <img src={jaydsLogo} alt="Logo"/>           
                <span class="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2">Jayd's Cafe</span>
            </a>
                <ul class="space-y-2 font-medium">
                    <li> {/* <!-- Dashboard --> */}
                    <Link to="/dashboard">
                        <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                            <svg class="w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span class="ms-3">Dashboard</span>
                        </a>
                    </Link>
                    </li>
                    <li> {/* <!-- Order Management --> */}
                        <a href="/Order" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        <span class="ms-3">Order</span>
                        </a>
                    </li>
                    <li> {/* <!-- Product Management --> */}
                    <a href="#" class="flex items-center p-2 rounded-lg bg-greenColor group text-white">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                        </a>
                    </li>
                    <li> {/* <!-- Sales Report --> */}
                    <a href="/public/Html_Admin/paymentManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg dark:text-white hover:bg-greenColor  group hover:text-white">
                    <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Sales Report</span>
                    </a>
                    </li>
                    <li> {/* <!-- Customer Account --> */}
                        <a href="/public/Html_Admin/customerManagement.html" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Customer Account</span>
                        </a>
                    </li>
                    <li> {/* <!-- Content Management --> */}
                    <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                    </a>
                    </li>
                    <li> {/* <!-- Inbox --> */}
                    <a href="/Message" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                        <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                    </a>
                    </li>
                </ul>
        
                <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                <li> {/* <!-- Settings --> */}
                  <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                  <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                  </svg>
                     <span class="ms-1">Settings</span>
                  </a>
               </li>
                <li>{/* <!-- Sign Out --> */}
                    <a href="/public/Html_Admin/adminLogin.html" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor  group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span class="ms-3">Sign Out</span>
                    </a>
                </li>
            </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
        </aside>
        
        <div class="p-4 sm:ml-72 bg-slate-100">
  <div class="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl"> 
    <div class="flex items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900 rounded-t-xl">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text"
         id="table-search-users" 
         style={{ textTransform: 'uppercase' }} 
         onChange={(e)=> setSearch(e.target.value)}
         class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Product" />
      </div>
      <button onClick={()=>toggleAddProductModal()} type="button" class="ml-auto text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
        <img src={plus} alt="Plus_Product" class="me-2 md:block" />
        <span class="md:block hidden"> Add Product </span>
      </button>

    </div>

    <div class="bg-white rounded-b-xl">
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-wider">Products</h1>
      </div>

      <div id="mt-series" class="w-full max-w-7xl mx-auto mt-4">
        <div class="container mx-auto p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
  
            {foods
              .filter((food) => {
                return search.toLowerCase() === '' ? food : food.name.toLowerCase().includes(search);
              })
              .map((food) => (
                <div key={food.id} class="rounded-lg p-3 shadow-2xl relative outline outline-gray-500 hover:scale-95 duration-300 hover:bg-jaydsBg">
                  <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                    <img src={food.image_url} alt="Milk Tea" class="w-full h-full object-contain" />
                  </div>

                  <div class="text-center">
                    <h3 class="text-auto font-semibold mt-4 min-h-15">{food.name}</h3>
                    <p class="text-md font-normal mt-1"><span class="text-xl font-semibold mt-1">Sizes: </span>{food.medsize}  {food.lgsize ? '/ ' + food.lgsize : ''}                    </p>
                    <p class="text-md font-normal mt-1"><span class="text-xl font-semibold mt-1">Price: </span>₱ {food.medprice}.00{food.lgsize ? '/₱ ' + food.lgprice +'.00': ''}</p>
                  </div>

                  <div class="flex justify-center mt-4 space-x-2">
                    <button 
                    onClick={() => handleEditProduct(food.id)}
                    class="hover:scale-110 duration-300">
                      <img src={edit} alt="edit" class="brightness-0 w-10 h-10"/>
                    </button>

                    <button
                    onClick={() => handleRemoveProduct(food.id)}
                     class="hover:scale-110 duration-300">
                      <img src={trashbin2}  alt="delete" class="brightness-0 w-12 h-12" />
                    </button>

                    <button
                    onClick={() => handleAddSize(food.id)}
                     class="hover:scale-110 duration-300">
                      <img src={plus} className='filter invert w-12 h-12' alt="Add size" />
                  </button>
                  
                  <button
                    onClick={() => handleHide(food.id)}
                     class="hover:scale-110 duration-300">
                      <img src={hiddenImage} alt="hide" class="w-10 h-10" />
                  </button>
                  </div>

                  
                  

                </div>
              ))}

            {/* <!-- end grid --> */}
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end mt-series --> */}
      </div> 
      
      {/* <!-- end bg-white --> */}
    </div> 
  </div>

  <div class="relative shadow-xl sm:rounded-lg mt-20 mx-auto w-full max-w-7xl"> 
    <div class="flex items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900 rounded-t-xl">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="text"
         id="table-search-users" 
         style={{ textTransform: 'uppercase' }} 
         onChange={(e)=> setAddonSearch(e.target.value)}
         class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Addons" />
      </div>
      <button onClick={()=>toggleAddAddonsModal()} type="button" class="ml-auto text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
        <img src={plus} alt="Plus_Product" class="me-2 md:block" />
        <span class="md:block hidden"> Add Addons </span>
      </button>

    </div>

    <div class="bg-white rounded-b-xl mb-20">
      <div class="text-center">
        <h1 class="text-5xl font-semibold tracking-wider">Addons</h1>
      </div>

      <div id="mt-series" class="w-full max-w-7xl mx-auto mt-4">
        <div class="container mx-auto p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
  
            {addons
            .filter(addon => {
                return addon.name.toLowerCase().includes(addonSearch.toLowerCase());
              })
              .map(addon=> (
                <div key={addon.id} class="rounded-lg p-3 shadow-2xl relative outline outline-gray-500 hover:scale-95 duration-300 hover:bg-jaydsBg">
                  {/* <div class="rounded-full bg-menuCirclebg p-4 aspect-square">
                    <img src={addon.image_url} alt={addon.image_url} class="w-full h-full object-contain" />
                  </div> */}

                  <div class="text-center">
                    <h3 class="text-xl font-semibold mt-4 min-h-15">{addon.name}</h3>
                    <p class="text-md font-normal mt-1"><span class="text-xl font-semibold mt-1">Price: </span> ₱ {addon.price}</p>
                    {/* <p class="text-md font-normal mt-1"><span class="text-xl font-semibold mt-1">Price: </span>₱ {addon.medprice}.00{food.lgsize ? '/₱ ' + food.lgprice +'.00': ''}</p> */}
                  </div>

                  <div class="flex justify-center mt-4 space-x-2">
                    <button 
                    onClick={() => handleEditAddons(addon.id)}
                    class="hover:scale-110 duration-300">
                      <img src={edit} alt="edit" class="w-10 h-10" />
                    </button>

                    <button
                    onClick={() => handleRemoveProduct(addon.id)}
                     class="hover:scale-110 duration-300">
                      <img src={trashbin2} alt="delete" class="w-10 h-10" />
                    </button>
                  
                  {/* <button
                    onClick={() => handleHide(food.id)}
                     class="hover:scale-110 duration-300">
                      <img src={hiddenImage} alt="hide" class="w-10 h-10" />
                  </button>
                   */}
                   </div>

                  
                  

                </div>
              ))}

            {/* <!-- end grid --> */}
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end mt-series --> */}
      </div> 
      
      {/* <!-- end bg-white --> */}
    </div> 
  </div>
</div>

        {/* Eto yung bagong design sa Product management, Cards na siya */}
        
    </div>
  )
}
export default ProductManagement