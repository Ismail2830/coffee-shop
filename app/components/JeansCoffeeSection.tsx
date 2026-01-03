'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function JeansCoffeeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#e8dcc8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:order-1 order-2"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl font-bold text-[#1a0f0a]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Jean's Coffee
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Discover Jean's Coffee – Premium Iced Coffee in Rabat. Beat the Moroccan heat with our signature cold brew, meticulously crafted from freshly roasted single-origin arabica beans. Every glass of Jean's iced coffee is expertly chilled and served over premium ice, delivering smooth, rich flavors without bitterness. Perfect for hot summers in Rabat-Salé-Kénitra, our iced coffee specialty is a favorite among office workers, students, and coffee enthusiasts seeking the best cold brew near you. Customizable with oat milk, almond milk, or classic cream, Jean's Coffee offers refreshing hydration paired with bold coffee intensity. Whether you prefer a simple iced americano or creamy iced latte, our baristas ensure every cup meets our exacting standards. Experience the perfect balance of temperature and taste. Order Jean's Coffee today and enjoy specialty iced beverages in Rabat!
            </motion.p>
            <Link href="/menu">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-xl transition-all"
            >
              Shop All
            </motion.button>
            </Link>

            {/* Decorative Letter */}
            <motion.div
              initial={{ opacity: 0, rotate: 20 }}
              animate={isInView ? { opacity: 0.05, rotate: 0 } : { opacity: 0, rotate: 20 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -left-10 top-0 text-[150px] font-bold text-[#1a0f0a]"
            >
              C
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:order-2 order-1"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-100 sm:h-125 bg-gray-300 rounded-lg overflow-hidden shadow-2xl"
            >
               {/* Coffee Latte Art Image */}
                            <Image
                              src="/images/kobe-kian-clata-U68opQoJwgE-unsplash.jpg"
                              alt="Latte Art Coffee"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />

              {/* Coffee Beans Decoration */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-10 right-10 text-4xl opacity-20"
              >
                ☕
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
