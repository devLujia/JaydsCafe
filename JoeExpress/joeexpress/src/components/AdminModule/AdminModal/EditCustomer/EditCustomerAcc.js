import React, { useEffect, useState } from 'react'
import './editCustomerAcc.css'
import axios from 'axios';

function EditCustomerAcc( {closeModal, id} ) {

    const [userdata, setUserData] = useState({
        id:'',
        name: '',
        email: '',
        address: ''
    });

    useEffect(()=>{
        axios.post('http://localhost:8081/fetchSpecificUserData', {id})
        .then(res=> {
            setUserData(res.data);
        })
    }, []);

    const handleInputChange = (e) => {
        setUserData({ ...userdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:8081/updateAcc', {
            id: userdata.id,
            name: userdata.name,
            email: userdata.email,
            password: userdata.password,
            address: userdata.address });

            closeModal(false);
    };

  return (
    <div className='modalBackground z-50' >
      <div className='modalContainer'>
        
            <div className='title flex'><h1>Edit Admin Account</h1> <button className='text-white text-center bg-red-500 px-2 hover:bg-red-600 rounded-sm' onClick={()=> closeModal(false)}> X </button> </div>
            <div className='body'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                        <div className='mb-4'>

                                <label for="name" className="text-gray-600 text-lg font-bold tracking-wider">Your Name</label>
                                <input 
                                type="text" 
                                name="name" 
                                id="name"
                                value={userdata.name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                placeholder="Your Name" 
                                required
                                />
                        </div>

                        <div class="mb-4">

                                <label htmlFor="email" className="text-gray-600 text-lg font-bold tracking-wider">Your email</label>
                                <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={userdata.email}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                placeholder="name@company.com" 
                                required/>
                                
                        </div>

                        <div class="mb-4">

                                <label htmlFor="password" className="text-gray-600 text-lg font-bold tracking-wider">Password</label>
                                <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={handleInputChange}
                                placeholder="••••••••" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" 
                                required/>

                        </div>

                        <div class="mb-4">

                                <label htmlFor="address" className="text-gray-600 text-lg font-bold tracking-wider">Address</label>
                                <input 
                                type="text" 
                                name="address" 
                                id="address"
                                value={userdata.address}
                                onChange={handleInputChange}
                                placeholder="Location" 
                                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline"
                                style={{ zIndex: 10, position: 'relative' }} // Adjusting to ensure no overlaps
                                required/>
                                
                        </div>
                        
                        <button type="submit" className="bg-amber-950 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg w-full ">
                            Update account</button>
                        

                </form>
            </div>
        
      </div>
    </div>
  )
}

export default EditCustomerAcc
