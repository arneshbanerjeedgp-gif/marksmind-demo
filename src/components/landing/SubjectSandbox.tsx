import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubjectSandbox() {
  const [activeTab, setActiveTab] = useState('Physics');
  const tabs = ['Physics', 'Chemistry', 'Biology', 'Computer Science'];

  const content = {
    'Physics': { title: 'Velocity & Acceleration', topic: 'Kinematics', missing: 'Rate of change', score: '80%' },
    'Chemistry': { title: 'Fractional Distillation', topic: 'Separation Techniques', missing: 'Boiling Points', score: '85%' },
    'Biology': { title: 'Cellular Powerhouse', topic: 'Mitochondria Structure', missing: 'Cristae', score: '90%' },
    'Computer Science': { title: 'Retrieval-Augmented Gen', topic: 'RAG Architecture', missing: 'Vector Database', score: '95%' }
  };

  return (
    <section className="py-40 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-16 text-center">
        <h2 className="text-5xl md:text-7xl font-black mb-6 text-white tracking-tighter">Live Sandbox</h2>
        <p className="text-neutral-400 text-2xl max-w-2xl mx-auto">Test the diagnostic engine live across subjects.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-12 justify-center">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 rounded-full font-black transition-all text-sm uppercase tracking-widest ${
              activeTab === tab 
                ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] scale-105' 
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#121212] border border-white/10 rounded-[40px] p-12 min-h-[400px] relative overflow-hidden shadow-2xl max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex flex-col justify-center"
          >
            <h3 className="text-5xl font-black text-white mb-4 tracking-tighter">{content[activeTab].title}</h3>
            <p className="text-purple-400 font-bold mb-12 text-xl tracking-widest uppercase">{content[activeTab].topic}</p>
            
            <div className="bg-black/80 p-10 rounded-3xl border border-white/5 shadow-inner">
              <div className="flex justify-between items-center mb-8">
                <span className="text-white font-bold text-xl">Diagnostic Result</span>
                <span className="text-red-400 text-sm font-black tracking-widest uppercase bg-red-950/50 px-6 py-3 rounded-xl border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  Missing: {content[activeTab].missing}
                </span>
              </div>
              <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: content[activeTab].score }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                />
              </div>
              <p className="text-sm text-neutral-400 mt-6 font-mono font-bold">{content[activeTab].score} Concept Mastery</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
