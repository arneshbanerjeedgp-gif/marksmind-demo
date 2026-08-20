import React from 'react';
import { motion } from 'framer-motion';

export default function TheSolution() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="max-w-4xl mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-purple-500/30 rounded-[40px] p-12 relative overflow-hidden group shadow-[0_0_100px_rgba(168,85,247,0.15)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-purple-900/5 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        <h3 className="text-4xl font-black text-white mb-10 tracking-tighter">The MarksMind Engine</h3>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 border-l-4 border-l-green-500 hover:bg-[#161616] transition-colors shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black text-green-400 uppercase tracking-widest">Concept Matched</span>
              <span className="bg-green-500/20 text-green-400 text-sm font-black px-4 py-1.5 rounded-md">+2 Marks</span>
            </div>
            <p className="text-xl text-neutral-300 leading-relaxed">Identified process: <strong className="text-white">Evaporation and Condensation</strong> based on temperature differences.</p>
          </div>
          
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8 border-l-4 border-l-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black text-purple-400 uppercase tracking-widest">Microscopic Blind Spot</span>
              <span className="bg-neutral-800 text-neutral-400 text-sm font-black px-4 py-1.5 rounded-md">-1 Mark</span>
            </div>
            <p className="text-xl text-neutral-300 leading-relaxed">You forgot to mention the <strong className="text-white">Fractionating Column</strong> used to separate miscible liquids.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
