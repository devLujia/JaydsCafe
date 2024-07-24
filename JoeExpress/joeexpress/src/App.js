import React from 'react'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home'
import AdminDashboard from './components/AdminModule/AdminDashboard'
import Ordering from './components/Home/ordering'
import Menu from './components/Menu/Menu'
import Item from './components/OrderPage/OrderPage'
import Cart from './components/Cart/Cart'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path = '/signup' element={<Signup/>}></Route>
      <Route path = '/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<AdminDashboard/>}></Route>
      <Route path='/ordering/:id' element={<Ordering/>}></Route>
      <Route path='/menu' element={<Menu/>}></Route>
      <Route path='/items/:foodId' element = {<Item/>}> </Route>
      <Route path='/cart' element = {<Cart/>}> </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
