'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Cappuccino',
    images: [
      '/images/luiz-carlos-santi-Pn6wH7ii-x4-unsplash.jpg',
      '/images/taylor-franz-GJogrGZxKJE-unsplash.jpg',
      '/images/david-o-andersen-KD0DYW6qBYQ-unsplash.jpg',
    ],
    description: 'Rich espresso with steamed milk foam',
  },
  {
    id: 2,
    name: 'Americano',
    images: [
      '/images/mehmet-talha-onuk-MBeY2m00Ybc-unsplash.jpg',
      '/images/gerson-cifuentes-JNhaaPEz3FY-unsplash.jpg',
      '/images/daniel-lopez-PhgtXFmTLXc-unsplash.jpg',
    ],
    description: 'Bold espresso with hot water',
  },
  {
    id: 3,
    name: 'Espresso',
    images: [
      '/images/jeremy-yap-jn-HaGWe4yw-unsplash.jpg',
      '/images/l-d-i-a-dQdyO9jsixA-unsplash.jpg',
      '/images/andreas-behr-b9zaa7_1GC8-unsplash.jpg',
    ],
    description: 'Pure concentrated coffee shot',
  },
];

const categories = ['All', 'Coffee', 'Drinks', 'Food', 'Desserts'];

export default function BestSellingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  const handleNextImage = (productId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % totalImages
    }));
  };

  const handlePrevImage = (productId: number, totalImages: number) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + totalImages) % totalImages
    }));
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#c9a981]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Best Selling Item
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover our most popular coffee creations, expertly crafted from premium beans and loved by coffee enthusiasts. Each cup delivers exceptional flavor, rich aroma, and the perfect balance of strength and smoothness.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-[#1a0f0a] text-white shadow-lg'
                  : 'bg-transparent text-[#1a0f0a] border-2 border-[#1a0f0a]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#e8dcc8] rounded-lg overflow-hidden shadow-xl"
            >
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative h-64 bg-linear-to-br from-amber-900 to-amber-700 overflow-hidden"
              >
                <Image
                  src={product.images[currentImageIndexes[product.id]]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-lg z-10" />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage(product.id, product.images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1a0f0a] font-bold shadow-lg transition-all hover:scale-110 z-20"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage(product.id, product.images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center text-[#1a0f0a] font-bold shadow-lg transition-all hover:scale-110 z-20"
                >
                  ›
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                  {product.images.map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndexes(prev => ({
                          ...prev,
                          [product.id]: imgIndex
                        }));
                      }}
                      className={`h-2 rounded-full transition-all ${
                        currentImageIndexes[product.id] === imgIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/75 w-2'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-6 text-center space-y-4">
                <h3 className="text-2xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-xl transition-all"
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#1a0f0a] text-white rounded-full flex items-center justify-center hover:bg-[#2d1810] transition-colors"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-[#1a0f0a] text-white rounded-full flex items-center justify-center hover:bg-[#2d1810] transition-colors"
          >
            →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
