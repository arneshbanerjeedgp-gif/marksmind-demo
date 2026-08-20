import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

export default function TheSolution() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="max-w-3xl mx-auto bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-purple-500/30 rounded-3xl p-10 relative overflow-hidden group shadow-[0_0_80px_rgba(168,85,247,0.15)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-purple-400" /> The MarksMind Engine
        </h3>
        
        <div className="space-y-6">
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 border-l-4 border-l-green-500 hover:bg-[#161616] transition-colors">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-green-400 uppercase tracking-widest">Concept Matched</span>
              <span className="bg-green-500/20 text-green-400 text-sm font-bold px-3 py-1 rounded">+2 Marks</span>
            </div>
            <p className="text-base text-neutral-300">Identified process: <strong className="text-white">Evaporation and Condensation</strong> based on temperature differences.</p>
          </div>
          
          <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-6 border-l-4 border-l-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:bg-purple-900/20 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">Microscopic Blind Spot</span>
              <span className="bg-neutral-800 text-neutral-400 text-sm font-bold px-3 py-1 rounded">-1 Mark</span>
            </div>
            <p className="text-base text-neutral-300">You forgot to mention the <strong className="text-white">Fractionating Column</strong> used to separate miscible liquids.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
