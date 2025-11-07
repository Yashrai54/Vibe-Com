import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get("http://localhost:5000/api/cart", { withCredentials: true });
      setCart(res.data);
    };
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, { withCredentials: true });
      toast.success("Item removed");
      setCart(prev => ({
        ...prev,
        cartItems: prev.cartItems.filter(i => i.productId !== productId),
        total: prev.cartItems
          .filter(i => i.productId !== productId)
          .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }));
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.patch(`http://localhost:5000/api/cart/${productId}`, { quantity: newQuantity }, { withCredentials: true });
      
      setCart(prev => {
        const updatedItems = prev.cartItems.map(i =>
          i.productId === productId ? { ...i, quantity: newQuantity } : i
        );
        const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        return {
          ...prev,
          cartItems: updatedItems,
          total: newTotal
        };
      });
      
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };
  const handleCheckout = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/cart/checkout",
      {},
      { withCredentials: true }
    );

    if (!res.data.order) {
      toast.error(res.data.message || "Checkout failed");
      return;
    }

    toast.success(`Order placed! Total: $${res.data.order.total.toFixed(2)}`);
    setCart({ cartItems: [], total: 0 });
  } catch (err) {
    console.error(err.response?.data || err);
    toast.error("Checkout failed");
  }
};

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Your Cart</h2>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Continue Shopping
          </button>
        </div>

        {cart.cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg 
              className="w-24 h-24 mx-auto text-gray-400 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
              />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center p-4 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Price per item:</span>
                        <span className="text-lg font-bold text-blue-600">
                          ${item.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="ml-auto px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({cart.cartItems.length})</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-green-600">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button  onClick={handleCheckout}className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium text-lg shadow-md hover:shadow-lg">
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={() => navigate('/')}
                  className="w-full mt-3 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;