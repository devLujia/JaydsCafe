import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard () {

    const [usersCount, setUsersCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        axios.post('http://localhost:5051/users')
        .then(response=>{
            setUsersCount(response.data.user_count);
        })
        .catch(error=>{
            console.log('There was an error on fetching the users details!' , error);
        });
    
    },[]);

    useEffect(()=>{
        axios.post('http://localhost:5051/totalRevenue')
        .then(response=>{
            if(response.data.total_revenue > 0 ){
                setTotalRevenue(response.data.total_revenue);
            }else{
                setTotalRevenue(0);
            }
            
            
        })
        .catch(error=>{
            console.log("There was an error on fetching the users details! ", error);
        });
    },[]);

    useEffect(()=>{
        axios.post('http://localhost:5051/totalOrder')
        .then(response=>{
            setTotalOrder(response.data.total_order);
        })
        .catch(error=>{
            console.log("There was an error on fetching the users details! ", error);
        })
    })

    useEffect(()=>{
        axios.post('http://localhost:5051/recentorders')
        .then(response=>{
            setOrders(response.data);
        })
        .catch(error=>{
            console.log("There was an error on fetching the Recent Orders! ", error);
        })
    })
    
    const toggleDD = (dropdownId) => {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown.classList.contains('invisible')) {
            dropdown.classList.remove('invisible');
            dropdown.classList.add('visible');
        } else {
            dropdown.classList.remove('visible');
            dropdown.classList.add('invisible');
        }
    };
    
    const filterDD = (dropdownId, inputId) => {
        const filterValue = document.getElementById(inputId).value.toLowerCase();
        const dropdown = document.getElementById(dropdownId);
        const items = dropdown.getElementsByTagName('a');
        
    
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const textValue = item.textContent || item.innerText;
            if (textValue.toLowerCase().indexOf(filterValue) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        }
    };
    



    return (
        <div className="bg-gray-800 font-sans leading-normal tracking-normal mt-12">
            {/* Header */}
            <header>
                <nav aria-label="menu nav" className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
                    <div className="flex flex-wrap items-center">
                        <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                            <a href="#" aria-label="Home">
                                <span className="text-xl pl-2"><i className="em em-grinning"></i></span>
                            </a>
                        </div>
                        <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
                            <span className="relative w-full">
                                <input aria-label="search" type="search" id="search" placeholder="Search"
                                       className="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"/>
                                <div className="absolute search-icon" style={{ top: '1rem', left: '.8rem' }}>
                                    <svg className="fill-current pointer-events-none text-white w-4 h-4"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                                    </svg>
                                </div>
                            </span>
                        </div>
                        <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
                            <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                                <li className="flex-1 md:flex-none md:mr-3">
                                    <a className="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                                </li>
                                <li className="flex-1 md:flex-none md:mr-3">
                                    <a className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                                       href="#">link</a>
                                </li>
                                <li className="flex-1 md:flex-none md:mr-3 relative">
                                    <div className="inline-block">
                                        <button onClick={() => toggleDD('myDropdown')}
                                                className="drop-button text-white py-2 px-2">
                                            <span className="pr-2"><i className="em em-robot_face"></i></span> Hi,
                                            User <svg className="h-3 fill-current inline"
                                                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path
                                                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                        </svg>
                                        </button>
                                        <div id="myDropdown"
                                             className="dropdownlist absolute bg-gray-800 text-white right-0 mt-3 p-3 overflow-auto invisible z-30">
                                            <input type="text" className="drop-search p-2 text-gray-600"
                                                   placeholder="Search.." id="myInput"
                                                   onKeyUp={() => filterDD('myDropdown', 'myInput')}/>
                                            <a href="#"
                                               className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i
                                                className="fa fa-user fa-fw"></i> Profile</a>
                                            <a href="#"
                                               className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i
                                                className="fa fa-cog fa-fw"></i> Settings</a>
                                            <div className="border border-gray-800"></div>
                                            <a href="#"
                                               className="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i
                                                className="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main>
                <div className="flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <nav aria-label="alternative nav">
                        <div
                            className="bg-gray-800 shadow-xl h-20 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48 content-center">
                            <div
                                className="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
                                <ul
                                    className="list-reset flex flex-row md:flex-col pt-3 md:py-3 px-1 md:px-2 text-center md:text-left">
                                    <li className="mr-3 flex-1">
                                        <a href="#"
                                           className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
                                            <i className="fas fa-tasks pr-0 md:pr-3"></i><span
                                            className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Tasks</span>
                                        </a>
                                    </li>
                                    <li className="mr-3 flex-1">
                                        <a href="#"
                                           className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-purple-500">
                                            <i className="fa fa-envelope pr-0 md:pr-3"></i><span
                                            className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Messages</span>
                                        </a>
                                    </li>
                                    <li className="mr-3 flex-1">
                                        <a href="#"
                                           className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600">
                                            <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-600"></i><span
                                            className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">Analytics</span>
                                        </a>
                                    </li>
                                    <li className="mr-3 flex-1">
                                        <a href="#"
                                           className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500">
                                            <i className="fa fa-wallet pr-0 md:pr-3"></i><span
                                            className="pb-1 md:pb-0 text-xs md:text-base text-gray-400 md:text-gray-200 block md:inline-block">Payments</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    {/* Main Section */}
                    <section>
                        <div id="main"
                             className="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
                            {/* Analytics Section */}
                            <div className="bg-gray-800 pt-3">
                                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                    <h1 className="font-bold pl-2">Analytics</h1>
                                </div>
                            </div>

                            {/* Metrics Cards */}
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                    <div
                                        className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-5">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pr-4">
                                                <div
                                                    className="rounded-full p-5 bg-green-600"><i
                                                    className="fa fa-wallet fa-2x fa-inverse"></i></div>
                                            </div>
                                            <div className="flex-1 text-right md:text-center">
                                                <h2 className="font-bold uppercase text-gray-600">Total
                                                    Revenue</h2>
                                                <p className="font-bold text-3xl">{totalRevenue}<span
                                                    className="text-green-500"><i
                                                    className="fas fa-caret-up"></i></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                    <div
                                        className="bg-gradient-to-b from-orange-200 to-orange-100 border-b-4 border-orange-500 rounded-lg shadow-xl p-5">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pr-4">
                                                <div
                                                    className="rounded-full p-5 bg-orange-600"><i
                                                    className="fas fa-users fa-2x fa-inverse"></i></div>
                                            </div>
                                            <div className="flex-1 text-right md:text-center">
                                                <h2 className="font-bold uppercase text-gray-600">Total
                                                    Users</h2>
                                                <p className="font-bold text-3xl">{usersCount} <span
                                                    className="text-orange-500"><i
                                                    className="fas fa-exchange-alt"></i></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                    <div
                                        className="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-5">
                                        <div className="flex flex-row items-center">
                                            <div className="flex-shrink pr-4">
                                                <div
                                                    className="rounded-full p-5 bg-blue-600"><i
                                                    className="fas fa-server fa-2x fa-inverse"></i></div>
                                            </div>
                                            <div className="flex-1 text-right md:text-center">
                                                <h2 className="font-bold uppercase text-gray-600">TOTAL ORDERS</h2>
                                                <p className="font-bold text-3xl">{totalOrder}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-gray-800 pt-3">
                                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                                    <h1 className="font-bold pl-2">Recent Orders</h1>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead>
                                        <tr className="text-md font-semibold tracking-wide text-left text-white bg-gray-800 uppercase border-b border-gray-600">
                                            <th className="px-4 py-3">ID</th>
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3">Total</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                        </thead>
                                        {orders.map(order=>(
                                            <tbody key={order.id} className="bg-white">
                                            <tr className="text-gray-700">
                                                <td className="px-4 py-3 border">
                                                    <div className="flex items-center">
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium">{order.order_id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-ms font-semibold border">
                                                    {order.customer_id}
                                                </td>
                                                <td className="px-4 py-3 text-xs border">{order.total_price}</td>
                                                <td className="px-4 py-3 text-xs border">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold leading-tight">
                                                        <span aria-hidden
                                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                        <span className="relative text-xs text-green-500">{order.status}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                            </tbody>

                                        ))}
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-400 shadow">
                <div className="container max-w-md mx-auto flex py-8">
                    <div className="w-full mx-auto flex flex-wrap">
                        <div className="flex w-full md:w-1/2">
                            <div className="px-8">
                                <h3 className="font-bold font-bold text-gray-100">About</h3>
                                <p className="py-4 text-gray-600 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi vitae
                                    sem
                                    tempor cursus. Etiam quis urna et urna dignissim consectetur. Nam sodales
                                    justo
                                    eget
                                    magna bibendum sodales.
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full md:w-1/2">
                            <div className="px-8">
                                <h3 className="font-bold font-bold text-gray-100">Social</h3>
                                <ul className="list-reset items-center text-sm pt-3">
                                    <li>
                                        <a className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1"
                                           href="#">Add social links</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;
