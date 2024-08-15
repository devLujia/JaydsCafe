import React from 'react'
import big_logo from '../../image/Big_logo.svg'

export default function AdminForgotPass() {
  return (
    <div>
      <div class="bg-white flex w-4/5 mx-auto my-10 rounded-lg flex-col lg:flex-row shadow-xl">

        <div class="flex justify-center items-center flex-col border-r-2 border-gray-300 flex-1 px-5"> {/* Left Side */}
            <h2 class="text-2xl font-bold flex justify-center my-5">JoeExpressAdmin</h2>
            <p class="flex justify-center mb-10 max-w-96 text-center">Lorem ipsum dolor sit amet, consectetur
                adipiscing elit suspendisse.</p>

            {/* { <img src="/public/image/LOGO.png" alt="Logo" class="w-40 h-40"> } */}

            <img src={big_logo} />
        </div>

        <div class="my-5 flex-1 p-10"> {/* Right Side */}
            <form action="/public/Html_Admin/AdminforgotPass.html"> {/*<!-- Need baguhin yung action -->*/}
                <h1 class="font-bold text-3xl mb-2 underline tracking-wide">Reset Password</h1>
                <p class="mb-4 text-gray-500 tracking-wide">Enter your Email address to receive a password reset link</p>

                <div class="mb-4"> {/* Email Input*/}
                    <label>Email</label>
                    <input class="shadow appearance-none border rounded w-full py-3 px-3 my-2 text-gray-700 leading-10 focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter your Email" required/>
                </div>

                <input class="bg-yellow-900 hover:bg-amber-900 text-white font-semibold py-2 px-4 rounded-lg w-full leading-10 mb-5 tracking-wider" type="submit" value="Send Password Reset Link"/>
                </form>
        </div>
        </div>
    </div>
  )
}
