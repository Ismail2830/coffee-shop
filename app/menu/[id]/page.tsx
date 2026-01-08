'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  images: { id: string; url: string }[];
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Dummy products data
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
      images: [{ id: '3', url: '/images/diliara-garifullina-D7X-GMeTV7U-unsplash.jpg' }]
    },
    {
      id: '4',
      name: 'Mocha',
      description: 'Coffee and chocolate combined with steamed milk',
      price: 35,
      categoryId: '1',
      category: { id: '1', name: 'Hot Coffee' },
      images: [{ id: '4', url: '/images/american-heritage-chocolate-DoK5qEy2L60-unsplash.jpg' }]
    },
    // Iced Coffee
    {
      id: '5',
      name: 'Iced Latte',
      description: 'Chilled espresso with cold milk over ice',
      price: 35,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '5', url: '/images/jugoslocos-QD4yCjlD44A-unsplash.jpg' }]
    },
    {
      id: '6',
      name: 'Cold Brew',
      description: 'Smooth cold-brewed coffee, less acidic',
      price: 30,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '6', url: '/images/umesh-soni-LDnmyOaA-ew-unsplash.jpg' }]
    },
    {
      id: '7',
      name: 'Iced Mocha',
      description: 'Chocolate and espresso served over ice',
      price: 40,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '7', url: '/images/kobby-mendez-iyM-XTsTiek-unsplash.jpg' }]
    },
    {
      id: '8',
      name: 'Vanilla Iced Coffee',
      description: 'Refreshing iced coffee with vanilla flavor',
      price: 35,
      categoryId: '2',
      category: { id: '2', name: 'Iced Coffee' },
      images: [{ id: '8', url: '/images/gerson-cifuentes-JNhaaPEz3FY-unsplash.jpg' }]
    },
    // Food
    {
      id: '9',
      name: 'Croissant',
      description: 'Buttery and flaky French pastry',
      price: 20,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '9', url: '/images/patrick-tomasso-GXXYkSwndP4-unsplash.jpg' }]
    },
    {
      id: '10',
      name: 'Bagel Sandwich',
      description: 'Toasted bagel with cream cheese and vegetables',
      price: 35,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '10', url: '/images/mae-mu-kbch-i63YTg-unsplash.jpg' }]
    },
    {
      id: '11',
      name: 'Avocado Toast',
      description: 'Fresh avocado on sourdough with olive oil',
      price: 40,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '11', url: '/images/inna-safa-BmrXxbVuqTc-unsplash.jpg' }]
    },
    {
      id: '12',
      name: 'Breakfast Wrap',
      description: 'Eggs, cheese, and vegetables wrapped in tortilla',
      price: 45,
      categoryId: '3',
      category: { id: '3', name: 'Food' },
      images: [{ id: '12', url: '/images/saymom-leao-SaWYeuOqEdo-unsplash.jpg' }]
    },
    // Dessert
    {
      id: '13',
      name: 'Chocolate Cake',
      description: 'Rich chocolate layer cake with ganache',
      price: 30,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '13', url: '/images/american-heritage-chocolate-DoK5qEy2L60-unsplash.jpg' }]
    },
    {
      id: '14',
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake',
      price: 35,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '14', url: '/images/alana-harris-C63YZ33DdvY-unsplash.jpg' }]
    },
    {
      id: '15',
      name: 'Tiramisu',
      description: 'Classic Italian coffee-flavored dessert',
      price: 35,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '15', url: '/images/julian-lates-tPggQVZE-VI-unsplash.jpg' }]
    },
    {
      id: '16',
      name: 'Brownie',
      description: 'Fudgy chocolate brownie with walnuts',
      price: 25,
      categoryId: '4',
      category: { id: '4', name: 'Dessert' },
      images: [{ id: '16', url: '/images/kobby-mendez-iyM-XTsTiek-unsplash.jpg' }]
    }
  ];

  // Find current product
  const product = allProducts.find(p => p.id === params.id);
  
  // Find similar products from same category
  const similarProducts = product 
    ? allProducts.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3)
    : [];
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8dcc8]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1a0f0a]">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-[#e8dcc8]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#1a0f0a] mb-4">Product not found</h1>
            <button 
              onClick={() => router.push('/menu')}
              className="px-6 py-3 bg-[#1a0f0a] text-white rounded-lg"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToOrder = () => {
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.push({
        id: product.id,
        name: product.name,
        price: `${product.price} DH`,
        image: product.images[0]?.url || '/images/hero-section.png',
        quantity: quantity,
        category: product.category.name
      });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'));

    // Show success feedback
    alert(`Added ${quantity} ${product.name} to cart!`);
    
    // Reset quantity
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      {/* Product Details Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => router.push('/menu')}
            className="mb-8 flex items-center gap-2 text-[#1a0f0a] hover:text-[#d4a574] transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-semibold">Back to Menu</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 lg:h-150 rounded-2xl overflow-hidden shadow-2xl"
            >
              {product.images.length > 0 ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500 text-xl">No image available</span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 bg-[#d4a574] text-white rounded-full text-sm font-semibold uppercase mb-4">
                  {product.category.name}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a0f0a] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-[#d4a574] mb-6">{product.price} DH</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-gray-700 leading-relaxed"
              >
                {product.description || 'No description available'}
              </motion.p>

              {/* Quantity Selector */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="text-lg font-semibold text-[#1a0f0a]">Quantity:</span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#1a0f0a] shadow-md hover:bg-[#d4a574] hover:text-white transition-colors"
                  >
                    −
                  </motion.button>
                  <span className="text-2xl font-bold text-[#1a0f0a] w-12 text-center">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl font-bold text-[#1a0f0a] shadow-md hover:bg-[#d4a574] hover:text-white transition-colors"
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>

              {/* Add to Order Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02, backgroundColor: '#1a0f0a' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToOrder}
                className="w-full py-4 bg-[#2d1810] text-white rounded-lg text-lg font-bold hover:shadow-2xl transition-all"
              >
                Add to Order
              </motion.button>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-6 border-t border-gray-300 space-y-2 text-sm text-gray-600"
              >
                <p>✓ Freshly prepared</p>
                <p>✓ Premium ingredients</p>
                <p>✓ Available for dine-in and takeaway</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <section className="py-20 bg-[#c9a981]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-[#1a0f0a] text-center mb-12"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              You Might Also Like
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-lg overflow-hidden shadow-xl cursor-pointer"
                  onClick={() => router.push(`/menu/${item.id}`)}
                >
                  {item.images.length > 0 ? (
                    <div className="relative h-56">
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="h-56 bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#d4a574]">{item.price} DH</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description || 'No description'}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/menu/${item.id}`);
                      }}
                      className="w-full py-2 bg-[#2d1810] text-white rounded-md font-semibold hover:bg-[#1a0f0a] transition-all"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
