import React from 'react'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Menu from './components/Menu/Menu'
import Item from './components/OrderPage/OrderPage'
import Cart from './components/Cart/Cart'
import Editpage from './components/Edit/Editpage'
import Tracking from './components/Tracking/OrderTracking'
import AdminDashboard from './components/AdminModule/Dashboard/AdminDashboard'
import AdminLogin from './components/AdminModule/Auth/AdminLogin'
import AdminRegistration from './components/AdminModule/Auth/AdminRegistration'

import Forgot from './components/AdminModule/ForgotPass/AdminForgotPass'
import OrderHistory from './components/AdminModule/Order/OrderHistory'
import OrderTracking from './components/AdminModule/Order/OrderTracking'
import ProductManagement from './components/AdminModule/ProductManagement/ProductManagement'
import CustomerAccount from './components/AdminModule/CustomerAccount/CustomerAccount'
import PaymentManagement from './components/AdminModule/PaymentManagement/PaymentManagement'
import ContentManagement from './components/AdminModule/ContentManagement/ContentManagement'
import Order from './components/AdminModule/Order_New/Order_New'
import Inbox from './components/AdminModule/Message/Message'
import Settings from './components/AdminModule/Settings/Settings'
import PaymentSuccess from './components/PaymentSuccess/PaymentSuccess'
import Checkout from './components/Checkout/Checkout'
import Sales from './components/AdminModule/Sales/Sales'
import Profile from './components/Profile/Profile'

import RiderLogin from './components/RiderModule/LoginRider/LoginRider'
import RiderForgot from './components/RiderModule/ForgotPasswordRider/ForgotPasswordRider'
import RiderDashboard from './components/RiderModule/DashboardRider/DashboardRider'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path = '/signup' element={<Signup/>}></Route>
      <Route path = '/' element={<Home/>}></Route>
      <Route path='/menu' element={<Menu/>}></Route>
      {/* <Route path='/items/:foodId' element = {<Item/>}> </Route> */}
      <Route path='/cart' element = {<Cart/>}> </Route>
      <Route path='/tracking/' element = {<Tracking/>}> </Route>
      <Route path='/dashboard' element={<AdminDashboard/>}></Route>
      <Route path='/paymentSuccess' element={<PaymentSuccess/>}></Route>
      <Route path='/admin' element={<AdminLogin/>}></Route>
      <Route path='/adminregistration' element={<AdminRegistration/>}></Route>.

      <Route path='/forgot' element = {<Forgot/>}> </Route>
      <Route path='/OrderHistory' element = {<OrderHistory/>}> </Route>
      <Route path='/OrderTracking' element = {<OrderTracking/>}> </Route>
      <Route path='/ProductManagement' element = {<ProductManagement/>}> </Route>
      <Route path='/CustomerAccount' element = {<CustomerAccount/>}> </Route>
      <Route path='/PaymentManagement' element = {<PaymentManagement/>}></Route>
      <Route path='/ContentManagement' element = {<ContentManagement/>}></Route>
      <Route path='/Order' element = {<Order/>}></Route>
      <Route path='/editpage/:foodId' element = {<Editpage/>}></Route>
      <Route path='/Message' element = {<Inbox/>}></Route>
      <Route path='/Settings' element = {<Settings/>}></Route>
      <Route path='/Checkout' element = {<Checkout/>}></Route>
      <Route path='/Sales' element = {<Sales/>}></Route>
      <Route path='/Profile' element = {<Profile/>}></Route>
      
      <Route path='/RiderLogin' element = {<RiderLogin/>}></Route>
      <Route path='/RiderForgot' element = {<RiderForgot/>}></Route>
      <Route path='/RiderDashboard' element = {<RiderDashboard/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
