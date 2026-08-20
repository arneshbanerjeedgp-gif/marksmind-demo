import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

export default function FeatureMemory() {
  return (
    <section className="py-8 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 w-full order-2 md:order-1">
            <div className="bg-black/60 rounded-2xl p-8 border border-white/5 flex items-center justify-center">
               <div className="relative w-40 h-40">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="#222" strokeWidth="10" />
                   <motion.circle 
                     cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="283"
                     initial={{ strokeDashoffset: 283 }}
                     whileInView={{ strokeDashoffset: 283 * 0.15 }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-bold text-white">85%</span>
                   <span className="text-xs text-neutral-400">Decay Risk</span>
                 </div>
               </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20">
              <RefreshCcw className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Feature 2: Smart Memory Decay</h3>
            <p className="text-xl text-neutral-400 leading-relaxed">Don't review what you already know. Our algorithm predicts exactly when you are about to forget a concept and prompts a revision right before exam day.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
