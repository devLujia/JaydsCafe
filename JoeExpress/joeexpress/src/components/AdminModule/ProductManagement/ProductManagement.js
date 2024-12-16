import React, { useEffect, useState } from 'react'
import trashbin2 from '../../image/trashbin(2).svg'
import notif from '../../image/notif.svg'
import edit from '../../image/edit.svg'
import plus from '../../image/plus.svg'
import AddProd from '../AdminModal/AddProd/AddProd'
import AddCategory from '../AdminModal/AddCategory/AddCategory'
import AddDiscount from '../AdminModal/AddDiscount/AddDiscount'
import RemoveCategory from '../AdminModal/RemoveCategory/RemoveCategory'
import RemoveProduct from '../AdminModal/RemoveProduct/RemoveProduct'
import axios from 'axios'
import EditProd from '../AdminModal/EditProd/EditProd'
import EditAddons from '../AdminModal/EditAddons/EditAddons'
import AddAddons from '../AdminModal/AddAddons/AddAddons'
import AddSize from '../AdminModal/AddSize/AddSize'
import hiddenImage from '../../image/hidden.png';
import user from '../../image/UserAcc.svg';
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import Confirm from '../AdminModal/Alerts/Confirm'
import Error from '../AdminModal/Alerts/Error'

import { Link, useNavigate } from 'react-router-dom';

