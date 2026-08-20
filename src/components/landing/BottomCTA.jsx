import React from 'react';
import { motion } from 'framer-motion';

export default function BottomCTA() {
  return (
    <section className="relative bg-gradient-to-t from-purple-900/40 to-[#0a0a0a] pt-40 pb-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
        >
          Are you ready to see where your marks are actually going?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-purple-200/80 mb-12 font-medium"
        >
          Join the students already decoding the exam rubric.
        </motion.p>
        <motion.a 
          href="/login?mode=signup"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-white text-black px-12 py-6 rounded-full font-black text-2xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]"
        >
          Analyze Your First Answer — Free
        </motion.a>
      </div>
    </section>
  );
}
