'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#1a0f0a] text-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Left - Brand & Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold tracking-wider"
            >
              Coffee Ismail
            </motion.h3>
            <p className="text-gray-400 leading-relaxed">
              Enjoy Better And Better Coffee With Caffeine
            </p>
          </motion.div>

          {/* Middle - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <motion.a
              whileHover={{ x: 5, color: '#d4a574' }}
              href="mailto:Caffeine@Gmail.Com"
              className="block text-gray-400 hover:text-[#d4a574] transition-colors"
            >
              contact@CoffeeIsmail.com
            </motion.a>
            <motion.a
              whileHover={{ x: 5, color: '#d4a574' }}
              href="tel:+12032525262"
              className="block text-gray-400 hover:text-[#d4a574] transition-colors"
            >
              Call Us: (+212) 252 - 5262
            </motion.a>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-400"
            >
              Text Us: (+212) 252 - 5262
            </motion.p>
          </motion.div>

          {/* Right - Address & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="text-xl font-bold mb-6">Follow Us</h4>
            <motion.p
              whileHover={{ x: 5 }}
              className="text-gray-400"
            >
              Bloc T9 Kamra yac-Almansour Rabat
            </motion.p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: 'in', label: 'LinkedIn' },
                { icon: 'f', label: 'Facebook' },
                { icon: 'P', label: 'Pinterest' },
                { icon: '@', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, backgroundColor: '#d4a574' }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center hover:border-[#d4a574] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm"
        >
          <p>Copyright 2025 Ismail Digital Agency</p>
        </motion.div>
      </div>
    </footer>
  );
}
