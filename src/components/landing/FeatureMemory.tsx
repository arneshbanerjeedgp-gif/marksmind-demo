import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureMemory() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-[40px] p-12 md:p-20 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-700 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 w-full order-2 md:order-1 flex justify-center">
             <div className="relative w-64 h-64">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="10" />
                 <motion.circle 
                   cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="283"
                   initial={{ strokeDashoffset: 283 }}
                   whileInView={{ strokeDashoffset: 283 * 0.15 }}
                   viewport={{ once: true }}
                   transition={{ duration: 2, ease: "easeOut" }}
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-5xl font-black text-white">85%</span>
                 <span className="text-sm font-bold text-neutral-400 mt-2 uppercase tracking-widest">Decay Risk</span>
               </div>
             </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">Smart Memory Decay</h3>
            <p className="text-xl text-neutral-400 leading-relaxed">Don't review what you already know. Our algorithm predicts exactly when you are about to forget a concept and prompts a revision right before exam day.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
