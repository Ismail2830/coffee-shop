'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  category: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart items from localStorage
  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, []);

  const loadCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        const parsedCart = JSON.parse(cart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
        setCartItems([]);
      }
    }
  };

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Clear entire cart
  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  // Calculate price from string (e.g., "8 DH" -> 8)
  const parsePrice = (priceString: string): number => {
    return parseFloat(priceString.replace(/[^0-9.]/g, ''));
  };

  // Calculate total
  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => {
      return total + (parsePrice(item.price) * item.quantity);
    }, 0);
  };

  // Calculate subtotal for an item
  const calculateItemSubtotal = (item: CartItem): number => {
    return parsePrice(item.price) * item.quantity;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e8dcc8] flex items-center justify-center">
        <div className="text-2xl text-[#1a0f0a]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      <section className="pt-32 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            // Empty Cart
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-[#1a0f0a] mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/menu')}
                className="px-8 py-3 bg-[#2d1810] text-white rounded-lg font-semibold hover:bg-[#1a0f0a] transition-colors"
              >
                Browse Menu
              </motion.button>
            </motion.div>
          ) : (
            // Cart Items
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => router.push(`/menu/${item.id}`)}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 
                                className="text-xl font-bold text-[#1a0f0a] cursor-pointer hover:text-[#d4a574] transition-colors"
                                onClick={() => router.push(`/menu/${item.id}`)}
                              >
                                {item.name}
                              </h3>
                              <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              title="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-lg font-semibold text-[#d4a574] mb-3">{item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-[#1a0f0a] hover:bg-[#d4a574] hover:text-white transition-colors"
                            >
                              −
                            </motion.button>
                            <span className="text-lg font-bold text-[#1a0f0a] w-8 text-center">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-[#1a0f0a] hover:bg-[#d4a574] hover:text-white transition-colors"
                            >
                              +
                            </motion.button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="text-xl font-bold text-[#1a0f0a]">
                              {calculateItemSubtotal(item).toFixed(2)} DH
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Clear Cart Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearCart}
                  className="w-full py-3 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors"
                >
                  Clear Cart
                </motion.button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg p-6 sticky top-24"
                >
                  <h2 className="text-2xl font-bold text-[#1a0f0a] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{calculateTotal().toFixed(2)} DH</span>
                    </div>
                    <div className="border-t border-gray-300 pt-3">
                      <div className="flex justify-between text-xl font-bold text-[#1a0f0a]">
                        <span>Total</span>
                        <span>{calculateTotal().toFixed(2)} DH</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-[#2d1810] text-white rounded-lg font-bold hover:bg-[#1a0f0a] transition-colors mb-3"
                  >
                    Proceed to Checkout
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/menu')}
                    className="w-full py-4 bg-white text-[#2d1810] border-2 border-[#2d1810] rounded-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </motion.button>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Free delivery on orders over 50 DH</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Secure checkout</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Fresh preparation guaranteed</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
