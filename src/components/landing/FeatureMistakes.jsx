import React from 'react';
import { motion } from 'framer-motion';
import { Database } from 'lucide-react';

export default function FeatureMistakes() {
  return (
    <section className="py-8 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-emerald-600/20 transition-colors duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
              <Database className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Feature 3: The Mistake Database</h3>
            <p className="text-xl text-neutral-400 leading-relaxed">Fix it once, never lose the mark again. A dedicated dashboard logs your recurring conceptual errors across Physics, Chemistry, and Biology.</p>
          </div>
          <div className="flex-1 w-full space-y-3">
             <div className="bg-black/60 rounded-xl p-4 border border-white/5 flex justify-between items-center">
               <span className="text-white font-medium">Kinematics</span>
               <span className="text-red-400 text-sm">Forgot "Rate of change"</span>
             </div>
             <div className="bg-black/60 rounded-xl p-4 border border-white/5 flex justify-between items-center">
               <span className="text-white font-medium">Genetics</span>
               <span className="text-red-400 text-sm">Confused DNA/RNA</span>
             </div>
             <div className="bg-black/60 rounded-xl p-4 border border-white/5 flex justify-between items-center">
               <span className="text-white font-medium">Thermodynamics</span>
               <span className="text-red-400 text-sm">Entropy definition</span>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
