'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const values = [
  {
    icon: '☕',
    title: 'Quality First',
    description: 'We source the finest beans from around the world and roast them to perfection.',
  },
  {
    icon: '❤️',
    title: 'Made With Love',
    description: 'Every cup is crafted with passion and attention to detail by our expert baristas.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'We are committed to ethical sourcing and environmentally friendly practices.',
  },
  {
    icon: '👥',
    title: 'Community',
    description: 'We believe in creating a warm, welcoming space for everyone to enjoy.',
  },
];

const team = [
  { name: 'Ismail', role: 'Founder & Head Roaster', avatar: '/images/avatar1.jpg' },
  { name: 'Sarah', role: 'Master Barista', avatar: '/images/avatar2.jpg' },
  { name: 'Michael', role: 'Coffee Sommelier', avatar: '/images/avatar3.jpg' },
  { name: 'Emma', role: 'Pastry Chef', avatar: '/images/avatar2.jpg' },
];

export default function AboutPage() {
  const valuesRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen bg-[#e8dcc8]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              About Coffee Ismail
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Brewing Excellence Since 2005 - Where Passion Meets Perfection
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20 bg-[#e8dcc8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Coffee Ismail began with a simple dream: to bring the authentic taste of artisanal 
                  coffee to our community. What started as a small family-owned café has grown into 
                  a beloved local institution.
                </p>
                <p>
                  For over 20 years, we've been dedicated to sourcing the finest beans from sustainable 
                  farms around the world. Our master roasters carefully craft each batch to bring out 
                  the unique flavors and aromas that make every cup special.
                </p>
                <p>
                  Today, we continue to honor our roots while embracing innovation, always putting 
                  quality and community at the heart of everything we do.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 sm:h-125 bg-linear-to-br from-amber-900 to-amber-700 rounded-lg shadow-2xl overflow-hidden"
            >
              <Image
                src="/images/patrick-tomasso-GXXYkSwndP4-unsplash.jpg"
                alt="Coffee Ismail Excellence"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                <p className="text-white text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>20+ Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-linear-to-r from-[#c9a981] to-[#d4b896]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] text-center mb-16"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-lg p-8 text-center shadow-xl"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-[#1a0f0a] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-[#e8dcc8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold text-[#1a0f0a] text-center mb-16"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                className="bg-white rounded-lg p-8 text-center shadow-lg"
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden shadow-lg relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1a0f0a] mb-2">{member.name}</h3>
                <p className="text-[#d4a574] font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-[#1a0f0a] via-[#2d1810] to-[#1a0f0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Visit Us Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the Coffee Ismail difference for yourself
            </p>
            <motion.a
              href="https://www.google.com/maps/place/Facult%C3%A9+des+Sciences+de+Rabat/@34.0121515,-6.8386693,3738m/data=!3m1!1e3!4m6!3m5!1s0xda76c80825a1893:0xbf497c49ab56246a!8m2!3d34.0079673!4d-6.8382388!16s%2Fg%2F121v7kcb?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: '#d4a574' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-white text-[#1a0f0a] rounded-lg font-semibold text-lg hover:shadow-xl transition-all"
            >
              Find Our Location
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
