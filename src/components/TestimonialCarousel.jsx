import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Vishal Logistics Solutions has been instrumental in streamlining our supply chain. Their global network and reliable service have helped us expand our business internationally without any logistical headaches.",
    company: "Khatema Fibres Limited",
    logo: "/images/logo1.png",
  },
  {
    id: 2,
    quote: "The team at Vishal Logistics has consistently delivered exceptional service. Their 24/7 support and competitive rates have made them our preferred logistics partner for all our shipping needs.",
    company: "Global Paper Link",
    logo: "/images/logo2.png",
  },
  {
    id: 3,
    quote: "I've been impressed with Vishal's Team attention to detail and commitment to deadline adherence. They've proven to be an invaluable partner for our logistics needs, especially for time-sensitive shipments.",
    company: "Cosmos Chemistry",
    logo: "/images/logo3.png",
  },
];

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        setDirection(1);
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      });
    }, 3000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (autoplay && !isHovering) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [autoplay, isHovering]);

  const handleDotClick = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="py-12 bg-gradient-to-br from-primary-50/80 via-white to-primary-50/80 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-primary-100 rounded-full opacity-10 blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary-100 rounded-full opacity-10 blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-2">
            Client Testimonials
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 font-display tracking-tight">
            Trusted by <span className="text-primary-600">Industry Leaders</span>
          </h2>
        </motion.div>

        <div 
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="bg-white rounded-xl border border-primary-100/30 p-6 relative z-10">
                  {/* Simplified content box without shadows */}
                  <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    {/* Logo section - keeping the size */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg"></div>
                      <div className="absolute inset-2 bg-white rounded-md flex items-center justify-center p-2">
                        <img
                          src={testimonials[current].logo}
                          alt={`${testimonials[current].company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </motion.div>

                    {/* Testimonial Content */}
                    <div className="text-left flex-1">
                      <blockquote className="text-base md:text-lg text-secondary-700 mb-4 leading-relaxed italic">
                        "{testimonials[current].quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <div className="h-0.5 w-8 bg-primary-400 rounded mr-3"></div>
                        <div className="font-bold text-secondary-800">
                          {testimonials[current].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Simple Static Dots - No animations */}
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="focus:outline-none"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  current === index
                    ? 'bg-primary-600'
                    : 'bg-secondary-300 hover:bg-secondary-400'
                }`}/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;