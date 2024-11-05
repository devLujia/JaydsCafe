import React from 'react'
import helmet from '../../image/helmet.svg';
import email from '../../image/email.svg';

export default function ForgotPasswordRider() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="container mx-auto my-10 px-4">
      <div className="bg-white flex flex-col lg:flex-row w-full max-w-screen-lg mx-auto rounded-lg shadow-xl overflow-hidden">
        {/* Left side */}
        <div className="flex flex-1 flex-col justify-center items-center border-b-2 lg:border-b-0 lg:border-r-2 border-gray-300 p-6">
          <h2 className="text-3xl font-bold text-center mb-5 mt-5 lg:mt-10">Rider Account</h2>
          <p className="text-center text-gray-700 max-w-md mb-6">Manage your riders effectively and efficiently with our easy-to-use platform.</p>
          <img src={helmet} alt="Helmet Image" className="w-full max-w-xs h-auto object-contain" />
        </div>
  
        {/* Right side */}
        <div className="flex flex-1 flex-col justify-center items-center lg:items-start p-8 lg:p-12">
          <form action="#" className="w-full max-w-md">
            <h1 className="font-bold text-3xl mb-3 tracking-wide text-gray-900">Reset Password</h1>
            <p className="text-md text-gray-600 mb-8">Enter your email address to receive a password reset link.</p>
            <div className="mb-6 relative">
              {/* Email */}
              <label htmlFor="email" className="text-gray-600 text-lg font-semibold tracking-wider">Email</label>
              <div className="relative mt-2">
                <input 
                  className="w-full py-3 pl-4 pr-12 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  id="email" type="email" placeholder="Enter your Email" required />
                <img 
                  src={email}
                  alt="Email Icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block w-6 h-6"
                />
              </div>
            </div>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg w-full cursor-pointer transition duration-300 ease-in-out"
              type="submit">
              Send Password Reset Link
            </button>
            <div className="mt-6 text-center">
              <p className="text-md text-gray-600">Remember your password? <a href="/riderLogin" className="text-blue-600 font-semibold">Sign In</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}
