'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const schedule = [
  {
    day: 'Monday',
    breakfast: '7:00 AM - 11:00 AM',
    lunch: '12:00 PM - 3:00 PM',
    isOpen: true,
  },
  {
    day: 'Tuesday',
    breakfast: '7:00 AM - 11:00 AM',
    lunch: '12:00 PM - 3:00 PM',
    isOpen: true,
  },
  {
    day: 'Wednesday',
    breakfast: '7:00 AM - 11:00 AM',
    lunch: '12:00 PM - 3:00 PM',
    isOpen: true,
  },
  {
    day: 'Thursday',
    breakfast: '7:00 AM - 11:00 AM',
    lunch: '12:00 PM - 3:00 PM',
    isOpen: true,
  },
  {
    day: 'Friday',
    breakfast: '7:00 AM - 11:00 AM',
    lunch: '12:00 PM - 3:00 PM',
    isOpen: true,
  },
  {
    day: 'Saturday',
    breakfast: '8:00 AM - 12:00 PM',
    lunch: '1:00 PM - 4:00 PM',
    isOpen: true,
  },
  {
    day: 'Sunday',
    breakfast: '8:00 AM - 12:00 PM',
    lunch: '1:00 PM - 4:00 PM',
    isOpen: true,
  },
];

export default function OpeningHoursPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
            <span className="text-6xl">🕐</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Opening Hours
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Visit us during our breakfast and lunch service hours
          </motion.p>
        </div>
      </section>

      {/* Schedule Table Section */}
      <section ref={ref} className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Table Header */}
            <div className="bg-linear-to-r from-[#1a0f0a] to-[#2d1810] p-6">
              <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: 'Georgia, serif' }}>
                Weekly Schedule
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#c9a981]">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-bold text-[#1a0f0a]">Day</th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-[#1a0f0a]">Breakfast</th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-[#1a0f0a]">Lunch</th>
                    <th className="px-6 py-4 text-left text-lg font-bold text-[#1a0f0a]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <motion.tr
                      key={item.day}
                      initial={{ opacity: 0, x: -50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`border-b border-gray-200 hover:bg-[#e8dcc8] transition-colors ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-5">
                        <span className="font-bold text-[#1a0f0a] text-lg">{item.day}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🍳</span>
                          <span className="text-gray-700">{item.breakfast}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🍽️</span>
                          <span className="text-gray-700">{item.lunch}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {item.isOpen ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Open
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Closed
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-[#e8dcc8] p-6 space-y-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">☕</span>
                <p className="text-gray-700">
                  <strong>All-day Coffee:</strong> We serve our specialty coffee drinks throughout all operating hours
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <p className="text-gray-700">
                  <strong>Reservations:</strong> Call us for group reservations or special events
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <p className="text-gray-700">
                  <strong>Special Hours:</strong> Hours may vary on public holidays - please call ahead
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-8 shadow-xl text-center"
            >
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-[#1a0f0a] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Visit Us
              </h3>
              <p className="text-gray-700 mb-4">
                Faculté des Sciences de Rabat<br />
                Rabat, Morocco
              </p>
              <motion.a
                href="https://www.google.com/maps/place/Facult%C3%A9+des+Sciences+de+Rabat/@34.0121515,-6.8386693,3738m/data=!3m1!1e3!4m6!3m5!1s0xda76c80825a1893:0xbf497c49ab56246a!8m2!3d34.0079673!4d-6.8382388!16s%2Fg%2F121v7kcb?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 py-3 bg-[#2d1810] text-white rounded-lg font-semibold hover:bg-[#1a0f0a] transition-all"
              >
                Get Directions
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-xl text-center"
            >
              <div className="text-5xl mb-4">☎️</div>
              <h3 className="text-2xl font-bold text-[#1a0f0a] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Us
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> +212 XXX-XXXX
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Email:</strong> info@coffeeismail.com
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#2d1810] text-white rounded-lg font-semibold hover:bg-[#1a0f0a] transition-all"
              >
                Call Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
