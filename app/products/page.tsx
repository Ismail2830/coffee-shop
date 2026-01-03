'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = ['All', 'Beans', 'Equipment', 'Merchandise', 'Gift Sets'];

const products = [
  {
    id: 1,
    name: 'House Blend Coffee Beans',
    category: 'Beans',
    price: '$18.99',
    description: 'Our signature medium roast blend',
    icon: '🫘',
  },
  {
    id: 2,
    name: 'Dark Roast Espresso',
    category: 'Beans',
    price: '$21.99',
    description: 'Bold and intense espresso beans',
    icon: '☕',
  },
  {
    id: 3,
    name: 'Single Origin Ethiopia',
    category: 'Beans',
    price: '$24.99',
    description: 'Fruity and floral light roast',
    icon: '🌍',
  },
  {
    id: 4,
    name: 'French Press',
    category: 'Equipment',
    price: '$34.99',
    description: 'Premium glass French press',
    icon: '☕',
  },
  {
    id: 5,
    name: 'Pour Over Kit',
    category: 'Equipment',
    price: '$45.99',
    description: 'Complete pour over brewing set',
    icon: '🫖',
  },
  {
    id: 6,
    name: 'Espresso Machine',
    category: 'Equipment',
    price: '$299.99',
    description: 'Professional home espresso maker',
    icon: '⚙️',
  },
  {
    id: 7,
    name: 'Coffee Ismail T-Shirt',
    category: 'Merchandise',
    price: '$24.99',
    description: 'Premium cotton tee with logo',
    icon: '👕',
  },
  {
    id: 8,
    name: 'Ceramic Mug',
    category: 'Merchandise',
    price: '$14.99',
    description: 'Handcrafted ceramic coffee mug',
    icon: '☕',
  },
  {
    id: 9,
    name: 'Tote Bag',
    category: 'Merchandise',
    price: '$19.99',
    description: 'Eco-friendly canvas tote',
    icon: '👜',
  },
  {
    id: 10,
    name: 'Coffee Lover\'s Gift Set',
    category: 'Gift Sets',
    price: '$59.99',
    description: 'Beans, mug, and brewing guide',
    icon: '🎁',
  },
  {
    id: 11,
    name: 'Barista Starter Pack',
    category: 'Gift Sets',
    price: '$89.99',
    description: 'Everything to start brewing',
    icon: '🎁',
  },
  {
    id: 12,
    name: 'Premium Collection',
    category: 'Gift Sets',
    price: '$149.99',
    description: 'Luxury coffee experience set',
    icon: '🎁',
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Bring the Coffee Ismail experience home with our premium products
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category
                    ? 'bg-[#1a0f0a] text-white shadow-xl'
                    : 'bg-white text-[#1a0f0a] hover:bg-[#d4a574] hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center">
                  <div className="text-7xl">{product.icon}</div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[#d4a574] font-semibold mb-2">{product.category}</p>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-[#1a0f0a]">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-lg transition-all"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gradient-to-r from-[#c9a981] to-[#d4b896]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Premium Quality, Delivered
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                All our products are carefully selected and packaged to ensure you receive 
                the same exceptional quality we serve in our café. Free shipping on orders over $50!
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Freshly roasted beans</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Premium equipment</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  <span>Fast & secure shipping</span>
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">✓</span>
                  <span>30-day satisfaction guarantee</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[400px] bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg shadow-2xl flex items-center justify-center"
            >
              <div className="text-center text-white">
                <div className="text-8xl mb-4">📦</div>
                <p className="text-xl font-semibold">Free Shipping Over $50</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