function ProductManagement() {

    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();
    const [foods,setFoods] = useState([]);
    const [addons,setAddons] = useState([]);
    const [categories,setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [addonSearch, setAddonSearch] = useState('');
    const [role, setRole] = useState(null);
    

    const [discounts, setDiscounts]= useState([])
    const [addDiscountModal,setAddDiscountModal] = useState(false)
    const [addProductModal,setAddProductModal] = useState(false);
    const [addCategoryModal,setAddCategoryModal] = useState(false);
    const [removeCategoryModal,setRemoveCategoryModal] = useState(false);
    const [removeProductModal,setRemoveProductModal] = useState(false);
    const [editProductModal,setEditProductModal] = useState(false);
    const [editAddonsModal,setEditAddonsModal] = useState(false);
    // const [editCategoryModal,setEditCategoryModal] = useState(false);
    const [selectedProductId, setProductId] = useState(null);
    const [selectedRemoveableProductId, setRemoveableProductId] = useState(null);
    const [selectedValue, setSelectedValue] = useState('Product');
    const [selectedAddonsId, setAddonsId] = useState(null);
    // const [selectedCategoryId, setCategoryId] = useState(null);
    
    const [isOpen, setIsOpen] = useState(false);
    const [addAddonsModal,setAddAddonsModal] = useState(false);
    const [addSizeModal,setAddSizeModal] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [profile, setProfile] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [tier1,setTier1] = useState([])
    const [tier2,setTier2] = useState([])
    const [tier3,setTier3] = useState([])
    const [tier,setTier] = useState([])
    const [cmsName,setCmsName] = useState('');
    
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
  }, []);

    axios.defaults.withCredentials = true;

    const handleSelectChange = (event) => {
      setSelectedValue(event.target.value);
    };

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

    const toggleRemoveProductModal = (id) =>{
      setProductId(id); 
      setRemoveProductModal(!removeProductModal);
    }

    const toggleAddProductModal = () =>{
        setAddProductModal(!addProductModal)
    }
    const toggleAddDiscountModal = () =>{
        setAddDiscountModal(!addDiscountModal)
    }
    const handleEditProduct = (id) => {
        setProductId(id); 
        setEditProductModal(!editProductModal);
    };

    const handleEditAddons = (id) => {
        setAddonsId(id); 
        setEditAddonsModal(true);
    };
    
    // const handleEditCategory = (id) => {
    //     setAddonsId(id); 
    //     setEditAddonsModal(true);
    // };

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

    const [isOpenDiscount, setIsOpenDiscount] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdownDiscount = () => {
      setIsOpenDiscount(!isOpenDiscount);
    };

    useEffect(() => {
      axios.post('https://jaydscafe.com/api/roleSetup')
        .then(response => {
          setTier(response.data);  // Set the response data to the state
        })
        .catch(error => {
          console.error('Error fetching food details:', error);  // Error handling
        });
    }, []);  // Empty dependency array ensures the effect runs only once when the component mounts
    

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('https://jaydscafe.com/api/productResult');
          setFoods(response.data);
        } catch (error) {
          console.error('Error fetching food details:', error);
        }
      };
    
      fetchData();
    }, [addProductModal, removeProductModal, editProductModal]);
    
    
    useEffect(() => {
      const fetchSizes = async () => {
          try {
              const updatedSizes = {};
  
              for (const food of foods) {
                  const response = await axios.post('https://jaydscafe.com/api/sizes', { foodId: food?.id });
                  updatedSizes[food?.id] = response.data;
              }
  
              setSizes(prevSizes => ({
                  ...prevSizes,
                  ...updatedSizes
              }));
              
          } catch (error) {
              console.error('Error fetching food details:', error);
          }
      };
  
      if (foods.length > 0) {
          fetchSizes();
      }
  }, [foods]);

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
    const fetchAddons = async () => {
      try {
        const response = await axios.post('https://jaydscafe.com/api/AdminAddons');
        setAddons(response.data);
      } catch (error) {
        console.error('Error fetching addons details:', error);
      }
    };
  
    fetchAddons();
  }, [addAddonsModal, editAddonsModal]);
  
    
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post('https://jaydscafe.com/api/fetchCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };
  
    fetchCategory();
  }, [addCategoryModal]);
  

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
        const fetchProfile = async () => {
          try {
            const response = await axios.post('https://jaydscafe.com/api/profile', { userId });
            setProfile(response.data);
          } catch (error) {
            console.error('Error fetching profile details:', error);
          }
        };
      
        if (userId) {
          fetchProfile()
        };
        
      }, [userId]);
      

    useEffect(() => {
      const fetchDiscounts = async () => {
          try {
              const response = await axios.get('https://jaydscafe.com/api/fetchDiscount');
              setDiscounts(response.data);
          } catch (error) {
              console.error('Error fetching discount codes:', error);
              alert('Failed to fetch discount codes. Please try again later.'); // User-friendly message
          }
      };
  
      fetchDiscounts();
  }, [addDiscountModal]);
  
  
      const removeDiscount = async (id) => {
        if (window.confirm('Are you sure you want to delete this discount code?')) {
          try {
            console.log(id);
            const response = await axios.delete(`https://jaydscafe.com/api/removeDiscount/${id}`);
            alert(response.data.message);
            setDiscounts((prevDiscounts) => prevDiscounts.filter(discount => discount.id !== id));
          } catch (error) {
            if (error.response) {
              alert(error.response.data.error); // Show error message from the backend
            } else {
              console.error("Error deleting discount:", error);
              alert('An error occurred while deleting the discount code.');
            }
          }
        } // Closing bracket for the if statement
      };
 

      const handleRemoveProduct = async (id) => {
        try {
            await axios.post('https://jaydscafe.com/api/removeProduct', { id });
            const updatedFoods = foods.filter((food) => food?.id !== id);
            setFoods(updatedFoods);
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };
    
    const handleRemoveAddons = async (id) => {
      try {
          const res = await axios.post('https://jaydscafe.com/api/removeAddons', { id });
          
          if (res.data.Success) {
              const updatedAddons = addons.filter((addon) => addon.id !== id);
              setAddons(updatedAddons);
          }
      } catch (error) {
          console.error("Error removing addon:", error);
      }
    };
  
    
    const handleRemoveCategory = async (id) => {

      if (foods.some(food => food?.category_id === id)) {
        alert("Unable to remove: 'Category is set on product, delete product first'")
        return;
      }

      try {
        const res = await axios.post('https://jaydscafe.com/api/removeCategory', { id });
        
        if (res.data.success) {
          const updatedCategory = categories.filter((category) => category.id !== id);
          setCategories(updatedCategory);
        }

      } 
        catch (error) {
        console.error("Error removing addon:", error);
      }
        
    }

    const handleHide = async (id) => {
      try {
          const result = await axios.post('https://jaydscafe.com/api/hideProduct', { id });
          if (result.data.success) {
              alert(result.data.message);
              setFoods((prevFoods) =>
                  prevFoods.map((food) =>
                      food?.id === id ? { ...food, visible: food?.visible === 1 ? 0 : 1 } : food
                  )
              );
          }
      } catch (error) {
          console.error('Error hiding the product:', error);
      }
  };
  
  const handleHideAddons = async (id) => {
    try {
        const result = await axios.post('https://jaydscafe.com/api/setAddonsVisibility', { id });
        if (result.data.success) {
            alert(`Update successfully`);
            setAddons((prevAddons) =>
                prevAddons.map((addon) =>
                    addon.id === id ? { ...addon, visible: addon.visible === 1 ? 0 : 1 } : addon
                )
            );
        }
    } catch (error) {
        console.error('Error updating addon visibility:', error);
    }
};

    
      //pagination 
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 8;
    
      // Filter and paginate foods based on addonSearch
      const filteredFoods = foods.filter((food) =>
        food?.name.toLowerCase().includes(addonSearch.toLowerCase())
      );
    
      const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    
      const currentItems= filteredFoods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      // Handle pagination control clicks
      const goToPage = (page) => {
        setCurrentPage(page);
      };

      function stripHtmlTags(html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          return doc.body.textContent || "";
        }

  return (

    <div>

        {showConfirm && (
          <Confirm
            message="Unable to remove: 'Category is set on product, delete product first'"
            type="error"
          />
        )}
        {addAddonsModal && <AddAddons closeModal={setAddAddonsModal}/>}
        {addDiscountModal && <AddDiscount closeModal={setAddDiscountModal}/>}
        
        {/* {removeCategoryModal && <RemoveCategory closeModal={setRemoveCategoryModal}/>} */}
        {/* {removeProductModal && <RemoveProduct closeModal={setRemoveProductModal}/>} */}
        {addCategoryModal && <AddCategory closeModal={setAddCategoryModal}/>}
        {addProductModal && <AddProd closeModal={setAddProductModal}/>}

        {addSizeModal && selectedProductId !== null &&
        (<AddSize closeModal={() => setAddSizeModal(false)} id={selectedProductId}/>
        )}

        {removeProductModal && selectedProductId !== null &&
        (<RemoveProduct closeModal={() => setRemoveProductModal(false)} id={selectedProductId}/>
        )} 
        
        {editProductModal && selectedProductId !== null && (
            <EditProd closeModal={() => setEditProductModal(false)} id={selectedProductId} />
        )}
        
        {editAddonsModal && selectedAddonsId !== null && (
            <EditAddons closeModal={() => setEditAddonsModal(false)} id={selectedAddonsId} />
        )}

        {/* {editCategoryModal && selectedCategoryId !== null && (
            <EditCategory closeModal={() => setEditCategoryModal(false)} id={selectedProductId} />
        )} */}

        {/* <!-- nav --> */}
        <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-between dark:bg-[#282828]">
            <div class="font-extrabold text-2xl flex items-center">
                {/* <!-- Logo/Title in Navbar --> */}
                <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">{stripHtmlTags(cmsName)}</a>
            </div>
            <div></div>
            {/* <!-- Button for Login or Sign Up --> */}
            <div class="flex justify-end items-center">
                <button className='rounded-full p-2 bg-white border border-gray-400'>
                    <img src={notif} title='Notification'></img>
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



               {tier3.includes(profile?.role|| 0) ? <li> {/* <!-- Dashboard --> */}
               <li> {/* <!-- Dashboard --> */}
                    <Link to="/dashboard">
                        <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                            <svg class="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                            </svg>
                            <span class="ms-3">Dashboard</span>
                        </a>
                    </Link>
                    </li>
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
                    <a href="#" class="flex items-center p-2 rounded-lg bg-greenColor group text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                        </a>
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
                  </li>
               </>
               :
               ''}

            </ul>
            <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
          {tier3.includes(profile?.role|| 0) || tier2.includes(profile?.role|| 0) || tier1.includes(profile?.role|| 0)?
          
                <li> {/* <!-- Inbox --> */}
                    <a href="/Message" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                        <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                        </a>
                </li>
               : null
               }
   
                <li> {/* <!-- Settings --> */}
                    <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                    <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                    </svg>
                      <span class="ms-1">Settings</span>
                    </a>
                </li>

                <li onClick={handleLogout}> {/* <!-- Sign Out --> */}
                    <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
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
        
        <div className="p-4 sm:ml-72 bg-slate-100 hidden sm:block">
          <div className="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl">
            <div className="flex items-center flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900 rounded-t-xl">

              <div className="ms-2 text-md">
                <select 
                  id="select" 
                  name="select" 
                  value={selectedValue} 
                  onChange={handleSelectChange} 
                  className="rounded-lg px-3 py-2 w-40 ps-2 border-2 border-slate-400"
                >
                  <option value="Product">Product</option>
                  <option value="Addons">Addons</option>
                  <option value="Category">Category</option>
                  <option value="Discount">Discount</option>
                </select>
              </div>

              <div className="relative">
                    <div className="absolute inset-y-0 ml-5 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input 
                      type="text"
                      id="table-search-users" 
                      style={{ textTransform: 'uppercase' }} 
                      onChange={(e) => setAddonSearch(e.target.value)}
                      className="block p-2 ps-10 text-sm ml-5 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="Search" 
                    />
              </div>

              {selectedValue === 'Product' ? (
          <button 
            onClick={toggleAddProductModal} 
            type="button" 
            className="ml-auto text-white bg-textgreenColor hover:bg-green-900 focus:ring-2 focus:outline-none focus:ring-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <img src={plus} alt="Plus_Product" className="me-2 md:block" />
            <span className="md:block hidden"> Add Product </span>
          </button>
        ) : selectedValue === 'Addons' ? (
          <button 
            onClick={toggleAddAddonsModal} 
            type="button" 
            className="ml-auto text-white bg-textgreenColor hover:bg-green-900 focus:ring-2 focus:outline-none focus:ring-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <img src={plus} alt="Plus_Addons" className="me-2 md:block" />
            <span className="md:block hidden"> Add Addons </span>
          </button>
        ) : selectedValue === 'Category' ? (
          <button 
            onClick={toggleAddCategoryModal} // Assuming you meant to toggle a category modal
            type="button" 
            className="ml-auto text-white bg-textgreenColor hover:bg-green-900 focus:ring-2 focus:outline-none focus:ring-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <img src={plus} alt="Plus_Category" className="me-2 md:block" />
            <span className="md:block hidden"> Add Category </span>
          </button>
        ) : selectedValue === 'Discount' ? (
          <button 
            onClick={toggleAddDiscountModal} 
            type="button" 
            className="ml-auto text-white bg-textgreenColor hover:bg-green-900 focus:ring-2 focus:outline-none focus:ring-green-600 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <img src={plus} alt="Plus_Product" className="me-2 md:block" />
            <span className="md:block hidden"> Add Discount </span>
          </button>
        ) :null}

            
            </div>

            {selectedValue === 'Product' ? (
              <div className="bg-white rounded-b-xl ">
                <div className="text-center">
                  <h1 className="text-5xl font-semibold tracking-wider">Products</h1>
                </div>

{/* dito */}
                <div id="mt-series" className="w-full max-w-7xl mx-auto mt-4">
                  <div className="container mx-auto p-4">
                    
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                        
                          {currentItems?.map((food) => (
                            <div key={food?.id} className="rounded-3xl p-3 shadow-2xl relative border-2 border-gray-300 hover:scale-95 duration-300 hover:bg-jaydsBg">
                              <div className="visibility-status">
                                  {food?.visible === 1 ? (
                                      <span className="text-green-500 font-semibold">Visible</span>
                                  ) : (
                                      <span className="text-red-500 font-semibold">Hidden</span>
                                  )}
                              </div>
                              
                              <div className="rounded-full bg-slate-200 p-4 aspect-square overflow-hidden items-center flex justify-center w-4/5 mx-auto">
                                <img src={food?.image_url} alt="Milk Tea" className="w-full h-full object-contain" />
                              </div>

                              <div className="text-center">
                                <h3 className="text-auto font-bold mt-4 min-h-15">{food?.name}</h3>

                                
                                {sizes[food?.id]?.map(size =>(
                                  <React.Fragment key={size?.id}>
                                  <p className="text-auto text-sm font-semibold mt-1 text-gray-500">
                                  Size:
                                  <span className="text-auto font-normal mt-1"> {size?.size.toUpperCase()} (₱ {size?.price}.00)</span>
                                  </p>
                                  <p className="text-auto font-normal mt-1">
                                  
                                </p>
                                </React.Fragment>
                                  
                              ))}
                              </div>

                              <div className="flex justify-center mt-4 space-x-2 flex-wrap">
                                <button onClick={() => handleEditProduct(food?.id)} className="hover:scale-110 duration-300" title='Edit Product'>
                                  <img src={edit} alt="edit" className="brightness-0 w-10 h-10" />
                                </button>
                                
                                {/* Need lagyan ng confirmation */}
                                {/*             {(event) => handleRemoveProduct(food?.id)} */}
                                <button onClick={() => toggleRemoveProductModal(food?.id)} className="hover:scale-110 duration-300" title='Delete'>
                                  <img src={trashbin2} alt="delete" className="brightness-0 w-12 h-12" />
                                </button>

                                <button onClick={() => handleAddSize(food?.id)} className="hover:scale-110 duration-300" title='Add Size'>
                                  <img src={plus} className="filter invert w-12 h-12" alt="Add size" />
                                </button>

                                <button onClick={() => handleHide(food?.id)} className="hover:scale-110 duration-300" title='Hide'>
                                  <img src={hiddenImage} alt="hide" className="w-10 h-10" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                  </div>
                  
               {/* Pagination Controls */}
              <div className="flex justify-center mt-6 pb-6">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`px-3 py-1 mx-1 rounded-lg ${
                      currentPage === index + 1
                        ? 'bg-greenColor text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 mx-1 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
                >
                  Next
                </button>
              </div>
                  
                </div>
              </div>
            ) : selectedValue === 'Addons' ? (
              <div className="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl">
                
                <div className="bg-white rounded-b-xl mb-20">
                  <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-wider">Addons</h1>
                  </div>

                  <div id="mt-series" className="w-full max-w-7xl mx-auto mt-4">
                    <div className="container mx-auto p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                        {addons
                          .filter(addon => addon.name.toLowerCase().includes(addonSearch.toLowerCase()))
                          .map(addon => (
                            <div key={addon.id} className="rounded-lg p-3 shadow-2xl relative outline outline-gray-500 hover:scale-95 duration-300 hover:bg-jaydsBg">
                              <div className="text-center">
                              <div className="visibility-status">
                                  {addon.visible === 1 ? (
                                      <span className="text-green-500 font-semibold">Visible</span>
                                  ) : (
                                      <span className="text-red-500 font-semibold">Hidden</span>
                                  )}
                              </div>
                                <h3 className="text-xl font-semibold mt-4 min-h-15">{addon.name}</h3>
                                <h3 className="text-md font-light min-h-4">({addon.category})</h3>
                                <p className="text-md font-normal mt-1">
                                  <span className="text-xl font-semibold mt-1">Price: </span> ₱ {addon.price}.00
                                </p>
                              </div>

                              <div className="flex justify-center mt-4 space-x-2">
                                <button onClick={() => handleEditAddons(addon.id)} 
                                className="hover:scale-110 duration-300" 
                                title='Edit Addons'>
                                  <img src={edit} alt="edit" className="w-10 h-10" />
                                </button>

                        <button
                          onClick={() => handleRemoveAddons(addon.id)}
                          className="hover:scale-110 duration-300"
                          title='Delete'
                        >
                          <img src={trashbin2} alt="delete" className="w-12 h-12" />
                        </button>

                                <button 
                                  onClick={() => handleHideAddons(addon.id)}
                                  className="hover:scale-110 duration-300" 
                                  title='Hide Addons'
                                >
                                  <img src={hiddenImage} alt="hide" className="w-10 h-10" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedValue === 'Discount' ? (
              <div className="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl">
                
                
                <div class="overflow-x-auto">
  <table class="min-w-full bg-white border border-gray-300">
    <thead>
      <tr class="bg-gray-200 text-gray-700">
        <th class="py-2 px-4 border">Discount Code</th>
        <th class="py-2 px-4 border">Discount Type</th>
        <th class="py-2 px-4 border">Discount Value</th>
        <th class="py-2 px-4 border">Min Order Value</th>
        <th class="py-2 px-4 border">Max Discount Value</th>
        <th class="py-2 px-4 border">Usage Limit</th>
        <th class="py-2 px-4 border">Times used</th>
        <th class="py-2 px-4 border">Valid from</th>
        <th class="py-2 px-4 border">Valid until</th>    
        <th class="py-2 px-4 border">Created at</th>
        {/* <th class="py-2 px-4 border">Updated at</th> */}
        <th class="py-2 px-4 border">Action</th>
        <th class="py-2 px-4 border">Is Active</th>
      </tr>
    </thead>
    <tbody>
     
      {discounts.map(disc =>(
        
        
        <tr key={disc.id} class="hover:bg-gray-100">
        <td class="py-2 px-4 border">{disc.code}</td>
        <td class="py-2 px-4 border">{disc.discount_type}</td>
        <td class="py-2 px-4 border">{disc.discount_value}%</td>
        <td class="py-2 px-4 border">₱ {disc.min_order_value}.00</td>
        <td class="py-2 px-4 border">₱ {disc.max_discount_value}.00</td>
        <td class="py-2 px-4 border">{disc.usage_limit}</td>
        <td class="py-2 px-4 border">{disc.times_used}</td>
        <td class="py-2 px-4 border">
          {new Date(disc.valid_from).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </td>
        <td class="py-2 px-4 border">
          {new Date(disc.valid_until).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </td>
        {/* <td class="py-2 px-4 border">{disc.update}</td> */}
        <td class="py-2 px-4 border">
          {new Date(disc.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })}
        </td>
        <td class="py-2 px-4 border">{disc.is_active === 1 ? "True": "False" }</td>
        <td class="py-2 px-4 border">
          <button class="bg-blue-500 text-white rounded px-2 py-1">Edit</button>
          <button onClick={()=>removeDiscount(disc.id)} class="bg-red-500 text-white rounded px-2 py-1">Delete</button>
        </td>
        
      </tr>
    
    
    ))}
      
    </tbody>
  </table>
</div>


              </div>
            ) :  (
              <div className="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl">
                <div className="bg-white rounded-b-xl mb-20">
                  <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-wider">Categories</h1>
                  </div>

                  <div id="mt-series" className="w-full max-w-7xl mx-auto mt-4">
                    <div className="container mx-auto p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
                        {categories
                          .filter(category => category.title.toLowerCase().includes(addonSearch.toLowerCase()))
                          .map(category => (
                            <div key={category.id} className="rounded-lg p-3 shadow-2xl relative outline outline-gray-500 hover:scale-95 duration-300 hover:bg-jaydsBg">
                              <div className="text-center">
                                <h3 className="text-xl font-semibold mt-4 min-h-15">{category.title}</h3>
                              </div>

                      <div className="flex justify-center mt-4 space-x-2">
                        {/* <button 
                          onClick={() => handleEditCategory(category.id)}
                          className="hover:scale-110 duration-300"
                        >
                          <img src={edit} alt="edit" className="w-10 h-10" />
                        </button> */}

                        <button
                          onClick={() => handleRemoveCategory(category.id)}
                          className="hover:scale-110 duration-300"
                        >
                          <img src={trashbin2} alt="delete" className="w-12 h-12" />
                        </button>
                        
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}



  </div>
</div>

        
    </div>
  )
}
export default ProductManagement