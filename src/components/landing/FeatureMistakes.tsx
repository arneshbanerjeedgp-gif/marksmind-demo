import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureMistakes() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-[40px] p-12 md:p-20 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-700 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-emerald-600/20 transition-colors duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">The Mistake Database</h3>
            <p className="text-xl text-neutral-400 leading-relaxed">Fix it once, never lose the mark again. Pattern recognition for your recurring conceptual gaps across Physics, Chemistry, and Biology.</p>
          </div>
          <div className="flex-1 w-full space-y-4">
             <div className="bg-black/80 rounded-2xl p-6 border border-white/5 flex justify-between items-center shadow-inner">
               <span className="text-white font-bold text-lg">Kinematics</span>
               <span className="bg-red-950/50 text-red-400 font-semibold px-4 py-1.5 rounded-lg border border-red-500/20 text-sm">Forgot "Rate of change"</span>
             </div>
             <div className="bg-black/80 rounded-2xl p-6 border border-white/5 flex justify-between items-center shadow-inner">
               <span className="text-white font-bold text-lg">Genetics</span>
               <span className="bg-red-950/50 text-red-400 font-semibold px-4 py-1.5 rounded-lg border border-red-500/20 text-sm">Confused DNA/RNA</span>
             </div>
             <div className="bg-black/80 rounded-2xl p-6 border border-white/5 flex justify-between items-center shadow-inner">
               <span className="text-white font-bold text-lg">Thermodynamics</span>
               <span className="bg-red-950/50 text-red-400 font-semibold px-4 py-1.5 rounded-lg border border-red-500/20 text-sm">Entropy definition</span>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
