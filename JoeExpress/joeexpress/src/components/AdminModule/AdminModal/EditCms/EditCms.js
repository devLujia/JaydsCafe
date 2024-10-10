import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditCms({closeModal, id}) {


    const [cmsData, setCmsData] = useState({
    });

    useEffect(()=>{
        axios.post('http://localhost:8081/cms_specific', {id})
        .then(res=> {
            setCmsData(res.data);
        })
    }, []);

    const handleInput = (e) => {
      const { name, type, files, value } = e.target;
    
      if (type === 'file' && files.length > 0) {
          
          setCmsData((prevValues) => ({
              ...prevValues,
              [name]: files[0] 
          }));
          
      } 
      else {
          
        setCmsData((prevValues) => ({
              ...prevValues,
              [name]: value
          }));
      }
      
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', cmsData.id);
        formData.append('content', cmsData.content);
    
        axios.post('http://localhost:8081/editCms', formData).then(res=>{
          alert('Content updated successfully');
        });
        
        closeModal(false);
    


    };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
        <div className='bg-white w-auto h-auto rounded-lg shadow-lg flex flex-col p-6'>
          
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-xl font-bold'>Edit Product</h1>
            <button 
            onClick={()=> closeModal(false)}
            className='text-white bg-red-500 px-3 py-1 hover:bg-red-600 rounded-sm'>
              X
            </button>
          </div>
      
          <div className='flex-1'>
            <form className='flex flex-col' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label  className="flex text-gray-600 text-sm font-bold tracking-wider">Content Title:</label>
                <h6 className="flex text-gray-600 py-3 font-bold tracking-wider">{cmsData.title}</h6>
              </div>                        
              
              <div className="mb-4">
                <label htmlFor="content" className="flex text-gray-600 text-sm font-bold tracking-wider">Content</label>
                {cmsData.category === "image" ?
                
                <input
                  type="file" 
                  name="content" 
                  id="content" 
                  onChange={handleInput}                     
                  placeholder="Content" 
                  accept="image/*"
                  className="shadow appearance-none border rounded w-[600px] h-[300px] text-gray-700 focus:outline-none focus:shadow-outline" 
                  required
                /> 
              :
              <textarea
                  type="text" 
                  name="content" 
                  id="content"
                  value={cmsData.content}     
                  onChange={handleInput}                     
                  placeholder="Content" 
                  className="shadow appearance-none border rounded w-[600px] h-[300px] text-gray-700 focus:outline-none focus:shadow-outline" 
                  required
                />


              
              }
              </div>
               
              <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full">
                Edit product
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default EditCms
