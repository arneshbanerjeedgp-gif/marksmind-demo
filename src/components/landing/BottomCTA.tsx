import React from 'react';
import { motion } from 'framer-motion';

export default function BottomCTA() {
  return (
    <section className="relative bg-gradient-to-t from-purple-900/30 to-[#0a0a0a] pt-48 pb-40 overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter"
        >
          Ready to see where your marks are actually going?
        </motion.h2>
        <motion.a 
          href="/login?mode=signup"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-black px-16 py-8 rounded-full font-black text-3xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_100px_rgba(255,255,255,0.4)]"
        >
          Analyze Your First Answer — Free
        </motion.a>
      </div>
    </section>
  );
}
