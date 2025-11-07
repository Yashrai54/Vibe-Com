import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import LoginPage from './pages/Login'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './pages/Cart'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  )
}

export default App
