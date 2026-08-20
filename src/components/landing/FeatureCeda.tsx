import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCeda() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-[40px] p-12 md:p-20 relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-700 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">CEDA Protocol: Concept Extraction & Defect Analysis</h3>
            <p className="text-xl text-neutral-400 leading-relaxed mb-8">Write naturally. Our engine finds the science hiding in your syntax and maps it to exact NCERT keywords.</p>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-black/80 rounded-3xl p-8 border border-white/5 font-mono text-base text-neutral-400 shadow-inner">
              <div className="mb-4"><span className="text-purple-400 font-bold">Input:</span> "The brain control body."</div>
              <div className="mb-4"><span className="text-green-400 font-bold">Extraction:</span> Central Nervous System</div>
              <div className="p-4 bg-red-950/30 rounded-xl border border-red-500/20"><span className="text-rose-400 font-bold">Missing Keyword:</span> Cerebrum</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
