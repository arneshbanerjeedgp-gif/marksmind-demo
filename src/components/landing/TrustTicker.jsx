import React from 'react';
import { motion } from 'framer-motion';

export default function TrustTicker() {
  const items = [
    "100% NCERT Alignment", "Zero Grammar Bias", "Micro-Diagnostic Grading", "Elite Tutoring, ₹0 Marginal Cost"
  ];

  return (
    <section className="border-y border-white/5 bg-[#050505] py-6 overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-4 text-neutral-500 min-w-max px-8">
            <span className="text-sm md:text-lg font-bold tracking-widest uppercase">{text}</span>
            <span className="text-purple-500/50 mx-4">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
