import React from 'react';
import { motion } from 'framer-motion';

export default function TheProblem() {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter">You aren't failing science.<br/><span className="text-red-500">You're failing the rubric.</span></h2>
        <p className="text-neutral-400 text-2xl max-w-3xl mx-auto leading-relaxed">Studying for 10 hours just to lose marks because of a missing keyword. A red pen marking "4/10" with zero explanation.</p>
      </motion.div>

      <motion.div 
        className="max-w-4xl mx-auto bg-[#121212] border border-white/5 rounded-[40px] p-12 relative overflow-hidden group shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-red-900/5 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-red-500/50"></div>
        
        <div className="bg-black/80 rounded-2xl p-10 border border-white/5 relative transform transition-transform group-hover:scale-[1.01] duration-700">
          <div className="absolute right-8 top-8 border-4 border-red-500 text-red-500 font-black text-6xl rounded-full w-32 h-32 flex items-center justify-center opacity-90 transform rotate-12 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            4/10
          </div>
          <p className="text-neutral-400 font-serif text-2xl leading-relaxed mt-16 mb-8 line-through decoration-red-500/50 decoration-4">
            The heat make liquid go up and it cold down to come out separate.
          </p>
          <div className="inline-block bg-red-950/50 border border-red-500/30 px-6 py-3 rounded-lg">
            <p className="text-red-500 font-bold tracking-widest uppercase text-sm">Examiner Comment: Poor grammar! Incomplete!</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
