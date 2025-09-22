import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <main>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/products" element={<Products/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
