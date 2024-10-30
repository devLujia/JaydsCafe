import React, { useEffect, useState } from 'react'
import axios from 'axios'


function AddProd({ closeModal }) {

        const [values, setValues] = useState({
                name: '',
                description: '',
                image_url: null,
                category_id: '',
                sizeName: '',
                price: '',
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
          formData.append('sizeName', values.sizeName);
          formData.append('price', values.price);
          
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
              className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-lg'>
                X
              </button>
            </div>
        
            <div className='flex-1'>
              <form className='flex flex-col' onSubmit={handleSubmit}>

                <div className='grid grid-cols-2 gap-6'>
                  {/* Product Name */}
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
                  
                  {/* categories */}
                  <div className='mb-4'>
                    <p className="text-gray-600 text-sm font-bold tracking-wider">
                      Please choose a category for this product
                    </p>
                    <div>
                    <select
                        id='category_id'
                        name='category_id'
                        value={values.category_id}
                        onChange={handleInput}
                        className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline py-2"
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
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  {/* size name */}
                  <div className='mb-4'>
                    <label for="sizeName" className="flex text-gray-600 text-sm font-bold tracking-wider">Size Name:</label>
                    <input
                      type="text"
                      name="sizeName"
                      onChange={handleInput}
                      id="sizeName"
                      className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Medium"
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  {/* price */}
                  <div className='mb-4'>
                    <label for="price" className="flex text-gray-600 text-sm font-bold tracking-wider">Price :</label>
                    <input
                      type="text"
                      name="price"
                      onChange={handleInput}
                      id="price"
                      className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="$69"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label htmlFor="description" className="flex text-gray-600 text-sm font-bold tracking-wider">Description</label>
                  <textarea 
                    type="text" 
                    name="description" 
                    id="description"   
                    onChange={handleInput} 
                    value={values.description}                            
                    placeholder="Creamy non coffee drink" 
                    className="shadow appearance-none border min-h-fit max-h-80 rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                    required
                  />
                </div>
        
                {/* url */}
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
