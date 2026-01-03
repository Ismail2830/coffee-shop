'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState } from 'react';

// Product data with IDs and images
const allProducts = [
  // Coffee
  { id: 'espresso', category: 'coffee', name: 'Espresso', price: '8 DH', description: 'Rich and bold shot of pure coffee', image: '/images/jeremy-yap-jn-HaGWe4yw-unsplash.jpg' },
  { id: 'cappuccino', category: 'coffee', name: 'Cappuccino', price: '10 DH', description: 'Espresso with steamed milk and foam', image: '/images/joe-hepburn-EcWFOYOpkpY-unsplash.jpg' },
  { id: 'latte', category: 'coffee', name: 'Latte', price: '12 DH', description: 'Smooth espresso with steamed milk', image: '/images/nicolas-horn-78bxxGctJtQ-unsplash.jpg' },
  { id: 'americano', category: 'coffee', name: 'Americano', price: '9 DH', description: 'Espresso with hot water', image: '/images/mehmet-talha-onuk-MBeY2m00Ybc-unsplash.jpg' },
  { id: 'mocha', category: 'coffee', name: 'Mocha', price: '14 DH', description: 'Chocolate espresso with steamed milk', image: '/images/mehmet-talha-onuk-MBeY2m00Ybc-unsplash.jpg' },
  { id: 'macchiato', category: 'coffee', name: 'Macchiato', price: '11 DH', description: 'Espresso with a dash of milk', image: '/images/joe-hepburn-EcWFOYOpkpY-unsplash.jpg' },
  
  // Food
  { id: 'croissant', category: 'food', name: 'Croissant', price: '3.50 DH', description: 'Buttery, flaky French pastry', image: '/images/kobby-mendez-iyM-XTsTiek-unsplash.jpg' },
  { id: 'bagel', category: 'food', name: 'Bagel & Cream Cheese', price: '4 DH', description: 'Fresh bagel with creamy spread', image: '/images/erwan-nonon-D5vE6tDzB80-unsplash.jpg' },
  { id: 'avocado-toast', category: 'food', name: 'Avocado Toast', price: '7.50 DH', description: 'Smashed avocado on sourdough', image: '/images/saymom-leao-SaWYeuOqEdo-unsplash.jpg' },
  { id: 'breakfast-sandwich', category: 'food', name: 'Breakfast Sandwich', price: '6.50 DH', description: 'Egg, cheese, and bacon', image: '/images/freddy-g-KEmgWXjxDok-unsplash.jpg' },
  { id: 'quiche', category: 'food', name: 'Quiche', price: '5.50 DH', description: 'Savory egg and cheese pie', image: '/images/james-harris-vrNs8Y8exAQ-unsplash.jpg' },
  { id: 'muffin', category: 'food', name: 'Muffin', price: '3 DH', description: 'Fresh baked daily', image: '/images/joshua-flores-5RQffqRkmWQ-unsplash.jpg' },
  
  // Drinks
  { id: 'orange-juice', category: 'drinks', name: 'Fresh Orange Juice', price: '4.50 DH', description: 'Freshly squeezed oranges', image: '/images/julian-lates-tPggQVZE-VI-unsplash.jpg' },
  { id: 'iced-tea', category: 'drinks', name: 'Iced Tea', price: '3.50 DH', description: 'Refreshing cold brewed tea', image: '/images/mae-mu-kbch-i63YTg-unsplash.jpg' },
  { id: 'smoothie', category: 'drinks', name: 'Smoothie', price: '6.00 DH', description: 'Fresh fruit blend', image: '/images/jugoslocos-QD4yCjlD44A-unsplash.jpg' },
  { id: 'hot-chocolate', category: 'drinks', name: 'Hot Chocolate', price: '4 DH', description: 'Rich and creamy chocolate', image: '/images/chester-toh-XFSmKLYvCYc-unsplash.jpg' },
  { id: 'frappe', category: 'drinks', name: 'Frappe', price: '5.50 DH', description: 'Blended iced coffee', image: '/images/victor-rutka-eUwxwA6JTFM-unsplash.jpg' },
  { id: 'matcha-latte', category: 'drinks', name: 'Matcha Latte', price: '5.25 DH', description: 'Premium green tea latte', image: '/images/alana-harris-C63YZ33DdvY-unsplash.jpg' },
  
  // Desserts
  { id: 'chocolate-cake', category: 'desserts', name: 'Chocolate Cake', price: '5.50 DH', description: 'Rich chocolate layers', image: '/images/umesh-soni-LDnmyOaA-ew-unsplash.jpg' },
  { id: 'cheesecake', category: 'desserts', name: 'Cheesecake', price: '6.00 DH', description: 'Creamy New York style', image: '/images/kelsey-todd-nXsFPNyBqq4-unsplash.jpg' },
  { id: 'brownie', category: 'desserts', name: 'Brownie', price: '4 DH', description: 'Fudgy chocolate brownie', image: '/images/shivansh-sethi-dKT6Q7q2UKs-unsplash.jpg' },
  { id: 'tiramisu', category: 'desserts', name: 'Tiramisu', price: '6.50 DH', description: 'Italian coffee-flavored dessert', image: '/images/inna-safa-BmrXxbVuqTc-unsplash.jpg' },
  { id: 'apple-pie', category: 'desserts', name: 'Apple Pie', price: '5 DH', description: 'Classic American pie', image: '/images/diliara-garifullina-D7X-GMeTV7U-unsplash.jpg' },
  { id: 'cookie', category: 'desserts', name: 'Cookie', price: '2.50 DH', description: 'Freshly baked daily', image: '/images/american-heritage-chocolate-DoK5qEy2L60-unsplash.jpg' },
];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  
  const product = allProducts.find(p => p.id === params.id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#e8dcc8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1a0f0a] mb-4">Product not found</h1>
          <button 
            onClick={() => router.push('/menu')}
            className="px-6 py-3 bg-[#1a0f0a] text-white rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Get similar products (same category, excluding current product)
  const similarProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToOrder = () => {
    console.log(`Added ${quantity} ${product.name} to order`);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      {/* Product Details Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => router.push('/menu')}
            className="mb-8 flex items-center gap-2 text-[#1a0f0a] hover:text-[#d4a574] transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-semibold">Back to Menu</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 lg:h-150 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 bg-[#d4a574] text-white rounded-full text-sm font-semibold uppercase mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a0f0a] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-[#d4a574] mb-6">{product.price}</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                {product.description}
              </motion.p>

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="text-lg font-semibold text-[#1a0f0a]">Quantity:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#1a0f0a] shadow-md hover:bg-[#d4a574] hover:text-white transition-colors"
                  >
                    −
                  </motion.button>
                  <span className="text-2xl font-bold text-[#1a0f0a] w-12 text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#1a0f0a] shadow-md hover:bg-[#d4a574] hover:text-white transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Add to Order Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02, backgroundColor: '#1a0f0a' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToOrder}
                className="w-full py-4 bg-[#2d1810] text-white rounded-lg text-lg font-bold hover:shadow-2xl transition-all"
              >
                Add to Order
              </motion.button>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-6 border-t border-gray-300 space-y-2 text-sm text-gray-600"
              >
                <p>✓ Freshly prepared</p>
                <p>✓ Premium ingredients</p>
                <p>✓ Available for dine-in and takeaway</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="py-20 bg-[#c9a981]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-[#1a0f0a] text-center mb-12"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              You Might Also Like
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-lg overflow-hidden shadow-xl cursor-pointer"
                  onClick={() => router.push(`/menu/${item.id}`)}
                >
                  <div className="relative h-56">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#d4a574]">{item.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/menu/${item.id}`);
                      }}
                      className="w-full py-2 bg-[#2d1810] text-white rounded-md font-semibold hover:bg-[#1a0f0a] transition-all"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
