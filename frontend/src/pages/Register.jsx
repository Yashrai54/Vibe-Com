import axios from 'axios';
import React, { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage,setErrorMessage]=useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", formData);
    setSuccessMessage(res.data.message);
  } catch (err) {
    if (err.response) {
      // server responded with status != 2xx
      setErrorMessage(err.response.data.message);
    } else {
      setErrorMessage("Something went wrong");
    }
  }

  setTimeout(() => {
    setFormData({ name: '', email: '', password: '' });
    setSuccessMessage('');
  }, 3000);
};



  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900">
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-900 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">Join us today and get started</p>
        </div>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-3 rounded-xl mb-5 border border-green-200">
            {successMessage}
        
          </div>
          
        )}
        {
          errorMessage && (
            <div className="bg-red-100 text-red-800 p-3 rounded-xl mb-5 border border-red-200">
            {errorMessage}
          </div>
          )
        }

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-gray-700 font-medium text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all"
            />
          </div>

          <div className="mb-6">
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
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all"
            />
          </div>

          <div className="mb-6 relative">
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
              required
              className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base bg-gray-50 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-11 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-900 text-white rounded-xl text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-500/40 active:translate-y-0 transition-all mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 font-semibold hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}