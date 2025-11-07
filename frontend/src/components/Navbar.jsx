import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const Navbar = ({setSearch}) => {
    const navigate=useNavigate()
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e)=>{setSearch(e.target.value)}}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Login Button */}
          <div className="flex items-center gap-4">
            <button onClick={()=>navigate("/login")} className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar