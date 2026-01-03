'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Shehzana Houten',
    text: 'I Have Tasted Caffeine Coffee Many Times, Really Amazing To Use The 1 And Chocolate Are Very Good. Ectremely, Great Service. Must Enjoyed It And I\'ll Be Glad To Come Again !!!!',
    rating: 5,
    image: '/images/avatar2.jpg',
  },
  {
    id: 2,
    name: 'John Smith',
    text: 'Amazing coffee experience! The atmosphere is perfect and the baristas really know their craft. Best coffee in town!',
    rating: 5,
    image: '/images/avatar1.jpg',
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    text: 'Absolutely love this place! The coffee quality is exceptional and the service is always friendly. Highly recommend!',
    rating: 5,
    image: '/images/avatar3.jpg',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-linear-to-br from-[#e8dcc8] to-[#d4c5a9]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1a0f0a]" style={{ fontFamily: 'Georgia, serif' }}>
            What Our Customer Says
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#c9a981] rounded-full flex items-center justify-center hover:bg-[#b89871] transition-colors shadow-lg"
          >
            ←
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-[#c9a981] rounded-full flex items-center justify-center hover:bg-[#b89871] transition-colors shadow-lg"
          >
            →
          </motion.button>

          {/* Testimonial Content */}
          <div className="mx-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-[#1a0f0a] rounded-lg p-8 sm:p-12 shadow-2xl"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-[#d4a574] overflow-hidden shadow-lg relative"
                  >
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-white text-lg sm:text-xl leading-relaxed max-w-3xl"
                  >
                    "{testimonials[currentIndex].text}"
                  </motion.p>

                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex gap-2"
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                        className="text-[#d4a574] text-2xl"
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white text-xl font-semibold"
                  >
                    {testimonials[currentIndex].name}
                  </motion.h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-3 mt-8"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#1a0f0a] w-8' : 'bg-[#c9a981]'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
