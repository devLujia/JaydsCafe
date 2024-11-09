import axios from 'axios';
import React from 'react'

function DeleteModal({closeModal, id}) {

  const handleDelete = async () => {
    if (id) {
      try {
        const res = await axios.post('http://localhost:8081/removeCartItems', { id });
        if (res.data.success === true) {
          closeModal(false);
        }
      } catch (error) {
        console.error('Error removing cart item:', error);
      }
    }
  };


  return (
    <div>
       <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          
          <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-md max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                    {/* <!-- Modal header --> */}
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          Remove Item
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=> closeModal(false)}>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div class="p-4 md:p-5 space-y-4">
                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Are you sure you want to remove this item from your cart?
                        </p>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div class="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" 
                        class="font-medium rounded-lg text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                        onClick={() => closeModal(false)}>
                        Cancel
                    </button>
                    <button type="button"
                        onClick={handleDelete}
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        Delete
                    </button>
                </div>
                </div>
            </div>
          </div>
      
        </div>
    </div>
  )
}

export default DeleteModal
