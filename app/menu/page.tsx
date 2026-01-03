'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const menuCategories = [
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'food', name: 'Food', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍮' },
];

const menuItems = {
  coffee: [
    { id: 'espresso', name: 'Espresso', price: '8 DH', description: 'Rich and bold shot of pure coffee' },
    { id: 'cappuccino', name: 'Cappuccino', price: '10 DH', description: 'Espresso with steamed milk and foam' },
    { id: 'latte', name: 'Latte', price: '12 DH', description: 'Smooth espresso with steamed milk' },
    { id: 'americano', name: 'Americano', price: '9 DH', description: 'Espresso with hot water' },
    { id: 'mocha', name: 'Mocha', price: '14 DH', description: 'Chocolate espresso with steamed milk' },
    { id: 'macchiato', name: 'Macchiato', price: '11 DH', description: 'Espresso with a dash of milk' },
  ],
  food: [
    { id: 'croissant', name: 'Croissant', price: '3.50 DH', description: 'Buttery, flaky French pastry' },
    { id: 'bagel', name: 'Bagel & Cream Cheese', price: '4 DH', description: 'Fresh bagel with creamy spread' },
    { id: 'avocado-toast', name: 'Avocado Toast', price: '7.50 DH', description: 'Smashed avocado on sourdough' },
    { id: 'breakfast-sandwich', name: 'Breakfast Sandwich', price: '6.50 DH', description: 'Egg, cheese, and bacon' },
    { id: 'quiche', name: 'Quiche', price: '5.50 DH', description: 'Savory egg and cheese pie' },
    { id: 'muffin', name: 'Muffin', price: '3 DH', description: 'Fresh baked daily' },
  ],
  drinks: [
    { id: 'orange-juice', name: 'Fresh Orange Juice', price: '4.50 DH', description: 'Freshly squeezed oranges' },
    { id: 'iced-tea', name: 'Iced Tea', price: '3.50 DH', description: 'Refreshing cold brewed tea' },
    { id: 'smoothie', name: 'Smoothie', price: '6.00 DH', description: 'Fresh fruit blend' },
    { id: 'hot-chocolate', name: 'Hot Chocolate', price: '4 DH', description: 'Rich and creamy chocolate' },
    { id: 'frappe', name: 'Frappe', price: '5.50 DH', description: 'Blended iced coffee' },
    { id: 'matcha-latte', name: 'Matcha Latte', price: '5.25 DH', description: 'Premium green tea latte' },
  ],
  desserts: [
    { id: 'chocolate-cake', name: 'Chocolate Cake', price: '5.50 DH', description: 'Rich chocolate layers' },
    { id: 'cheesecake', name: 'Cheesecake', price: '6.00 DH', description: 'Creamy New York style' },
    { id: 'brownie', name: 'Brownie', price: '4 DH', description: 'Fudgy chocolate brownie' },
    { id: 'tiramisu', name: 'Tiramisu', price: '6.50 DH', description: 'Italian coffee-flavored dessert' },
    { id: 'apple-pie', name: 'Apple Pie', price: '5 DH', description: 'Classic American pie' },
    { id: 'cookie', name: 'Cookie', price: '2.50 DH', description: 'Freshly baked daily' },
  ],
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover our carefully crafted selection of beverages and delicacies
          </motion.p>
        </div>
      </section>

      {/* Menu Content */}
      <section ref={ref} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {menuCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#1a0f0a] text-white shadow-xl'
                    : 'bg-white text-[#1a0f0a] hover:bg-[#d4a574] hover:text-white'
                }`}
              >
                <span className="text-2xl mr-2">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                className="bg-white rounded-lg p-6 shadow-lg cursor-pointer"
                onClick={() => router.push(`/menu/${item.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-[#d4a574]">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/menu/${item.id}`);
                  }}
                  className="w-full py-2 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-lg transition-all"
                >
                  Add to Order
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-linear-to-r from-[#c9a981] to-[#d4b896]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-[#1a0f0a] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Can't Decide? Try Our Specials!
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Ask our baristas for today's special recommendations
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/specials')}
              className="px-10 py-4 bg-[#2d1810] text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              View Today's Specials
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
