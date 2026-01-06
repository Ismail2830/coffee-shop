'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Category {
  id: string;
  name: string;
  _count?: {
    products: number;
  };
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string;
  category: Category;
  images: { id: string; url: string }[];
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);
      
      // Set first category as active
      if (categoriesData.length > 0) {
        setActiveCategory(categoriesData[0].id);
      }
      
      // Fetch all products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (product) => product.categoryId === activeCategory
  );

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
            {loading ? (
              <p className="text-gray-600">Loading categories...</p>
            ) : (
              categories.map((category, index) => (
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
                  {category.name}
                  {category._count && category._count.products > 0 && (
                    <span className="ml-2 text-sm opacity-70">({category._count.products})</span>
                  )}
                </motion.button>
              ))
            )}
          </motion.div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-full text-center text-gray-600">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">No products available in this category.</p>
            ) : (
              filteredProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                  className="bg-white rounded-lg p-6 shadow-lg cursor-pointer"
                  onClick={() => router.push(`/menu/${item.id}`)}
                >
                  {item.images.length > 0 && (
                    <img
                      src={item.images[0].url}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-2xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                      {item.name}
                    </h3>
                    <span className="text-xl font-bold text-[#d4a574]">{item.price} DH</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description || 'No description available'}</p>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/menu/${item.id}`);
                    }}
                    className="w-full py-2 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-lg transition-all"
                  >
                    Order
                  </motion.button>
                </motion.div>
              ))
            )}
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
