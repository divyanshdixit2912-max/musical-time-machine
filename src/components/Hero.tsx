'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [100, 0, 100],
            y: [50, 0, 50],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Discover Your Music Soul
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Explore your musical personality, find songs that match your mood, and dive into
            the songs that defined your birth year.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <button className="btn-primary flex items-center justify-center gap-2">
            <Play className="w-5 h-5" />
            Start Exploring
          </button>
          <button className="btn-outline flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            Take Quiz
          </button>
        </motion.div>

        {/* Floating Album Covers */}
        <motion.div
          className="relative h-64 md:h-80 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl"
              animate={{
                y: [0, -20, 0],
                rotate: [-5 + index * 5, 5 + index * 5, -5 + index * 5],
              }}
              transition={{
                duration: 4 + index * 0.5,
                repeat: Infinity,
              }}
              style={{
                left: `${20 + index * 30}%`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                ♪
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
