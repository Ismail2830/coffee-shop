'use client';

import { motion } from 'framer-motion';

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
          Orders Management
        </h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-12 text-center"
      >
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Orders Feature Coming Soon</h2>
        <p className="text-gray-600">This page will display all customer orders and their status.</p>
      </motion.div>
    </div>
  );
}
