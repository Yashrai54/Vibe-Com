import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage,setErrorMessage]=useState('')
  const [otp,setOtp]=useState(0)
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    const res=await axios.post("http://localhost:5000/api/auth/login",formData,{withCredentials:true})
    setSuccessMessage(res.data.message)
    navigate("/")
    }
    catch(err){
        if(err.response){
            setErrorMessage(err.response.data.message);
        }
        else{
            setErrorMessage("Something went wrong")
        }
    }
    setTimeout(() => {
      setFormData({ email: '', password: '' });
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
      
      <div className="bg-white/95 backdrop-blur-lg p-12 rounded-3xl shadow-2xl w-full max-w-md animate-slide-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">Sign in to continue to your account</p>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-5 border border-green-200">
            {successMessage}
          </div>
        )}
        {errorMessage && (
            <div className="bg-red-100 text-red-800 p-3 rounded-xl mb-5 border border-red-200">
            {errorMessage}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700 font-medium text-sm">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-gray-700 font-medium text-sm">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-xl text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40 active:translate-y-0 transition-all"
          >
            Sign In
          </button>
        </div>

        <div className="text-center mt-8 text-gray-600 text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}