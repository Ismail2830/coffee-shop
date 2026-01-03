'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// All available products
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

// Function to get 4 random products
const getRandomProducts = (count: number = 4) => {
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SpecialsPage() {
  const router = useRouter();
  const [todaySpecials, setTodaySpecials] = useState<typeof allProducts>([]);

  useEffect(() => {
    setTodaySpecials(getRandomProducts(4));
  }, []);

  const refreshSpecials = () => {
    setTodaySpecials(getRandomProducts(4));
  };

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">⭐</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Today's Specials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Our carefully selected recommendations just for you
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshSpecials}
            className="px-6 py-3 bg-[#d4a574] text-white rounded-lg font-semibold hover:bg-[#c9a981] transition-all"
          >
            🔄 Refresh Specials
          </motion.button>
        </div>
      </section>

      {/* Specials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {todaySpecials.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
              >
                {/* Product Image */}
                <div className="relative h-64 cursor-pointer" onClick={() => router.push(`/menu/${product.id}`)}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Special Badge */}
                  <div className="absolute top-4 right-4 bg-[#d4a574] text-white px-3 py-1 rounded-full text-xs font-bold">
                    SPECIAL
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-[#e8dcc8] text-[#1a0f0a] rounded-full text-xs font-semibold uppercase mb-2">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold text-[#1a0f0a] mb-2 cursor-pointer hover:text-[#d4a574] transition-colors" 
                    style={{ fontFamily: 'Georgia, serif' }}
                    onClick={() => router.push(`/menu/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#d4a574]">{product.price}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/menu/${product.id}`)}
                    className="w-full py-3 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-xl transition-all"
                  >
                    Add to Order
                  </motion.button>
                </div>
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
              Want to See More?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Check out our full menu for all available items
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/menu')}
              className="px-10 py-4 bg-[#2d1810] text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              View Full Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
