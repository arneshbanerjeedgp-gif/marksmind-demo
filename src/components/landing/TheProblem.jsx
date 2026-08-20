import React from 'react';
import { motion } from 'framer-motion';

export default function TheProblem() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">You aren't failing science.<br/><span className="text-red-500">You're failing the rubric.</span></h2>
        <p className="text-neutral-400 text-xl max-w-2xl mx-auto">Studying for 10 hours just to lose marks because of a missing keyword. A red pen marking "4/10" with zero explanation.</p>
      </motion.div>

      <motion.div 
        className="max-w-3xl mx-auto bg-[#121212] border border-white/5 rounded-3xl p-10 relative overflow-hidden group shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/30"></div>
        
        <div className="bg-neutral-900 rounded-xl p-8 shadow-inner relative transform transition-transform group-hover:scale-[1.02] duration-500">
          <div className="absolute right-6 top-6 border-4 border-red-500/80 text-red-500 font-bold text-5xl rounded-full w-24 h-24 flex items-center justify-center opacity-80 transform rotate-12">
            4/10
          </div>
          <p className="text-neutral-300 font-serif text-xl leading-relaxed mt-12 mb-6 line-through decoration-red-500/40 decoration-2">
            The heat make liquid go up and it cold down to come out separate.
          </p>
          <p className="text-red-500 font-handwriting font-bold text-2xl mt-8">
            Poor grammar! Incomplete!
          </p>
        </div>
      </motion.div>
    </section>
  );
}
