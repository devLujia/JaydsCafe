import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditProd({closeModal, id}) {


        const [sizes, setSizes] = useState([]);
        const [values, setValues] = useState({

            name: '',
            description: '',
            image_url: null,
            category_id: '',
            foodId: '',
            sizes:[]

        });

        const [addons,setAddons] = useState([])

        useEffect(()=>{
          
          axios.post('http://localhost:8081/addons')
          .then(res => {
            setAddons(res.data)
        })

        },[])

        const [category,setCategory] = useState([])

        useEffect(() => {
          if (id) {
              setValues(prevValues => ({ ...prevValues, foodId: id }));
              axios.post('http://localhost:8081/fetchProduct', { id })
                  .then(result => {
                      setValues(prevValues => ({
                          ...prevValues,
                          ...result.data
                      }));
                  })
                  .catch(err => console.error(err));
          }
        }, [id]);

      useEffect(()=>{
          
        axios.post('http://localhost:8081/fetchCategory')
        .then(res => {
          setCategory(res.data)
      })



      .catch(err => console.error(err));
      },[])

      const handleInput = (e) => {
        const { name, type, files, value, id } = e.target;
    
        if (type === 'file' && files.length > 0) {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: files[0]
            }));
        } 
        else if (name === 'size') {
            // Update price for specific size
            const updatedSizes = sizes.map((sizeObj) => 
                sizeObj.size === id ? { ...sizeObj, price: value } : sizeObj
            );
    
            setSizes(updatedSizes);  // Update the sizes state
            setValues((prevValues) => ({ 
                ...prevValues, 
                sizes: updatedSizes // Reflect changes in values if necessary
            }));
        } 
        else {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
    };
    
        

    useEffect(() => {
      
      axios.post('http://localhost:8081/sizes', { foodId: id })
        .then(response => {
          
          const formattedSizes = response.data.map(size => ({
            size: size.size,
            price: size.price
          }));
    
          setSizes(formattedSizes);
        })
        .catch(error => {
          console.error('Error fetching food details:', error);
        });
    }, [id]);

    

        const handleSubmit = (e) => {
                e.preventDefault();

                if(!values.name || !values.description || !values.image_url || !values.category_id || !values.foodId || !values.sizes || !Array.isArray(values.sizes) || values.sizes.length === 0){
                  if (!values.name) {
                    alert("Name is required.");
                    return;
                  }
                  if (!values.description) {
                    alert("Description is required.");
                    return;
                  }
                  if (!values.image_url) {
                    alert("Image URL is required.");
                    return;
                  }
                  if (!values.category_id) {
                    alert("Category ID is required.");
                    return;
                  }
                  if (!values.foodId) {
                    alert("Food ID is required.");
                    return;
                  }
                  if (!values.sizes || !Array.isArray(values.sizes) || values.sizes.length === 0) {
                    alert("At least one size must be provided.");
                    return;
                  }
                }

                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('description', values.description);
                formData.append('image_url', values.image_url);
                formData.append('category_id', values.category_id);
                formData.append('foodId', values.foodId);
                formData.append('sizes', JSON.stringify(values.sizes));
                
                axios.post('http://localhost:8081/updateProduct', formData)
                .then(res => {
                  
                  if(res.data.success === true){
                    alert('Product updated successfully');
                    closeModal(false);
                  }
                  else {
                    alert('Failed to update product');
                  }
                  
                })
                .catch(err=> console.log(err));
           
        };


  return (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white w-[900px] h-auto rounded-lg shadow-lg p-6'>
            
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-xl font-bold'>Edit Product</h1>
              <button 
              onClick={()=> closeModal(false)}
              className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-lg'>
                X
              </button>
            </div>
        
            <div className='flex-1'>
              <form className='' onSubmit={handleSubmit}>

                <div className='grid grid-cols-2 gap-6'>
                  {/* product name */}
                  <div className='mb-4'>
                    <label htmlFor="name" className="flex text-gray-600 text-sm font-bold tracking-wider">Product Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleInput}
                      className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Product Name"
                      required/>
                  </div>
                  
                  {/* category */}
                  <div className='mb-4'>
                    <p className="text-gray-600 text-sm font-bold tracking-wider">
                      Please choose a category for this product
                    </p>
                    <div className="">
                      <select
                            id='category_id'
                            name='category_id'
                            value={values.category_id}
                            onChange={handleInput}
                            className="shadow appearance-none border rounded w-full py-2 ps-2 text-gray-700 focus:outline-none focus:shadow-outline"
                            required >
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
                  {/* medium price */}
                  {sizes.map(({ size, price }) => (
                      <div key={size} className='mb-4'>
                          <label htmlFor={size} className="flex text-gray-600 text-sm font-bold tracking-wider">{size}</label>
                          <input
                              type="text"
                              name="size"
                              value={price} // Bind price from the sizes array
                              onChange={handleInput} // This will call handleInput correctly
                              id={size} // id matches the size
                              className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                              placeholder="$69"
                              required
                          />
                      </div>
                  ))}
                  {/* large price */}
                  {/* <div className='mb-4'>
                    <label htmlFor="lgprice" className="flex text-gray-600 text-sm font-bold tracking-wider">Large Price</label>
                    <input
                      type="text"
                      name="lgprice"
                      id="lgprice"
                      value={values.lgprice}
                      onChange={handleInput}
                      className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="$69"
                      required
                    />
                  </div> */}
                </div>                     
                
                {/* description */}
                <div className="mb-4">
                  <label htmlFor="description" className="flex text-gray-600 text-sm font-bold tracking-wider">Description</label>
                  <textarea 
                    type="text" 
                    name="description" 
                    id="description"
                    value={values.description}     
                    onChange={handleInput}                     
                    placeholder="Creamy non coffee drink" 
                    className="shadow appearance-none border rounded min-h-fit max-h-80 w-full text-gray-700 focus:outline-none focus:shadow-outline" 
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
                    onChange={handleInput}
                    accept="image/png, image/gif, image/jpeg"
                    className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                    placeholder="image.png" 
                    
                  />
                </div>
                       
                <div>
                  <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full">
                    Edit product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}

export default EditProd
