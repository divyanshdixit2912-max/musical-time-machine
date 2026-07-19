'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import quotesData from '@/data/quotes.json';

const QuoteGenerator: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const quotes = quotesData.quotes;
  const currentQuote = quotes[currentQuoteIndex];

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text flex items-center justify-center gap-3">
          <Quote className="w-8 h-8" />
          Inspirational Quotes
        </h2>

        {/* Quote Card */}
        <motion.div
          key={currentQuoteIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass-morphism p-12 rounded-2xl text-center mb-8"
        >
          <Quote className="w-12 h-12 text-primary mx-auto mb-6 opacity-50" />
          <p className="text-2xl md:text-3xl font-bold mb-6 leading-relaxed">
            "{currentQuote.text}"
          </p>
          <p className="text-lg text-gray-400">— {currentQuote.author}</p>
        </motion.div>

        {/* Progress */}
        <p className="text-center text-gray-400 mb-6">
          Quote {currentQuoteIndex + 1} of {quotes.length}
        </p>

        {/* Button */}
        <div className="flex justify-center">
          <button onClick={nextQuote} className="btn-primary">
            Get Another Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default QuoteGenerator;
