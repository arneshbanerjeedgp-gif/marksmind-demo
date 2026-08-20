import React from 'react';
import { motion } from 'framer-motion';

export default function StatsTicker() {
  const items = [
    "100% NCERT Alignment", "Zero Grammar Bias", "Micro-Diagnostic Grading", "Precision Feedback"
  ];

  return (
    <section className="border-y border-white/5 bg-black/40 py-6 overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-4 text-neutral-400 min-w-max px-8">
            <span className="text-lg font-semibold tracking-wide uppercase">{text}</span>
            <span className="text-purple-500 mx-4">•</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
