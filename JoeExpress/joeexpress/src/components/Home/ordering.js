import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

function Ordering() {

  const location = useLocation();
  const {food} = location.state;
  
  return (

    <div className="flex items-center justify-center h-screen">
  <section className="max-w-md w-full">
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4">Fill this form to confirm your order.</h2>

      <form action="#" className="space-y-4">
        <fieldset>
          <legend className="text-lg font-bold">Selected Food</legend>

          <div className="flex items-center">
            <div className="w-24">
              <img src={food.image_url} alt={food.name} className="rounded-md" />
            </div>

            <div className="ml-4">
              <h3 className="font-bold">{food.name}</h3>
              <p className="text-gray-600">Price: {food.price}</p>
              <p className="text-gray-600">{food.description}</p>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="qty"
                  className="block w-24 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  defaultValue="1"
                  min='1'
                  max='10'
                  required
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-lg font-bold">Delivery Details</legend>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="full-name"
              placeholder="E.g. Chard Cardosa"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="E.g. 9843xxxxxx"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="E.g. name@company.com"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              name="address"
              rows="3"
              placeholder="E.g. Street, City, Country"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <input
              type="submit"
              name="submit"
              value="Confirm Order"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
            />
          </div>
        </fieldset>
      </form>
    </div>
  </section>
</div>

  )
}

export default Ordering
