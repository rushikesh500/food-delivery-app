import React, { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Add from './pages/Add/add'
import List from './pages/List/list'
import Order from './pages/Order/order'
 import { ToastContainer } from 'react-toastify';

const App = () => {

  const url ="https://food-delivery-app-8n36.onrender.com/api/food/list/"

  return (
    <div>
     <ToastContainer/>
     <Navbar />
     <hr/>
     <div className="app-content">
      <Sidebar/>

      <Routes>
        <Route path='/add' element={<Add url={url}/>}></Route>
        <Route path='/list' element={<List url={url}/>}></Route>
        <Route path='/order' element={<Order url={url}/>}></Route>
      </Routes>
     </div>

    </div>
  )
}

export default App
