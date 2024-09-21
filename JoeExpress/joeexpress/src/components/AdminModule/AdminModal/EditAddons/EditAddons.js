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
  
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        // Append form values to FormData
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('AddonsId', values.AddonsId);
    
        axios.post('http://localhost:8081/updateAddons', {
            name: values.name,
            price: values.price,
            AddonsId: values.AddonsId,
        })
        .then(res => {
            if(res.data.success === true){
                alert('Addons updated successfully');
                closeModal(false);
            }
        })
        .catch(err => {
            console.error('Error updating addons:', err);
            alert('Failed to update addons. Please try again.');
        });
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
                    type="text" 
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
