import React, { useState } from 'react'
import './addprod.css'
import axios from 'axios'


function AddProd({ closeModal }) {

        const [values, setValues] = useState({
                name: '',
                description: '',
                image_url: '',
                category_id: '',
                medprice: '',
                lgprice: ''
        });

        const handleInput = (e) => {
        setValues({ 
                ...values, 
                [e.target.name]: e.target.value 
        });
        };    

        const handleSubmit = (e) => {
                e.preventDefault();
                axios.post('http://localhost:8081/addProduct', values)
                .then(res => {
                    closeModal(false)
                })
                .catch(err => console.error(err));
        }

  return (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
        <div className='bg-white w-[900px] h-[900px] rounded-lg shadow-lg flex flex-col p-6'>
          
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>Add Product</h1>
            <button 
            onClick={()=> closeModal(false)}
            className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
              X
            </button>
          </div>
      
          <div className='flex-1'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor="name" className="flex text-gray-600 text-sm font-bold tracking-wider">Product Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  onChange={handleInput} 
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="Product Name" 
                  required
                />
              </div>                        
              
              <div className="mb-4">
                <label htmlFor="description" className="flex text-gray-600 text-sm font-bold tracking-wider">Description</label>
                <input 
                  type="text" 
                  name="description" 
                  id="description"   
                  onChange={handleInput}                             
                  placeholder="Creamy non coffee drink" 
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  required
                />
              </div>
      
              <div className='mb-4'>
                <label htmlFor="image_url" className="flex text-gray-600 text-sm font-bold tracking-wider">Image URL</label>
                <input 
                  type="text" 
                  name="image_url" 
                  id="image_url"
                  onChange={handleInput}
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="image.png" 
                  required
                />
              </div>
      
              <div className='mb-4'>
                <p className="text-gray-600 text-sm font-bold tracking-wider mb-2">
                  Please choose a category for this product
                </p>
      
                <div className="grid grid-cols-3 gap-4">

                  <select ></select>

                  <div className="flex items-center">
                    <input className="mr-2" type="radio" onChange={handleInput}  id="Coffee" name="category_id" value= '1' />
                    <label className="text-gray-600 text-sm font-bold tracking-wider" htmlFor="Coffee">Coffee</label>
                  </div>
                  <div className="flex items-center">
                    <input className="mr-2" type="radio" onChange={handleInput}  id="Milktea" name="category_id" value='2' />
                    <label className="text-gray-600 text-sm font-bold tracking-wider" htmlFor="Milktea">Milktea</label>
                  </div>
                  <div className="flex items-center">
                    <input className="mr-2" type="radio" onChange={handleInput}  id="Fruit-tea" name="category_id" value='3' />
                    <label className="text-gray-600 text-sm font-bold tracking-wider" htmlFor="Fruit-tea">Fruit</label>
                  </div>
                </div>
      
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center">
                    <input className="mr-2" type="radio" onChange={handleInput}  id="Premium_Cheesecake_Milktea" name="category_id" value='4' />
                    <label className="text-gray-600 text-sm font-bold tracking-wider" htmlFor="Premium_Cheesecake_Milktea">
                      Premium Cheesecake Milktea
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input className="mr-2" type="radio" onChange={handleInput}  id="Non_Coffee" name="category_id" value='5' />
                    <label className="text-gray-600 text-sm font-bold tracking-wider" htmlFor="Non_Coffee">Non Coffee</label>
                  </div>
                </div>
              </div>
      
              <div className='mb-4'>
                <label htmlFor="medprice" className="flex text-gray-600 text-sm font-bold tracking-wider">Medium Price</label>
                <input 
                  type="text" 
                  name="medprice" 
                  onChange={handleInput} 
                  id="medprice"
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="$69" 
                  required
                />
              </div>
      
              <div className='mb-4'>
                <label htmlFor="lgprice" className="flex text-gray-600 text-sm font-bold tracking-wider">Large Price</label>
                <input 
                  type="text" 
                  name="lgprice" 
                  id="lgprice"
                  onChange={handleInput} 
                  className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                  placeholder="$69" 
                  required
                />
              </div>        
      
              <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full">
                Add product
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default AddProd
