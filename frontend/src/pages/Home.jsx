import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import {toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [products,setProducts]=useState([])
    const [search,setSearch]=useState("")
    const navigate = useNavigate()
    
    const addToCart=async(productId,quantity)=>{
        try{
        await axios.post("http://localhost:5000/api/cart",{productId:Number(productId),quantity:quantity},{withCredentials:true})
        toast.success("Added to cart 🛒");
    }
        catch(err){
            if (err.response?.status === 401) {
                toast.error("Unauthorized")
    window.location.href = "/login";
  }
        }
    }
  useEffect(()=>{
    const getAllProducts=async()=>{
        try{
            const res=await axios.get("https://fakestoreapi.com/products")
            setProducts(res.data)
        }
        catch(error){
            console.error(error)
        }
    }
    getAllProducts()
  },[])
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setSearch={setSearch}></Navbar>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Go to Cart button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Our Products
          </h1>
          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            Go to Cart
          </button>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.filter(p=>p.title.toLowerCase().includes(search.toLowerCase())).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${Math.floor(product.price)}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {product.rating.rate} ({product.rating.count})
                      </span>
                    </div>
                  </div>
                  <button 
                  className="w-full cursor-pointer mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300" 
                  onClick={()=>addToCart(product.id,1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home