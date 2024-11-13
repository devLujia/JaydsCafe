import React, { useEffect, useState } from 'react'
import Validation from '../../../Signup/SignupValidation';
import axios from 'axios';

function AddCustomerAcc({ closeModal }) {

    const [getRole, setgetRole] = useState([]);

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const response = await axios.post('http://localhost:8081/getRole');
                setgetRole(response.data);
            } catch (error) {
                console.error('Error fetching role data:', error);
            }
        };
    
        fetchRoleData();
    }, []);


    const [values, setValues] = useState({
        pnum: '',
        name: '',
        email: '',
        role: null,
        password: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const err = Validation(values);
        setErrors(err);
      
        if (!err.pnum && !err.name && !err.email && !err.password && !err.address) {
          try {
            const res = await axios.post('http://localhost:8081/addAdmin', values);
            closeModal(false);
            if(res.data.success){
                alert("Success");
            }
          } catch (error) {
            console.error('Error adding admin:', error);
          }
        }
      };

  return (

    <div className='modalBackground h-fit'>
        <div className='modalContainer h-fit'>
            <div className='flex justify-between mb-5'>
                <h1 className='text-2xl font-bold'>Add Admin</h1> 
                <button className='text-white text-center bg-red-500 px-3 hover:bg-red-600 rounded-md' onClick={()=> closeModal(false)}> X </button> 
            </div>

            <form className="max-w-lg mx-10 grid grid-cols-1" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="pnum" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                    <input 
                        type="tel" 
                        id="pnum" 
                        name='pnum'
                        value={values.pnum} // Corrected to bind the value
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. 09123459678" 
                        required 
                        onChange={handleInput} />
                    {errors.pnum && <span className="error-text">{errors.pnum}</span>}
                </div>

                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Name</label>
                    <input 
                        type="text" 
                        id="name"
                        name='name' 
                        value={values.name} // Corrected to bind the value
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. Juan Dela Cruz" 
                        required 
                        onChange={handleInput} />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="mb-5">
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admin Role</label>
                    <select 
                        id="role" 
                        name="role" // Ensured name is set here too
                        value={values.role} // Corrected to bind the value
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        required 
                        onChange={handleInput}
                    >
                        <option value="">Selece role available</option>

                        {getRole.length > 0 ? (
                            getRole.map(gRole => (
                                <option key={gRole?.id} value={gRole?.id}>
                                    {gRole?.title}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No roles available</option>
                        )}
                    </select>
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name='email'
                        value={values.email} // Corrected to bind the value
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder="Ex. JuanDelaCruz@gmail.com" 
                        required 
                        onChange={handleInput}/>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name='password'
                        value={values.password} // Corrected to bind the value
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        placeholder='Enter a Password' 
                        required
                        onChange={handleInput}/>
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* address */}
                <div className="mb-5">
                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                    <input 
                        type="text" 
                        name="address" 
                        id="address"
                        value={values.address} // Corrected to bind the value
                        onChange={handleInput}  
                        placeholder="Location" 
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
                        style={{ zIndex: 10, position: 'relative' }} // Adjusting to ensure no overlaps
                        required/>
                    {errors.address && <span className="error-text">{errors.address}</span>}
                </div>

                <div className='flex justify-center'>
                    <button type="submit" className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                </div>
            </form>

        </div>
    </div>
  )
}

export default AddCustomerAcc
