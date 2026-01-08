'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: { id: string; url: string }[];
}

const allProducts: Product[] = [
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

const categories = [
  { id: 'all', name: 'All' },
  { id: '1', name: 'Hot Coffee' },
  { id: '2', name: 'Iced Coffee' },
  { id: '3', name: 'Food' },
  { id: '4', name: 'Dessert' }
];

export default function BestSellingSection() {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  // Get 3 random products from an array
  const getRandomProducts = (products: Product[], count: number = 3): Product[] => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Update displayed products when category changes
  useEffect(() => {
    if (activeCategory === 'all') {
      // Show 3 random products from all categories
      setDisplayProducts(getRandomProducts(allProducts, 3));
    } else {
      // Show 3 random products from selected category
      const filtered = allProducts.filter(p => p.categoryId === activeCategory);
      setDisplayProducts(getRandomProducts(filtered, 3));
    }
  }, [activeCategory]);

  const handleOrderNow = (productId: string) => {
    router.push(`/menu/${productId}`);
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
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-[#1a0f0a] text-white shadow-lg'
                  : 'bg-transparent text-[#1a0f0a] border-2 border-[#1a0f0a]'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
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
                className="relative h-64 bg-linear-to-br from-amber-900 to-amber-700 overflow-hidden cursor-pointer"
                onClick={() => handleOrderNow(product.id)}
              >
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Decorative border */}
                <div className="absolute inset-4 border-2 border-white/20 rounded-lg z-10" />
              </motion.div>

              {/* Content */}
              <div className="p-6 text-center space-y-4">
                <span className="inline-block px-3 py-1 bg-[#d4a574] text-white text-xs font-semibold rounded-full">
                  {product.category.name}
                </span>
                <h3 className="text-2xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-xl font-bold text-[#d4a574]">{product.price} DH</p>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#1a0f0a' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOrderNow(product.id)}
                  className="w-full py-3 bg-[#2d1810] text-white rounded-md font-semibold hover:shadow-xl transition-all"
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
