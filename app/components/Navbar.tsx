'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [visitCount, setVisitCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<number>(0);

  // Function to get user location
  useEffect(() => {
    const getUserLocation = async () => {
      // Only run on client side
      if (typeof window === 'undefined') return;
      
      // Check if geolocation is available
      if (!navigator.geolocation) {
        setLocation('Geolocation not supported');
        return;
      }

      // Request user's permission for location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Use reverse geocoding to get city and country
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
              {
                headers: {
                  'User-Agent': 'CoffeeShop/1.0'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              const city = data.address.city || data.address.town || data.address.village || 'Unknown';
              const country = data.address.country || 'Unknown';
              setLocation(`${city}, ${country}`);
            } else {
              setLocation('Location unavailable');
            }
          } catch (error) {
            console.error('Error fetching location details:', error);
            setLocation('Location unavailable');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            setLocation('Permission denied');
          } else {
            setLocation('Location unavailable');
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0
        }
      );
    };

    // Add a small delay to ensure client-side rendering
    const timer = setTimeout(() => {
      getUserLocation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  
  
  useEffect(() => {
    const trackVisits = () => {
      // Check if we already tracked this session
      const sessionTracked = sessionStorage.getItem('visitTracked');
      
      if (!sessionTracked) {
        const visits = localStorage.getItem('websiteVisits');
        const currentCount = visits ? parseInt(visits, 10) + 1 : 1;
        localStorage.setItem('websiteVisits', currentCount.toString());
        setVisitCount(currentCount);
        
        // Mark this session as tracked
        sessionStorage.setItem('visitTracked', 'true');
      } else {
        // Just read the existing count
        const visits = localStorage.getItem('websiteVisits');
        setVisitCount(visits ? parseInt(visits, 10) : 0);
      }
    };

    trackVisits();
  }, []);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCartItems = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        try {
          const cartData = JSON.parse(cart);
          const totalItems = Array.isArray(cartData) ? cartData.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
          setCartItems(totalItems);
        } catch (error) {
          console.error('Error parsing cart data:', error);
          setCartItems(0);
        }
      }
    };

    loadCartItems();

    // Listen for storage changes (cart updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCartItems();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-page cart updates
    const handleCartUpdate = () => {
      loadCartItems();
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1a0f0a]/95 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-white text-2xl font-bold tracking-wider ml-12 px-4 cursor-pointer"
            >
              Coffee Ismail
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'About Us', path: '/about' },
              { name: 'Opening Hours', path: '/hours' },
              { name: 'Contact', path: '/contact' },
            ].map((item, index) => (
              <Link key={item.name} href={item.path}>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.1, color: '#d4a574' }}
                  className="text-white hover:text-[#d4a574] transition-colors cursor-pointer"
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            
            {/* Location Display */}
            <div className="flex items-center gap-2 text-[#d4a574] text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location || 'Loading...'}</span>
            </div>

            {/* Visit Counter */}
            <div className="flex items-center gap-2 text-[#d4a574] text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Visits: {visitCount}</span>
            </div>

            {/* Shopping Cart */}
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white hover:text-[#d4a574] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#d4a574] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>

        

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {[
              { name: 'Home', path: '/' },
              { name: 'Menu', path: '/menu' },
              { name: 'About Us', path: '/about' },
              { name: 'Opening Hours', path: '/hours' },
              { name: 'Contact', path: '/contact' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block text-white hover:text-[#d4a574] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Location Display */}
            <div className="flex items-center gap-2 text-[#d4a574] text-sm pt-2 border-t border-[#d4a574]/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location || 'Loading...'}</span>
            </div>

            {/* Mobile Visit Counter */}
            <div className="flex items-center gap-2 text-[#d4a574] text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>Visits: {visitCount}</span>
            </div>

            {/* Mobile Shopping Cart */}
            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <div className="flex items-center gap-2 text-[#d4a574] text-sm pt-2 border-t border-[#d4a574]/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Shopping Cart ({cartItems})</span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
