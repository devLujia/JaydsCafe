import React, { useEffect, useState } from 'react'
import './addprod.css'
import axios from 'axios'


function AddProd({ closeModal }) {

        const [values, setValues] = useState({
                name: '',
                description: '',
                image_url: null,
                category_id: '',
                medprice: '',
        });

        const [category,setCategory] = useState([])

        const handleInput =  (e) => {
          setValues({ 
                  ...values, 
                  [e.target.name]: e.target.value 
          });
        };

        const handleFileChange = (e) => {
          setValues({
              ...values,
              image_url: e.target.files[0]
          });
      };    

        const handleSubmit = (e) => {
          e.preventDefault();
          
          const formData = new FormData();
      
          formData.append('name', values.name);
          formData.append('description', values.description);
          formData.append('image_url', values.image_url);
          formData.append('category_id', values.category_id);
          formData.append('medprice', values.medprice);
          
          axios.post('http://localhost:8081/addProduct', formData)
          .then(res=>{
            alert("Successfully added!")   
          })

          .catch(err=> console.log(err));

          closeModal(false);
      }
      

        useEffect(()=>{
          
          axios.post('http://localhost:8081/fetchCategory')
          .then(res => {
            setCategory(res.data)
        })

        .catch(err => console.error(err));
        },[])

  return (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white w-[900px] h-fit rounded-lg shadow-lg flex flex-col p-6'>
            
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
                    value={values.name}
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
                    value={values.description}                            
                    placeholder="Creamy non coffee drink" 
                    className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                    required
                  />
                </div>
        
                <div className='mb-4'>
                <label for="image_url" className="flex text-gray-600 text-sm font-bold tracking-wider">Image URL</label>
                <input 
                  type="file" 
                  name="image_url" 
                  id="image_url"
                  onChange={handleFileChange}
                  accept="image/png, image/gif, image/jpeg"
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

                    
                  <select
                      id='category_id'
                      name='category_id'
                      value={values.category_id}
                      onChange={handleInput}
                      className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                      required
                    >
                      <option value="">Select a category</option>
                      {category.map(categories => (
                        <option key={categories.id} value={categories.id}>
                          {categories.title}
                        </option>
                      ))}

                    </select>
                    

                    
                  </div>
                </div>
        
                <div className='mb-4'>
                  <label for="medprice" className="flex text-gray-600 text-sm font-bold tracking-wider">Medium Price</label>
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
