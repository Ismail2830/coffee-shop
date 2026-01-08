'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    // TODO: Implement newsletter API integration
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-linear-to-r from-[#c9a981] to-[#d4b896]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a0f0a]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Stay Up To Date On All News And Offers.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-700 text-lg"
            >
              Be The First Person About New Collections, Special Offers, Promotions And More!
            </motion.p>

            {/* Email Input */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 rounded-lg bg-white border-2 border-transparent focus:border-[#1a0f0a] outline-none transition-all text-gray-800"
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-[#2d1810] text-white rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                →
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Right - Decorative Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
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
              className="relative h-64 sm:h-80 bg-linear-to-br from-amber-900 to-amber-700 rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Coffee Image */}
              <Image
                src="/images/nathan-dumlao-6VhPY27jdps-unsplash.jpg"
                alt="Coffee Newsletter"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute bottom-4 left-4 w-20 h-20 border-2 border-white/30 rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
