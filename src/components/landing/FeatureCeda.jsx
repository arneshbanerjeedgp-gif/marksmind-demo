import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function FeatureCeda() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full bg-[#121212] border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden group hover:border-purple-500/50 transition-colors duration-500"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-600/20 transition-colors duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-8 border border-purple-500/20">
              <Target className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Feature 1: CEDA Protocol</h3>
            <p className="text-xl text-neutral-400 leading-relaxed mb-6">Concept Extraction & Defect Analysis. Write naturally. Our engine finds the science hiding in your syntax and maps it to exact NCERT keywords.</p>
          </div>
          <div className="flex-1 w-full">
            <div className="bg-black/60 rounded-2xl p-6 border border-white/5 font-mono text-sm text-neutral-500">
              <div className="mb-2"><span className="text-purple-400">Input:</span> "The brain control body."</div>
              <div className="mb-2"><span className="text-green-400">Extraction:</span> Central Nervous System</div>
              <div><span className="text-rose-400">Missing Keyword:</span> Cerebrum</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
