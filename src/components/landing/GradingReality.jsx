import React from 'react';
import { motion } from 'framer-motion';
import { FileX, BrainCircuit } from 'lucide-react';

export default function GradingReality() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">The Grading Reality</h2>
        <p className="text-neutral-400 text-lg">Stop settling for a red pen without an explanation.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        <motion.div 
          className="bg-[#161616] border border-white/5 rounded-3xl p-8 lg:p-10 relative overflow-hidden group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>
          <h3 className="text-xl font-bold text-neutral-300 mb-6 flex items-center gap-2">
            <FileX className="w-5 h-5 text-red-400" /> The Old Way
          </h3>
          
          <div className="bg-white rounded p-6 shadow-inner relative transform -rotate-1 transition-transform group-hover:rotate-0">
            <div className="absolute right-4 top-4 border-4 border-red-500 text-red-500 font-bold text-4xl rounded-full w-20 h-20 flex items-center justify-center opacity-80 transform rotate-12">
              4/10
            </div>
            <p className="text-black font-serif text-lg leading-relaxed mt-12 mb-4 line-through decoration-red-500/30">
              The heat make liquid go up and it cold down to come out separate.
            </p>
            <p className="text-red-600 font-handwriting font-bold text-xl mt-8">
              Poor grammar! Incomplete!
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-[#1a1a1a] border border-purple-500/30 rounded-3xl p-8 lg:p-10 relative overflow-hidden group shadow-[0_0_40px_rgba(168,85,247,0.1)]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-400" /> The MarksMind Way
          </h3>
          
          <div className="space-y-4">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-5 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Concept Matched</span>
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded">+2 Marks</span>
              </div>
              <p className="text-sm text-neutral-300">Identified process: <strong className="text-white">Evaporation and Condensation</strong> based on temperature differences.</p>
            </div>
            
            <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-5 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Missing Keyword Gap</span>
                <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded">-1 Mark</span>
              </div>
              <p className="text-sm text-neutral-300">You forgot to mention the <strong className="text-white">Fractionating Column</strong> used to separate miscible liquids.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
