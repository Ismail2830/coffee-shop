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
  // Dummy data for categories
  const dummyCategories: Category[] = [
    { id: '1', name: 'Hot Coffee', _count: { products: 4 } },
    { id: '2', name: 'Iced Coffee', _count: { products: 4 } },
    { id: '3', name: 'Food', _count: { products: 4 } },
    { id: '4', name: 'Dessert', _count: { products: 4 } }
  ];

  // Dummy data for products
  const dummyProducts: Product[] = [
    // Hot Coffee
    {
      id: '1',
      name: 'Classic Espresso',
      description: 'Rich and bold espresso shot made from premium beans',
      price: 25,
      categoryId: '1',
      category: { id: '1', name: 'Hot Coffee' },
      images: [{ id: '1', url: '/images/nathan-dumlao-6VhPY27jdps-unsplash.jpg' }]
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and velvety foam',
      price: 30,
      categoryId: '1',
      category: { id: '1', name: 'Hot Coffee' },
      images: [{ id: '2', url: '/images/joe-hepburn-EcWFOYOpkpY-unsplash.jpg' }]
    },
    {
      id: '3',
      name: 'Caramel Latte',
      description: 'Smooth latte with rich caramel syrup',
      price: 35,
      categoryId: '1',
      category: { id: '1', name: 'Hot Coffee' },
      images: [{ id: '3', url: '/images/kobe-kian-clata-U68opQoJwgE-unsplash.jpg' }]
    },
    {
      id: '4',
      name: 'Mocha',
      description: 'Coffee and chocolate combined with steamed milk',
      price: 35,
      categoryId: '1',
      category: { id: '1', name: 'Hot Coffee' },
      images: [{ id: '4', url: '/images/alana-harris-C63YZ33DdvY-unsplash.jpg' }]
    },
    // Iced Coffee
    {
      id: '5',
      name: 'Iced Latte',
      description: 'Chilled espresso with cold milk over ice',
      price: 35,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '5', url: '/images/nathan-dumlao-vZOZJH_xkUk-unsplash.jpg' }]
    },
    {
      id: '6',
      name: 'Cold Brew',
      description: 'Smooth cold-brewed coffee, less acidic',
      price: 30,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '6', url: '/images/pariwat-pannium-EIyVsrBb_BQ-unsplash.jpg' }]
    },
    {
      id: '7',
      name: 'Iced Mocha',
      description: 'Chocolate and espresso served over ice',
      price: 40,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '7', url: '/images/alana-harris-C63YZ33DdvY-unsplash.jpg' }]
    },
    {
      id: '8',
      name: 'Vanilla Iced Coffee',
      description: 'Refreshing iced coffee with vanilla flavor',
      price: 35,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '8', url: '/images/perry-merrity-ii-KDFB3AvmdXQ-unsplash.jpg' }]
    },
    // Food
    {
      id: '9',
      name: 'Croissant',
      description: 'Buttery and flaky French pastry',
      price: 20,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '9', url: '/images/kobby-mendez-iyM-XTsTiek-unsplash.jpg' }]
    },
    {
      id: '10',
      name: 'Bagel Sandwich',
      description: 'Toasted bagel with cream cheese and vegetables',
      price: 35,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '10', url: '/images/erwan-nonon-D5vE6tDzB80-unsplash.jpg' }]
    },
    {
      id: '11',
      name: 'Avocado Toast',
      description: 'Fresh avocado on sourdough with olive oil',
      price: 40,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '11', url: '/images/saymom-leao-SaWYeuOqEdo-unsplash.jpg' }]
    },
    {
      id: '12',
      name: 'Breakfast Wrap',
      description: 'Eggs, cheese, and vegetables wrapped in tortilla',
      price: 45,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '12', url: '/images/freddy-g-KEmgWXjxDok-unsplash.jpg' }]
    },
    // Dessert
    {
      id: '13',
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake with ganache',
      price: 30,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '13', url: '/images/umesh-soni-LDnmyOaA-ew-unsplash.jpg' }]
    },
    {
      id: '14',
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake',
      price: 35,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '14', url: '/images/kelsey-todd-nXsFPNyBqq4-unsplash.jpg' }]
    },
    {
      id: '15',
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      price: 35,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '15', url: '/images/inna-safa-BmrXxbVuqTc-unsplash.jpg' }]
    },
    {
      id: '16',
      name: 'Brownie',
      description: 'Fudgy chocolate brownie with walnuts',
      price: 25,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '16', url: '/images/anisa-mustafa-yRI0fojBUv8-unsplash.jpg' }]
    }
  ];

  const [categories, setCategories] = useState<Category[]>(dummyCategories);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [activeCategory, setActiveCategory] = useState<string>('1');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
