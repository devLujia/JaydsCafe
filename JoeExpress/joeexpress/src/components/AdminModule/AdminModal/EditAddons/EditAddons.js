import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditAddons({closeModal, id}) {

    const [values, setValues] = useState({  
      name: '',
      price: '',
      AddonsId : ''
    });
  
    const handleInput = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
      console.log('Addons ID:', id);
        if (id) {
            setValues(prevValues => ({ ...prevValues, AddonsId: id }));
            axios.post('http://localhost:8081/fetchAddons', { id })
                .then(result => {
                    setValues(prevValues => ({
                        ...prevValues,
                        name: result.data.name,
                        price: result.data.price,
                        
                      }));
                })
                .catch(err => console.error(err));
        }
      }, [id]);
  
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!values.name || !values.price || !values.AddonsId || isNaN(values.price) || values.price <= 0) {
            if (!values.name) {
                alert("Name is required.");
                return;
            }
            if (!values.price) {
                alert("Price is required.");
                return;
            }
            if (isNaN(values.price) || values.price <= 0) {
                alert("Please enter a valid price greater than 0.");
                return;
            }
            if (!values.AddonsId) {
                alert("Addons ID is required.");
                return;
            }
        }
    
        try {
            // API call to update addons
              const res = await axios.post('http://localhost:8081/updateAddons', {
                  name: values.name,
                  price: values.price,
                  AddonsId: values.AddonsId,
              });

              if (res.data.success) {
                  alert('Addons updated successfully');
                  closeModal(false);
              } else {
                  alert('Failed to update addons. Please try again.');
              }
        } catch (err) {
            console.error('Error updating addons:', err);
            alert('Failed to update addons. Please try again.');
        }
    };
    
    
  
    return (
      <div>
         <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
          <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
            
            <div className='flex justify-between items-center mb-4'>
              <h1 className='text-xl font-bold'>Edit Add-ons</h1>
              <button 
              onClick={()=> closeModal(false)}
              className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
                X
              </button>
            </div>
        
            <div className='flex-1'>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor="name" className="flex text-gray-600 text-sm font-bold tracking-wider">Addons Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name"
                    value={values.name}
                    onChange={handleInput} 
                    className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                    placeholder="Add-Ons Name" 
                    required
                  />
                </div>                        
        
                <div className='mb-4'>
                  <label htmlFor="price" className="flex text-gray-600 text-sm font-bold tracking-wider">Price</label>
                  <input 
                    type="number" 
                    name="price" 
                    id="price"
                    value={values.price}
                    onChange={handleInput}
                    className="shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline" 
                    placeholder="₱69" 
                    required
                  />
                  
                </div>        
        
                <button type="submit" className="bg-greenColor hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg w-full">
                  Edit Addons
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default EditAddons
