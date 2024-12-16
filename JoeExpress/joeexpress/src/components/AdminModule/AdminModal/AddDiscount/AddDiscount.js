import axios from 'axios';
import React, { useState } from 'react';

function AddDiscount({ closeModal }) {
  const [discount, setDiscount] = useState({
    code: '',
    type: '',
    value: '',
    min_order: '',
    max_discount_value: '',
    limit: '',
    valid_from: '',
    valid_until: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!discount.code || !discount.type || !discount.value || !discount.min_order || !discount.max_discount_value || !discount.limit || !discount.valid_from || !discount.valid_until) {
      alert('Please fill in all fields.');
      return;
    }

    const formattedDiscount = {
      ...discount,
      value: Number(discount.value),
      min_order: Number(discount.min_order),
      max_discount_value: Number(discount.max_discount_value),
      limit: Number(discount.limit),
    };

    try {
      const response = await axios.post('https://jaydscafe.com/api/addDiscount', { discount: formattedDiscount });

      if (response.status === 201) {
        alert(response.data.message); // Success message
        setDiscount({ code: '', type: '', value: '', min_order: '', max_discount_value: '', limit: '', valid_from: '', valid_until: '' });
        closeModal(false); // Reset form
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error); // Show backend error message
      } else {
        console.error("Submission error:", error);
        alert('An error occurred while adding the discount code.');
      }
    }
  };

  const handleInputDiscount = (e) => {
    const { name, value } = e.target;
    setDiscount((prevDiscount) => ({
      ...prevDiscount,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={()=> closeModal(false)}></div>
      
      {/* Modal Content */}
      <div className="relative shadow-xl sm:rounded-lg mx-auto w-full max-w-7xl p-6 bg-white z-10">
        {/* Close Button */}
        <button
          onClick={()=> closeModal(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>

        <div className="text-center mb-4">
          <h1 className="text-5xl font-semibold tracking-wider">Voucher / Discounts</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="discount-code"
              name="code"
              value={discount.code}
              onChange={handleInputDiscount}
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="DISCOUNT CODE"
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="type"
              id="discountType"
              onChange={handleInputDiscount}
              value={discount.type}
              required
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a discount type</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          <div className="mb-4">
            <input
              type="number" // Changed to "number" for better validation
              id="value"
              name="value"
              onChange={handleInputDiscount}
              value={discount.value}
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Discount Value"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="min_order"
              name="min_order"
              onChange={handleInputDiscount}
              value={discount.min_order}
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Min. order value"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="max_discount_value"
              name="max_discount_value"
              onChange={handleInputDiscount}
              value={discount.max_discount_value}
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Max discount value"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="limit"
              name="limit"
              onChange={handleInputDiscount}
              value={discount.limit}
              className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Usage Limit"
              required
            />
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <label htmlFor="valid_from" className="block text-gray-700 font-medium">
              Valid From
            </label>
            <input
              type="date"
              id="valid_from"
              name="valid_from"
              onChange={handleInputDiscount}
              value={discount.valid_from}
              className="block h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <label htmlFor="valid_until" className="block text-gray-700 font-medium">
              Valid Until
            </label>
            <input
              type="date"
              id="valid_until"
              name="valid_until"
              onChange={handleInputDiscount}
              value={discount.valid_until}
              className="block h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-gray-900 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-center mt-6">
            <button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">
              Add Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDiscount;
