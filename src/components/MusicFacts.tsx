'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, RotateCcw } from 'lucide-react';
import factsData from '@/data/facts.json';

const MusicFacts: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const facts = factsData.facts;
  const currentFact = facts[currentFactIndex];

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % facts.length);
  };

  const resetFacts = () => {
    setCurrentFactIndex(0);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-accent/10 to-primary/10">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 flex items-center justify-center gap-3 gradient-text">
          <Lightbulb className="w-8 h-8" />
          Music Facts
        </h2>

        {/* Fact Card */}
        <motion.div
          key={currentFactIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-morphism p-8 rounded-2xl mb-8 min-h-48 flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">{currentFact.title}</h3>
          <p className="text-lg text-gray-300 leading-relaxed">{currentFact.description}</p>
        </motion.div>

        {/* Progress */}
        <p className="text-gray-400 mb-6">
          Fact {currentFactIndex + 1} of {facts.length}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentFactIndex + 1) / facts.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button onClick={nextFact} className="btn-primary">
            Next Fact →
          </button>
          <button
            onClick={resetFacts}
            className="btn-outline flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default MusicFacts;
