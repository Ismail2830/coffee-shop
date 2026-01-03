'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CoffeeHeavenSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-[#e8dcc8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-100 sm:h-125 bg-gray-300 rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Coffee Latte Art Image */}
              <Image
                src="/images/joe-hepburn-EcWFOYOpkpY-unsplash.jpg"
                alt="Latte Art Coffee"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Decorative Letter */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-10 -left-10 text-[200px] font-bold text-white"
              >
                C
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl sm:text-5xl font-bold text-[#1a0f0a]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Coffee Heaven
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Welcome to Coffee Heaven Your Premier Coffee Shop in Rabat. Discover the perfect blend of premium specialty coffee and warm hospitality in the heart of Rabat, Morocco. Our expert baristas craft handpicked arabica and robusta beans, roasted fresh daily to deliver bold, smooth flavors in every sip. From velvety lattes and cappuccinos to rich espresso shots and refreshing cold brew, Coffee Heaven is your destination for the best coffee near you. Whether you're a coffee connoisseur seeking pour-over perfection or simply craving a cozy spot with free Wi-Fi, we welcome remote workers, students, and coffee lovers alike. Indulge in our artisan pastries, Moroccan treats, and seasonal specials while enjoying our welcoming ambiance. Find us in the Rabat-Salé-Kénitra region—where exceptional coffee quality meets authentic Moroccan charm. Your perfect cup awaits!
            </motion.p>
            <Link href="/menu">
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-xl transition-all"
            >
              Shop All
            </motion.button>
            </Link>

            {/* Decorative Letter */}
            <motion.div
              initial={{ opacity: 0, rotate: -20 }}
              animate={isInView ? { opacity: 0.05, rotate: 0 } : { opacity: 0, rotate: -20 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -right-10 top-0 text-[150px] font-bold text-[#1a0f0a]"
            >
              H
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
