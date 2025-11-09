import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Adminpannel from './pages/Adminpannel'
import Createbill from './pages/Createbill'
import { AppContext } from './context/AppContext'

const App = () => {
  const {token} = useContext(AppContext);
  return (
    <div>
      <ToastContainer/>
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/admin/*" element={<Adminpannel/>} />
          <Route path="/createbill" element={<Createbill/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
