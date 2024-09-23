import React from 'react'
import helmet from '../../image/helmet.svg';
import email from '../../image/email.svg';

export default function ForgotPasswordRider() {
  return (
    <div>
        <div className='bg-white flex w-4/5 mx-auto my-10 rounded-lg flex-col lg:flex-row shadow-xl'>
            
            {/* left-side */}
            <div className='flex justify-center items-center flex-col border-r-2 border-gray-300 flex-1 px-5'>
                <h2 className='text-2xl font-bold text-center mb-5 mt-7'>Jayd’s Cafe Rider Admin</h2>
                <p class="flex justify-center mb-2 max-w-96 text-center">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit suspendisse.</p>

                <img src={helmet}></img>
            </div>

            {/* right-side */}
            <div className='flex-1 p-10 items-center my-auto'>
                <form action='#'>
                    <h1 className='font-bold text-2xl mb-3 tracking-wide'>
                        Reset  Password 
                    </h1>
                    <p className='text-md text-gray-500 mb-7'>
                        Enter your email address to receive a password reset link.
                    </p>
                    <div class="mb-4 relative"> {/* <!-- email--> */}
                        <label for="email" class="text-gray-600 text-md font-bold tracking-wider ">Email</label>
                        <input class="mt-2 shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Ex. Juan Dela Cruz" required/>
                        <img src={email} className='absolute end-5 top-12 md:block hidden'></img>
                    </div>

                    <input class="bg-greenColor hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full leading-10 " type="submit" value="Sign In"/>
                </form>
            </div>
        </div>
    </div>
  )
}
