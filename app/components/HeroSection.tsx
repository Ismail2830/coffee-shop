'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10 z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight "
            >
              Discover The Art Of Perfect Coffee
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-300 text-lg max-w-xl"
            >
              Experience The Rich And Bold Flavours Of Our Signature Blend. Made With Passion, Served With Pride. Every Cup Tells A Story.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212, 165, 116, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-[#1a0f0a] rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start your day
                </motion.button>
              </Link>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-8 pt-12"
            >
              {[
                { value: '20+', label: 'Years Experience' },
                { value: '20+', label: 'Master Barista' },
                { value: '5k+', label: 'Happy Customer' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-[#d4a574]">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Coffee Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative h-125 lg:h-150"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-full h-full"
            >
              {/* Coffee Cup Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-md">
                  {/* Decorative circles */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity 
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4a574] rounded-full blur-3xl"
                  />
                  
                  {/* Coffee Image */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <Image
                      src="/without-bg.png"
                      alt="Coffee Cup"
                      width={500}
                      height={500}
                      className="object-contain w-full h-full drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-20 right-10 w-20 h-20 border-2 border-[#d4a574] rounded-full opacity-20"
      />
      <motion.div
        animate={{ 
          rotate: -360,
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute bottom-20 left-10 w-32 h-32 border-2 border-[#d4a574] rounded-full opacity-20"
      />
    </section>
  );
}
