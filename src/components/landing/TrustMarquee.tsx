import React from 'react';
import { motion } from 'framer-motion';

export default function TrustMarquee() {
  const items = [
    "100% NCERT Alignment", "Zero Grammar Bias", "Micro-Diagnostic Grading", "₹0 Marginal Cost"
  ];

  return (
    <section className="bg-[#050505] border-y border-white/5 py-8 overflow-hidden flex">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...items, ...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center min-w-max px-12">
            <span className="text-lg font-black tracking-widest uppercase text-neutral-600">{text}</span>
            <span className="text-purple-500/30 mx-12">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
